# 🌉 Skill-Bridge

An AI-powered career navigator that bridges the "skills gap" for graduates and career switchers—providing a deterministic match score, personalized gap analysis, and a curated learning roadmap.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![C++17](https://img.shields.io/badge/C++_17-00599C?style=for-the-badge&logo=cplusplus&logoColor=white)
![Gemini 1.5 Flash](https://img.shields.io/badge/Gemini_1.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 👤 Candidate Info

| Field | Details |
|------|--------|
| Name | **[Your Name]** |
| Scenario | **Scenario 2 — Skill-Bridge Career Navigator** |
| Submission Date | **March 20, 2026** |

---

## 🎥 Video Demo

📹 **Watch the walkthrough on YouTube →** *(Add Link Here)*  

**Covers:**  
UI Overview → Skill Tagging → C++ Engine Computation → AI Gap Analysis → Dynamic Roadmap Generation → Fallback Systems

---

## 🚀 Quick Start

### 1️⃣ Clone the repository
```bash
git clone https://github.com/[YourUsername]/skill-bridge.git
cd skill-bridge


2️⃣ Install dependencies
npm install


3️⃣ Compile the deterministic C++ engine
# Windows
g++ engine/matcher.cpp -o engine/matcher

# Mac/Linux
g++ engine/matcher.cpp -o engine/matcher


4️⃣ Start the server
npm start

👉 Open: http://localhost:3000



⚙️ Setup AI Features
cp .env.example .env


Add the following in .env:

GEMINI_API_KEY=your_key_here
YOUTUBE_API_KEY=your_key_here
🧪 Run Tests
node test.js


🎯 The Problem

Students and early-career professionals often face a "knowledge wall"—they have academic foundations but lack the specific technical stack required by job postings.

Information scattered across platforms

No clear roadmap to a role

Overwhelming learning paths

💡 The Solution

Skill-Bridge acts as a Career Architect, combining deterministic logic with AI intelligence.

| Feature                  | Implementation                            |
| ------------------------ | ----------------------------------------- |
| ⚡ Deterministic Matching | C++ Engine calculates compatibility score |
| 🔍 Deep Gap Analysis     | Gemini AI identifies missing skills       |
| 🗺️ Personalized Roadmap | YouTube resources mapped to gaps          |
| 🎨 Glassmorphic UI       | Tailwind CSS premium design               |
| 🔒 Safety First          | Rule-based fallback if AI fails           |


⚙️ Tech Stack
| Layer       | Tech              | Why                                  |
| ----------- | ----------------- | ------------------------------------ |
| 🖥️ Backend | Node.js (Express) | Async API orchestration              |
| ⚙️ Compute  | C++ 17            | High-performance deterministic logic |
| 🤖 AI       | Gemini 1.5 Flash  | Fast + structured output             |
| 🎨 Frontend | Tailwind CSS      | Modern UI system                     |
| 🧪 Testing  | Node Assert       | Lightweight testing                  |



🏗️ Architecture
┌───────────────────────────────────────────────┐
│ Frontend (Vanilla JS + Tailwind)              │
│ Skill Tags · Role Cards · Dashboard           │
└──────────────────────┬────────────────────────┘
                       │ REST / JSON
┌──────────────────────┴────────────────────────┐
│ Node.js Express Server                        │
│ Orchestrator · Validation · API Routes        │
└──────────┬───────────────┬──────────────┬─────┘
           │               │              │
    ┌──────┴──────┐ ┌──────┴───────┐ ┌────┴────┐
    │ C++ Engine  │ │ Gemini AI    │ │ YouTube │
    │ (Matcher)   │ │ (Gap Logic)  │ │ (API v3)│
    └─────────────┘ └──────┬───────┘ └─────────┘
           │               │ fail
    ┌──────┴──────┐ ┌──────┴───────────────┐
    │ roles.json  │◀┤ Rule-Based Fallback  │
    │ (Synthetic) │ │ (Set-Difference)     │


    🤖 AI & Logic Deep Dive
🔁 Hybrid Engine

Skill-Bridge uses Dual-Layer Analysis:

Quantitative (C++) → Exact skill match score

Qualitative (AI) → Explains skill gaps


🔄 Fallback Engine

If AI fails, system switches to Set-Difference Algorithm:
User Skills: [A, B]
Role Skills: [A, B, C, D]

Missing Skills: [C, D]


🧪 Tests

🚀 Starting Skill-Bridge Test Suite...

✅ Happy Path: C++ Matcher Engine
✓ Identical skills → 100% match

✅ Edge Case: AI Fallback
✓ Invalid API → fallback triggered
✓ Local roadmap returned

✨ All tests passed!
    └─────────────┘ └──────────────────────┘

 ⚖️ Responsible AI
 | Principle         | Implementation               |
| ----------------- | ---------------------------- |
| 🔍 Transparency   | AI vs Fallback clearly shown |
| 🔐 Security       | API keys via .env            |
| 📊 Synthetic Data | No scraping used             |
| 🔄 Reliability    | Always-working fallback      |



🔀 Tradeoffs & Future Scope
✅ Priorities

Performance (C++)

UI Experience

System Resilience

🚀 Future Enhancements

GitHub Skill Extraction

LinkedIn Integration

Resume PDF Parser

🔧 AI Tools Disclosure

Used AI (Gemini / ChatGPT) for:

UI scaffolding

Debugging

All architecture and logic decisions were manually designed and verified.

