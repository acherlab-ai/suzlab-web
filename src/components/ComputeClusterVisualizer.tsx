import React, { useState } from 'react';
import { Server, Zap, Cpu, Activity, Thermometer, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ComputeClusterVisualizer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('node-h200');

  const nodes = [
    {
      id: 'node-h200',
      label: 'RACK-01 // NVIDIA H200 NVL',
      type: '8x H200 (1,128GB HBM3e)',
      utilization: 84,
      temp: '58°C',
      interconnect: '400Gb/s InfiniBand',
      power: '5.6 kW',
      workload: 'SuzLab Frontier Model Pre-training & Long-Context KV-Cache',
    },
    {
      id: 'node-h100',
      label: 'RACK-02 // NVIDIA H100 SXM5',
      type: '8x H100 (640GB HBM3)',
      utilization: 91,
      temp: '62°C',
      interconnect: 'NVLink 4.0 (900 GB/s)',
      power: '5.4 kW',
      workload: 'Transformer Engine Matrix Optimization & Distributed PoC',
    },
    {
      id: 'node-a100',
      label: 'RACK-03 // NVIDIA A100 SXM4',
      type: '8x A100 (640GB HBM2e)',
      utilization: 68,
      temp: '54°C',
      interconnect: '200Gb/s HDR InfiniBand',
      power: '3.2 kW',
      workload: 'VectraQuery High-Dimensional Vector Clustering Benchmarks',
    },
    {
      id: 'node-t4',
      label: 'RACK-04 // NVIDIA T4 Density',
      type: '16x T4 (256GB GDDR6)',
      utilization: 42,
      temp: '44°C',
      interconnect: 'PCIe 3.0 Low-Latency Fabric',
      power: '1.1 kW',
      workload: 'AcherCanvas WebGL Shader Rendering & Client Verification',
    },
    {
      id: 'node-epyc',
      label: 'RACK-05 // AMD EPYC 9654 Genoa',
      type: '384 Threads / 1.5TB DDR5 ECC',
      utilization: 76,
      temp: '49°C',
      interconnect: 'Dual 100GbE RoCE v2',
      power: '0.8 kW',
      workload: 'SuzFlow WASM Sandbox Isolation Stress Benchmarks',
    },
  ];

  const current = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="w-full rounded-2xl bg-[#060912] border border-white/[0.08] p-5 sm:p-7 shadow-2xl space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Phòng Thử Nghiệm Phần Cứng Điện Toán (Cluster Visualizer)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Mô phỏng topo hạ tầng GPU & CPU thực tế phục vụ các dự án nghiên cứu SuzLab
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Status: 5 Racks Active / Zero Throttle</span>
        </div>
      </div>

      {/* Cluster Node Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {nodes.map((node) => {
          const isSelected = selectedNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-950/40'
                  : 'bg-slate-900/50 border-white/[0.06] hover:bg-white/[0.04] text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">
                  {node.id.replace('node-', '').toUpperCase()}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs font-bold text-white truncate">{node.type}</div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Load: {node.utilization}%
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Telemetry Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="p-5 rounded-xl bg-slate-950/80 border border-cyan-500/25 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
            <div>
              <span className="font-mono text-xs text-cyan-400 font-semibold uppercase">
                Active Node Telemetry
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {current.label}
              </h4>
            </div>

            <span className="text-xs font-mono text-slate-300">
              Interconnect: <strong className="text-cyan-300">{current.interconnect}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-900/60 rounded-lg border border-white/[0.04]">
              <span className="text-slate-400 block mb-1">Mức tải tính toán</span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold text-cyan-300">
                  {current.utilization}%
                </span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-white/[0.04]">
              <span className="text-slate-400 block mb-1">Nhiệt độ nhân</span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold text-emerald-300">
                  {current.temp}
                </span>
                <Thermometer className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-white/[0.04]">
              <span className="text-slate-400 block mb-1">Công suất tiêu thụ</span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold text-amber-300">
                  {current.power}
                </span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-white/[0.04]">
              <span className="text-slate-400 block mb-1">Hạ tầng phân bổ</span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-200">
                  SuzLab Lab Fabric
                </span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Active research workload */}
          <div className="p-3 bg-slate-900/40 rounded-lg border border-white/[0.05] text-xs">
            <span className="text-slate-400 font-medium block mb-1">
              Dự án đang tận dụng cụm tính toán này:
            </span>
            <span className="text-slate-200 font-mono">{current.workload}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
