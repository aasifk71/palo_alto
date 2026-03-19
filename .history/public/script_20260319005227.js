let selectedLevel = 'junior';

fetch('/api/roles').then(r => r.json()).then(roles => {
    const sel = document.getElementById('roleSelect');
    roles.forEach(r => sel.innerHTML += `<option value="${r.id}">${r.title}</option>`);
});

function setLevel(lvl) {
    selectedLevel = lvl;
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('bg-blue-50', 'border-blue-500'));
    event.target.classList.add('bg-blue-50', 'border-blue-500');
}

async function analyze() {
    const skills = document.getElementById('skillsInput').value.split(',').map(s => s.trim());
    const roleId = document.getElementById('roleSelect').value;
    const btn = document.getElementById('btn');
    
    btn.innerText = "Analyzing...";
    
    const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ skills, roleId, level: selectedLevel })
    });
    
    const data = await res.json();
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('resTitle').innerText = data.role;
    document.getElementById('resScore').innerText = data.score + "% Match";
    
    const list = document.getElementById('gapList');
    list.innerHTML = '';
    
    data.gaps.forEach(gap => {
        list.innerHTML += `
            <div class="bg-white p-6 rounded-xl shadow">
                <h3 class="font-bold text-xl text-slate-800">${gap.name}</h3>
                <p class="text-gray-600 mb-4">${gap.reason}</p>
                <div class="grid grid-cols-3 gap-2">
                    ${gap.courses.map(c => `
                        <a href="${c.url}" target="_blank" class="text-xs group">
                            <img src="${c.thumbnail}" class="rounded group-hover:opacity-80">
                            <span class="block truncate mt-1">${c.title}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    });
    btn.innerText = "ANALYZE GAP";
}