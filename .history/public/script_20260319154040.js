let selectedLevel = 'junior';
let selectedRoleId = '';
let skills = [];
let allRoles = [];

// 1. Initial Load Roles
fetch('/api/roles').then(r => r.json()).then(roles => {
    allRoles = roles;
    if (roles.length > 0) {
        selectedRoleId = roles[0].id; // Default first role
    }
    renderRoles();
});

// 2. Search & Filter Logic
document.getElementById('roleSearch').addEventListener('input', renderRoles);
document.getElementById('categoryFilter').addEventListener('change', renderRoles);

function renderRoles() {
    const searchTerm = document.getElementById('roleSearch').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const container = document.getElementById('roleList');
    
    const filtered = allRoles.filter(role => {
        const matchesSearch = role.title.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || role.category === category;
        return matchesSearch && matchesCategory;
    });

    container.innerHTML = filtered.map(role => `
        <div onclick="selectRole('${role.id}')" 
             class="cursor-pointer p-4 rounded-xl border-2 transition-all ${selectedRoleId === role.id ? 'border-blue-400 bg-white shadow-sm' : 'border-transparent hover:bg-white/50'}">
            <h4 class="font-bold text-slate-800">${role.title}</h4>
            <span class="text-[10px] font-bold text-slate-400 uppercase">${role.category}</span>
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
        document.getElementById('previewDesc').innerText = role.description || "Building the future of technology.";
        document.getElementById('previewCat').innerText = role.category;
    }
}

// 3. Skill Tag Logic
const skillInput = document.getElementById('skillInput');
const skillsContainer = document.getElementById('skillsContainer');

skillInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && skillInput.value.trim() !== '') {
        e.preventDefault();
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
        <span onclick="removeSkill('${s}')" class="skill-tag cursor-pointer bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-sm border border-blue-200 flex items-center gap-2">
            ${s} <span class="text-xs opacity-50 font-black">×</span>
        </span>
    `).join('');
}

function removeSkill(name) {
    skills = skills.filter(s => s !== name);
    renderSkills();
}

// 4. Level Selection Logic
function setLevel(lvl) {
    selectedLevel = lvl;
    document.querySelectorAll('.level-btn').forEach(b => {
        b.classList.remove('bg-white', 'shadow-sm', 'text-blue-600');
        b.classList.add('text-slate-500');
    });
    event.currentTarget.classList.add('bg-white', 'shadow-sm', 'text-blue-600');
}

// 5. Final Analyze Call
async function analyze() {
    if (skills.length === 0) return alert("Please enter at least one skill first!");
    if (!selectedRoleId) return alert("Please select a target role!");

    const btn = document.getElementById('btn');
    btn.disabled = true;
    btn.innerText = "Analyzing Your Profile...";
    
    try {
        const res = await fetch('/api/analyze', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ skills, roleId: selectedRoleId, level: selectedLevel })
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
                    <h3 class="font-black text-2xl text-slate-800 mb-2">${gap.name}</h3>
                    <p class="text-slate-600 mb-6 text-lg leading-relaxed">${gap.reason}</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        ${gap.courses.map(c => `
                            <a href="${c.url}" target="_blank" class="group block">
                                <div class="relative overflow-hidden rounded-xl mb-2">
                                    <img src="${c.thumbnail}" class="w-full h-32 object-cover transition-transform group-hover:scale-110">
                                </div>
                                <span class="block font-bold text-sm text-slate-700 line-clamp-2 leading-snug group-hover:text-blue-600">${c.title}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        window.scrollTo({ top: document.getElementById('results').offsetTop - 40, behavior: 'smooth' });

    } catch (err) {
        alert("Something went wrong. Check the console.");
        console.error(err);
    } finally {
        btn.disabled = false;
        btn.innerText = "Analyze My Gap";
    }
}