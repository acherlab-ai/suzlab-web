import React, { useState } from 'react';
import { ComputeSpecsTable } from '../components/ComputeSpecsTable';
import { ComputeClusterVisualizer } from '../components/ComputeClusterVisualizer';
import { ComputeQuotaModal } from '../components/ComputeQuotaModal';
import { GpuNodeSpec } from '../data/computeData';
import { TranslationSchema } from '../data/translations32';
import { Zap, Cpu, Server, Network, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ComputePageProps {
  lang: string;
  translations: TranslationSchema;
}

export const ComputePage: React.FC<ComputePageProps> = ({
  lang,
  translations,
}) => {
  const isVi = lang === 'vi';
  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false);
  const [selectedGpu, setSelectedGpu] = useState<GpuNodeSpec | null>(null);

  const handleOpenQuota = (gpu?: GpuNodeSpec) => {
    setSelectedGpu(gpu || null);
    setIsQuotaModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16"
    >
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>SUZLAB HPC & ACCELERATED COMPUTE FABRIC</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {isVi
            ? 'Hạ Tầng Tính Toán Hiệu Năng Cao & Cụm GPU Quy Mô Lớn'
            : 'High-Performance Computing & Accelerated GPU Infrastructure'}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {isVi
            ? 'SuzLab vận hành các cụm tính toán chuyên dụng gồm NVIDIA T4, A100, H100 và H200 NVL cùng các nút CPU AMD EPYC 192-core mật độ cao, phục vụ nghiên cứu mô hình ngôn ngữ lớn, vi kiến trúc WASM và mô phỏng mạng phân tán trong hệ sinh thái AcherLab.'
            : 'SuzLab operates dedicated high-performance clusters featuring NVIDIA T4, A100, H100, and H200 NVL GPUs coupled with high-density AMD EPYC 192-core CPU nodes, powering foundation models, WASM micro-runtimes, and distributed network simulations across the AcherLab ecosystem.'}
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => handleOpenQuota()}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/25"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{isVi ? 'Đăng ký tài nguyên GPU / Compute' : 'Request GPU / Compute Allocation'}</span>
          </button>
        </div>
      </div>

      {/* Cluster Hardware Highlights Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b14] border border-cyan-500/30 space-y-2">
          <span className="text-xs font-mono text-cyan-400 block font-bold">NVIDIA H200 NVL</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            141 GB HBM3e
          </div>
          <p className="text-xs text-slate-400">
            {isVi ? 'Băng thông 4.8 TB/s phục vụ Long-context & Large MoE inference.' : '4.8 TB/s memory bandwidth for 128k+ token inference.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b14] border border-cyan-500/30 space-y-2">
          <span className="text-xs font-mono text-sky-400 block font-bold">NVIDIA H100 SXM5</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            80 GB HBM3
          </div>
          <p className="text-xs text-slate-400">
            {isVi ? 'Transformer Engine FP8 tăng tốc huấn luyện mô hình thế hệ mới.' : 'Transformer Engine with FP8 tensor acceleration.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-2">
          <span className="text-xs font-mono text-teal-400 block font-bold">NVIDIA A100 & T4</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            High Density
          </div>
          <p className="text-xs text-slate-400">
            {isVi ? 'Tối ưu cho vector embeddings (VectraQuery) và edge runtimes.' : 'Optimized for high-volume vector search and edge runtimes.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-2">
          <span className="text-xs font-mono text-blue-400 block font-bold">AMD EPYC 9654</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            384 Threads
          </div>
          <p className="text-xs text-slate-400">
            {isVi ? '1.5 TB DDR5 ECC RAM cùng mảng NVMe RAID-0 đọc ~28 GB/s.' : '1.5 TB DDR5 ECC RAM with ~28 GB/s striped NVMe scratch.'}
          </p>
        </div>
      </div>

      {/* Interactive Server Rack Visualizer */}
      <section className="space-y-4">
        <ComputeClusterVisualizer />
      </section>

      {/* Compute Hardware Specifications Comparison Matrix */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            HARDWARE ARCHITECTURE MATRIX
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            {isVi ? 'Bảng Thông Số Kỹ Thuật Chi Tiết' : 'Detailed Compute Architecture Matrix'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isVi
              ? 'Tất cả các nút tính toán đều được kết nối trực tiếp qua mạng cáp InfiniBand 400Gb/s hoặc RoCE v2 độ trễ cực thấp.'
              : 'All nodes interconnected via low-latency InfiniBand 400Gb/s fabric and RoCE v2 networking.'}
          </p>
        </div>

        <ComputeSpecsTable lang={lang} onSelectGpuForQuota={handleOpenQuota} />
      </section>

      {/* Compute Allocation & Quota Modal */}
      <ComputeQuotaModal
        isOpen={isQuotaModalOpen}
        initialGpu={selectedGpu}
        onClose={() => setIsQuotaModalOpen(false)}
        lang={lang}
      />
    </motion.div>
  );
};
