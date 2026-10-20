# 🛡️ GuardianEcho

> **Autonomous Ambient Eldercare & Cross-Device Incident Orchestrator**  
> *Submitted to the Amazon Developer Hackathon: Build, Ship, Shape (2026)*

[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://guardian-echo-z86htguujubwatv9gpxtbv.streamlit.app)
![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)
![Node.js](https://img.shields.io/badge/Node.js-v20%2B-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-blue.svg)
![AWS Bedrock](https://img.shields.io/badge/AWS-Bedrock%20Claude%203.5%20Sonnet-orange.svg)
![Alexa+ MCP](https://img.shields.io/badge/Alexa%2B-MCP%20Spec%202025--11--25-purple.svg)

---

## 🔗 Quick Links & Live Demos
* 🌐 **Live Streamlit App:** Click the badge above or visit [https://guardian-echo-z86htguujubwatv9gpxtbv.streamlit.app](https://guardian-echo-z86htguujubwatv9gpxtbv.streamlit.app)
* 📄 **Executive Brief & Judge's Summary:** [Download / View GuardianEcho Executive Brief PDF](./guardian_echo_executive_brief.pdf)
* 📂 **GitHub Repository:** [https://github.com/Masngo/guardian-echo](https://github.com/Masngo/guardian-echo)
* 🎥 **3-Minute Demo Video:** [YouTube / Vimeo Demo Link] *(See Devpost Submission)*
* 🏛️ **System Architecture Spec:** [Architecture.md](./ARCHITECTURE.md)
* 📝 **Developer Friction Logs:** [Friction_Log.md](./FRICTION_LOG.md)

---

## 📖 How It Works

GuardianEcho bridges physical security hardware, multimodal artificial intelligence, and living-room ambient displays into a proactive safety shield for elderly individuals living independently.
┌─────────────────────────────────────────────────────────────────────────────┐
│                            GUARDIANECHO PIPELINE                            │
└─────────────────────────────────────────────────────────────────────────────┘
│
[1] EVENT DETECTION                  ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ • Ring Security Cameras capture ephemeral motion snapshots               │
│ • Bee Wearable AI continuously logs biometric streams (Heart Rate/Stress) │
└───────────────────────────────────────────────────────────────────────────┘
│
[2] MULTIMODAL AI ANALYSIS           ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ • Snapshot sent to AWS Bedrock (Claude 3.5 Sonnet Vision Model)           │
│ • Zero-shot classification: FALL_RISK | STOVE_HAZARD | DOOR_BREACH        │
│ • Edge pipeline benchmark: ~120ms execution latency                      │
└───────────────────────────────────────────────────────────────────────────┘
│
[3] AGENTIC CROSS-DEVICE ACTIONS     ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ • Alexa+ Model Context Protocol (MCP) Server receives structured payload  │
│ • Tool Invocation 1: get_ring_snapshot (refreshes live visual context)    │
│ • Tool Invocation 2: fire_tv_display_pip (renders picture-in-picture)     │
│ • Tool Invocation 3: alexa_voice_checkin (initiates proactive check-in)   │
└───────────────────────────────────────────────────────────────────────────┘


### ⚙️ Step-by-Step Technical Execution

1. **Trigger & Data Capture Layer (Ring API & Bee Wearable)**
   * When ambient motion is detected across home camera nodes (Living Room, Kitchen, Porch, Patio), an ephemeral snapshot frame is routed to the processing queue.
   * Concurrent biometric telemetry from the Bee Wearable stream (Heart Rate, Galvanic Skin Response) provides supplementary validation of resident distress.

2. **Computer Vision Inference (AWS Bedrock)**
   * Snapshots are evaluated by **Amazon Bedrock running Claude 3.5 Sonnet** (`anthropic.claude-3-5-sonnet-20241022-v2:0`).
   * The model assesses non-responsive floor posture, unattended heat sources, or unlatched perimeter access without retaining persistent private video feeds.

3. **Orchestration & Cross-Device Execution (Alexa+ MCP Server & Fire TV)**
   * Upon hazard classification, the **Alexa+ Model Context Protocol (MCP) Server** (spec 2025-11-25) triggers automated tool actions:
     * **Fire TV (Vega OS):** Displays a Picture-in-Picture alert directly on the living room screen.
     * **Alexa+ Agent:** Speaks a voice check-in query to confirm resident wellbeing before escalating to emergency contacts.
     * **Ring Infrastructure:** Sounds hardware chimes and locks smart door latches if a perimeter breach is confirmed.

---

## 🛠️ Tech Stack & Architecture

- **Primary Track:** Ring API & Webhook Adapters
- **AWS Builder Challenge:** AWS Bedrock Runtime SDK (Claude 3.5 Sonnet Multimodal Vision)
- **Alexa+ Agent Track:** Open-Source Model Context Protocol Server (`packages/ring-mcp-server`)
- **Fire TV & Bee Integration:** Fire TV Picture-in-Picture notification bridge & Wearable biometric data streams
- **Command Dashboard:** Web App (`apps/dashboard/public/index.html`) & Streamlit wrapper (`app.py`) featuring multi-camera HUD canvas, telemetry logs, and jsPDF audit report exports.

---

## 🚀 Quick Start Guide

### Prerequisites
* Node.js v20 or higher
* Git Bash / Terminal

### 1. Installation
```bash
git clone [https://github.com/Masngo/guardian-echo.git](https://github.com/Masngo/guardian-echo.git)
cd guardian-echo
npm install
2. Run the Ring MCP Server
Bash
npm run start:mcp
3. Launch the Local Web Dashboard
In a separate terminal window:

Bash
npx serve apps/dashboard/public -l 3000
Navigate to http://localhost:3000 in your web browser.

📜 License
Distributed under the MIT License. See LICENSE for details.
