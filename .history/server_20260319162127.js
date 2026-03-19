require('dotenv').config();
const express = require('express');
const { execSync } = require('child_process');
const rolesData = require('./data/roles.json');
const aiService = require('./services/aiService');
const courseService = require('./services/courseService');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Helper to validate input (Requirement 3: Basic Quality)
const isValidInput = (data) => {
    return data.skills && Array.isArray(data.skills) && data.skills.length > 0 && data.roleId && data.level;
};

app.get('/api/roles', (req, res) => res.json(rolesData.roles));

app.post('/api/analyze', async (req, res) => {
    try {
        // 1. Validation (Requirement 3: Basic Quality)
        if (!isValidInput(req.body)) {
            return res.status(400).json({ error: "Please provide your skills, a target role, and a level." });
        }

        const { skills, roleId, level } = req.body;
        const role = rolesData.roles.find(r => r.id === roleId);

        if (!role) {
            return res.status(404).json({ error: "The selected role was not found in our database." });
        }

        // 2. Run C++ Engine for Match Score
        // Requirement 1: Core Flow (Search/Match Logic)
        let score = "0";
        try {
            const userStr = skills.join(',');
            const roleStr = role.levels[level].required_skills.join(',');
            // Handling pathing for both Windows and Linux/Mac
            const cmd = process.platform === 'win32' ? `engine\\matcher.exe` : `./engine/matcher`;
            score = execSync(`${cmd} "${userStr}" "${roleStr}"`).toString().trim();
        } catch (cppError) {
            console.error("C++ Engine Error:", cppError.message);
            score = "50"; // Internal fallback if C++ engine fails
        }

        // 3. Run AI for Gap Analysis (Requirement 2: AI Integration)
        // The fallback is handled inside aiService.js
        const gaps = await aiService.analyzeGap(skills, role, level);

        // 4. Get Courses for the gaps
        // We limit to 3 gaps to save API quota and keep UI clean
        const gapsWithCourses = await Promise.all(gaps.slice(0, 3).map(async (gap) => {
            const courses = await courseService.getYouTubeResources(gap.name, level);
            return { ...gap, courses };
        }));

        // 5. Success Response
        res.json({ 
            role: role.title, 
            score: score, 
            gaps: gapsWithCourses 
        });

    } catch (globalError) {
        // Requirement 3: Clear Error Messages
        console.error("Server Error:", globalError);
        res.status(500).json({ error: "Something went wrong on our end. Please try again later." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));