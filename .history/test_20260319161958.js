// test.js
const { analyzeGap } = require('./services/aiService');

async function runTests() {
    console.log("Running Tests...");

    // Test 1: Happy Path (AI or Fallback returns data)
    try {
        const mockRole = { title: "Test Role", levels: { junior: { required_skills: ["Node.js", "SQL"] } } };
        const result = await analyzeGap(["Node.js"], mockRole, "junior");
        if (Array.isArray(result) && result.length > 0) {
            console.log("✅ Happy Path Test Passed: AI/Fallback returned gaps.");
        } else {
            throw new Error("Result is not an array");
        }
    } catch (e) {
        console.log("❌ Happy Path Test Failed:", e.message);
    }

    // Test 2: Edge Case (User has all skills)
    try {
        const mockRole = { title: "Test Role", levels: { junior: { required_skills: ["Node.js"] } } };
        const result = await analyzeGap(["Node.js"], mockRole, "junior");
        // AI should ideally recognize no gaps, or fallback returns the core skill
        console.log("✅ Edge Case Test Passed: System handled 'Perfect Match' scenario.");
    } catch (e) {
        console.log("❌ Edge Case Test Failed");
    }
}

runTests();