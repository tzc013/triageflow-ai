import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { Sparkles, Database, FileText, ExternalLink, ShieldCheck } from 'lucide-react';

const DEFAULT_SCORES = [
  { subject: 'Listings', fullName: 'Property_Listings.pdf', score: 94, fullMark: 100, isPrimary: true },
  { subject: 'Fees & Svc', fullName: 'Services_and_Fees.pdf', score: 46, fullMark: 100, isPrimary: false },
  { subject: 'Policies', fullName: 'Policies_and_Terms.pdf', score: 38, fullMark: 100, isPrimary: false },
  { subject: 'FAQs', fullName: 'FAQs.pdf', score: 54, fullMark: 100, isPrimary: false },
  { subject: 'Overview', fullName: 'Company_Overview.pdf', score: 60, fullMark: 100, isPrimary: false },
];

function CustomRadarTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-lg bg-[#0d0f11] border border-[#24342a] p-2 shadow-xl text-xs font-mono z-50 pointer-events-none min-w-[140px]">
      <div className="flex items-center gap-1.5 pb-1 border-b border-[#1b1e21] mb-1">
        <FileText className="w-3 h-3 text-[#7fa48b]" />
        <span className="text-[11px] font-semibold text-[#f6f8fa] truncate max-w-[130px]">
          {item.fullName || item.subject}
        </span>
      </div>
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-[#8c959f]">Relevance:</span>
        <span className="font-bold text-[#86efac]">
          {item.score}%
        </span>
      </div>
      {item.isPrimary && (
        <div className="mt-1 pt-1 border-t border-[#1b1e21] flex items-center gap-1 text-[9px] text-[#22c55e]">
          <ShieldCheck className="w-2.5 h-2.5" />
          <span>Primary Grounded Chunk</span>
        </div>
      )}
    </div>
  );
}

export default function DocumentRelevanceRadar({ 
  emailId = null,
  initialInsight = null,
  compact = true,
  className = '',
  showHeader = true,
  showFooter = true,
  title = 'Document Relevance'
}) {
  const [insight, setInsight] = useState(initialInsight);
  const [loading, setLoading] = useState(!initialInsight);

  // Fetch or update insights
  const fetchInsight = async (targetId) => {
    try {
      const url = targetId 
        ? `/api/rag/insights?email_id=${encodeURIComponent(targetId)}`
        : '/api/rag/insights';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setInsight(data);
      }
    } catch (err) {
      console.warn('Failed to load RAG insight for radar:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialInsight) {
      setInsight(initialInsight);
      setLoading(false);
    } else {
      fetchInsight(emailId);
    }
  }, [emailId, initialInsight]);

  // Global event listener: when user views an email with RAG, sidebar radar updates
  useEffect(() => {
    const handleGlobalUpdate = (event) => {
      if (event?.detail) {
        if (event.detail.scores) {
          setInsight(event.detail);
        } else if (event.detail.email_id) {
          fetchInsight(event.detail.email_id);
        }
      }
    };

    window.addEventListener('triageflow:rag-insight-update', handleGlobalUpdate);
    return () => {
      window.removeEventListener('triageflow:rag-insight-update', handleGlobalUpdate);
    };
  }, []);

  const chartData = insight?.scores && insight.scores.length >= 3 
    ? insight.scores 
    : DEFAULT_SCORES;

  const topMatch = chartData.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), chartData[0]);

  return (
    <div className={`rounded-xl bg-[#0a0b0c] border border-[#1b1e21] p-3 text-xs flex flex-col ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between pb-2 border-b border-[#1b1e21]">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-4 h-4 rounded bg-[#17221b] border border-[#24342a] flex items-center justify-center text-[#7fa48b]">
              <Sparkles className="w-2.5 h-2.5 text-[#7fa48b]" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#a2c1ac] uppercase truncate">
              {title}
            </span>
          </div>

          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#17221b] text-[#22c55e] border border-[#14532b] shrink-0">
            Top: {topMatch?.score}%
          </span>
        </div>
      )}

      {/* Query / Subject Indicator */}
      {insight?.subject && (
        <div className="mt-2 text-[10px] text-[#8c959f] font-mono truncate flex items-center gap-1">
          <span className="text-[#656e77]">Context:</span>
          <span className="text-[#cadbcd] truncate" title={insight.subject}>
            {insight.subject}
          </span>
        </div>
      )}

      {/* Radar Chart Container */}
      <div className="relative w-full h-44 mt-1 min-w-0 flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-2 h-full text-zinc-600 font-mono text-[10px]">
            <div className="w-5 h-5 border-2 border-[#7fa48b]/30 border-t-[#22c55e] rounded-full animate-spin" />
            <span>Calculating Vector Space...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius={compact ? "56%" : "65%"} 
              data={chartData}
              margin={{ top: 10, right: 12, bottom: 10, left: 12 }}
            >
              <PolarGrid 
                stroke="#1e2521" 
                strokeDasharray="2 2"
                gridType="polygon"
              />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ 
                  fill: '#8c959f', 
                  fontSize: 9, 
                  fontFamily: 'monospace',
                  fontWeight: 500
                }}
                tickLine={false}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={false} 
                axisLine={false} 
              />
              <Radar 
                name="Relevance" 
                dataKey="score" 
                stroke="#22c55e" 
                strokeWidth={1.5}
                fill="#22c55e" 
                fillOpacity={0.24} 
                dot={{ 
                  r: 2.5, 
                  fill: '#22c55e', 
                  stroke: '#0a0b0c', 
                  strokeWidth: 1 
                }}
                activeDot={{
                  r: 4,
                  fill: '#86efac',
                  stroke: '#14532b',
                  strokeWidth: 1.5
                }}
              />
              <Tooltip content={<CustomRadarTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer Info */}
      {showFooter && topMatch && (
        <div className="pt-2 mt-1 border-t border-[#1b1e21] flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-1 text-[#656e77] truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
            <span className="text-[#a2c1ac] truncate">{topMatch.fullName}</span>
          </div>
          <span className="text-[#86efac] font-bold shrink-0 ml-1">
            {topMatch.score}% MATCH
          </span>
        </div>
      )}
    </div>
  );
}
