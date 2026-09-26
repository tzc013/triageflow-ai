<div align="center">

# 🎯 TRIAGEFLOW AI

### *Every email. The right action.*

**AI-powered email intelligence that knows when to answer — and when to escalate.**

[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Gemini-Flash-4285f4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

[Overview](#-overview) • [Features](#-key-features) • [Demo](#-demonstration-dataset) • [Stack](#-technical-stack) • [Setup](#-getting-started) • [API](#-api-reference) • [Architecture](#-architecture)

</div>

---

## 📖 Overview

**TriageFlow AI** is an enterprise-grade email intelligence platform built to solve a single, stubborn problem: *inboxes that never stop growing, and no one who knows which messages actually matter.*

Most "AI email assistants" either:

- ❌ Answer everything (and hallucinate commitments your company never made), or
- ❌ Escalate everything (and become just another inbox).

TriageFlow AI does neither. It **triages every inbound email** with a grounded, policy-aware reasoning layer, decides in real time whether a message can be safely auto-answered or must be routed to a human, and attaches a full audit trail to every decision.

The result: **your team never drops the ball, and never over-commits.**

---

## ✨ Key Features

### 🧠 Intelligent Email Triage
Automatically classifies every inbound message by **intent**, **urgency**, and **risk**, then decides:
- ✅ **Auto-answer** — safe, grounded, low-risk replies handled instantly.
- ⚠️ **Draft & review** — suggested reply queued for human approval.
- 🚨 **Escalate** — high-stakes, sensitive, or ambiguous threads routed to the correct owner with full context.

### 🛡️ Grounded AI Replies
Every generated response is **strictly anchored** to retrieved source material — company policies, pricing sheets, FAQs, service catalogs. If the answer isn't in the knowledge base, the system says so. No invented commitments, no false promises.

### 🔀 Smart Escalation Logic
Detects:
- High-value threads (large deals, VIP contacts)
- Sensitive topics (legal, complaints, refunds)
- Ambiguous or contradictory intents
- Confidence below threshold

...and routes them to the right human with the full conversation, retrieved context, and a suggested draft attached.

### 📊 Confidence Scoring
Every triage decision carries a **transparency score**. Reviewers see exactly:
- *Why* the AI answered (or didn't)
- Which sources were retrieved
- How confident the model was in each claim

### 📚 Document-Aware Context
Ingests **PDF**, **DOCX**, and **TXT** knowledge sources and grounds replies in your organization's real facts:
- Page-aware parsing (preserves page numbers)
- Intelligent 800–1000 token chunking with 100–150 token overlap
- Chunks aligned to physical page boundaries for accurate citations

### 🔍 Vector-Powered Retrieval
- **384-dimensional dense vector embeddings**
- Fast cosine similarity search
- Persistent vector store for sub-second retrieval
- Local embedding generation via `@xenova/transformers` (no external embedding API needed)

### 🔎 Source Inspector
Full transparency for every AI-generated reply:
- Source document name & page number
- Chunk ID & similarity score
- Verified highlighted snippet
- Clickable source pills for reviewer drill-down

### 🧪 Benchmark Suite
Pre-configured evaluation runner with automated tests validating triage accuracy across the demo email dataset. Measures:
- Classification accuracy
- Grounding fidelity
- Escalation precision & recall
- Reply quality

### 🎨 Strict Design System
- **Black + White + Teal** palette — no gimmicks
- Built with **React 19**, **Vite 6**, **Tailwind CSS 4**
- **Pure JavaScript (JSX)** — no TypeScript overhead
- Motion & interaction polish via `motion` (Framer Motion)

---

## 📦 Demonstration Dataset

TriageFlow AI ships with a fictional, internally consistent demo workspace for **Northstar Estates** — a boutique real-estate agency operating in **Islamabad & Rawalpindi**, Pakistan.

The dataset includes five cross-referencing documents that let the platform demonstrate **cross-document reasoning** (e.g., pulling a property price from one file and applying a commission percentage from another):

| # | File | Purpose |
|---|------|---------|
| 1 | `Company_Overview.pdf` | Brand, mission, service areas |
| 2 | `Property_Listings.pdf` | Active listings, prices, locations |
| 3 | `Services_and_Fees.pdf` | Commission structure, service tiers |
| 4 | `FAQs.pdf` | Common buyer/seller questions |
| 5 | `Policies_and_Terms.pdf` | Legal terms, refunds, disclaimers |

These documents feed the grounding layer, allowing TriageFlow AI to answer inbound email queries with **verified, citation-backed responses**.

---

## 🏗️ Technical Stack

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | **React 19** |
| Build Tool | **Vite 6** |
| Styling | **Tailwind CSS 4** |
| Icons | **Lucide React** |
| Routing | **React Router 7** |
| Animation | **Motion** (Framer Motion) |
| Charts | **Recharts** |
| Language | **Pure JavaScript (JSX)** — no TypeScript |

### Backend
| Layer | Technology |
|-------|-----------|
| Server | **Express.js 4** |
| Database | **SQLite** (`sql.js`) |
| Vector Store | Persistent 384-D embeddings |
| File Parsing | `pdf-parse`, `mammoth` |
| Uploads | `multer` |
| PDF Generation | `pdf-lib` |
| Env Management | `dotenv` |

### AI / ML
| Layer | Technology |
|-------|-----------|
| LLM Grounding | **`@google/genai`** (Gemini Flash) |
| Embeddings | **`@xenova/transformers`** (local, 384-D) |
| Retrieval | Cosine similarity over persistent vector store |

### Runtime
- **Node.js** 20+
- **npm** or **bun** (lockfile included)

---

## 📂 Project Structure

```
triageflow-ai/
├── server.js                        # Express + Vite entrypoint
├── vite.config.js                   # Vite configuration
├── index.html                       # SPA shell
├── package.json
├── bun.lock
├── .env.example                     # Environment template
├── .gitignore
├── LICENSE
├── README.md
│
├── server/                          # Backend
│   └── routes/
│       ├── triageflow.js            # Core triage & routing endpoints
│       ├── documents.js             # Ingestion, chunking, vector search
│       ├── chat.js                  # Grounded reply generation
│       ├── seed.js                  # Demo dataset seeding
│       └── evaluation.js            # Benchmark suite runner
│
├── src/                             # Frontend (React + JSX)
│   ├── main.jsx                     # App entrypoint
│   ├── App.jsx
│   ├── components/                  # UI components
│   ├── pages/                       # Route pages
│   ├── hooks/                       # Custom React hooks
│   ├── lib/                         # Utilities
│   └── styles/                      # Tailwind entry
│
├── sample-documents/                # Northstar Estates knowledge base
│   ├── Company_Overview.pdf
│   ├── Property_Listings.pdf
│   ├── Services_and_Fees.pdf
│   ├── FAQs.pdf
│   └── Policies_and_Terms.pdf
│
└── demo_data/                       # Seeded demo emails & fixtures
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **npm** ≥ 10.x (or **bun** ≥ 1.1)
- A **Google Gemini API key** — [get one here](https://aistudio.google.com/app/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/tzc013/triageflow-ai.git
cd triageflow-ai
```

### 2. Configure Environment

Copy the template and add your Gemini API key:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Google Gemini API Key for Grounded RAG Generation
GEMINI_API_KEY=your_google_gemini_api_key_here
```

> ⚠️ **Never commit `.env`.** It is already listed in `.gitignore`.

### 3. Install Dependencies

```bash
npm install
```

or, with bun:

```bash
bun install
```

### 4. Seed the Demo Dataset (optional but recommended)

```bash
curl -X POST http://localhost:3000/api/seed
```

Or use the built-in UI button on first launch.

### 5. Run the Development Server

```bash
npm run dev
```

The app will be live at:

```
http://0.0.0.0:3000
```

The Express server mounts the API routers **and** runs Vite in middleware mode — so you get HMR and API in one process.

### 6. Build for Production

```bash
npm run build
npm start
```

The production build serves the compiled `dist/` directory from Express.

---

## 🔌 API Reference

All endpoints are mounted under `/api`.

### 📨 TriageFlow — `/api/triageflow/*`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/triageflow/classify` | Classify a single email (intent, urgency, risk) |
| `POST` | `/api/triageflow/route` | Decide action: auto-answer / review / escalate |
| `GET`  | `/api/triageflow/queue` | List pending triage decisions |
| `POST` | `/api/triageflow/override` | Human override of an AI decision |

### 📄 Documents — `/api/documents/*`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/documents/upload` | Upload PDF / DOCX / TXT for ingestion |
| `POST` | `/api/documents/ingest` | Parse, chunk, embed, and index a document |
| `GET`  | `/api/documents` | List all indexed documents |
| `GET`  | `/api/documents/:id` | Retrieve a document with page metadata |
| `POST` | `/api/documents/search` | Vector similarity search over chunks |
| `DELETE` | `/api/documents/:id` | Remove a document and its vectors |

### 💬 Chat — `/api/chat/*`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat/reply` | Generate a grounded reply from retrieved context |
| `POST` | `/api/chat/stream` | Streaming variant of the above (SSE) |
| `GET`  | `/api/chat/history/:threadId` | Retrieve a conversation thread |

### 🌱 Seed — `/api/seed/*`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/seed` | Load the Northstar Estates demo dataset |
| `DELETE` | `/api/seed` | Reset demo data to a clean state |

### 🧪 Evaluation — `/api/evaluation/*`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/evaluation/run` | Execute the full benchmark suite |
| `GET`  | `/api/evaluation/results` | Retrieve the last run's results |
| `GET`  | `/api/evaluation/suites` | List available test suites |

---

## 🧩 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       BROWSER (React 19)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐   │
│  │  Inbox   │  │  Triage  │  │  Source  │  │  Evaluator │   │
│  │  View    │  │  Panel   │  │ Inspector│  │  Dashboard │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘   │
└───────┼─────────────┼─────────────┼──────────────┼──────────┘
        │             │             │              │
        └─────────────┴─────────────┴──────────────┘
                            │
                    HTTP / JSON / SSE
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    EXPRESS SERVER (Node)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Routes: triageflow · documents · chat · seed · eval  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │  Chunker   │  │  Embedder    │  │  Retrieval Engine  │   │
│  │ 800–1000t  │→ │ 384-D vectors│→ │  Cosine similarity │   │
│  └────────────┘  └──────────────┘  └─────────┬──────────┘   │
│                                              │              │
│  ┌────────────┐  ┌──────────────┐  ┌─────────▼──────────┐   │
│  │  SQLite    │  │  Vector Store│  │  Gemini Grounding  │   │
│  │  (sql.js)  │  │  (persistent)│  │  (@google/genai)   │   │
│  └────────────┘  └──────────────┘  └────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow (Single Email → Decision)

1. **Ingest** — Email arrives via API or UI.
2. **Classify** — Intent, urgency, and risk are extracted.
3. **Retrieve** — Vector search pulls top-K grounded chunks from the knowledge base.
4. **Reason** — Gemini Flash generates a grounded answer *or* flags low confidence.
5. **Decide** — Routing logic picks: `auto-answer` · `draft-review` · `escalate`.
6. **Log** — Decision + sources + confidence written to the audit trail.
7. **Deliver** — Reply sent, or thread routed to the assigned human owner.

---

## 🎨 Design System

TriageFlow AI uses a strict, high-contrast design language suited for long-session enterprise work.

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0b0c` | App shell |
| Foreground | `#f6f8fa` | Primary text |
| Accent (Teal) | `#7fa48b` | Highlights, focus states |
| Accent (Light) | `#a2c1ac` | Selection text, links |
| Font (UI) | Inter | Body, headings |
| Font (Code) | JetBrains Mono | Sources, IDs, snippets |

Selection styling, focus rings, and scrollbars all follow the same teal accent for visual coherence.

---

## 🧠 Design Principles

| Principle | What It Means |
|-----------|---------------|
| **Ground first, generate second** | Every reply is anchored to retrieved source material. No source, no answer. |
| **Escalate when uncertain** | The system prefers a human hand-off over a wrong answer. Confidence thresholds are configurable. |
| **Transparent reasoning** | Confidence scores and source pills accompany every action. Nothing is a black box. |
| **Audit-ready by default** | Every triage decision is traceable to its retrieved context and model version. |
| **Local-first where possible** | Embeddings run locally via `@xenova/transformers` — no third-party embedding service required. |
| **Pure JavaScript** | No TypeScript build step. Faster onboarding, fewer moving parts. |

---

## 🧪 Running the Benchmark Suite

```bash
# Ensure the server is running
npm run dev

# In another terminal:
curl -X POST http://localhost:3000/api/evaluation/run
```

Results are written to the evaluation dashboard and returned as JSON.

The suite validates:
- ✅ Classification accuracy across labeled emails
- ✅ Grounding fidelity (every claim maps to a retrieved chunk)
- ✅ Escalation precision & recall
- ✅ Reply quality against expected responses
- ✅ Cross-document mathematical reasoning

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key for grounded generation |
| `NODE_ENV` | ⚪ No | `development` (default) or `production` |
| `PORT` | ⚪ No | Server port (default: `3000`) |
| `DISABLE_HMR` | ⚪ No | Set to `true` to disable Vite HMR |

---

## 🤝 Contributing

This is a private/internal project. If you're a collaborator:

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Commit with conventional commits: `git commit -m "feat: add X"`
3. Push: `git push origin feat/your-feature`
4. Open a Pull Request against `main`

### Commit Convention

| Prefix | Meaning |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `chore:` | Maintenance |
| `refactor:` | Code restructure (no behavior change) |
| `test:` | Test additions/changes |
| `perf:` | Performance improvements |

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| `GEMINI_API_KEY is not set` | Ensure `.env` exists and contains a valid key |
| Port `3000` already in use | Change `PORT` in `.env` or kill the existing process |
| Vector search returns nothing | Run `POST /api/seed` to load the demo dataset |
| PDF parsing fails | Confirm `pdf-parse` installed correctly; check Node ≥ 20 |
| Embeddings slow on first run | `@xenova/transformers` downloads models on first use — subsequent runs are cached |

---

## 📜 License

See the [LICENSE](./LICENSE) file for details.

---

<div align="center">

### **TRIAGEFLOW AI**

*Every email. The right action.*

**[⬆ Back to top](#-triageflow-ai)**

</div>
