import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Mail, 
  Database, 
  Radio, 
  Sliders, 
  RotateCw, 
  CheckCircle2, 
  ShieldCheck,
  Server
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoToggling, setDemoToggling] = useState(false);
  const [saveNotice, setSaveNotice] = useState(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleToggleDemo = async () => {
    setDemoToggling(true);
    try {
      const res = await fetch('/api/settings/toggle-demo', { method: 'POST' });
      const data = await res.json();
      setSaveNotice(data.message);
      setTimeout(() => setSaveNotice(null), 3000);
      fetchSettings();
    } catch (err) {
      console.error('Failed to toggle demo mode:', err);
    } finally {
      setDemoToggling(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-[#1b1e21] pb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-[#f6f8fa] tracking-tight flex items-center gap-2.5">
          <SettingsIcon className="w-6 h-6 text-[#7fa48b]" />
          <span>System Settings & Operational Integrations</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#8c959f] mt-1">
          Review model parameters, knowledge base connections, notification webhooks, and automation thresholds.
        </p>
      </div>

      {saveNotice && (
        <div className="px-4 py-2.5 rounded-lg bg-[#17221b] border border-[#14532b] text-xs text-[#86efac] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
          <span>{saveNotice}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* SECTION 1: AI Model Configuration */}
        <div className="p-5 rounded-xl bg-[#111315] border border-[#22262a] space-y-3">
          <div className="flex items-center justify-between border-b border-[#1b1e21] pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#7fa48b]" />
              <h2 className="text-sm font-semibold text-[#f6f8fa]">AI Intelligence Model</h2>
            </div>
            <span className="text-[10px] font-mono text-[#22c55e] bg-[#0d381c] px-2 py-0.5 rounded border border-[#14532b]">
              OPERATIONAL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div>
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Provider</span>
              <p className="font-medium text-[#f6f8fa] mt-0.5">{settings?.ai?.provider || 'Google Gemini'}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Primary Model Alias</span>
              <p className="font-mono text-[#a2c1ac] mt-0.5">{settings?.ai?.model || 'gemini-3.8-flash'}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Integration Status</span>
              <p className="text-[#cadbcd] mt-0.5">{settings?.ai?.status || 'Connected (server-side proxy)'}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Sampling Temperature</span>
              <p className="font-mono text-[#f6f8fa] mt-0.5">{settings?.ai?.temperature ?? 0.1} (Strict Grounding)</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Task 5 Knowledge Base (ChromaDB) */}
        <div className="p-5 rounded-xl bg-[#111315] border border-[#22262a] space-y-3">
          <div className="flex items-center justify-between border-b border-[#1b1e21] pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#7fa48b]" />
              <h2 className="text-sm font-semibold text-[#f6f8fa]">Task 5 Grounded RAG Knowledge Base</h2>
            </div>
            <span className="text-[10px] font-mono text-[#22c55e] bg-[#0d381c] px-2 py-0.5 rounded border border-[#14532b]">
              CONNECTED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div>
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Vector Engine</span>
              <p className="font-medium text-[#f6f8fa] mt-0.5">{settings?.rag_integration?.vector_store || 'ChromaDB'}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Authoritative Company Documents</span>
              <p className="font-mono text-[#7fa48b] mt-0.5">{settings?.rag_integration?.documents_indexed || 5} Documents Verified</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Retrieval Similarity Cutoff</span>
              <p className="font-mono text-[#f6f8fa] mt-0.5">{settings?.thresholds?.rag_threshold ?? 0.70}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Hallucination Policy</span>
              <p className="text-[#cadbcd] mt-0.5">Strict (Escalate if missing in KB)</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Notification Webhooks (Discord) */}
        <div className="p-5 rounded-xl bg-[#111315] border border-[#22262a] space-y-3">
          <div className="flex items-center justify-between border-b border-[#1b1e21] pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#7fa48b]" />
              <h2 className="text-sm font-semibold text-[#f6f8fa]">Discord Escalation Channels</h2>
            </div>
            <span className="text-[10px] font-mono text-[#22c55e] bg-[#0d381c] px-2 py-0.5 rounded border border-[#14532b]">
              ACTIVE
            </span>
          </div>

          <div className="space-y-2 text-xs pt-1">
            <div className="flex items-center justify-between p-2.5 rounded bg-[#0a0b0c] border border-[#1b1e21]">
              <div>
                <span className="font-semibold text-[#f6f8fa]">HR Applications Webhook</span>
                <p className="text-[11px] text-[#656e77]">Dispatches candidate notifications to recruitment specialists</p>
              </div>
              <span className="font-mono text-[#86efac]">{settings?.discord?.hr_channel || '#talent-alerts'}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-[#0a0b0c] border border-[#1b1e21]">
              <div>
                <span className="font-semibold text-[#f6f8fa]">Project Manager Alerts</span>
                <p className="text-[11px] text-[#656e77]">Routes milestone changes and contractor amendments</p>
              </div>
              <span className="font-mono text-[#cadbcd]">{settings?.discord?.manager_channel || '#management-alerts'}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-[#171011] border border-[#451315]">
              <div>
                <span className="font-semibold text-[#fca5a5]">Urgent Facility Incidents Webhook</span>
                <p className="text-[11px] text-[#8c959f]">Immediate broadcast for equipment failure or structural hazard</p>
              </div>
              <span className="font-mono text-[#ef4444] font-bold">{settings?.discord?.urgent_channel || '#critical-incident-room'}</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: Thresholds */}
        <div className="p-5 rounded-xl bg-[#111315] border border-[#22262a] space-y-3">
          <div className="flex items-center gap-2 border-b border-[#1b1e21] pb-3">
            <Sliders className="w-4 h-4 text-[#7fa48b]" />
            <h2 className="text-sm font-semibold text-[#f6f8fa]">Decision Thresholds</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
            <div className="p-3 rounded-lg bg-[#0a0b0c] border border-[#1b1e21]">
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Min Confidence</span>
              <p className="text-base font-bold font-mono text-[#f6f8fa] mt-1">
                {(settings?.thresholds?.confidence_threshold * 100).toFixed(0)}%
              </p>
              <p className="text-[10px] text-[#656e77] mt-0.5">Below this triggers human review</p>
            </div>

            <div className="p-3 rounded-lg bg-[#0a0b0c] border border-[#1b1e21]">
              <span className="text-[10px] font-mono text-[#656e77] uppercase">RAG Similarity Min</span>
              <p className="text-base font-bold font-mono text-[#22c55e] mt-1">
                {(settings?.thresholds?.rag_threshold * 100).toFixed(0)}%
              </p>
              <p className="text-[10px] text-[#656e77] mt-0.5">Required for grounded response</p>
            </div>

            <div className="p-3 rounded-lg bg-[#0a0b0c] border border-[#1b1e21]">
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Spam Threshold</span>
              <p className="text-base font-bold font-mono text-[#ef4444] mt-1">
                {(settings?.thresholds?.spam_threshold * 100).toFixed(0)}%
              </p>
              <p className="text-[10px] text-[#656e77] mt-0.5">Auto-flag as spam/phishing</p>
            </div>
          </div>
        </div>

        {/* SECTION 5: Demo Mode & Database Reset */}
        <div className="p-5 rounded-xl bg-[#111315] border border-[#22262a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[#f6f8fa]">Demo Mode Foundation</h3>
            <p className="text-xs text-[#8c959f] mt-0.5">
              Toggles demonstration dataset in SQLite with 10 pre-configured evaluation scenarios.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="toggle-demo-btn"
              onClick={handleToggleDemo}
              disabled={demoToggling}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                settings?.demo_mode?.enabled
                  ? 'bg-[#17221b] border-[#14532b] text-[#86efac]'
                  : 'bg-[#16181b] border-[#22262a] text-[#b0b8c1]'
              }`}
            >
              {settings?.demo_mode?.enabled ? 'Demo Mode Active' : 'Enable Demo Mode'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
