# 🌉 Skill-Bridge — Design Document

## 1. 📌 Overview
**Skill-Bridge** is a career navigation platform designed to bridge the "skills gap" between academic foundations and specific industry requirements. It allows users to input their current expertise, select a target role (from Junior to Senior levels), and receive a deterministic readiness score coupled with an AI-generated learning roadmap.

The UI leverages a **Premium Glassmorphic aesthetic**—utilizing deep indigo palettes and interactive data visualizations (Radar Charts) to make career planning feel like a professional command center experience.

## 2. 🧠 Design Philosophy
### **Deterministic Math + Generative Insight**
Most career tools rely entirely on "black box" AI. Skill-Bridge uses a **C++ Matcher Engine** for the math (exact skill overlap) and **Gemini AI** for the context (why a gap exists). This ensures the "Readiness Score" is grounded in reality, not just AI estimation.

### **Resilience by Design**
Following the "Always Works" principle, if the Gemini API is throttled or a key is missing, the app automatically switches to a **Local Fallback Engine**. This engine performs a set-difference calculation on the `roles.json` data so the user experience is never interrupted.

### **Actionable over Abstract**
Knowing you "need SQL" is a start, but not a solution. Skill-Bridge connects identified gaps directly to a **Learning Roadmap** via the YouTube Data API, providing curated, level-specific tutorials for immediate skill acquisition.

## 3. 🏗️ Architecture
A polyglot approach combining systems-level performance with cloud-level intelligence:
![Architecture Diagram](https://raw.githubusercontent.com/aasifk71/palo_alto/main/architecture.png)


### 📡 API Endpoints
| Route | Methods | Purpose |
|---|---|---|
| `/api/roles` | GET | Returns the full library of synthetic career paths. |
| `/api/analyze` | POST | Triggers C++ Matcher + AI Gap Analysis + YouTube Search. |

## 4. 🤖 AI & Logic System
### **The Hybrid Pipeline**
1.  **Quantitative (C++):** The backend spawns a child process to run the compiled `matcher` binary. It performs a case-insensitive intersection of the user's `skills[]` and the role's `required_skills[]`.
2.  **Qualitative (Gemini):** The AI identifies the "Top 3 Gaps" and generates human-readable justifications focused on the selected seniority level.
3.  **Resources (YouTube):** Each gap triggers an automated search query to fetch the top 3 relevant tutorials using the YouTube Data API v3.

### **The Fallback Engine**
A scoring system that works without any API keys:
*   **Noise Filtering:** Sanitizes input strings to remove irrelevant characters.
*   **Set-Difference:** `Missing = RoleRequirements - UserSkills`.
*   **Confidence Scaling:** Assigns a priority weight to missing skills based on their order in the `roles.json` definition.
*   **Response Time:** Responds in `<2ms` (O(n) complexity).

## 5. 🎨 Visual Design
### **Color System**
| Token | Value | Usage |
|---|---|---|
| `--bg-main` | `#f8fafc` | 🌑 Light slate professional background |
| `--glass-bg` | `rgba(255,255,255,0.7)` | 🌫️ Glassmorphic card surfaces |
| `--indigo-600` | `#4f46e5` | 🔵 Primary branding / Call-to-action |
| `--cyan-500` | `#06b6d4` | 💎 Secondary accents and success states |

### **Information Layers**
1.  **Glanceable:** Readiness score and Radar Chart (3-second overview).
2.  **Scannable:** Role preview cards with high-level descriptions.
3.  **Detailed:** Individual "Gap Cards" with AI-reasoning and tutorial thumbnails.

## 6. 📦 Data Model
### **Role Schema (`roles.json`)**
```javascript
{
  "id": "software-engineer",
  "title": "Software Engineer",
  "category": "Software Engineering",
  "description": "Builds and maintains scalable systems...",
  "levels": {
    "junior": { "required_skills": ["Python", "SQL", "Git"] },
    "mid": { "required_skills": ["Docker", "System Design", "AWS"] },
    "senior": { "required_skills": ["Architecture", "Leadership"] }
  }
}
```

## 7. 🔐 Security

- **Environment Safety:** API keys are stored in `.env` and accessed only via the backend.  
- **Child Process Validation:** Commands sent to the C++ binary are strictly formatted to prevent shell injection.  
- **Data Minimization:** No PII is collected; analysis is performed solely on anonymous skill arrays.  

---

## 8. 🧪 Testing Strategy

**14 Tests covering happy paths and critical edge cases:**

- ✅ **C++ Accuracy:** Verifies 100% match for identical skill arrays.  
- ✅ **AI Fallback:** Ensures roadmap generation even with an invalid API key.  
- ✅ **Input Resilience:** Handles empty strings, excessive punctuation, and extremely long skill lists without crashing.  
- ✅ **Cross-Platform Pathing:** Validates binary execution on both Windows and Linux environments.  

---

## 9. ⚡ Performance

- **Binary Execution:** The C++ engine computes scores at system-level speed.  
- **Parallel Fetching:** AI analysis and YouTube resources are fetched concurrently using `Promise.all`.  
- **Zero-Overhead UI:** Built with pure JavaScript and Tailwind CSS for lightning-fast load times.  

---

## 10. ⚖️ Responsible AI

| Principle           | Implementation |
|--------------------|----------------|
| 🔍 **Transparency** | UI clearly distinguishes AI-generated insights from deterministic match scores. |
| 🎛️ **User Control** | Users can dynamically add/remove skills and instantly see roadmap updates. |
| 🚫 **No Automation** | System provides guidance only—no autonomous career actions. |
| 📊 **Bias Mitigation** | Core evaluation is handled by a deterministic C++ engine, reducing LLM bias and hallucination risk. |
