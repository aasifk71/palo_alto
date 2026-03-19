require('dotenv').config();
const express = require('express');
const { execSync } = require('child_process');
const rolesData = require('./data/roles.json');
const aiService = require('./services/aiService');
const courseService = require('./services/courseService');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/api/roles', (req, res) => res.json(rolesData.roles));

app.post('/api/analyze', async (req, res) => {
    const { skills, roleId, level } = req.body;
    const role = rolesData.roles.find(r => r.id === roleId);

    // 1. Run C++ Engine for Match Score
    const userStr = skills.join(',');
    const roleStr = role.levels[level].required_skills.join(',');
    const cmd = process.platform === 'win32' ? `engine\\matcher.exe` : `./engine/matcher`;
    const score = execSync(`${cmd} "${userStr}" "${roleStr}"`).toString();

    // 2. Run AI for Gap Analysis
    const gaps = await aiService.analyzeGap(skills, role, level);

    // 3. Get Courses for the first 3 gaps
    for (let gap of gaps) {
        gap.courses = await courseService.getYouTubeResources(gap.name, level);
    }

    res.json({ role: role.title, score, gaps });
});

app.listen(process.env.PORT, () => console.log(`Server: http://localhost:${process.env.PORT}`));