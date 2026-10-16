import React, { useState } from 'react';
import { GPU_SPECS, GpuNodeSpec } from '../data/computeData';
import { X, Zap, Cpu, Check, Send, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ComputeQuotaModalProps {
  isOpen: boolean;
  initialGpu?: GpuNodeSpec | null;
  onClose: () => void;
  lang: string;
}

export const ComputeQuotaModal: React.FC<ComputeQuotaModalProps> = ({
  isOpen,
  initialGpu,
  onClose,
  lang,
}) => {
  const isVi = lang === 'vi';
  const [selectedGpuId, setSelectedGpuId] = useState<string>(
    initialGpu?.id || 'h100'
  );
  const [projectName, setProjectName] = useState('');
  const [email, setEmail] = useState('');
  const [workloadDescription, setWorkloadDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentGpu =
    GPU_SPECS.find((g) => g.id === selectedGpuId) || GPU_SPECS[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(
      `[SuzLab Compute Quota Request - ${currentGpu.name}] from ${projectName || 'Developer'}`
    );
    const body = encodeURIComponent(
      `Project Name: ${projectName}\nEmail: ${email}\nGPU Selected: ${currentGpu.name} (${currentGpu.vram})\n\nWorkload Description:\n${workloadDescription}\n\n---\nSent via SuzLab GPU Allocation Portal`
    );
    return `mailto:admin@acherlab.xyz?subject=${subject}&body=${body}`;
  };

  const handleCopyManifest = () => {
    const text = `GPU Quota Request Manifest:\nProject: ${projectName}\nTarget GPU: ${currentGpu.name} (${currentGpu.vram} ${currentGpu.memoryType})\nApplicant Email: ${email}\nDescription: ${workloadDescription}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-2xl bg-[#090d18] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {isVi ? 'Đăng Ký Tài Nguyên GPU & Điện Toán' : 'Register Compute & GPU Allocation'}
              </h3>
              <p className="text-xs text-slate-400">
                Phòng thí nghiệm SuzLab · Hệ sinh thái AcherLab
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice */}
        <div className="my-4 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
          <p className="leading-relaxed">
            {isVi
              ? 'SuzLab cung cấp hạ tầng tính toán phân tán gồm cụm NVIDIA T4, A100, H100 và H200 NVL cùng CPU mật độ cao cho các dự án nghiên cứu và phát triển phần mềm trong hệ sinh thái AcherLab.'
              : 'SuzLab provides distributed compute clusters (NVIDIA T4, A100, H100, H200 NVL & High-Density CPU nodes) for research and engineering projects within the AcherLab ecosystem.'}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* GPU Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                {isVi ? 'Chọn Loại GPU Cần Cấp Phát' : 'Select Target GPU Node'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {GPU_SPECS.map((gpu) => (
                  <button
                    key={gpu.id}
                    type="button"
                    onClick={() => setSelectedGpuId(gpu.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedGpuId === gpu.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-900/60 border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate">{gpu.name}</div>
                    <div className="text-[11px] font-mono text-cyan-300 mt-1">
                      {gpu.vram}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                {isVi ? 'Tên Dự Án / Tác Vụ' : 'Project / Workload Name'} *
              </label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder={isVi ? 'Ví dụ: SuzFlow Event Stream Benchmark' : 'e.g. SuzFlow Benchmark'}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                {isVi ? 'Email Liên Hệ Kỹ Thuật' : 'Technical Contact Email'} *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Workload Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                {isVi ? 'Mô Tả Nhu Cầu Tính Toán (Thời gian, Khung dữ liệu)' : 'Workload & Data Footprint Details'} *
              </label>
              <textarea
                rows={3}
                required
                value={workloadDescription}
                onChange={(e) => setWorkloadDescription(e.target.value)}
                placeholder={
                  isVi
                    ? 'Mô tả mô hình cần chạy, kích thước batch, thời gian dự kiến và thư viện sử dụng (PyTorch, Rust, WASM, CUDA)...'
                    : 'Describe batch size, runtime framework, estimated compute duration...'
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isVi ? 'Tạo Hồ Sơ Cấp Phát GPU' : 'Generate Allocation Request'}</span>
            </button>
          </form>
        ) : (
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Check className="w-5 h-5" />
              <span>{isVi ? 'Hồ sơ yêu cầu đã sẵn sàng!' : 'Request manifest ready!'}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isVi
                ? 'Để đảm bảo phân bổ GPU chính xác cho đội ngũ của bạn, hãy gửi trực tiếp hồ sơ đến ban điều hành hạ tầng SuzLab & AcherLab qua email admin@acherlab.xyz.'
                : 'To finalize GPU reservation, send this generated manifest directly to the SuzLab infrastructure team at admin@acherlab.xyz.'}
            </p>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-white/[0.08] text-xs font-mono text-slate-300 space-y-1">
              <div><strong className="text-slate-400">Target GPU:</strong> {currentGpu.name} ({currentGpu.vram})</div>
              <div><strong className="text-slate-400">Project:</strong> {projectName}</div>
              <div><strong className="text-slate-400">Applicant:</strong> {email}</div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={getMailtoUrl()}
                className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{isVi ? 'Gửi Email Tới admin@acherlab.xyz' : 'Send Email to admin@acherlab.xyz'}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyManifest}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (isVi ? 'Đã sao chép!' : 'Copied!') : (isVi ? 'Sao chép thông tin hồ sơ' : 'Copy Manifest')}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-center text-xs text-slate-400 hover:text-white"
              >
                {isVi ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
