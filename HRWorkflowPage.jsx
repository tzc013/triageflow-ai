import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Paperclip, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  ExternalLink,
  MessageSquare,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HRWorkflowPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/workflows/hr')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(err => console.error('Failed to load HR workflow:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-[#1b1e21] pb-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#0d381c] border border-[#14532b] flex items-center justify-center text-[#86efac]">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#f6f8fa] tracking-tight">
              HR Routing Workflow
            </h1>
            <p className="text-xs text-[#8c959f]">
              Candidate applications automatically isolated and forwarded to hiring talent teams.
            </p>
          </div>
        </div>

        {/* AI Policy Banner */}
        <div className="p-3.5 rounded-xl bg-[#17221b]/40 border border-[#24342a] flex items-start gap-3 mt-4">
          <Lock className="w-5 h-5 text-[#7fa48b] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-[#f6f8fa]">Strict Ethical AI Hiring Policy Enforced:</span>
            <p className="text-[#cadbcd] mt-0.5 leading-relaxed">
              TRIAGEFLOW AI NEVER evaluates, ranks, scores, or makes rejection decisions on candidates. All employment inquiries and resumes are preserved in full fidelity and forwarded directly to human HR recruiters.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {loading && (
          <div className="py-12 text-center text-xs text-[#656e77]">Loading HR applications stream...</div>
        )}

        {data?.items?.map(item => (
          <div 
            key={item.id}
            className="p-5 rounded-xl bg-[#111315] border border-[#22262a] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-[#86efac] bg-[#0d381c] px-2 py-0.5 rounded border border-[#14532b]">
                  {item.position}
                </span>
                <h3 className="text-base font-bold text-[#f6f8fa] mt-1.5">{item.candidate}</h3>
                <p className="text-xs text-[#656e77]">{item.email}</p>
              </div>

              <div className="text-right text-xs text-[#656e77] font-mono">
                {item.timestamp ? new Date(item.timestamp).toLocaleString() : ''}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0a0b0c] border border-[#1b1e21] text-xs">
              <span className="text-[10px] font-mono text-[#656e77] uppercase">Subject:</span>
              <p className="font-medium text-[#d0d7de]">{item.subject}</p>
            </div>

            {/* Attachments */}
            {item.attachments && item.attachments.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[#8c959f] flex items-center gap-1">
                  <Paperclip className="w-3.5 h-3.5 text-[#7fa48b]" />
                  <span>Resume / Portfolio:</span>
                </span>
                {item.attachments.map((file, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#17221b] border border-[#24342a] text-xs text-[#86efac] font-medium flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    {file}
                  </span>
                ))}
              </div>
            )}

            {/* Status & Forwarding */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1b1e21] text-xs">
              <div className="flex items-center gap-3">
                <span className="text-[#a2c1ac] flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                  {item.forwarding_status}
                </span>
                <span className="text-[#7fa48b] font-mono text-[11px]">
                  Discord: #talent-alerts (Delivered)
                </span>
              </div>

              <Link
                to={`/inbox?id=${item.id}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#16181b] hover:bg-[#22262a] border border-[#22262a] text-xs text-[#b0b8c1] hover:text-[#f6f8fa] transition-all"
              >
                <span>Inspect in Inbox</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
