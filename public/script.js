let selectedLevel = 'junior';
let selectedRoleId = '';
let skills = [];
let allRoles = [];

// Fetch and Initial Load
fetch('/api/roles').then(r => r.json()).then(roles => {
    allRoles = roles;
    if (roles.length > 0) selectedRoleId = roles[0].id;
    renderRoles();
});

document.getElementById('roleSearch').addEventListener('input', renderRoles);
document.getElementById('categoryFilter').addEventListener('change', renderRoles);

function renderRoles() {
    const searchTerm = document.getElementById('roleSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const container = document.getElementById('roleList');
    
    const filtered = allRoles.filter(role => {
        const matchesSearch = role.title.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || role.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="p-8 text-center text-slate-400 text-sm">No paths found...</div>`;
        return;
    }

    container.innerHTML = filtered.map(role => `
        <div onclick="selectRole('${role.id}')" 
             class="group cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 ${selectedRoleId === role.id ? 'bg-indigo-50 border-indigo-400 shadow-md translate-x-2' : 'border-transparent hover:bg-white hover:shadow-sm'}">
            <h4 class="font-bold ${selectedRoleId === role.id ? 'text-indigo-600' : 'text-slate-700'}">${role.title}</h4>
            <div class="flex items-center gap-2 mt-1">
                <span class="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-300"></span>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${role.category}</span>
            </div>
        </div>
    `).join('');

    updatePreview();
}

function selectRole(id) {
    selectedRoleId = id;
    renderRoles();
}

function updatePreview() {
    const role = allRoles.find(r => r.id === selectedRoleId);
    if (role) {
        document.getElementById('previewTitle').innerText = role.title;
        document.getElementById('previewDesc').innerText = role.description;
        document.getElementById('previewCat').innerText = role.category;
    }
}

function setLevel(lvl) {
    selectedLevel = lvl;
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-indigo-900', 'shadow-sm');
        btn.classList.add('text-white/60');
    });
    event.currentTarget.classList.add('bg-white', 'text-indigo-900', 'shadow-sm');
    event.currentTarget.classList.remove('text-white/60');
}

// Skills Logic
const skillInput = document.getElementById('skillInput');
const skillsContainer = document.getElementById('skillsContainer');

skillInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && skillInput.value.trim() !== '') {
        const val = skillInput.value.trim();
        if (!skills.includes(val)) {
            skills.push(val);
            renderSkills();
        }
        skillInput.value = '';
    }
});

function renderSkills() {
    skillsContainer.innerHTML = skills.map(s => `
        <div class="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-3 shadow-sm hover:border-red-200 transition-colors group cursor-pointer" onclick="removeSkill('${s}')">
            <span>${s}</span>
            <span class="text-slate-300 group-hover:text-red-400 font-black text-xs">✕</span>
        </div>
    `).join('');
}

function removeSkill(s) {
    skills = skills.filter(item => item !== s);
    renderSkills();
}

// Analyze Logic
async function analyze() {
    if (skills.length === 0) {
        showToast("Add your skills first! Type and hit Enter.", "error");
        return; 
    }
    if (!selectedRoleId) {
        showToast("Select a destination path first.", "error");
        return;
    }
    
    const btn = document.getElementById('btn');
    const btnText = btn.querySelector('span');
    btnText.innerText = "Analyzing Gap...";
    btn.disabled = true;

    try {
        const res = await fetch('/api/analyze', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ skills, roleId: selectedRoleId, level: selectedLevel })
        });

        if (!res.ok) throw new Error("Connection timed out. Try again.");

        const data = await res.json();
        showToast("Roadmap Ready!", "success");

        // --- FIXED: Injecting the actual Gap Cards into the UI ---
        document.getElementById('results').classList.remove('hidden');
        document.getElementById('resTitle').innerText = data.role + " (" + selectedLevel.toUpperCase() + ")";
        document.getElementById('resScore').innerText = data.score + "%";

        const list = document.getElementById('gapList');
        list.innerHTML = data.gaps.map(gap => `
            <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div class="flex items-start justify-between mb-6">
                    <div>
                        <h5 class="text-2xl font-black text-slate-800 tracking-tight">${gap.name}</h5>
                        <p class="text-slate-500 mt-2 leading-relaxed max-w-2xl">${gap.reason}</p>
                    </div>
                    <div class="bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase px-3 py-1 rounded-lg">Gap Identified</div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${(gap.courses && gap.courses.length > 0) ? gap.courses.map(c => `
                        <a href="${c.url}" target="_blank" class="group block">
                            <div class="relative rounded-2xl overflow-hidden mb-3 aspect-video bg-slate-100">
                                <img src="${c.thumbnail}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                                <div class="absolute inset-0 bg-indigo-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span class="bg-white text-indigo-900 font-bold py-2 px-4 rounded-full text-xs shadow-xl">Watch Tutorial</span>
                                </div>
                            </div>
                            <span class="font-bold text-sm text-slate-700 line-clamp-2 leading-tight group-hover:text-indigo-600">${c.title}</span>
                        </a>
                    `).join('') : '<p class="text-slate-400 text-xs italic">Finding resources...</p>'}
                </div>
            </div>
        `).join('');

        window.scrollTo({ top: document.getElementById('results').offsetTop - 50, behavior: 'smooth' });

    } catch (e) {
        showToast(e.message, "error");
    } finally {
        btnText.innerText = "Generate Roadmap";
        btn.disabled = false;
    }
}

function showToast(message, type = 'error') {
    const toast = document.getElementById('toast');
    const title = document.getElementById('toastTitle');
    const msg = document.getElementById('toastMessage');
    const icon = document.getElementById('toastIcon');

    // 1. Set the content and colors
    if (type === 'error') {
        title.innerText = "Attention";
        icon.className = "w-8 h-8 rounded-xl flex items-center justify-center text-white font-black shadow-lg bg-red-500";
        icon.innerText = "!";
    } else {
        title.innerText = "Excellent";
        icon.className = "w-8 h-8 rounded-xl flex items-center justify-center text-white font-black shadow-lg bg-emerald-500";
        icon.innerText = "✓";
    }
    
    msg.innerText = message;

    // 2. SHOW THE TOAST
    // Remove hidden classes, Add visible classes
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-20px]');
    toast.classList.add('opacity-100', 'translate-y-0');

    // 3. HIDE THE TOAST (After 3.5 seconds)
    setTimeout(() => {
        // MUST remove the visible classes first
        toast.classList.remove('opacity-100', 'translate-y-0');
        
        // Then add the hidden classes back
        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-20px]');
    }, 3500);
}