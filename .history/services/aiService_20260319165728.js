const { GoogleGenerativeAI } = require("@google/generative-ai");

async function analyzeGap(userSkills, role, level) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Role: ${role.title} (${level})
    Required: ${role.levels[level].required_skills.join(", ")}
    User has: ${userSkills.join(", ")}
    Identify the top 3 tech gaps. Return ONLY a JSON array: [{"name": "Skill", "reason": "Why"}]
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, "").trim();
        return JSON.parse(text);
    } catch (error) {
        // Fallback Requirement met here
        return role.levels[level].required_skills.slice(0, 3).map(s => ({
            name: s, reason: "Core requirement for this specific career track."
        }));
    }
}

module.exports = { analyzeGap };