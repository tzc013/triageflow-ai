import React, { useState, useEffect } from 'react';
import { Sparkles, Database, Search, ShieldCheck, Clock, FileText } from 'lucide-react';

export default function RAGLoadingSkeleton({ query = '' }) {
  const [phase, setPhase] = useState(1);
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    // Dynamic cinematic phases that transition naturally as RAG query completes
    const timer1 = setTimeout(() => {
      setPhase(2);
      setProgress(58);
    }, 900);

    const timer2 = setTimeout(() => {
      setPhase(3);
      setProgress(86);
    }, 2100);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return 94;
        return prev + Math.floor(Math.random() * 3 + 1);
      });
    }, 200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(progressInterval);
    };
  }, []);

  const phases = [
    {
      id: 1,
      name: 'VECTOR ENCODING',
      desc: 'Embedding question to 384-d semantic space',
      icon: Database,
    },
    {
      id: 2,
      name: 'VECTOR SPACE RETRIEVAL',
      desc: 'Scanning ChromaDB index for top-k relevant chunks',
      icon: Search,
    },
    {
      id: 3,
      name: 'GROUNDED SYNTHESIS',
      desc: 'Gemini cross-referencing citations & negative refusal check',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="max-w-3xl w-full space-y-3 font-mono">
      {/* 1. Cinematic Progress Telemetry Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#08090a] border border-[#22262a] p-4 text-xs shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        {/* Subtle Scanline */}
        <div className="cinematic-scanline" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2DD4BF]"></span>
            </span>
            <span className="font-bold text-white tracking-wider text-[11px] uppercase">
              RAG Knowledge Retrieval Pipeline
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-zinc-400">
            <span className="text-[#2DD4BF] font-mono font-semibold">{progress}%</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-500 font-mono text-[10px]">GEMINI-3.8-FLASH + CHROMADB</span>
          </div>
        </div>

        {/* Progress Bar with Glowing Head */}
        <div className="mt-3 relative w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#14B8A6] via-[#2DD4BF] to-[#86efac] transition-all duration-300 ease-out rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#2DD4BF] rounded-full blur-[2px] opacity-80" />
          </div>
        </div>

        {/* Dynamic Multi-Phase Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3.5 pt-1">
          {phases.map((p) => {
            const Icon = p.icon;
            const isCompleted = phase > p.id;
            const isActive = phase === p.id;

            return (
              <div
                key={p.id}
                className={`p-2 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-[#14B8A6]/10 border-[#14B8A6]/40 text-[#2DD4BF]'
                    : isCompleted
                    ? 'bg-white/[0.02] border-white/5 text-zinc-400'
                    : 'bg-transparent border-transparent text-zinc-600 opacity-60'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={`w-3 h-3 ${isActive ? 'text-[#2DD4BF] animate-pulse' : ''}`} />
                  <span className="text-[10px] font-bold tracking-wider">{p.name}</span>
                </div>
                <p className="text-[9px] leading-tight text-zinc-400 truncate">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Cinematic Answer Skeleton Preview */}
      <div className="cinematic-skeleton-teal rounded-2xl rounded-tl-none p-5 text-sm space-y-4 shadow-[0_0_30px_rgba(0,0,0,0.7)]">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF] animate-spin" />
            <div className="h-3 w-40 rounded bg-white/10 cinematic-skeleton" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-16 rounded bg-white/5 cinematic-skeleton" />
          </div>
        </div>

        {/* Paragraph 1 Skeleton */}
        <div className="space-y-2 pt-1">
          <div className="h-3.5 w-full rounded bg-white/10 cinematic-skeleton" />
          <div className="h-3.5 w-[94%] rounded bg-white/10 cinematic-skeleton" />
          <div className="h-3.5 w-[88%] rounded bg-white/10 cinematic-skeleton" />
          <div className="h-3.5 w-[72%] rounded bg-white/10 cinematic-skeleton" />
        </div>

        {/* Paragraph 2 Skeleton */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <div className="h-3.5 w-[96%] rounded bg-white/10 cinematic-skeleton" />
          <div className="h-3.5 w-[85%] rounded bg-white/10 cinematic-skeleton" />
          <div className="h-3.5 w-[45%] rounded bg-white/10 cinematic-skeleton" />
        </div>

        {/* Retrieved Sources Skeleton Badges */}
        <div className="pt-2 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-28 rounded bg-white/10 cinematic-skeleton" />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-7 w-36 rounded-md bg-white/5 border border-white/5 cinematic-skeleton flex items-center gap-1 px-2">
              <FileText className="w-3 h-3 text-white/20" />
            </div>
            <div className="h-7 w-44 rounded-md bg-white/5 border border-white/5 cinematic-skeleton flex items-center gap-1 px-2">
              <FileText className="w-3 h-3 text-white/20" />
            </div>
            <div className="h-7 w-32 rounded-md bg-white/5 border border-white/5 cinematic-skeleton flex items-center gap-1 px-2">
              <FileText className="w-3 h-3 text-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
