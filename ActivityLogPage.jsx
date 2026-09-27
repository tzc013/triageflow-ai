import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Search, 
  Filter, 
  Database, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoryBadge, PriorityBadge, ActionBadge } from '../components/ui/Badges.jsx';

export default function ActivityLogPage() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      let url = `/api/emails?category=${category}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      const res = await fetch(url);
      const data = await res.json();
      setEmails(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load activity logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [category]);

  useEffect(() => {
    const timer = setTimeout(() => fetchLogs(), 250);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b1e21] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#f6f8fa] tracking-tight flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-[#7fa48b]" />
            <span>Audit & Activity Log</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#8c959f] mt-1">
            Complete immutable audit trail of email ingestions, classifications, decisions, and system routing.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111315] hover:bg-[#16181b] border border-[#22262a] text-xs font-medium text-[#b0b8c1] transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#7fa48b]' : ''}`} />
          <span>Refresh Trail</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[#111315] border border-[#22262a]">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-[#7fa48b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="audit-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by sender, subject, decision..."
            className="w-full bg-[#16181b] border border-[#22262a] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#f6f8fa] placeholder-[#656e77] outline-none focus:border-[#7fa48b]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            id="audit-category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-auto bg-[#16181b] border border-[#22262a] rounded-lg px-3 py-1.5 text-xs text-[#b0b8c1] outline-none"
          >
            <option value="all">All Event Categories</option>
            <option value="sales_inquiry">Sales Inquiry</option>
            <option value="general_query">General Query</option>
            <option value="job_application">Job Application</option>
            <option value="project_related">Project Related</option>
            <option value="meeting_request">Meeting Request</option>
            <option value="urgent_request">Critical Alert</option>
            <option value="promotional">Promotional</option>
            <option value="spam">Spam</option>
          </select>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-[#111315] border border-[#22262a] rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0d0f11] text-[#656e77] font-mono text-[10px] uppercase border-b border-[#1b1e21]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Sender</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Decision Action</th>
                <th className="py-3 px-4">Grounding</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1e21] text-[#b0b8c1]">
              {loading && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#656e77]">
                    Loading audit events...
                  </td>
                </tr>
              )}

              {!loading && emails.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#656e77]">
                    No audit records matching your criteria.
                  </td>
                </tr>
              )}

              {emails.map((email) => (
                <tr key={email.id} className="hover:bg-[#16181b] transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#656e77] whitespace-nowrap">
                    {email.timestamp ? new Date(email.timestamp).toLocaleTimeString() : 'Recent'}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#f6f8fa] whitespace-nowrap">
                    {email.sender_name || email.sender_email}
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-[#d0d7de]">
                    {email.subject}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <CategoryBadge category={email.category} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PriorityBadge priority={email.priority} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <ActionBadge action={email.recommended_action} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {email.rag_used ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#22c55e]">
                        <Database className="w-3 h-3" />
                        ChromaDB
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[#656e77]">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="capitalize font-mono text-[11px] text-[#8c959f]">
                      {email.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <Link
                      to={`/inbox?id=${email.id}`}
                      className="p-1.5 rounded hover:bg-[#22262a] text-[#7fa48b] hover:text-[#f6f8fa] inline-block"
                      title="Inspect Email"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
