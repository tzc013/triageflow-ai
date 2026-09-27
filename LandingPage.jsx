import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Database, 
  Users, 
  Briefcase, 
  AlertTriangle, 
  FileText, 
  Inbox, 
  Send, 
  ChevronRight,
  Layers,
  Search,
  Eye,
  Lock,
  Cpu
} from 'lucide-react';

export default function LandingPage() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [activeCategoryTab, setActiveCategoryTab] = useState('sales');

  useEffect(() => {
    // Cinematic splash screen timer (auto-fade or immediate skip)
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const decisionFlows = {
    sales: {
      category: "Sales Inquiry",
      incoming: "Inquiry on Maple Residency 3-bedroom specifications and current price in F-11.",
      confidence: "96%",
      action: "Automated Grounded RAG Reply",
      badgeClass: "text-[#a2c1ac] bg-[#17221b] border-[#24342a]",
      pipeline: ["Email Ingested", "Cleaned & Parsed", "Sales Inquiry (96%)", "Task 5 ChromaDB Query", "Services & Listings Verified", "Response Sent"],
      detail: "Safe to automate because property pricing and floor specifications exist in verified knowledge base documents."
    },
    hr: {
      category: "Job Application",
      incoming: "AI Engineering Intern submission with resume and FAST-NUCES portfolio.",
      confidence: "98%",
      action: "Forward to HR + Discord Alert",
      badgeClass: "text-[#86efac] bg-[#0d381c] border-[#14532b]",
      pipeline: ["CV Detected", "Extraction & Attachment Saved", "Job Application (98%)", "AI Decision Boundary", "Forwarded to HR", "Discord Webhook Dispatched"],
      detail: "Strict policy compliance: AI NEVER ranks, screens, or makes rejection decisions on candidates."
    },
    urgent: {
      category: "Critical Emergency",
      incoming: "Main water pipe rupture in Unit 4B Cedar Heights threatening server racks.",
      confidence: "99%",
      action: "Immediate Emergency Escalation",
      badgeClass: "text-[#fca5a5] bg-[#451315] border-[#751b1f]",
      pipeline: ["High-Urgency Signal", "Critical Priority Flag", "Emergency Classification", "High-Priority Webhook", "Emergency Incident Channel", "Assigned to Facilities"],
      detail: "Severe operational threat identified and immediately broadcast to Discord emergency response room."
    },
    project: {
      category: "Project Milestone",
      incoming: "Margalla View retaining wall waterproofing schedule amendment (+6 days).",
      confidence: "92%",
      action: "Forward to Project Manager",
      badgeClass: "text-[#cadbcd] bg-[#17221b] border-[#354b3d]",
      pipeline: ["Contractor Payload", "Milestone Change Detected", "Project Category (92%)", "Manager Routing", "Discord Management Notification", "Awaiting Authorization"],
      detail: "Technical scope and timeline changes require human engineering sign-off and contractor management."
    }
  };

  const activeFlow = decisionFlows[activeCategoryTab];

  return (
    <div className="min-h-screen bg-[#0a0b0c] text-[#f6f8fa] font-sans selection:bg-[#7fa48b]/30 selection:text-[#a2c1ac]">
      {/* Cinematic Splash Screen */}
      {splashVisible && (
        <div 
          id="cinematic-splash"
          onClick={() => setSplashVisible(false)}
          className="fixed inset-0 z-50 bg-[#0a0b0c] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700"
        >
          <div className="relative flex flex-col items-center">
            {/* Glowing Minimal Symbol */}
            <div className="w-16 h-16 rounded-2xl bg-[#17221b] border border-[#24342a] flex items-center justify-center sage-glow-lg animate-pulse mb-6">
              <Sparkles className="w-8 h-8 text-[#7fa48b]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#f6f8fa] mb-2">
              TRIAGEFLOW <span className="text-[#7fa48b]">AI</span>
            </h1>
            <p className="text-xs font-mono text-[#8c959f] tracking-widest uppercase mb-4">
              Every email. The right action.
            </p>
            <div className="w-24 h-0.5 bg-[#17221b] overflow-hidden rounded-full">
              <div className="w-full h-full bg-[#7fa48b] -translate-x-full animate-[pulse_1.2s_ease-in-out_infinite]" />
            </div>
            <span className="text-[10px] text-[#656e77] mt-6">Click anywhere to enter</span>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 h-16 bg-[#0a0b0c]/80 backdrop-blur-md border-b border-[#1b1e21] px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#17221b] border border-[#24342a] flex items-center justify-center text-[#7fa48b]">
            <Sparkles className="w-4 h-4 text-[#7fa48b]" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-[#f6f8fa]">TRIAGEFLOW</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-[#17221b] text-[#7fa48b] border border-[#24342a] ml-1.5">AI</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            id="nav-demo-link"
            to="/inbox"
            className="text-xs text-[#8c959f] hover:text-[#f6f8fa] transition-colors hidden sm:block mr-2"
          >
            Explore Inbox
          </Link>
          <Link
            id="nav-enter-command-btn"
            to="/dashboard"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#17221b] hover:bg-[#24342a] border border-[#24342a] hover:border-[#7fa48b] text-xs font-semibold text-[#f6f8fa] transition-all"
          >
            <span>Enter Command Center</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7fa48b]" />
          </Link>
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section className="relative px-6 py-20 lg:py-28 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111315] border border-[#22262a] text-xs font-mono text-[#8c959f] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
          <span>PRODUCTION-READY AI EMAIL TRIAGE & DECISION ENGINE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#f6f8fa] leading-[1.15] max-w-4xl mx-auto mb-6">
          Every email. <br className="hidden sm:inline" />
          <span className="text-[#7fa48b]">The right action.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#b0b8c1] max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-powered email intelligence that knows when to answer — and when to escalate. Ingests, understands, consults grounded RAG knowledge, and safeguards human review boundaries.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            id="hero-enter-btn"
            to="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#17221b] hover:bg-[#24342a] border border-[#24342a] hover:border-[#7fa48b] text-sm font-semibold text-[#f6f8fa] transition-all sage-glow-sm"
          >
            <span>Enter Command Center</span>
            <ArrowRight className="w-4 h-4 text-[#7fa48b]" />
          </Link>

          <Link
            id="hero-inbox-btn"
            to="/inbox"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#111315] hover:bg-[#16181b] border border-[#22262a] text-sm font-medium text-[#b0b8c1] hover:text-[#f6f8fa] transition-all"
          >
            <Inbox className="w-4 h-4 text-[#7fa48b]" />
            <span>Review Ingested Emails</span>
          </Link>
        </div>

        {/* HERO VISUAL: The End-to-End Decision Pipeline */}
        <div className="w-full bg-[#111315] border border-[#22262a] rounded-2xl p-6 lg:p-8 text-left shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#1b1e21] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span className="w-3 h-3 rounded-full bg-[#484f57]" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span className="text-xs font-mono text-[#656e77] ml-2">Live Triage Architecture Demonstration</span>
            </div>
            <span className="text-xs font-mono text-[#7fa48b] bg-[#17221b] px-2.5 py-0.5 rounded border border-[#24342a]">
              CONFIDENCE: 96%
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Incoming Email Card */}
            <div className="lg:col-span-4 bg-[#0a0b0c] p-4 rounded-xl border border-[#1b1e21]">
              <div className="flex items-center justify-between text-xs text-[#656e77] mb-2">
                <span>INCOMING PAYLOAD</span>
                <span className="font-mono">10:14 AM</span>
              </div>
              <p className="text-xs font-semibold text-[#f6f8fa] mb-1">Inquiry: Maple Residency Specifications</p>
              <p className="text-[11px] text-[#8c959f] leading-relaxed mb-3">
                "Could you please provide the price, covered area, and number of bedrooms for Maple Residency in Sector F-11?"
              </p>
              <div className="flex items-center gap-2 text-[10px] text-[#656e77]">
                <span className="px-1.5 py-0.2 rounded bg-[#16181b] border border-[#22262a]">Tariq Mahmood</span>
                <span>investors.pk</span>
              </div>
            </div>

            {/* AI Decision Pipeline Visualization */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="text-xs font-mono text-[#8c959f] flex items-center justify-between">
                <span>AI REASONING & ROUTING PIPELINE</span>
                <span className="text-[#22c55e]">POLICY: ALLOW AUTOMATED RAG REPLY</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-lg bg-[#0a0b0c] border border-[#1b1e21] text-left">
                  <span className="text-[10px] font-mono text-[#656e77]">1. CLASSIFICATION</span>
                  <p className="text-xs font-medium text-[#a2c1ac] mt-0.5">Sales Inquiry</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a0b0c] border border-[#1b1e21] text-left">
                  <span className="text-[10px] font-mono text-[#656e77]">2. SAFETY CHECK</span>
                  <p className="text-xs font-medium text-[#22c55e] mt-0.5">Passed Boundaries</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a0b0c] border border-[#1b1e21] text-left">
                  <span className="text-[10px] font-mono text-[#656e77]">3. TASK 5 RAG</span>
                  <p className="text-xs font-medium text-[#7fa48b] mt-0.5">Listings.pdf (p.1)</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#17221b] border border-[#24342a] text-left">
                  <span className="text-[10px] font-mono text-[#7fa48b]">4. EXECUTION</span>
                  <p className="text-xs font-medium text-[#f6f8fa] mt-0.5">Reply Sent (PKR 42M)</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0d1710] border border-[#14532b] text-xs text-[#cadbcd] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#f6f8fa]">Grounded Response Dispatched:</span>{" "}
                  "Maple Residency in Sector F-11 offers 3 luxury bedrooms with 2,450 sq ft covered area listed at PKR 42,000,000."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EMAIL INTELLIGENCE */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-[#1b1e21]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#7fa48b] mb-2">01 / Email Intelligence</h2>
          <p className="text-2xl sm:text-3xl font-bold text-[#f6f8fa]">Beyond Simple Inboxes. An AI Decision Layer.</p>
          <p className="text-xs text-[#8c959f] mt-2">TRIAGEFLOW AI analyzes structure, threads, and intent to protect operational focus.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#111315] border border-[#22262a] hover:border-[#354b3d] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#17221b] border border-[#24342a] flex items-center justify-center text-[#7fa48b] mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#f6f8fa] mb-2">Payload Normalization</h3>
            <p className="text-xs text-[#8c959f] leading-relaxed">
              Strips noisy email footers, nested reply quotes, tracking pixels, and signatures to isolate true semantic core context.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#111315] border border-[#22262a] hover:border-[#354b3d] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#17221b] border border-[#24342a] flex items-center justify-center text-[#7fa48b] mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#f6f8fa] mb-2">Thread Context Awareness</h3>
            <p className="text-xs text-[#8c959f] leading-relaxed">
              Tracks multi-turn negotiations and follow-ups. Accurately links fee questions to previously cited property prices.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#111315] border border-[#22262a] hover:border-[#354b3d] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#17221b] border border-[#24342a] flex items-center justify-center text-[#7fa48b] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#f6f8fa] mb-2">Deterministic Guardrails</h3>
            <p className="text-xs text-[#8c959f] leading-relaxed">
              When confidence falls below 85% or questions touch unverified facts, the system never hallucinates — it escalates to humans.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4: DECISION ENGINE & CLASSIFICATION */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-[#1b1e21]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#7fa48b] mb-2">02 / Decision Engine</h2>
          <p className="text-2xl sm:text-3xl font-bold text-[#f6f8fa]">Adaptive Routing for Every Category</p>
          <p className="text-xs text-[#8c959f] mt-2">See how TRIAGEFLOW treats different email classes with distinct business rules.</p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'sales', label: 'Sales Inquiry' },
            { id: 'hr', label: 'Job Application (HR)' },
            { id: 'urgent', label: 'Critical Alert' },
            { id: 'project', label: 'Project Milestone' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeCategoryTab === tab.id
                  ? 'bg-[#17221b] text-[#f6f8fa] border border-[#7fa48b] font-semibold'
                  : 'bg-[#111315] text-[#8c959f] border border-[#22262a] hover:text-[#f6f8fa]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Flow Box */}
        <div className="p-6 lg:p-8 rounded-2xl bg-[#111315] border border-[#22262a]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b1e21] pb-4 mb-6">
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold border ${activeFlow.badgeClass} mb-1`}>
                {activeFlow.category}
              </span>
              <p className="text-sm font-semibold text-[#f6f8fa]">{activeFlow.action}</p>
            </div>
            <div className="text-xs font-mono text-[#8c959f]">
              CONFIDENCE RATING: <span className="text-[#f6f8fa] font-bold">{activeFlow.confidence}</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-3 rounded-lg bg-[#0a0b0c] border border-[#1b1e21]">
              <span className="text-[10px] font-mono text-[#656e77]">EXAMPLE PAYLOAD</span>
              <p className="text-xs text-[#b0b8c1] mt-1">{activeFlow.incoming}</p>
            </div>

            <div className="p-3 rounded-lg bg-[#17221b]/40 border border-[#24342a]">
              <span className="text-[10px] font-mono text-[#7fa48b]">AUTOMATION POLICY RULE</span>
              <p className="text-xs text-[#cadbcd] mt-1">{activeFlow.detail}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono text-[#656e77] mb-2 uppercase">Decision Trace Stages</p>
            <div className="flex flex-wrap items-center gap-2">
              {activeFlow.pipeline.map((step, idx) => (
                <React.Fragment key={step}>
                  <span className="px-2.5 py-1 rounded bg-[#0a0b0c] border border-[#22262a] text-xs font-mono text-[#b0b8c1]">
                    {step}
                  </span>
                  {idx < activeFlow.pipeline.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#656e77]" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: RAG INTELLIGENCE */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-[#1b1e21]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#7fa48b] mb-2">03 / Grounded Knowledge</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#f6f8fa] mb-4">Grounded in Task 5 ChromaDB Knowledge</h3>
            <p className="text-xs text-[#8c959f] leading-relaxed mb-4">
              TRIAGEFLOW AI directly references your company's authoritative document repository. It extracts facts with similarity scoring and strictly refuses to fabricate missing data.
            </p>
            <ul className="space-y-2 text-xs text-[#b0b8c1]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                <span>Zero hallucination policy for prices, fees, and square footage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                <span>Transparent citation tags referencing exact document and page number</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                <span>Automatic escalation if knowledge base similarity is below 0.70</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-[#111315] border border-[#22262a]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#7fa48b] mb-4">
              <Database className="w-4 h-4" />
              <span>ChromaDB Vector Verification</span>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#0a0b0c] border border-[#1b1e21]">
                <div className="flex justify-between text-[11px] text-[#8c959f] mb-1">
                  <span className="font-semibold text-[#f6f8fa]">Property_Listings.pdf (Page 1)</span>
                  <span className="text-[#22c55e] font-mono">Similarity: 0.94</span>
                </div>
                <p className="text-[11px] text-[#656e77]">"Maple Residency: 3-Bed Luxury Apartment, F-11 Islamabad, 2,450 sq ft, PKR 42M."</p>
              </div>

              <div className="p-3 rounded-lg bg-[#0a0b0c] border border-[#1b1e21]">
                <div className="flex justify-between text-[11px] text-[#8c959f] mb-1">
                  <span className="font-semibold text-[#f6f8fa]">Services_and_Fees.pdf (Page 1)</span>
                  <span className="text-[#22c55e] font-mono">Similarity: 0.93</span>
                </div>
                <p className="text-[11px] text-[#656e77]">"Standard residential brokerage commission: 2% of final contract value."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HUMAN-IN-THE-LOOP & SAFETY BOUNDARIES */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-[#1b1e21]">
        <div className="p-8 rounded-2xl bg-[#17221b]/30 border border-[#24342a] text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#17221b] border border-[#7fa48b] flex items-center justify-center text-[#7fa48b] mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#f6f8fa] mb-2">Human-in-the-Loop Safeguards</h3>
          <p className="text-xs text-[#b0b8c1] leading-relaxed mb-6">
            AI is an assistant, not an unchecked authority. Candidate applications, unknown financial figures, executive meetings, and facility emergencies are automatically routed to the Human Review queue.
          </p>
          <Link
            to="/review"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#17221b] hover:bg-[#24342a] border border-[#7fa48b] text-xs font-semibold text-[#f6f8fa] transition-all"
          >
            <span>Open Human Review Queue</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7fa48b]" />
          </Link>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto border-t border-[#1b1e21]">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f6f8fa] tracking-tight mb-4">
          Ready for Intelligent Triage?
        </h2>
        <p className="text-xs sm:text-sm text-[#8c959f] max-w-xl mx-auto mb-8">
          Review the real-time overview, test the 10 demonstration scenarios, or explore human escalation queues.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-lg bg-[#17221b] hover:bg-[#24342a] border border-[#24342a] hover:border-[#7fa48b] text-sm font-semibold text-[#f6f8fa] transition-all sage-glow-sm"
          >
            Launch Command Center
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1b1e21] py-8 px-6 text-center text-xs text-[#656e77]">
        <p>TRIAGEFLOW AI — Production AI Email Triage & RAG Assistant.</p>
        <p className="text-[11px] text-[#484f57] mt-1">Strict Color Identity: RED • GREY • SAGE • GREEN</p>
      </footer>
    </div>
  );
}
