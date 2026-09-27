import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  UserCheck, 
  Clock, 
  Users, 
  Briefcase, 
  AlertTriangle, 
  Database, 
  Settings, 
  ShieldCheck,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import DocumentRelevanceRadar from '../DocumentRelevanceRadar.jsx';

export default function Sidebar({ isOpen, onClose }) {
  const [counts, setCounts] = useState({ review: 3, urgent: 1, total: 10 });

  useEffect(() => {
    fetch('/api/review')
      .then(res => res.json())
      .then(data => {
        if (data?.counts) {
          setCounts(prev => ({ ...prev, review: data.counts.all }));
        }
      })
      .catch(() => {});
  }, []);

  const navItemClass = ({ isActive }) =>
    `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
      isActive
        ? 'bg-[#17221b] text-[#f6f8fa] border-l-2 border-[#22c55e] shadow-sm font-semibold'
        : 'text-[#8c959f] hover:text-[#f6f8fa] hover:bg-[#16181b]'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[#0a0b0c]/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0d0f11] border-r border-[#1b1e21] flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-[#1b1e21] flex items-center justify-between">
          <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#17221b] border border-[#24342a] flex items-center justify-center text-[#7fa48b] group-hover:border-[#7fa48b] transition-colors">
              <Sparkles className="w-4 h-4 text-[#7fa48b]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-[#f6f8fa]">TRIAGEFLOW</span>
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-[#17221b] text-[#7fa48b] border border-[#24342a]">AI</span>
              </div>
              <p className="text-[10px] text-[#656e77] leading-none mt-0.5">Email Intelligence Layer</p>
            </div>
          </NavLink>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* EMAIL INTELLIGENCE */}
          <div>
            <p className="px-3 mb-2 text-[10px] font-semibold tracking-wider text-[#656e77] uppercase">
              Email Intelligence
            </p>
            <nav className="space-y-1">
              <NavLink id="nav-dashboard" to="/dashboard" className={navItemClass} onClick={onClose}>
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 text-[#7fa48b]" />
                  <span>Dashboard</span>
                </div>
              </NavLink>

              <NavLink id="nav-inbox" to="/inbox" className={navItemClass} onClick={onClose}>
                <div className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4 text-[#7fa48b]" />
                  <span>Inbox Intelligence</span>
                </div>
                <span className="px-1.5 py-0.2 text-[10px] font-mono rounded bg-[#16181b] text-[#b0b8c1] border border-[#22262a]">
                  10
                </span>
              </NavLink>

              <NavLink id="nav-review" to="/review" className={navItemClass} onClick={onClose}>
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-[#7fa48b]" />
                  <span>Human Review</span>
                </div>
                {counts.review > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-mono rounded bg-[#17221b] text-[#86efac] border border-[#14532b]">
                    {counts.review}
                  </span>
                )}
              </NavLink>

              <NavLink id="nav-activity" to="/activity" className={navItemClass} onClick={onClose}>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#7fa48b]" />
                  <span>Activity Log</span>
                </div>
              </NavLink>
            </nav>
          </div>

          <div className="border-t border-[#1b1e21]" />

          {/* WORKFLOWS */}
          <div>
            <p className="px-3 mb-2 text-[10px] font-semibold tracking-wider text-[#656e77] uppercase">
              Automated Workflows
            </p>
            <nav className="space-y-1">
              <NavLink id="nav-workflow-hr" to="/workflows/hr" className={navItemClass} onClick={onClose}>
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#a2c1ac]" />
                  <span>HR Routing</span>
                </div>
              </NavLink>

              <NavLink id="nav-workflow-manager" to="/workflows/manager" className={navItemClass} onClick={onClose}>
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-[#cadbcd]" />
                  <span>Manager Routing</span>
                </div>
              </NavLink>

              <NavLink id="nav-workflow-urgent" to="/workflows/urgent" className={navItemClass} onClick={onClose}>
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
                  <span className="text-[#fca5a5]">Urgent Alerts</span>
                </div>
                <span className="px-1.5 py-0.2 text-[10px] font-mono rounded bg-[#451315] text-[#fca5a5] border border-[#751b1f] animate-pulse">
                  1
                </span>
              </NavLink>
            </nav>
          </div>

          <div className="border-t border-[#1b1e21]" />

          {/* KNOWLEDGE & SYSTEM */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-3">
              <p className="text-[10px] font-semibold tracking-wider text-[#656e77] uppercase">
                Grounding & Config
              </p>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#17221b] text-[#7fa48b] border border-[#24342a]">
                RAG ACTIVE
              </span>
            </div>

            <nav className="space-y-1">
              <div className="flex items-center justify-between px-3 py-2 rounded-lg text-xs bg-[#111315] border border-[#1b1e21]">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#7fa48b]" />
                  <span className="text-xs text-[#b0b8c1]">Task 5 Chroma RAG</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" title="Active & Grounded" />
              </div>

              <NavLink id="nav-settings" to="/settings" className={navItemClass} onClick={onClose}>
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-[#8c959f]" />
                  <span>Settings & System</span>
                </div>
              </NavLink>
            </nav>

            {/* Document Relevance Radar for Currently Retrieved Insights */}
            <div id="sidebar-document-relevance-radar" className="pt-1">
              <DocumentRelevanceRadar 
                compact={true}
                title="Corpus Relevance"
                className="bg-[#0f1114] border-[#22272b] shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* User Footer Profile */}
        <div className="p-3 border-t border-[#1b1e21] bg-[#0a0b0c]">
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#111315] border border-[#1b1e21]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#17221b] border border-[#24342a] flex items-center justify-center text-xs font-bold text-[#7fa48b]">
                TA
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#f6f8fa] truncate">Talha</p>
                <p className="text-[10px] text-[#656e77] truncate">Workspace Admin</p>
              </div>
            </div>
            <ShieldCheck className="w-4 h-4 text-[#7fa48b] shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
