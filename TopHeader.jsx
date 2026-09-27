import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  ShieldCheck, 
  RotateCw, 
  CheckCircle2, 
  HelpCircle,
  Play
} from 'lucide-react';

const PAGE_TITLES = {
  '/dashboard': { title: 'Intelligence Overview', breadcrumb: 'Email Intelligence / Dashboard' },
  '/inbox': { title: 'Inbox Intelligence', breadcrumb: 'Email Intelligence / Ingested Threads' },
  '/review': { title: 'Human Review Center', breadcrumb: 'Email Intelligence / Review Queue' },
  '/activity': { title: 'Audit & Activity Log', breadcrumb: 'Email Intelligence / Audit Trail' },
  '/workflows/hr': { title: 'HR Routing Workflow', breadcrumb: 'Workflows / Job Applications' },
  '/workflows/manager': { title: 'Manager Routing Workflow', breadcrumb: 'Workflows / Project & Escalations' },
  '/workflows/urgent': { title: 'Urgent Alerts Protocol', breadcrumb: 'Workflows / Critical Incidents' },
  '/settings': { title: 'System Configuration', breadcrumb: 'Settings / Integration & Rules' },
};

export default function TopHeader({ onOpenMobileMenu, onOpenSearch }) {
  const location = useLocation();
  const [reloading, setReloading] = useState(false);
  const [demoNotice, setDemoNotice] = useState(false);

  const pageInfo = PAGE_TITLES[location.pathname] || {
    title: 'Command Center',
    breadcrumb: 'Email Intelligence'
  };

  const handleReloadDemo = async () => {
    setReloading(true);
    try {
      await fetch('/api/emails/seed-demo', { method: 'POST' });
      setDemoNotice(true);
      setTimeout(() => setDemoNotice(false), 3000);
      window.location.reload();
    } catch (err) {
      console.error('Seed demo error:', err);
    } finally {
      setReloading(false);
    }
  };

  return (
    <header 
      id="top-header"
      className="sticky top-0 z-30 h-16 bg-[#0a0b0c]/90 backdrop-blur-md border-b border-[#1b1e21] px-4 lg:px-6 flex items-center justify-between"
    >
      {/* Left: Mobile Menu + Breadcrumb & Title */}
      <div className="flex items-center gap-3">
        <button
          id="mobile-menu-btn"
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg text-[#8c959f] hover:text-[#f6f8fa] hover:bg-[#16181b] lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <p className="text-[10px] font-mono text-[#656e77] uppercase tracking-wider">
            {pageInfo.breadcrumb}
          </p>
          <h1 className="text-base font-semibold text-[#f6f8fa] tracking-tight">
            {pageInfo.title}
          </h1>
        </div>
      </div>

      {/* Right: Search, Status, Reload Demo, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Bar trigger */}
        <button
          id="global-search-btn"
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111315] border border-[#22262a] text-[#8c959f] hover:text-[#f6f8fa] hover:border-[#354b3d] text-xs transition-all shadow-inner"
        >
          <Search className="w-3.5 h-3.5 text-[#7fa48b]" />
          <span>Search emails, rules, logs...</span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#16181b] border border-[#22262a] text-[#656e77]">
            ⌘K
          </kbd>
        </button>

        {/* Demo Mode Badge with Quick Reload */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#17221b] border border-[#24342a] text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-[11px] font-semibold text-[#a2c1ac] hidden md:inline">Demo Active</span>
          <button
            id="reload-demo-btn"
            onClick={handleReloadDemo}
            disabled={reloading}
            title="Reset & Reload 10 Demonstration Scenarios"
            className="p-1 rounded text-[#7fa48b] hover:text-[#f6f8fa] hover:bg-[#24342a] transition-all ml-1"
          >
            <RotateCw className={`w-3 h-3 ${reloading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Live System Health Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111315] border border-[#1b1e21] text-[11px] text-[#b0b8c1]">
          <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
          <span>SYSTEM OPERATIONAL</span>
        </div>

        {demoNotice && (
          <div className="absolute top-16 right-6 px-3 py-2 rounded-lg bg-[#17221b] border border-[#14532b] text-xs text-[#86efac] shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
            <span>Demo dataset reloaded in SQLite!</span>
          </div>
        )}
      </div>
    </header>
  );
}
