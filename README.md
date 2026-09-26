# TRIAGEFLOW AI

> **"Every email. The right action."**

TriageFlow AI is an AI-powered email intelligence platform that knows when to answer — and when to escalate. It triages incoming emails, drafts context-aware replies, and routes high-stakes or ambiguous messages to the right human, so your team never drops the ball.

---

## Key Features

- **Intelligent Email Triage**: Automatically classifies every inbound email by intent, urgency, and risk, deciding in real time whether it can be auto-answered or must be escalated to a human.
- **Grounded AI Replies**: Generates responses strictly grounded in your knowledge base and policies — no hallucinated commitments.
- **Smart Escalation Logic**: Detects sensitive, high-value, or ambiguous threads and routes them to the correct owner with full context attached.
- **Confidence Scoring**: Every decision carries a transparency score, so reviewers know exactly why a message was answered or escalated.
- **Document-Aware Context**: Ingests PDF, DOCX, and TXT knowledge sources to ground replies in your company's real policies and facts.
- **Vector-Powered Retrieval**: 384-D dense vector embeddings with fast cosine similarity search for accurate context retrieval.
- **Source Inspector**: Inspect source documents, page numbers, chunk IDs, and verified snippets behind every AI-generated reply.
- **Benchmark Suite**: Pre-configured evaluation runner validating triage accuracy across demo email datasets.
- **Strict Black + White + Teal Design System**: Built with React 19, Vite, and Tailwind CSS in **Pure JavaScript (No TypeScript)**.

---

## Demonstration Dataset

The platform ships with a fictional, internally consistent demo workspace for **Northstar Estates** (Islamabad & Rawalpindi), including:

1. `Company_Overview.pdf`
2. `Property_Listings.pdf`
3. `Services_and_Fees.pdf`
4. `FAQs.pdf`
5. `Policies_and_Terms.pdf`

These documents feed the grounding layer, allowing TriageFlow AI to answer inbound email queries with verified, citation-backed responses.

---

## Technical Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, React Router (Pure JavaScript & JSX).
- **Backend**: Express.js, SQLite (`sql.js`), vector persistence, `pdf-parse`, `mammoth`.
- **LLM Grounding**: `@google/genai` (Gemini Flash).
- **Embeddings**: `@xenova/transformers` for local 384-D vector generation.

---

## Project Structure
