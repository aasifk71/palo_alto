const { GoogleGenerativeAI } = require("@google/generative-ai");

async function analyzeGap(userSkills, role, level) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Role: ${role.title} (${level})
    Required Skills: ${role.levels[level].required_skills.join(", ")}
    User current skills: ${userSkills.join(", ")}

    Identify the top 3 specific technical skill gaps.
    Return ONLY a valid JSON array of objects. 
    Format: [{"name": "Skill Name", "reason": "Short explanation of why this is needed for a ${level} role"}]
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Stronger JSON extraction (removes markdown backticks and extra text)
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Invalid JSON format from AI");
    } catch (error) {
        console.error("AI Service Error:", error.message);
        // Fallback: If AI fails, use the first 3 required skills from the JSON data
        return role.levels[level].required_skills.slice(0, 3).map(s => ({
            name: s, 
            reason: "This is a core requirement for reaching the " + level + " level in this career path."
        }));
    }
}

module.exports = { analyzeGap };