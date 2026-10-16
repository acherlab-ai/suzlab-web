import React, { useState } from 'react';
import { Terminal, Play, Check, Copy, Cpu, Layers, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export const InteractiveTerminalPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'suzflow' | 'kura' | 'canvas' | 'metrics'>('suzflow');
  const [executed, setExecuted] = useState(false);
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'suzflow', label: 'suzflow.wasm', icon: Cpu },
    { id: 'kura', label: 'kura.hcl', icon: Terminal },
    { id: 'canvas', label: 'render_pipeline.glsl', icon: Layers },
    { id: 'metrics', label: 'latency_profile', icon: Activity },
  ] as const;

  const codeSnippets = {
    suzflow: [
      '// SuzFlow Event Processing Micro-Kernel v0.9-alpha',
      'import { RingBuffer, WasmSandbox } from "@suzlab/core";',
      '',
      'export async function handleStream(event: ByteStream): Promise<Result> {',
      '  const sandbox = await WasmSandbox.spawn({ memoryLimitMb: 4, hotReload: true });',
      '  const processed = await sandbox.execute("pipeline.wasm", event.payload);',
      '  return RingBuffer.dispatch("acher-stream", processed);',
      '}',
      '// p99 latency target: 0.12ms | Zero cold starts',
    ],
    kura: [
      '# KuraCLI Workspace Manifest (kura.hcl)',
      'workspace "suzlab-core" {',
      '  version     = "2026.12"',
      '  ecosystem   = "https://acherlab.xyz"',
      '  services    = ["suzflow", "achercanvas", "vectra"]',
      '  concurrency = 8',
      '  isolation   = "strict-sandbox"',
      '}',
      '// Fast local sync with encrypted environment keys',
    ],
    canvas: [
      '// AcherCanvas WebGL 2.0 Instanced Vertex Shader',
      '#version 300 es',
      'layout(location = 0) in vec2 a_position;',
      'layout(location = 1) in vec2 a_offset;',
      'uniform mat3 u_transform;',
      'void main() {',
      '  vec3 pos = u_transform * vec3(a_position + a_offset, 1.0);',
      '  gl_Position = vec4(pos.xy, 0.0, 1.0);',
      '}',
      '// 60 FPS verified across 50,000 active nodes',
    ],
    metrics: [
      'Benchmark Target: Stress Simulation (500,000 Operations)',
      '-------------------------------------------------------',
      'Engine       : SuzFlow Micro-Kernel (Rust + WASM)',
      'Cold Start   : 1.18 ms    (Threshold: < 1.50 ms)',
      'Throughput   : 2,293,577 ops/sec (Ring Buffer Lock-Free)',
      'P95 Latency  : 0.08 ms',
      'P99 Latency  : 0.12 ms',
      'Allocations  : 0 heap allocs on hot path',
    ],
  };

  const handleCopy = () => {
    const text = codeSnippets[activeTab].join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRun = () => {
    setExecuted(true);
    setTimeout(() => setExecuted(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-[#060810] border border-white/[0.1] shadow-2xl shadow-cyan-950/30 overflow-hidden text-left">
      {/* Window Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-white/[0.08] gap-3">
        {/* Window controls & active tabs */}
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors text-xs flex items-center gap-1"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="font-mono text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{executed ? 'Running...' : 'Run Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Code Viewer Body */}
      <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto bg-[#070a14]/90 min-h-[220px]">
        {codeSnippets[activeTab].map((line, idx) => (
          <div key={idx} className="flex gap-4">
            <span className="text-slate-600 select-none w-6 text-right font-mono text-xs">
              {idx + 1}
            </span>
            <span
              className={
                line.startsWith('//') || line.startsWith('#')
                  ? 'text-slate-500 italic'
                  : line.includes('import') || line.includes('export') || line.includes('void')
                  ? 'text-sky-300'
                  : line.includes('Benchmark') || line.includes('P99')
                  ? 'text-cyan-300 font-semibold'
                  : 'text-slate-200'
              }
            >
              {line || '\u00A0'}
            </span>
          </div>
        ))}

        {executed && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-lg bg-cyan-950/50 border border-cyan-400/40 text-cyan-300 text-xs font-mono"
          >
            ✓ Simulation completed in 1.18ms | 0 packet loss | Target verified for 10/12/2026 announcement
          </motion.div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-slate-950 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>SUZLAB-KERNEL // INTERACTIVE SANDBOX</span>
        </div>
        <span>UTF-8 · RUST/WASM · ACHERLAB</span>
      </div>
    </div>
  );
};
