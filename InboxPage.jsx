import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Mail, 
  Send, 
  UserCheck, 
  Archive, 
  AlertOctagon, 
  RotateCw, 
  Paperclip, 
  FileText, 
  Database, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ChevronRight,
  Eye,
  CornerDownRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { CategoryBadge, PriorityBadge, ActionBadge } from '../components/ui/Badges.jsx';
import DocumentRelevanceRadar from '../components/DocumentRelevanceRadar.jsx';

export default function InboxPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id');

  const [emails, setEmails] = useState([]);
  const [selectedId, setSelectedId] = useState(initialId || null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRaw, setShowRaw] = useState(false);
  const [actionNotice, setActionNotice] = useState(null);

  // Fetch email list
  const fetchEmails = async () => {
    setLoadingList(true);
    try {
      let url = `/api/emails?category=${categoryFilter}&priority=${priorityFilter}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setEmails(list);
      if (!selectedId && list.length > 0) {
        setSelectedId(list[0].id);
      }
    } catch (err) {
      console.error('Failed to load emails:', err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [categoryFilter, priorityFilter]);

  // Handle search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmails();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch selected email details
  useEffect(() => {
    if (!selectedId) return;
    setLoadingDetail(true);
    fetch(`/api/emails/${selectedId}`)
      .then(res => res.json())
      .then(data => {
        setSelectedEmail(data);
        if (data && typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('triageflow:rag-insight-update', {
            detail: { email_id: data.id }
          }));
        }
      })
      .catch(err => console.error('Failed to load email detail:', err))
      .finally(() => setLoadingDetail(false));
  }, [selectedId]);

  // Actions
  const handleAction = async (actionType) => {
    if (!selectedEmail) return;
    try {
      let endpoint = `/api/emails/${selectedEmail.id}/${actionType}`;
      const res = await fetch(endpoint, { method: 'POST' });
      const data = await res.json();
      setActionNotice(`Action executed: ${actionType}`);
      setTimeout(() => setActionNotice(null), 3500);
      // Reload email detail and list
      fetchEmails();
      const updated = await fetch(`/api/emails/${selectedEmail.id}`);
      setSelectedEmail(await updated.json());
    } catch (err) {
      console.error('Action failed:', err);
    }
  };

  return (
    <div className="h-[calc(100vh-7.5rem)] flex flex-col bg-[#111315] border border-[#22262a] rounded-xl overflow-hidden shadow-2xl">
      {/* Top Filter Bar */}
      <div className="h-14 px-4 bg-[#0d0f11] border-b border-[#1b1e21] flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-[#7fa48b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="inbox-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sender, subject, keywords..."
              className="w-full bg-[#16181b] border border-[#22262a] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#f6f8fa] placeholder-[#656e77] outline-none focus:border-[#7fa48b]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#16181b] border border-[#22262a] rounded-lg px-2.5 py-1.5 text-xs text-[#b0b8c1] outline-none"
          >
            <option value="all">All Categories</option>
            <option value="sales_inquiry">Sales Inquiry</option>
            <option value="general_query">General Query</option>
            <option value="job_application">Job Application</option>
            <option value="project_related">Project Related</option>
            <option value="meeting_request">Meeting Request</option>
            <option value="urgent_request">Critical Alert</option>
            <option value="promotional">Promotional</option>
            <option value="spam">Spam</option>
          </select>

          {/* Priority Filter */}
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#16181b] border border-[#22262a] rounded-lg px-2.5 py-1.5 text-xs text-[#b0b8c1] outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Action Notice Bar */}
      {actionNotice && (
        <div className="px-4 py-2 bg-[#17221b] border-b border-[#14532b] text-xs text-[#86efac] flex items-center justify-between">
          <span>{actionNotice}</span>
          <button onClick={() => setActionNotice(null)} className="text-[#a2c1ac] hover:text-[#f6f8fa]">✕</button>
        </div>
      )}

      {/* Three Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* COLUMN 1: Email List (w-80 or w-96) */}
        <div className="w-80 lg:w-96 border-r border-[#1b1e21] flex flex-col bg-[#0a0b0c] shrink-0">
          <div className="px-3 py-2 border-b border-[#1b1e21] text-[11px] font-mono text-[#656e77] flex justify-between">
            <span>{emails.length} INGESTED MESSAGES</span>
            <span>FILTERED VIEW</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#1b1e21]">
            {loadingList && (
              <div className="divide-y divide-[#1b1e21]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-28 rounded bg-white/10 cinematic-skeleton" />
                      <div className="h-2.5 w-12 rounded bg-white/5 cinematic-skeleton" />
                    </div>
                    <div className="h-3 w-4/5 rounded bg-white/10 cinematic-skeleton" />
                    <div className="flex items-center gap-2 pt-0.5">
                      <div className="h-4 w-16 rounded-full bg-white/5 cinematic-skeleton" />
                      <div className="h-4 w-14 rounded-full bg-white/5 cinematic-skeleton" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loadingList && emails.length === 0 && (
              <div className="p-8 text-center text-xs text-[#656e77]">No emails found for current filter.</div>
            )}

            {emails.map((email) => {
              const isSelected = email.id === selectedId;
              return (
                <div
                  key={email.id}
                  id={`email-item-${email.id}`}
                  onClick={() => {
                    setSelectedId(email.id);
                    setSearchParams({ id: email.id });
                  }}
                  className={`p-3.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#17221b] border-l-2 border-[#22c55e]'
                      : 'hover:bg-[#111315]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-semibold truncate ${isSelected ? 'text-[#f6f8fa]' : 'text-[#d0d7de]'}`}>
                      {email.sender_name || email.sender_email}
                    </span>
                    <span className="text-[10px] font-mono text-[#656e77]">
                      {email.timestamp ? new Date(email.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-[#b0b8c1] truncate mb-2">
                    {email.subject}
                  </p>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <CategoryBadge category={email.category} />
                    <PriorityBadge priority={email.priority} />
                    {email.rag_used && (
                      <span className="text-[10px] font-mono text-[#22c55e] bg-[#0d381c] px-1.5 py-0.2 rounded border border-[#14532b]">
                        RAG
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: Email Detail View */}
        <div className="flex-1 flex flex-col bg-[#0d0f11] overflow-y-auto border-r border-[#1b1e21]">
          {loadingDetail && (
            <div className="p-6 space-y-6">
              {/* Header Info Skeleton */}
              <div className="border-b border-[#1b1e21] pb-5 space-y-3">
                <div className="h-6 w-3/4 rounded bg-white/10 cinematic-skeleton" />
                <div className="flex items-center gap-2">
                  <div className="h-4 w-32 rounded bg-white/10 cinematic-skeleton" />
                  <div className="h-3.5 w-48 rounded bg-white/5 cinematic-skeleton" />
                </div>
                <div className="flex gap-2 pt-1">
                  <div className="h-6 w-24 rounded-full bg-white/5 cinematic-skeleton" />
                  <div className="h-6 w-20 rounded-full bg-white/5 cinematic-skeleton" />
                </div>
              </div>

              {/* Email Body Skeleton */}
              <div className="p-5 rounded-xl bg-[#0a0b0c] border border-[#1b1e21] space-y-3">
                <div className="h-3.5 w-full rounded bg-white/10 cinematic-skeleton" />
                <div className="h-3.5 w-[92%] rounded bg-white/10 cinematic-skeleton" />
                <div className="h-3.5 w-[85%] rounded bg-white/10 cinematic-skeleton" />
                <div className="h-3.5 w-[65%] rounded bg-white/10 cinematic-skeleton" />
                <div className="pt-2 space-y-2">
                  <div className="h-3.5 w-[90%] rounded bg-white/10 cinematic-skeleton" />
                  <div className="h-3.5 w-[78%] rounded bg-white/10 cinematic-skeleton" />
                </div>
              </div>

              {/* Processing Timeline Skeleton */}
              <div className="pt-4 border-t border-[#1b1e21] space-y-2">
                <div className="h-3 w-40 rounded bg-white/10 cinematic-skeleton mb-3" />
                <div className="h-10 w-full rounded-lg bg-[#0a0b0c] border border-[#1b1e21] cinematic-skeleton" />
                <div className="h-10 w-full rounded-lg bg-[#0a0b0c] border border-[#1b1e21] cinematic-skeleton" />
              </div>
            </div>
          )}

          {!loadingDetail && selectedEmail && (
            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div className="border-b border-[#1b1e21] pb-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-[#f6f8fa] tracking-tight mb-2">
                      {selectedEmail.subject}
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap text-xs text-[#b0b8c1]">
                      <span className="font-semibold text-[#f6f8fa]">{selectedEmail.sender_name}</span>
                      <span className="text-[#656e77]">&lt;{selectedEmail.sender_email}&gt;</span>
                      <span className="text-[#656e77]">to</span>
                      <span className="text-[#8c959f]">{selectedEmail.recipient}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[#656e77] shrink-0">
                    {selectedEmail.timestamp ? new Date(selectedEmail.timestamp).toLocaleString() : ''}
                  </span>
                </div>

                {/* Action Bar */}
                <div className="flex items-center gap-2 pt-3 border-t border-[#1b1e21] flex-wrap">
                  <button
                    id="approve-action-btn"
                    onClick={() => handleAction('approve')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#17221b] hover:bg-[#24342a] border border-[#24342a] hover:border-[#7fa48b] text-xs font-semibold text-[#f6f8fa] transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7fa48b]" />
                    <span>Approve Decision</span>
                  </button>

                  <button
                    id="reprocess-action-btn"
                    onClick={() => handleAction('reprocess')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111315] hover:bg-[#16181b] border border-[#22262a] text-xs font-medium text-[#b0b8c1] transition-all"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#7fa48b]" />
                    <span>Reprocess</span>
                  </button>

                  <button
                    id="archive-action-btn"
                    onClick={() => handleAction('archive')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111315] hover:bg-[#16181b] border border-[#22262a] text-xs font-medium text-[#8c959f] hover:text-[#f6f8fa] transition-all"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>Archive</span>
                  </button>

                  <button
                    id="spam-action-btn"
                    onClick={() => handleAction('spam')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171011] hover:bg-[#241315] border border-[#451315] text-xs font-medium text-[#fca5a5] transition-all"
                  >
                    <AlertOctagon className="w-3.5 h-3.5 text-[#ef4444]" />
                    <span>Mark Spam</span>
                  </button>

                  <button
                    onClick={() => setShowRaw(!showRaw)}
                    className="ml-auto text-xs text-[#656e77] hover:text-[#b0b8c1]"
                  >
                    {showRaw ? 'Show Clean Body' : 'View Raw Body'}
                  </button>
                </div>
              </div>

              {/* Attachments Section if present */}
              {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#0a0b0c] border border-[#1b1e21]">
                  <p className="text-[10px] font-mono text-[#656e77] mb-2 uppercase tracking-wider">
                    Attachments ({selectedEmail.attachments.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmail.attachments.map(att => (
                      <div
                        key={att.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111315] border border-[#22262a] text-xs text-[#cadbcd]"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#7fa48b]" />
                        <span className="font-medium">{att.filename}</span>
                        <span className="text-[10px] text-[#656e77]">({(att.size / 1024).toFixed(0)} KB)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Email Body */}
              <div className="p-5 rounded-xl bg-[#0a0b0c] border border-[#1b1e21]">
                {showRaw ? (
                  <pre className="text-xs font-mono text-[#8c959f] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {selectedEmail.raw_body}
                  </pre>
                ) : (
                  <div className="text-xs sm:text-sm text-[#d0d7de] leading-relaxed whitespace-pre-line">
                    {selectedEmail.clean_body}
                  </div>
                )}
              </div>

              {/* Automated / Generated Reply Preview if present */}
              {selectedEmail.generated_reply && (
                <div className="p-4 rounded-xl bg-[#0d1710] border border-[#14532b]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#86efac]">
                      <Send className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span>Automated Grounded Reply Sent</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#22c55e]">Verified via Task 5 RAG</span>
                  </div>
                  <p className="text-xs text-[#cadbcd] whitespace-pre-line leading-relaxed">
                    {selectedEmail.generated_reply}
                  </p>
                </div>
              )}

              {/* Thread History Messages if multi-turn */}
              {selectedEmail.thread_messages && selectedEmail.thread_messages.length > 1 && (
                <div className="space-y-3 pt-4 border-t border-[#1b1e21]">
                  <p className="text-xs font-mono text-[#7fa48b] uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Thread History ({selectedEmail.thread_messages.length} Messages)</span>
                  </p>
                  <div className="space-y-2">
                    {selectedEmail.thread_messages.map(m => (
                      <div 
                        key={m.id} 
                        className={`p-3 rounded-lg border text-xs ${
                          m.is_current ? 'bg-[#17221b] border-[#24342a]' : 'bg-[#0a0b0c] border-[#1b1e21]'
                        }`}
                      >
                        <div className="flex justify-between text-[11px] text-[#8c959f] mb-1">
                          <span className="font-semibold text-[#f6f8fa]">{m.sender_name}</span>
                          <span className="font-mono">{m.timestamp ? new Date(m.timestamp).toLocaleTimeString() : ''}</span>
                        </div>
                        <p className="text-[#b0b8c1] line-clamp-2">{m.clean_body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Processing Timeline */}
              <div className="pt-4 border-t border-[#1b1e21]">
                <p className="text-xs font-mono text-[#656e77] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#7fa48b]" />
                  <span>Processing Lifecycle Timeline</span>
                </p>
                <div className="space-y-2">
                  {selectedEmail.logs && selectedEmail.logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 text-xs p-2 rounded bg-[#0a0b0c] border border-[#1b1e21]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-semibold text-[#a2c1ac] uppercase">
                            {log.event_type.replace(/_/g, ' ')}
                          </span>
                          <span className="text-[10px] font-mono text-[#656e77]">
                            {log.created_at ? new Date(log.created_at).toLocaleTimeString() : ''}
                          </span>
                        </div>
                        <p className="text-[#b0b8c1] text-[11px] mt-0.5">{log.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* COLUMN 3: AI Decision Panel */}
        <div className="w-80 lg:w-88 bg-[#0a0b0c] flex flex-col p-5 overflow-y-auto shrink-0 space-y-5">
          <div className="flex items-center justify-between border-b border-[#1b1e21] pb-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#7fa48b] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#7fa48b]" />
              <span>AI Decision Intelligence</span>
            </h3>
            <span className="text-[10px] font-mono text-[#22c55e] bg-[#0d381c] px-2 py-0.5 rounded border border-[#14532b]">
              GEMINI-3.8-FLASH
            </span>
          </div>

          {loadingDetail && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#111315] border border-[#22262a] space-y-2">
                <div className="h-2.5 w-24 rounded bg-white/10 cinematic-skeleton" />
                <div className="flex justify-between items-center pt-1">
                  <div className="h-5 w-28 rounded-full bg-white/5 cinematic-skeleton" />
                  <div className="h-4 w-10 rounded bg-white/10 cinematic-skeleton" />
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111315] border border-[#22262a] space-y-2">
                <div className="h-2.5 w-24 rounded bg-white/10 cinematic-skeleton" />
                <div className="h-5 w-20 rounded-full bg-white/5 cinematic-skeleton" />
              </div>
              <div className="p-3.5 rounded-xl bg-[#111315] border border-[#22262a] space-y-2">
                <div className="h-2.5 w-24 rounded bg-white/10 cinematic-skeleton" />
                <div className="h-5 w-32 rounded bg-white/5 cinematic-skeleton" />
              </div>
              <div className="p-3.5 rounded-xl bg-[#17221b]/40 border border-[#24342a] space-y-2">
                <div className="h-2.5 w-20 rounded bg-white/10 cinematic-skeleton" />
                <div className="h-3 w-full rounded bg-white/5 cinematic-skeleton" />
                <div className="h-3 w-4/5 rounded bg-white/5 cinematic-skeleton" />
              </div>
            </div>
          )}

          {!loadingDetail && selectedEmail && (
            <div className="space-y-4 text-xs">
              {/* Classification & Confidence */}
              <div className="p-3.5 rounded-xl bg-[#111315] border border-[#22262a]">
                <span className="text-[10px] font-mono text-[#656e77] uppercase">Category Classification</span>
                <div className="mt-1.5 flex items-center justify-between">
                  <CategoryBadge category={selectedEmail.category} />
                  <span className="text-sm font-bold font-mono text-[#f6f8fa]">
                    {(selectedEmail.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Priority */}
              <div className="p-3.5 rounded-xl bg-[#111315] border border-[#22262a]">
                <span className="text-[10px] font-mono text-[#656e77] uppercase">Priority Assessment</span>
                <div className="mt-1.5">
                  <PriorityBadge priority={selectedEmail.priority} />
                </div>
              </div>

              {/* Recommended Action */}
              <div className="p-3.5 rounded-xl bg-[#111315] border border-[#22262a]">
                <span className="text-[10px] font-mono text-[#656e77] uppercase">Recommended Action</span>
                <div className="mt-1.5">
                  <ActionBadge action={selectedEmail.recommended_action} />
                </div>
              </div>

              {/* Decision Reason */}
              <div className="p-3.5 rounded-xl bg-[#17221b]/40 border border-[#24342a]">
                <span className="text-[10px] font-mono text-[#7fa48b] uppercase font-semibold">Decision Reason</span>
                <p className="text-xs text-[#cadbcd] leading-relaxed mt-1">
                  {selectedEmail.reason}
                </p>
              </div>

              {/* RAG Citations & Relevance Radar if used */}
              {selectedEmail.rag_used && (
                <>
                  <DocumentRelevanceRadar 
                    emailId={selectedEmail.id}
                    title="Grounded Document Relevance"
                    compact={false}
                    className="bg-[#0d1710] border-[#14532b]"
                  />

                  <div className="p-3.5 rounded-xl bg-[#0d1710] border border-[#14532b]">
                    <span className="text-[10px] font-mono text-[#22c55e] uppercase font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Grounded RAG Sources</span>
                    </span>
                  <div className="mt-2 space-y-1.5">
                    {(() => {
                      try {
                        const sources = JSON.parse(selectedEmail.rag_sources || '[]');
                        return sources.map((s, idx) => (
                          <div key={idx} className="text-[11px] text-[#cadbcd] p-2 rounded bg-[#0a0b0c] border border-[#14532b]">
                            <p className="font-semibold text-[#f6f8fa]">{s.document_name} (p.{s.page_number})</p>
                            <p className="text-[10px] font-mono text-[#22c55e]">Score: {s.similarity_score}</p>
                          </div>
                        ));
                      } catch {
                        return <span className="text-[10px] text-[#656e77]">Direct document match</span>;
                      }
                    })()}
                  </div>
                </div>
              </>
            )}

              {/* Discord Notification Status */}
              <div className="p-3.5 rounded-xl bg-[#111315] border border-[#22262a]">
                <span className="text-[10px] font-mono text-[#656e77] uppercase">Discord Alert Notification</span>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[#b0b8c1] capitalize">{selectedEmail.discord_status}</span>
                  {selectedEmail.discord_status === 'sent' && (
                    <span className="text-[10px] font-mono text-[#22c55e] bg-[#0d381c] px-2 py-0.5 rounded border border-[#14532b]">
                      Dispatched
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
