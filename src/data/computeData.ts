export interface GpuNodeSpec {
  id: string;
  name: string;
  family: string;
  vram: string;
  memoryType: string;
  bandwidth: string;
  fp16Perf: string;
  fp8Perf: string;
  interconnect: string;
  nodeConfig: string;
  targetWorkloadsVi: string;
  targetWorkloadsEn: string;
  status: 'Ready' | 'Allocated' | 'Benchmarking';
  tdp: string;
}

export interface CpuClusterSpec {
  id: string;
  name: string;
  architecture: string;
  coresPerNode: string;
  ramPerNode: string;
  scratchStorage: string;
  networkFabric: string;
  purposeVi: string;
  purposeEn: string;
  status: 'Operational' | 'Active';
}

export const GPU_SPECS: GpuNodeSpec[] = [
  {
    id: 'h200',
    name: 'NVIDIA H200 NVL / SXM5',
    family: 'Hopper Enhanced',
    vram: '141 GB',
    memoryType: 'HBM3e',
    bandwidth: '4.8 TB/s',
    fp16Perf: '1,979 TFLOPS',
    fp8Perf: '3,958 TFLOPS',
    interconnect: 'NVLink 4.0 (900 GB/s) + 400Gb/s InfiniBand',
    nodeConfig: '8x H200 SXM5 per chassis (1,128 GB Unified VRAM)',
    targetWorkloadsVi: 'Huấn luyện & tinh chỉnh mô hình ngôn ngữ cực lớn (LLM Fine-tuning), Large MoE Models, Inference ngữ cảnh 128k-1M tokens.',
    targetWorkloadsEn: 'Ultra-scale LLM pre-training & fine-tuning, Large Mixture-of-Experts (MoE), 128k-1M context inference pipelines.',
    status: 'Ready',
    tdp: '700W per GPU',
  },
  {
    id: 'h100',
    name: 'NVIDIA H100 SXM5',
    family: 'Hopper',
    vram: '80 GB',
    memoryType: 'HBM3',
    bandwidth: '3.35 TB/s',
    fp16Perf: '1,513 TFLOPS',
    fp8Perf: '3,026 TFLOPS',
    interconnect: 'NVLink 4.0 (900 GB/s) + Quantum-2 InfiniBand',
    nodeConfig: '8x H100 SXM5 per chassis (640 GB Unified VRAM)',
    targetWorkloadsVi: 'Huấn luyện phân tán qua Transformer Engine, xử lý ma trận mật độ cao và nghiên cứu vi kiến trúc SuzFlow.',
    targetWorkloadsEn: 'Distributed Transformer Engine training, dense tensor kernels, SuzFlow runtime synchronization benchmarking.',
    status: 'Ready',
    tdp: '700W per GPU',
  },
  {
    id: 'a100',
    name: 'NVIDIA A100 SXM4',
    family: 'Ampere',
    vram: '80 GB',
    memoryType: 'HBM2e',
    bandwidth: '2.03 TB/s',
    fp16Perf: '312 TFLOPS (Tensor)',
    fp8Perf: 'N/A (INT8: 1,248 TOPS)',
    interconnect: 'NVLink 3.0 (600 GB/s) + 200Gb/s HDR InfiniBand',
    nodeConfig: '4x / 8x A100 SXM4 per chassis',
    targetWorkloadsVi: 'Nghiên cứu thị giác máy tính, Embedding vector số lượng lớn (VectraQuery PoC), xử lý dữ liệu song song.',
    targetWorkloadsEn: 'High-throughput computer vision, massive vector indexing (VectraQuery PoCs), parallel scientific computing.',
    status: 'Allocated',
    tdp: '400W per GPU',
  },
  {
    id: 't4',
    name: 'NVIDIA Tesla T4',
    family: 'Turing',
    vram: '16 GB',
    memoryType: 'GDDR6',
    bandwidth: '320 GB/s',
    fp16Perf: '65 TFLOPS (Tensor)',
    fp8Perf: 'INT8: 130 TOPS',
    interconnect: 'PCIe 3.0 x16',
    nodeConfig: 'Mật độ cao (Multi-GPU rack density)',
    targetWorkloadsVi: 'Inference biên chi phí thấp, kiểm thử vi mô WebAssembly sandbox, biên dịch shader AcherCanvas WebGL.',
    targetWorkloadsEn: 'Cost-effective edge inference, lightweight WebAssembly sandbox verification, AcherCanvas shader tests.',
    status: 'Ready',
    tdp: '70W (Passive Low-Power)',
  },
];

export const CPU_CLUSTER_SPECS: CpuClusterSpec[] = [
  {
    id: 'genoa-cluster',
    name: 'AMD EPYC 9654 High-Density Compute Node',
    architecture: 'Zen 4 (5nm)',
    coresPerNode: '192 Cores / 384 Threads (Dual-Socket)',
    ramPerNode: '1.5 TB DDR5-4800 ECC Registered',
    scratchStorage: '4x 3.84TB PCIe 5.0 NVMe RAID-0 (Striped ~28 GB/s read)',
    networkFabric: 'Dual 100GbE RoCE v2 Low-Latency',
    purposeVi: 'Biên dịch mã nguồn quy mô lớn, chạy mô phỏng mạng ngang hàng HyperSyncer, kiểm thử tải SuzFlow 500k ops/s.',
    purposeEn: 'Massive polyglot compilation, HyperSyncer P2P network simulations, high-load SuzFlow 500k ops/s profiling.',
    status: 'Active',
  },
  {
    id: 'xeon-cluster',
    name: 'Intel Xeon Platinum 8480+ Matrix Node',
    architecture: 'Sapphire Rapids (Intel 7)',
    coresPerNode: '112 Cores / 224 Threads',
    ramPerNode: '1.0 TB DDR5-4800 with Intel AMX (Advanced Matrix Extensions)',
    scratchStorage: '2x 7.68TB U.2 Enterprise NVMe',
    networkFabric: '100GbE Mellanox ConnectX-6',
    purposeVi: 'Thực thi kiểm tra vector hoá SIMD512, tăng tốc suy luận cục bộ VectraQuery trước khi biên dịch sang WASM.',
    purposeEn: 'AMX/AVX-512 tensor verification, host-side VectraQuery acceleration prior to WASM targeting.',
    status: 'Operational',
  },
];
