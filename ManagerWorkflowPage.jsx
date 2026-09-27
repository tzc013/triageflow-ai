import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  MessageSquare,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoryBadge, PriorityBadge } from '../components/ui/Badges.jsx';

export default function ManagerWorkflowPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/workflows/manager')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(err => console.error('Failed to load Manager workflow:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-[#1b1e21] pb-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#17221b] border border-[#354b3d] flex items-center justify-center text-[#cadbcd]">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#f6f8fa] tracking-tight">
              Manager Routing Workflow
            </h1>
            <p className="text-xs text-[#8c959f]">
              Project milestone updates, scope revisions, contractor reports, and stakeholder escalations.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {loading && (
          <div className="py-12 text-center text-xs text-[#656e77]">Loading manager updates stream...</div>
        )}

        {data?.items?.map(item => (
          <div 
            key={item.id}
            className="p-5 rounded-xl bg-[#111315] border border-[#22262a] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#f6f8fa]">{item.sender_name}</span>
                <span className="text-xs text-[#656e77]">&lt;{item.sender_email}&gt;</span>
                <CategoryBadge category={item.category} />
                <PriorityBadge priority={item.priority} />
              </div>

              <span className="text-xs font-mono text-[#656e77]">
                {item.timestamp ? new Date(item.timestamp).toLocaleString() : ''}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#f6f8fa] mb-1">{item.subject}</h3>
              <div className="p-3 rounded-lg bg-[#0a0b0c] border border-[#1b1e21] text-xs text-[#b0b8c1]">
                <span className="text-[10px] font-mono text-[#7fa48b] uppercase font-semibold">Manager Escalation Reason:</span>
                <p className="mt-0.5 text-[#cadbcd]">{item.reason}</p>
              </div>
            </div>

            {/* Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1b1e21] text-xs">
              <div className="flex items-center gap-3">
                <span className="text-[#a2c1ac] flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                  {item.forwarding_status}
                </span>
                <span className="text-[#7fa48b] font-mono text-[11px]">
                  Discord: #management-alerts (Broadcast)
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
