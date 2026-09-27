import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ShieldAlert,
  Flame,
  Radio
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoryBadge, PriorityBadge } from '../components/ui/Badges.jsx';

export default function UrgentWorkflowPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acknowledged, setAcknowledged] = useState({});

  useEffect(() => {
    fetch('/api/workflows/urgent')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(err => console.error('Failed to load Urgent workflow:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleAcknowledge = (id) => {
    setAcknowledged(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-[#451315] pb-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#451315] border border-[#751b1f] flex items-center justify-center text-[#ef4444] animate-pulse">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#fca5a5] tracking-tight">
              Urgent Alerts Protocol
            </h1>
            <p className="text-xs text-[#8c959f]">
              Critical incident alerts, infrastructure hazards, and high-urgency operations requiring immediate human triage.
            </p>
          </div>
        </div>

        {/* Emergency Broadcast Channel Banner */}
        <div className="p-3.5 rounded-xl bg-[#280c0d] border border-[#451315] flex items-center justify-between mt-4">
          <div className="flex items-center gap-2.5">
            <Radio className="w-4 h-4 text-[#ef4444] animate-pulse" />
            <span className="text-xs font-semibold text-[#fca5a5]">
              Emergency Discord Broadcast Room: #critical-incident-room (Active Webhook)
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#ef4444] bg-[#451315] px-2 py-0.5 rounded border border-[#751b1f]">
            LEVEL-1 CRITICAL
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {loading && (
          <div className="py-12 text-center text-xs text-[#656e77]">Monitoring critical incident stream...</div>
        )}

        {data?.items?.map(item => (
          <div 
            key={item.id}
            className="p-5 rounded-xl bg-[#171011] border border-[#751b1f] red-alert-glow space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#fca5a5]">{item.sender_name}</span>
                <span className="text-xs text-[#8c959f]">&lt;{item.sender_email}&gt;</span>
                <CategoryBadge category={item.category} />
                <PriorityBadge priority="critical" />
              </div>

              <span className="text-xs font-mono text-[#ef4444] font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {item.timestamp ? new Date(item.timestamp).toLocaleString() : ''}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#f6f8fa] mb-1.5">{item.subject}</h3>
              <div className="p-3 rounded-lg bg-[#0a0b0c] border border-[#451315] text-xs text-[#fca5a5]">
                <span className="text-[10px] font-mono uppercase font-bold text-[#ef4444]">Emergency Threat Detection Reason:</span>
                <p className="mt-0.5 leading-relaxed">{item.reason}</p>
              </div>
            </div>

            {/* Emergency Status & Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#451315] text-xs">
              <div className="flex items-center gap-2 text-[#fca5a5]">
                <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
                <span className="font-medium">{item.notification_status}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAcknowledge(item.id)}
                  disabled={acknowledged[item.id]}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    acknowledged[item.id]
                      ? 'bg-[#17221b] border-[#14532b] text-[#86efac]'
                      : 'bg-[#451315] hover:bg-[#751b1f] border-[#751b1f] text-[#f6f8fa]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{acknowledged[item.id] ? 'Incident Acknowledged' : 'Acknowledge Emergency'}</span>
                </button>

                <Link
                  to={`/inbox?id=${item.id}`}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#16181b] hover:bg-[#22262a] border border-[#22262a] text-xs text-[#b0b8c1] hover:text-[#f6f8fa] transition-all"
                >
                  <span>Open in Inbox</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
