let selectedLevel = 'junior';
let skills = [];
let allRoles = [];

// Load Roles
fetch('/api/roles').then(r => r.json()).then(roles => {
    allRoles = roles;
    const sel = document.getElementById('roleSelect');
    roles.forEach(r => {
        sel.innerHTML += `<option value="${r.id}">${r.title}</option>`;
    });
    updatePreview();
});

// Update Preview Card when role changes
document.getElementById('roleSelect').addEventListener('change', updatePreview);

function updatePreview() {
    const roleId = document.getElementById('roleSelect').value;
    const role = allRoles.find(r => r.id === roleId);
    if (role) {
        document.getElementById('previewTitle').innerText = role.title;
        document.getElementById('previewCat').innerText = role.category;
    }
}

// Skill Tag Logic
const skillInput = document.getElementById('skillInput');
const skillsContainer = document.getElementById('skillsContainer');

skillInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && skillInput.value.trim() !== '') {
        addSkill(skillInput.value.trim());
        skillInput.value = '';
    }
});

function addSkill(name) {
    if (skills.includes(name)) return;
    skills.push(name);
    renderSkills();
}

function removeSkill(name) {
    skills = skills.filter(s => s !== name);
    renderSkills();
}

function renderSkills() {
    skillsContainer.innerHTML = skills.map(s => `
        <span onclick="removeSkill('${s}')" class="skill-tag cursor-pointer bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-sm border border-blue-200 flex items-center gap-2">
            ${s} <span class="text-xs opacity-50 font-black">×</span>
        </span>
    `).join('');
}

function setLevel(lvl) {
    selectedLevel = lvl;
    document.querySelectorAll('.level-btn').forEach(b => {
        b.classList.remove('bg-white', 'shadow-sm', 'text-blue-600');
        b.classList.add('text-slate-500');
    });
    const activeBtn = event.currentTarget;
    activeBtn.classList.add('bg-white', 'shadow-sm', 'text-blue-600');
}

async function analyze() {
    if (skills.length === 0) return alert("Please add at least one skill!");
    
    const roleId = document.getElementById('roleSelect').value;
    const btn = document.getElementById('btn');
    btn.disabled = true;
    btn.innerText = "Analyzing Gap...";
    
    const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ skills, roleId, level: selectedLevel })
    });
    
    const data = await res.json();
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('resTitle').innerText = data.role + " (" + selectedLevel.toUpperCase() + ")";
    document.getElementById('resScore').innerText = data.score + "%";
    
    const list = document.getElementById('gapList');
    list.innerHTML = '';
    
    data.gaps.forEach(gap => {
        list.innerHTML += `
            <div class="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-blue-500">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-black text-2xl text-slate-800">${gap.name}</h3>
                    <span class="bg-blue-50 text-blue-600 px-3 py-1 rounded text-xs font-black uppercase tracking-widest">Missing Skill</span>
                </div>
                <p class="text-slate-600 mb-6 text-lg leading-relaxed">${gap.reason}</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${gap.courses.map(c => `
                        <a href="${c.url}" target="_blank" class="group block">
                            <div class="relative overflow-hidden rounded-xl mb-2">
                                <img src="${c.thumbnail}" class="w-full h-32 object-cover transition-transform group-hover:scale-110">
                                <div class="absolute inset-0 bg-blue-900 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                            </div>
                            <span class="block font-bold text-sm text-slate-700 line-clamp-2 leading-snug">${c.title}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    btn.disabled = false;
    btn.innerText = "Analyze My Gap";
    window.scrollTo({ top: document.getElementById('results').offsetTop - 50, behavior: 'smooth' });
}