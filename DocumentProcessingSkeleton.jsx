import React, { useState, useEffect } from 'react';
import { FileText, Cpu, Layers, Database, CheckCircle2, Sparkles } from 'lucide-react';

export default function DocumentProcessingSkeleton({
  fileName = 'Document.pdf',
  fileSize = '3.5 MB',
  onComplete,
}) {
  const [phase, setPhase] = useState(1);
  const [progress, setProgress] = useState(14);
  const [chunksCount, setChunksCount] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'STREAM EXTRACTION',
      detail: 'Extracting text stream & structural metadata',
      icon: FileText,
    },
    {
      id: 2,
      title: 'SEMANTIC CHUNKING',
      detail: 'Windowing text into page-aware context chunks',
      icon: Layers,
    },
    {
      id: 3,
      title: 'VECTOR EMBEDDING',
      detail: 'Computing 384-d normalized dense embeddings',
      icon: Cpu,
    },
    {
      id: 4,
      title: 'INDEX COMMIT',
      detail: 'Committing vectors into ChromaDB & SQLite',
      icon: Database,
    },
  ];

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase(2);
      setProgress(38);
      setChunksCount(2);
    }, 700);

    const t2 = setTimeout(() => {
      setPhase(3);
      setProgress(68);
      setChunksCount(5);
    }, 1500);

    const t3 = setTimeout(() => {
      setPhase(4);
      setProgress(92);
      setChunksCount(8);
    }, 2400);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 98;
        return prev + 1;
      });
    }, 180);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full space-y-4 font-mono text-xs">
      {/* Active Processing Card with Cinematic Glow */}
      <div className="relative overflow-hidden rounded-xl bg-[#090b0d] border border-[#22262a] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="cinematic-scanline" />

        {/* File and State Header */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#2DD4BF]">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white truncate text-xs">{fileName}</span>
                <span className="text-[10px] text-zinc-500">({fileSize})</span>
              </div>
              <p className="text-[11px] text-[#7fa48b] mt-0.5">
                AI Knowledge Pipeline Active · {steps[phase - 1]?.title}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-sm font-bold text-[#2DD4BF] font-mono">{progress}%</span>
            <span className="block text-[10px] text-zinc-500">
              {chunksCount > 0 ? `${chunksCount} chunks mapped` : 'Preparing buffer...'}
            </span>
          </div>
        </div>

        {/* Progress Track */}
        <div className="mt-3 relative w-full h-2 bg-black/80 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#14B8A6] via-[#2DD4BF] to-[#86efac] transition-all duration-300 ease-out rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#86efac] rounded-full blur-[2px] opacity-90" />
          </div>
        </div>

        {/* 4 Pipeline Stages */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = phase > s.id;
            const isActive = phase === s.id;

            return (
              <div
                key={s.id}
                className={`p-2.5 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-[#14B8A6]/10 border-[#14B8A6] text-[#2DD4BF] shadow-[0_0_15px_rgba(20,184,166,0.2)]'
                    : isCompleted
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-400'
                    : 'bg-black/40 border-white/5 text-zinc-600 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2DD4BF] animate-pulse' : ''}`} />
                  {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  {isActive && <span className="text-[9px] px-1 rounded bg-[#14B8A6]/20 font-mono">ACTIVE</span>}
                </div>
                <div className="font-bold text-[10px] tracking-wide truncate">{s.title}</div>
                <div className="text-[9px] text-zinc-400 truncate mt-0.5">{s.detail}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Document Chunk Generation Skeleton */}
      <div className="rounded-xl border border-white/10 bg-black/60 p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5 text-white font-medium">
            <Layers className="w-3 h-3 text-[#2DD4BF]" />
            Generated Vector Chunks Matrix
          </span>
          <span className="text-zinc-500 font-mono text-[10px]">ChromaDB Collection: veridoc_chunks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-[#0e1012] border border-white/10 cinematic-skeleton space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-24 rounded bg-white/10" />
                <div className="h-2.5 w-10 rounded bg-[#14B8A6]/20" />
              </div>
              <div className="space-y-1">
                <div className="h-2 w-full rounded bg-white/5" />
                <div className="h-2 w-[85%] rounded bg-white/5" />
                <div className="h-2 w-[60%] rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
