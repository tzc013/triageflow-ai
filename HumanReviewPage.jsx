import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  Send, 
  Edit3, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoryBadge, PriorityBadge, ActionBadge } from '../components/ui/Badges.jsx';

export default function HumanReviewPage() {
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({ all: 0, needs_review: 0, low_confidence: 0, high_importance: 0, awaiting_approval: 0 });
  const [selectedBucket, setSelectedBucket] = useState('all');
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);

  // Edit reply modal state
  const [editingItem, setEditingItem] = useState(null);
  const [replyText, setReplyText] = useState('');

  const fetchReviewItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/review');
      const data = await res.json();
      setItems(data.items || []);
      setCounts(data.counts || {});
    } catch (err) {
      console.error('Failed to load review items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewItems();
  }, []);

  const handleResolve = async (emailId, action) => {
    try {
      await fetch(`/api/review/${emailId}/resolve?action=${action}`, { method: 'POST' });
      setNotice(`Item ${emailId} marked as ${action}`);
      setTimeout(() => setNotice(null), 3000);
      fetchReviewItems();
    } catch (err) {
      console.error('Resolve failed:', err);
    }
  };

  const filteredItems = selectedBucket === 'all' 
    ? items 
    : items.filter(i => i.bucket === selectedBucket);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b1e21] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#f6f8fa] tracking-tight flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-[#7fa48b]" />
            <span>Human Review Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#8c959f] mt-1">
            Carefully inspect escalated emails, low-confidence classifications, and high-stakes operations.
          </p>
        </div>

        <button
          onClick={fetchReviewItems}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111315] hover:bg-[#16181b] border border-[#22262a] text-xs font-medium text-[#b0b8c1] transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#7fa48b]' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {notice && (
        <div className="px-4 py-2.5 rounded-lg bg-[#17221b] border border-[#14532b] text-xs text-[#86efac] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-[#a2c1ac]">✕</button>
        </div>
      )}

      {/* Queue Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1b1e21] pb-3">
        {[
          { id: 'all', label: 'All Items', count: counts.all },
          { id: 'needs_review', label: 'Needs Review', count: counts.needs_review },
          { id: 'low_confidence', label: 'Low Confidence (<85%)', count: counts.low_confidence },
          { id: 'high_importance', label: 'High Importance / Urgent', count: counts.high_importance },
          { id: 'awaiting_approval', label: 'Awaiting Approval', count: counts.awaiting_approval },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedBucket(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedBucket === tab.id
                ? 'bg-[#17221b] text-[#f6f8fa] border border-[#7fa48b] font-semibold'
                : 'bg-[#111315] text-[#8c959f] border border-[#22262a] hover:text-[#f6f8fa]'
            }`}
          >
            <span>{tab.label}</span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-[#0a0b0c] text-[#7fa48b]">
              {tab.count || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Review Items List */}
      <div className="space-y-4">
        {loading && (
          <div className="py-16 text-center text-xs text-[#656e77]">Loading human review queue...</div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="py-16 text-center rounded-xl bg-[#111315] border border-[#22262a] p-8">
            <CheckCircle2 className="w-10 h-10 text-[#22c55e] mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[#f6f8fa]">Queue Clear</h3>
            <p className="text-xs text-[#8c959f] mt-1 max-w-sm mx-auto">
              All emails requiring human intervention have been successfully reviewed and resolved.
            </p>
          </div>
        )}

        {filteredItems.map(item => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-[#111315] border border-[#22262a] hover:border-[#354b3d] transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-[#f6f8fa]">{item.sender_name}</span>
                <span className="text-xs text-[#656e77]">&lt;{item.sender_email}&gt;</span>
                <CategoryBadge category={item.category} />
                <PriorityBadge priority={item.priority} />
              </div>

              <div className="flex items-center gap-3 text-xs text-[#656e77]">
                <span className="font-mono">
                  Confidence: <strong className="text-[#f6f8fa]">{(item.confidence * 100).toFixed(0)}%</strong>
                </span>
                <span className="font-mono">
                  {item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : ''}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#f6f8fa] mb-1">{item.subject}</h3>
              <p className="text-xs text-[#b0b8c1] line-clamp-2 leading-relaxed">{item.clean_body}</p>
            </div>

            {/* AI Reasoning Box */}
            <div className="p-3 rounded-lg bg-[#0a0b0c] border border-[#1b1e21] text-xs">
              <span className="text-[10px] font-mono text-[#7fa48b] uppercase font-semibold">Why AI Escalated to Human:</span>
              <p className="text-[#cadbcd] mt-0.5">{item.reason}</p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1b1e21]">
              <div className="flex items-center gap-2">
                <ActionBadge action={item.recommended_action} />
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/inbox?id=${item.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111315] hover:bg-[#16181b] border border-[#22262a] text-xs font-medium text-[#b0b8c1] hover:text-[#f6f8fa] transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Inspect in Inbox</span>
                </Link>

                <button
                  onClick={() => handleResolve(item.id, 'rejected')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171011] hover:bg-[#241315] border border-[#451315] text-xs font-medium text-[#fca5a5] transition-all"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>

                <button
                  onClick={() => handleResolve(item.id, 'approved')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#17221b] hover:bg-[#24342a] border border-[#24342a] hover:border-[#7fa48b] text-xs font-semibold text-[#f6f8fa] transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7fa48b]" />
                  <span>Approve & Complete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
