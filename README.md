# 🛡️ GuardianEcho
> **Autonomous ElderCare & Ambient Safety Ecosystem** built with Ring, AWS Bedrock, and Model Context Protocol (MCP) for Alexa+.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Track: Ring](https://img.shields.io/badge/Amazon_Track-Ring-blue)
![AWS: Bedrock](https://img.shields.io/badge/AWS-Bedrock%20%2B%20AgentCore-orange)
![Protocol: MCP](https://img.shields.io/badge/Protocol-MCP%202025--11--25-green)

---

## 📌 Project Overview
**GuardianEcho** is an ambient safety and emergency response orchestrator designed for independent elderly living and smart home caretaking. 

By combining **Ring Webhooks & API streams** with **Amazon Bedrock multimodal vision models (Claude 3.5 Sonnet)** and an open **Model Context Protocol (MCP) server for Alexa+**, GuardianEcho turns existing home security hardware into a proactive, non-invasive safety guardian.

### 💡 What Problem It Solves
- **Silent Household Accidents:** Falls, sudden unresponsiveness, or kitchen stove hazards often go undetected if the person cannot reach a manual panic button.
- **Privacy-First Monitoring:** Rather than continuous intrusive human monitoring, visual feeds are processed ephemerally using localized AI vision classification.
- **Autonomous Remediation:** Automatically triggers voice check-ins via Alexa+, activates Ring Chime alerts, or notifies emergency care contacts.

---

## 🏗️ Technical Architecture
[ Ring Devices / Simulator ]
│ (Webhook Motion/Snapshot Trigger)
▼
[ AWS Bedrock Multimodal Vision ]  ── (Claude 3.5 Sonnet Zero-Shot Safety Analysis)
│
▼
[ Ring MCP Server (TypeScript) ]  ── (Exposes Tools via MCP Spec 2025-11-25)
│
▼
[ Alexa+ Agent / Caregiver Dashboard ]
### Key Integrations
1. **Primary Track — Ring APIs & SDKs:** Integrates Ring Motion events, camera snapshot streaming, and chime alert triggers.
2. **AWS Builder Challenge — AWS Bedrock:** Processes raw snapshot payloads to perform real-time zero-shot visual hazard detection (`FALL_RISK`, `UNATTENDED_STOVE`, `UNLOCKED_PERIMETER`).
3. **Open Source Challenge — `@guardian-echo/ring-mcp-server`:** Published as an open-source TypeScript package bridging Ring Webhooks directly to Model Context Protocol (MCP) tools for Alexa+ and AI agentic workflows.

---

## 📁 Repository Structure

```text
guardian-echo/
├── packages/
│   ├── ring-mcp-server/       # Open Source: Model Context Protocol Adapter for Ring
│   │   ├── src/index.ts       # MCP Server entry point (Streamable HTTP / Stdio)
│   │   └── src/tools/         # MCP Tools (get_snapshot, trigger_chime, unlock_door)
│   └── aws-vision-core/       # AWS Bedrock Multimodal Analysis Pipeline
│       └── src/bedrock-analyzer.ts # Bedrock Claude 3.5 Sonnet prompt executor
├── apps/
│   └── dashboard/             # Real-time event monitor & Ring Simulator harness
├── FRICTION_LOG.md            # Detailed Amazon DX & SDK feedback (+10% bonus)
├── LICENSE                    # MIT Open Source License
└── README.md
🚀 Quickstart Guide
Prerequisites
Node.js >= v20.x

AWS CLI configured with bedrock:InvokeModel permissions

Ring Developer Account credentials or simulator tokens

Installation
# Clone repository
git clone [https://github.com/Masngo/guardian-echo.git](https://github.com/Masngo/guardian-echo.git)
cd guardian-echo

# Install dependencies across workspace
npm install

# Environment setup
cp .env.example .env
Running the Ring MCP Server
Bash
npm run start:mcp
Running the AWS Bedrock Vision Pipeline
Bash
npm run test:vision
📊 Friction Log & Product Feedback
See FRICTION_LOG.md for full developer experience documentation, API benchmarking, and actionable suggestions for the Amazon Developer team.

📜 License
Distributed under the MIT License. See LICENSE for details.
