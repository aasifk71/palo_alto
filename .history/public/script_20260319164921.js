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
             class="group cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 ${selectedRoleId === role.id ? 'role-active shadow-lg' : 'border-transparent hover:bg-white hover:shadow-sm'}">
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

// Level Selection with Styling
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
    // 1. Validation (Modern Toast instead of alert)
    if (skills.length === 0) {
        const input = document.getElementById('skillInput');
        input.classList.add('border-red-400', 'bg-red-50');
        
        // --- NEW TOAST ---
        showToast("Add your skills first! Type a skill and hit Enter.", "error");
        
        setTimeout(() => {
            input.classList.remove('border-red-400', 'bg-red-50');
        }, 2000);
        return; 
    }

    if (!selectedRoleId) {
        showToast("Please select a target destination from the list.", "error");
        return;
    }
    
    const btn = document.getElementById('btn');
    const btnText = btn.querySelector('span');
    btnText.innerText = "Crafting Roadmap...";
    btn.disabled = true;

    try {
        const res = await fetch('/api/analyze', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ skills, roleId: selectedRoleId, level: selectedLevel })
        });

        if (!res.ok) {
            throw new Error("Analysis failed. Check connection.");
        }

        const data = await res.json();
        
        // Show success toast
        showToast("Roadmap generated successfully!", "success");

        // ... rest of your rendering code remains exactly the same ...
        document.getElementById('results').classList.remove('hidden');
        document.getElementById('resTitle').innerText = data.role;
        // ... (etc)
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

    // Setup colors based on type
    if (type === 'error') {
        title.innerText = "System Alert";
        icon.innerText = "!";
        icon.className = "w-8 h-8 rounded-xl flex items-center justify-center text-white font-black shadow-lg bg-gradient-to-br from-red-500 to-orange-500";
    } else {
        title.innerText = "Success";
        icon.innerText = "✓";
        icon.className = "w-8 h-8 rounded-xl flex items-center justify-center text-white font-black shadow-lg bg-gradient-to-br from-emerald-400 to-cyan-500";
    }

    msg.innerText = message;

    // Animate In
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-20px]');
    toast.classList.add('opacity-100', 'translate-y-0');

    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-20px]');
        toast.classList.remove('opacity-100', 'translate-y-0');
    }, 3500);
}