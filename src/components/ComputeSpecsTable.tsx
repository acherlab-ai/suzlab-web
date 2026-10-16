import React, { useState } from 'react';
import { GPU_SPECS, CPU_CLUSTER_SPECS, GpuNodeSpec } from '../data/computeData';
import { Cpu, Zap, Activity, HardDrive, Network, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ComputeSpecsTableProps {
  lang: string;
  onSelectGpuForQuota?: (gpu: GpuNodeSpec) => void;
}

export const ComputeSpecsTable: React.FC<ComputeSpecsTableProps> = ({
  lang,
  onSelectGpuForQuota,
}) => {
  const [activeTab, setActiveTab] = useState<'gpu' | 'cpu'>('gpu');
  const isVi = lang === 'vi';

  return (
    <div className="w-full space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('gpu')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'gpu'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>NVIDIA GPU Clusters (H200 / H100 / A100 / T4)</span>
          </button>

          <button
            onClick={() => setActiveTab('cpu')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'cpu'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Cpu className="w-4 h-4 text-sky-400" />
            <span>High-Density CPU Nodes (AMD EPYC / Xeon)</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>InfiniBand Quantum-2 400Gb/s Interconnect Fabric</span>
        </div>
      </div>

      {activeTab === 'gpu' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {GPU_SPECS.map((gpu) => {
            const isFlagship = gpu.id === 'h200' || gpu.id === 'h100';
            return (
              <motion.div
                key={gpu.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col justify-between p-6 rounded-2xl border transition-all ${
                  isFlagship
                    ? 'bg-gradient-to-b from-slate-900/90 to-[#070b14] border-cyan-500/35 shadow-xl shadow-cyan-950/20'
                    : 'bg-slate-900/40 border-white/[0.08]'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-cyan-300 font-bold tracking-wider">
                      {gpu.family}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        gpu.status === 'Ready'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {gpu.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                      {gpu.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{gpu.nodeConfig}</p>
                  </div>

                  {/* VRAM & Bandwidth Hero Figure */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">VRAM / Node</span>
                      <span className="font-mono font-bold text-cyan-300 text-sm tabular-nums">
                        {gpu.vram} {gpu.memoryType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Băng thông bộ nhớ</span>
                      <span className="font-mono font-semibold text-slate-200 tabular-nums">
                        {gpu.bandwidth}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">FP16 Tensor</span>
                      <span className="font-mono text-slate-300 tabular-nums">
                        {gpu.fp16Perf}
                      </span>
                    </div>
                  </div>

                  {/* Workload Description */}
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-slate-400 block mb-1">
                      {isVi ? 'Tác vụ tối ưu:' : 'Primary Workloads:'}
                    </strong>
                    {isVi ? gpu.targetWorkloadsVi : gpu.targetWorkloadsEn}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">TDP: {gpu.tdp}</span>
                  {onSelectGpuForQuota && (
                    <button
                      onClick={() => onSelectGpuForQuota(gpu)}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold underline"
                    >
                      {isVi ? 'Đăng ký GPU' : 'Request Quota'}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CPU_CLUSTER_SPECS.map((cpu) => (
            <div
              key={cpu.id}
              className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-sky-400 font-bold uppercase">
                  {cpu.architecture}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {cpu.status}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{cpu.name}</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  {cpu.networkFabric}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-white/[0.05]">
                  <span className="text-slate-400 block">Số nhân / Luồng</span>
                  <strong className="text-white font-mono text-sm block mt-0.5">
                    {cpu.coresPerNode}
                  </strong>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-white/[0.05]">
                  <span className="text-slate-400 block">RAM ECC Node</span>
                  <strong className="text-cyan-300 font-mono text-sm block mt-0.5">
                    {cpu.ramPerNode}
                  </strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/40 border border-white/[0.05] text-xs text-slate-300">
                <span className="text-slate-400 block mb-0.5">Scratch NVMe Storage:</span>
                <span className="font-mono text-slate-200">{cpu.scratchStorage}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-slate-400 block mb-1">
                  {isVi ? 'Mục đích nghiên cứu:' : 'Research Target:'}
                </strong>
                {isVi ? cpu.purposeVi : cpu.purposeEn}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
