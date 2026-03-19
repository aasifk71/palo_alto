const assert = require('node:assert');
const { execSync } = require('child_process');

// Load fallback logic for testing (Edge Case)
const aiService = require('./services/aiService');

async function runTests() {
    console.log("🚀 Starting Skill-Bridge Test Suite...\n");

    // --- TEST 1: Happy Path (C++ Matcher Engine) ---
    // Goal: Verify the C++ engine correctly calculates a 100% match.
    try {
        console.log("Testing Happy Path: C++ Matcher Accuracy...");
        const cmd = process.platform === 'win32' ? `engine\\matcher.exe` : `./engine/matcher`;
        const userSkills = "python,sql,git";
        const roleSkills = "python,sql,git";
        
        const output = execSync(`${cmd} "${userSkills}" "${roleSkills}"`).toString().trim();
        
        assert.strictEqual(output, "100", "Matcher should return 100 for identical skills");
        console.log("✅ TEST PASSED: Matcher calculated 100% correctly.\n");
    } catch (err) {
        console.error("❌ TEST FAILED (Happy Path):", err.message);
    }

    // --- TEST 2: Edge Case (AI Fallback Mechanism) ---
    // Goal: Verify that if the AI fails (no API key), the system returns a manual fallback.
    try {
        console.log("Testing Edge Case: AI Fallback Mechanism...");
        const mockRole = { 
            title: "Software Engineer", 
            levels: { junior: { required_skills: ["Python", "Git", "SQL"] } } 
        };
        
        // Temporarily break the API key to trigger fallback
        const originalKey = process.env.GEMINI_API_KEY;
        process.env.GEMINI_API_KEY = "invalid_key";

        const gaps = await aiService.analyzeGap(["Python"], mockRole, "junior");
        
        // Assert that we got the fallback data (usually the first 5 core skills)
        assert.ok(Array.isArray(gaps), "Fallback should return an array");
        assert.ok(gaps.length > 0, "Fallback should not be empty");
        assert.strictEqual(gaps[0].reason, "Core requirement for this role.", "Should return fallback reason");

        process.env.GEMINI_API_KEY = originalKey; // Restore key
        console.log("✅ TEST PASSED: System successfully defaulted to manual fallback.\n");
    } catch (err) {
        console.error("❌ TEST FAILED (Edge Case):", err.message);
    }

    console.log("✨ All tests completed!");
}

runTests();