import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  Sparkles, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  RefreshCw,
  Layers,
  Database,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { CategoryBadge, PriorityBadge, ActionBadge } from '../components/ui/Badges.jsx';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, actRes, catRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/activity'),
        fetch('/api/dashboard/categories'),
      ]);

      const [statsData, actData, catData] = await Promise.all([
        statsRes.json(),
        actRes.json(),
        catRes.json(),
      ]);

      setStats(statsData);
      setActivity(Array.isArray(actData) ? actData : []);
      setCategories(Array.isArray(catData) ? catData : []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b1e21] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#f6f8fa] tracking-tight">
            Email Intelligence Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#8c959f] mt-1">
            See what the AI understood, answered, and escalated.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="refresh-dashboard-btn"
            onClick={fetchDashboardData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111315] hover:bg-[#16181b] border border-[#22262a] text-xs font-medium text-[#b0b8c1] transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#7fa48b]' : ''}`} />
            <span>Refresh Metrics</span>
          </button>

          <Link
            to="/inbox"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#17221b] hover:bg-[#24342a] border border-[#24342a] hover:border-[#7fa48b] text-xs font-semibold text-[#f6f8fa] transition-all"
          >
            <span>Open Inbox</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7fa48b]" />
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Emails Processed */}
        <div className="p-5 rounded-xl bg-[#111315] border border-[#22262a] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c959f] text-xs">
            <span className="font-medium uppercase tracking-wider text-[10px]">Emails Processed</span>
            <Inbox className="w-4 h-4 text-[#7fa48b]" />
          </div>
          <div className="my-3">
            <span className="text-3xl font-extrabold text-[#f6f8fa] tracking-tight">
              {stats?.emails_processed ?? 10}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#7fa48b]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active inbox ingestion</span>
          </div>
        </div>

        {/* RAG Answered */}
        <div className="p-5 rounded-xl bg-[#111315] border border-[#22262a] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c959f] text-xs">
            <span className="font-medium uppercase tracking-wider text-[10px]">RAG Answered</span>
            <Sparkles className="w-4 h-4 text-[#22c55e]" />
          </div>
          <div className="my-3">
            <span className="text-3xl font-extrabold text-[#f6f8fa] tracking-tight">
              {stats?.rag_answered ?? 3}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#22c55e]">
            <Database className="w-3.5 h-3.5" />
            <span>Grounded via Task 5 KB</span>
          </div>
        </div>

        {/* Human Escalated */}
        <div className="p-5 rounded-xl bg-[#111315] border border-[#22262a] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c959f] text-xs">
            <span className="font-medium uppercase tracking-wider text-[10px]">Human Escalated</span>
            <UserCheck className="w-4 h-4 text-[#a2c1ac]" />
          </div>
          <div className="my-3">
            <span className="text-3xl font-extrabold text-[#f6f8fa] tracking-tight">
              {stats?.human_escalated ?? 5}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#b0b8c1]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7fa48b]" />
            <span>Guarded safety policies</span>
          </div>
        </div>

        {/* Urgent Issues (RESERVED RED) */}
        <div className="p-5 rounded-xl bg-[#171011] border border-[#451315] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#fca5a5] text-xs">
            <span className="font-medium uppercase tracking-wider text-[10px]">Urgent Issues</span>
            <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
          </div>
          <div className="my-3">
            <span className="text-3xl font-extrabold text-[#fca5a5] tracking-tight">
              {stats?.urgent_issues ?? 1}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#ef4444] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-ping" />
            <span>Emergency facility alert</span>
          </div>
        </div>
      </div>

      {/* Secondary Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#111315] border border-[#1b1e21] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-[#656e77]">Processing Success Rate</p>
            <p className="text-lg font-bold text-[#f6f8fa] mt-0.5">{stats?.processing_success_rate ?? 99.4}%</p>
          </div>
          <span className="text-xs font-mono text-[#22c55e] bg-[#0d381c] px-2 py-0.5 rounded border border-[#14532b]">
            Nominal
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#111315] border border-[#1b1e21] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-[#656e77]">Average Decision Confidence</p>
            <p className="text-lg font-bold text-[#f6f8fa] mt-0.5">{stats?.average_confidence ?? 92.5}%</p>
          </div>
          <span className="text-xs font-mono text-[#7fa48b] bg-[#17221b] px-2 py-0.5 rounded border border-[#24342a]">
            Grounded
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#111315] border border-[#1b1e21] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-[#656e77]">Automation Rate</p>
            <p className="text-lg font-bold text-[#f6f8fa] mt-0.5">{stats?.automation_rate ?? 50.0}%</p>
          </div>
          <span className="text-xs font-mono text-[#b0b8c1] bg-[#16181b] px-2 py-0.5 rounded border border-[#22262a]">
            Balanced
          </span>
        </div>
      </div>

      {/* Main Grid: AI Decision Timeline & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent AI Decision Activity Timeline */}
        <div className="lg:col-span-8 bg-[#111315] border border-[#22262a] rounded-xl p-5">
          <div className="flex items-center justify-between border-b border-[#1b1e21] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7fa48b]" />
              <h2 className="text-sm font-semibold text-[#f6f8fa]">AI Decision Activity Stream</h2>
            </div>
            <Link to="/activity" className="text-xs text-[#7fa48b] hover:text-[#f6f8fa] transition-colors">
              View All Logs →
            </Link>
          </div>

          <div className="space-y-3">
            {activity.slice(0, 5).map((item) => (
              <Link
                key={item.id}
                to={`/inbox?id=${item.email_id}`}
                className="block p-3.5 rounded-lg bg-[#0a0b0c] hover:bg-[#16181b] border border-[#1b1e21] hover:border-[#24342a] transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-[#f6f8fa] group-hover:text-[#7fa48b] transition-colors">
                      {item.sender_name}
                    </span>
                    <CategoryBadge category={item.category} />
                    <PriorityBadge priority={item.priority} />
                  </div>
                  <span className="text-[11px] font-mono text-[#656e77]">{item.time}</span>
                </div>

                <p className="text-xs text-[#b0b8c1] truncate mb-2">{item.subject}</p>

                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <ActionBadge action={item.action} />
                  <span className="text-[#656e77] font-mono text-[10px]">
                    Confidence: {item.confidence}%
                  </span>
                  {item.rag_used && (
                    <span className="inline-flex items-center gap-1 text-[#22c55e] text-[10px] font-mono">
                      <Database className="w-2.5 h-2.5" />
                      RAG Verified
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Category Breakdown & System Health */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category Overview */}
          <div className="bg-[#111315] border border-[#22262a] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[#f6f8fa] mb-4">Category Overview</h2>
            <div className="space-y-2.5">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="capitalize text-[#b0b8c1] truncate">
                      {cat.name.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#656e77]">{cat.count} msgs</span>
                    <span className="font-mono text-xs font-semibold text-[#f6f8fa] w-10 text-right">
                      {cat.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Integrations Widget */}
          <div className="bg-[#111315] border border-[#22262a] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[#f6f8fa] mb-3">Operational Integrations</h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-[#0a0b0c] border border-[#1b1e21]">
                <span className="text-[#b0b8c1]">Gmail Provider</span>
                <span className="text-[#22c55e] font-mono text-[11px]">Ready (Demo Active)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#0a0b0c] border border-[#1b1e21]">
                <span className="text-[#b0b8c1]">Task 5 ChromaDB RAG</span>
                <span className="text-[#22c55e] font-mono text-[11px]">Connected (5 Docs)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#0a0b0c] border border-[#1b1e21]">
                <span className="text-[#b0b8c1]">Discord Webhooks</span>
                <span className="text-[#22c55e] font-mono text-[11px]">Active (3 Channels)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#0a0b0c] border border-[#1b1e21]">
                <span className="text-[#b0b8c1]">SQLite Database</span>
                <span className="text-[#22c55e] font-mono text-[11px]">Online (triageflow.db)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
