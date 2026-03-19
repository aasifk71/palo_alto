

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
| Name | **[Mohd Aasif]** |
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
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Compile the deterministic C++ engine
### Windows
```bash
g++ engine/matcher.cpp -o engine/matcher
```
### Mac/Linux
```bash
g++ engine/matcher.cpp -o engine/matcher
```

### 4️⃣ Start the server
```bash
npm start
```
👉 Open: http://localhost:3000

---

### ⚙️ Setup AI Features
cp .env.example .env
## Add the following in .env:
```bash
GEMINI_API_KEY=your_key_here
YOUTUBE_API_KEY=your_key_here
```
##  🧪 Run Tests
```bash
node test.js
```

## 🎯 The Problem

Students and early-career professionals often face a "knowledge wall"—they have academic foundations but lack the specific technical stack required by job postings.

Information scattered across platforms

No clear roadmap to a role

Overwhelming learning paths
---
## 💡 The Solution

Skill-Bridge acts as a Career Architect, combining deterministic logic with AI intelligence.

| Feature                  | Implementation                            |
| ------------------------ | ----------------------------------------- |
| ⚡ Deterministic Matching | C++ Engine calculates compatibility score |
| 🔍 Deep Gap Analysis     | Gemini AI identifies missing skills       |
| 🗺️ Personalized Roadmap | YouTube resources mapped to gaps          |
| 🎨 Glassmorphic UI       | Tailwind CSS premium design               |
| 🔒 Safety First          | Rule-based fallback if AI fails           |

---




## ⚙️ Tech Stack
| Layer       | Tech              | Why                                  |
| ----------- | ----------------- | ------------------------------------ |
| 🖥️ Backend | Node.js (Express) | Async API orchestration              |
| ⚙️ Compute  | C++ 17            | High-performance deterministic logic |
| 🤖 AI       | Gemini 1.5 Flash  | Fast + structured output             |
| 🎨 Frontend | Tailwind CSS      | Modern UI system                     |
| 🧪 Testing  | Node Assert       | Lightweight testing                  |

---

## 🏗️ Architecture

![Architecture Diagram](https://raw.githubusercontent.com/aasifk71/palo_alto/main/architecture.png)



## 📁 Project Structure

```bash
Skill-Bridge follows a "modular and layered architecture", separating concerns across data, computation, services, and UI.
```
```bash
skill-bridge/
│
├── data/
│   └── roles.json              # Synthetic dataset of job roles & required skills
│
├── engine/
│   ├── matcher.cpp            # Core C++ matching engine (deterministic scoring)
│   └── matcher.exe            # Compiled executable (used by backend)
│
├── public/
│   ├── index.html             # Frontend UI (dashboard)
│   └── script.js              # Client-side logic (skill input, API calls)
│
├── services/
│   ├── aiService.js           # Handles Gemini AI integration (gap analysis)
│   └── courseService.js       # Fetches learning resources (YouTube API)
│
├── .env                       # Environment variables (API keys)
├── server.js                  # Express server (API orchestration layer)
├── test.js                    # Test suite (core functionality validation)
├── package.json               # Project dependencies & scripts
└── package-lock.json          # Dependency lock file
```


  ## 🤖 AI & Logic Deep Dive
### 🔁 Hybrid Engine

Skill-Bridge uses Dual-Layer Analysis:

Quantitative (C++) → Exact skill match score

Qualitative (AI) → Explains skill gaps


### 🔄 Fallback Engine

If AI fails, system switches to Set-Difference Algorithm:
User Skills: [A, B]
Role Skills: [A, B, C, D]

Missing Skills: [C, D]


## 🧪 Tests

### 🚀 Starting Skill-Bridge Test Suite...

✅ Happy Path: C++ Matcher Engine
✓ Identical skills → 100% match

✅ Edge Case: AI Fallback
✓ Invalid API → fallback triggered
✓ Local roadmap returned

✨ All tests passed!
  ---  

 ## ⚖️ Responsible AI
 | Principle         | Implementation               |
| ----------------- | ---------------------------- |
| 🔍 Transparency   | AI vs Fallback clearly shown |
| 🔐 Security       | API keys via .env            |
| 📊 Synthetic Data | No scraping used             |
| 🔄 Reliability    | Always-working fallback      |
---


## 🔀 Trade-offs & Future Scope

### ⚖️ Key Trade-offs

Every design decision in Skill-Bridge was made with a clear priority:  
**reliability and clarity over unnecessary complexity.**

- ⚙️ **C++ vs JavaScript for Matching**  
  Chose C++ for deterministic performance and consistency, at the cost of added integration complexity with Node.js.

- 🤖 **AI Intelligence vs System Reliability**  
  Leveraged AI for flexibility and explanation, but introduced a rule-based fallback to eliminate failure scenarios.

- 🎨 **UI Polish vs Development Time**  
  Focused on a clean, responsive Tailwind interface rather than heavy frameworks to maintain speed and simplicity.

- 📊 **Feature Depth vs Time Constraints**  
  Prioritized core functionality (matching + roadmap) over additional integrations to ensure a complete, working prototype.

---

### 🎯 Design Priorities

The system was intentionally optimized for:

- ⚡ **Performance** → Fast, deterministic computation via C++  
- 🎨 **User Experience** → Clean, intuitive interaction flow  
- 🔄 **System Resilience** → Guaranteed output via fallback logic  

> The goal was not just to build features, but to build a system that **always works under real-world conditions**.

---

## 🚀 Future Enhancements

With more time, the system can evolve into a full-scale career intelligence platform:

- 🔗 **GitHub Skill Extraction**  
  Automatically infer skills from repositories and contributions

- 💼 **LinkedIn Integration**  
  Align user profiles with real-world job market data

- 📄 **Resume Parser (PDF)**  
  Extract and normalize skills directly from resumes

- 🧠 **Smarter Recommendation Engine**  
  Improve roadmap quality using feedback loops and ranking models

- 📊 **Market-Aware Skill Mapping**  
  Integrate job trends to recommend high-demand skills dynamically

---

## 🔧 AI Tools Disclosure

AI tools (Gemini / ChatGPT) were used selectively to enhance development efficiency:

- UI scaffolding and layout structuring  
- Debugging assistance and edge-case handling  

### 🧠 Engineering Ownership

- All **system architecture, core logic, and design decisions** were independently designed  
- AI was used as a **productivity tool**, not a decision-maker  

> The focus was on **engineering judgment and system design**, not AI dependency.


