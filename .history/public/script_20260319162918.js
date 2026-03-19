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
