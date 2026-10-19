# 🏛️ GuardianEcho System Architecture

> **Technical Specification & Multi-Device Integration Blueprints**  
> *Amazon Developer Hackathon Submission (2026)*

---

## 1. System Overview & Component Topography

GuardianEcho is engineered as an event-driven, privacy-first cross-device safety orchestrator. It couples edge IoT hardware sensors with cloud-native multimodal vision models and agentic Model Context Protocol (MCP) servers.
[200~┌─────────────────────────────────────────────────────────────────────────────┐
│                          GUARDIANECHO CLOUD TOPOGRAPHY                      │
└─────────────────────────────────────────────────────────────────────────────┘

[ Edge Sensors ]              [ Cloud AI Engine ]            [ Agentic Orchestrator ]
┌──────────────────┐          ┌──────────────────────┐        ┌────────────────────────┐
│ Ring Motion Cam  │ ───────> │ AWS Bedrock          │ ─────> │ Alexa+ MCP Server      │
│ (Living Room/    │ (Base64  │ (Claude 3.5 Sonnet   │ (JSON  │ (Spec 2025-11-25)      │
│  Kitchen/Porch)  │  Payload)│  Multimodal Vision)  │ Schema)│                        │
└──────────────────┘          └──────────────────────┘        └────────────────────────┘
│                                                                 │
│ (Biometrics)                                                    │ (Tool Dispatch)
▼                                                                 ▼
┌──────────────────┐                                          ┌────────────────────────┐
│ Bee Wearable AI  │                                          │ Fire TV (Vega OS) PiP  │
│ (Heart Rate /    │                                          │ & Alexa+ Voice Check-in│
│  Galvanic Stress)│                                          │ Ring Hardware Chime    │
└──────────────────┘                                          └────────────────────────┘


---

## 2. Core Service Layers

### A. Data Capture & Ingestion Layer (`Ring API & Bee Wearable`)
* **Ring Webhook Triggers:** Listens to event streams from monitored zones (`living_room`, `kitchen`, `porch`, `patio`). Upon motion detection, an ephemeral snapshot frame is captured.
* **Bee Wearable Stream:** Continuously samples real-time biometric telemetry (heart rate, galvanic skin response) to cross-validate physical distress during simulated emergency events.
* **Privacy Guarantee:** Video frames are processed in-memory and are never permanently persisted to disk or external storage buckets.

### B. Multimodal AI Analysis Layer (`AWS Bedrock Runtime`)
* **Model Engine:** Utilizes **Amazon Bedrock** running **Claude 3.5 Sonnet** (`anthropic.claude-3-5-sonnet-20241022-v2:0`).
* **Inference Flow:** 
  1. Ephemeral base64 image buffers are transmitted via the `@aws-sdk/client-bedrock-runtime` SDK.
  2. Zero-shot visual prompt instructions evaluate specific household hazard classes: `FALL_RISK`, `UNATTENDED_STOVE`, `UNLOCKED_PERIMETER`, or `NONE`.
  3. Returns structured JSON containing hazard classifications, confidence scores, and execution latency metrics (~120ms benchmark).

### C. Agentic Orchestration Layer (`Alexa+ MCP Server`)
* **Protocol Standard:** Implements the open Model Context Protocol (MCP spec 2025-11-25) supporting both stdio pipes and Streamable HTTP transports.
* **Exposed Tool Registry:**
  * `get_ring_snapshot(deviceId)`: Refreshes visual verification context.
  * `trigger_emergency_chime(alertLevel)`: Activates local Ring hardware sirens and audio chimes.
  * `unlock_door(deviceId, duration)`: Manages perimeter access control.
  * `fire_tv_display_pip(alert)`: Broadcasts Picture-in-Picture alert overlays directly to Fire TV / Vega OS screens.

### D. Presentation & Command Hub (`Apps & Streamlit Wrapper`)
* **Web Command Center (`apps/dashboard/public/index.html`):** Built with Tailwind CSS, Chart.js, and HTML5 Canvas. Features real-time WebGL/2D thermal and night-vision filters, an interactive 2D CAD floor plan beacon tracker, and jsPDF audit report generation.
* **Cloud Deployment Wrapper (`app.py`):** Integrates the web dashboard seamlessly into Streamlit Community Cloud for instant judge accessibility.

---

## 3. Security & Compliance
* **Repository Licensing:** Distributed openly under the **MIT License**.
* **Access Control:** Fully compatible with private repository collaboration rules (`testing@devpost.com` and designated Amazon Developer Relations reviewers).
