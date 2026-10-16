import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'suzflow',
    slug: 'suzflow',
    title: 'SuzFlow',
    taglineVi: 'Engine xử lý luồng sự kiện phân tán cho micro-workflows với độ trễ siêu thấp.',
    taglineEn: 'Distributed event-stream micro-runtime for reactive workflows with ultra-low latency.',
    category: 'systems',
    status: 'In Development',
    tags: ['Rust', 'WebAssembly', 'Event-Driven', 'Reactive'],
    isFeatured: true,
    isDemoData: true,
    problemVi: 'Các kiến trúc serverless và pipeline hiện nay thường gặp vấn đề khởi động nguội (cold start), bộ nhớ tiêu tốn lớn và khó điều phối luồng dữ liệu song song dạng micro-event.',
    problemEn: 'Modern serverless and event pipelines suffer from heavy memory footprints, cold starts, and complex synchronization of parallel micro-streams.',
    solutionVi: 'SuzFlow sử dụng micro-kernel Rust kết hợp module WASM sandbox để thực thi các tác vụ xử lý luồng độc lập, đạt thời gian khởi tạo dưới 1.5ms.',
    solutionEn: 'SuzFlow leverages a minimal Rust micro-kernel coupled with a sandboxed WASM runtime to execute isolated stream processors with sub-1.5ms spin-up times.',
    architectureVi: 'Kiến trúc Lock-free Ring Buffer dựa trên Disruptor pattern, giao tiếp qua shared-memory bus và hỗ trợ hot-reload mã nhị phân WASM không downtime.',
    architectureEn: 'Lock-free Ring Buffer architecture inspired by Disruptor patterns, communicating over shared-memory bus with zero-downtime WASM binary hot-reloading.',
    featuresVi: [
      'Khởi động module WASM trong dưới 1.5ms',
      'Định tuyến sự kiện dạng Pub/Sub phi tập trung',
      'Cơ chế Backpressure tự động điều tiết theo tải CPU',
      'Tích hợp chuẩn OpenTelemetry không cần agent ngoài'
    ],
    featuresEn: [
      'Sub-1.5ms WASM module initialization',
      'Decentralized Pub/Sub event routing',
      'Automatic CPU-aware backpressure regulation',
      'Built-in OpenTelemetry instrumentation without external sidecars'
    ],
    techStack: ['Rust', 'WebAssembly', 'Tokio', 'FlatBuffers', 'eBPF'],
    demoType: 'cli',
    demoInteractiveData: {
      terminalCommands: [
        { cmd: 'suzflow init --profile edge-stream', output: '✓ Initialized workspace with WASM target (38.4 KB runtime kernel)' },
        { cmd: 'suzflow pipe ./handlers/transform.wasm --concurrency 4', output: '✓ Spawned 4 worker instances. Ready on IPC bus @ /tmp/suzflow.sock' },
        { cmd: 'suzflow benchmark --events 500000', output: '✓ 500,000 events processed in 218ms (2,293,577 ops/sec) | p99: 0.12ms' }
      ],
      statsLabels: [
        { labelVi: 'Thời gian khởi tạo', labelEn: 'Cold Start Time', value: '< 1.5ms' },
        { labelVi: 'Kích thước runtime', labelEn: 'Runtime Footprint', value: '38 KB' },
        { labelVi: 'Thông lượng ước tính', labelEn: 'Estimated Throughput', value: '2.2M ops/s' }
      ]
    },
    githubUrl: 'https://github.com/acherlab',
    announcementTarget: '2026-12-10'
  },
  {
    id: 'kuracli',
    slug: 'kuracli',
    title: 'KuraCLI',
    taglineVi: 'Công cụ dòng lệnh thế hệ mới hỗ trợ quản lý dự án, cấu hình môi trường và pipeline tự động.',
    taglineEn: 'Next-generation terminal companion for multi-repo orchestration and reproducible env stacks.',
    category: 'devtools',
    status: 'Beta',
    tags: ['Go', 'CLI', 'Developer Experience', 'Containers'],
    isFeatured: true,
    isDemoData: true,
    problemVi: 'Lập trình viên tiêu tốn nhiều thời gian thiết lập môi trường dev, đồng bộ biến môi trường giữa nhiều kho mã và ghi nhớ hàng chục lệnh cấu hình phức tạp.',
    problemEn: 'Developers waste hours syncing environment flags across poly-repos, managing toolchains, and memorizing verbose scripts.',
    solutionVi: 'KuraCLI cung cấp giao diện TUI trực quan, định nghĩa file cấu hình kura.hcl duy nhất cho toàn bộ quy trình phát triển và kiểm thử cục bộ.',
    solutionEn: 'KuraCLI unifies environment manifests via declarative kura.hcl files with interactive terminal UI and reproducible local sandboxes.',
    architectureVi: 'Xây dựng trên Go runtime tối ưu hóa, tích hợp BubbleTea TUI và hệ thống cắm plugin (extensible plug-in system) qua gRPC sockets.',
    architectureEn: 'Built on compiled Go runtime with BubbleTea TUI framework and dynamic plugin extension architecture over Unix domain sockets.',
    featuresVi: [
      'TUI tương tác trực tiếp với hỗ trợ phím tắt Vim/Emacs',
      'Đồng bộ biến môi trường cục bộ an toàn không rò rỉ secret',
      'Tự động phát hiện phiên bản runtime (Node, Go, Rust, Python)',
      'Hỗ trợ chế độ offline hoàn toàn'
    ],
    featuresEn: [
      'Interactive TUI with custom Vim/Emacs navigation keymaps',
      'Encrypted local secret sharing without plaintext leaks',
      'Zero-config runtime auto-detection for polyglot repos',
      'Full offline-first operational capability'
    ],
    techStack: ['Go', 'BubbleTea', 'gRPC', 'SQLite', 'Docker API'],
    demoType: 'cli',
    demoInteractiveData: {
      terminalCommands: [
        { cmd: 'kura status', output: 'Workspace: suzlab-core (3 active services: suzflow, acher-canvas, vectra)' },
        { cmd: 'kura env verify', output: '✓ All environment keys validated against schema. Zero secrets exposed.' },
        { cmd: 'kura sync --parallel', output: '✓ 3 repos synchronized cleanly. Ready for development.' }
      ],
      statsLabels: [
        { labelVi: 'Thời gian khởi động CLI', labelEn: 'Binary Startup', value: '4ms' },
        { labelVi: 'Kiến trúc hỗ trợ', labelEn: 'Architectures', value: 'x86_64 / arm64' },
        { labelVi: 'Mô hình phân phối', labelEn: 'Distribution', value: 'Single Binary' }
      ]
    },
    githubUrl: 'https://github.com/acherlab',
    announcementTarget: '2026-12-10'
  },
  {
    id: 'achercanvas',
    slug: 'achercanvas',
    title: 'AcherCanvas',
    taglineVi: 'Component Canvas vô tận tăng tốc phần cứng WebGL cho đồ thị dữ liệu và kiến trúc hệ thống.',
    taglineEn: 'Hardware-accelerated infinite canvas component for system architecture topologies and visual computing.',
    category: 'web',
    status: 'Research',
    tags: ['TypeScript', 'WebGL', 'Canvas', 'Graphics'],
    isFeatured: true,
    isDemoData: true,
    problemVi: 'Các thư viện canvas hiện nay trên web thường bị tụt khung hình nghiêm trọng khi hiển thị đồ thị phức tạp vượt quá 10,000 node.',
    problemEn: 'Existing web canvas and node libraries suffer severe frame drops and jank when rendering dynamic graphs above 10,000 vertices.',
    solutionVi: 'AcherCanvas ứng dụng render theo cụm WebGL instanced buffers và thuật toán quadtree spatial hashing để duy trì 60 FPS mượt mà.',
    solutionEn: 'AcherCanvas adopts WebGL instanced rendering pipelines and quadtree spatial hashing to sustain fluid 60 FPS on large-scale topologies.',
    architectureVi: 'Tách biệt luồng tính toán tương tác (Web Worker) và luồng render WebGL shader, hỗ trợ zoom mượt mà từ 0.05x đến 64x.',
    architectureEn: 'Decoupled Web Worker physics simulation paired with dedicated WebGL shader pipeline supporting smooth zoom ranges from 0.05x to 64x.',
    featuresVi: [
      'Hiển thị hơn 50,000 nodes ở tốc độ 60 khung hình/giây',
      'Hỗ trợ cử chỉ cảm ứng đa điểm và bàn di chuột mượt mà',
      'Hệ thống layout dạng Force-directed chạy trong Web Worker',
      'Xuất sơ đồ vector SVG và hình ảnh độ phân giải cao'
    ],
    featuresEn: [
      'Render 50,000+ interactive nodes at consistent 60 FPS',
      'Native pinch-to-zoom and gesture smoothing for trackpads',
      'Web-worker offloaded force-directed layout calculations',
      'Lossless SVG and high-DPI raster export engine'
    ],
    techStack: ['TypeScript', 'WebGL 2.0', 'GLSL', 'Web Workers', 'OffscreenCanvas'],
    demoType: 'canvas',
    demoInteractiveData: {
      terminalCommands: [],
      statsLabels: [
        { labelVi: 'Hiệu suất khung hình', labelEn: 'Target Framerate', value: '60 FPS' },
        { labelVi: 'Số node tối đa thử nghiệm', labelEn: 'Tested Node Capacity', value: '50,000+' },
        { labelVi: 'Render Pipeline', labelEn: 'Render Pipeline', value: 'WebGL 2.0' }
      ]
    },
    githubUrl: 'https://github.com/acherlab',
    announcementTarget: '2026-12-10'
  },
  {
    id: 'hypersyncer',
    slug: 'hypersyncer',
    title: 'HyperSyncer',
    taglineVi: 'Giao thức đồng bộ trạng thái ngang hàng (P2P) tối ưu cho ứng dụng Local-First.',
    taglineEn: 'Peer-to-peer state synchronization protocol purpose-built for resilient Local-First architectures.',
    category: 'systems',
    status: 'Research',
    tags: ['CRDT', 'P2P', 'Local-First', 'Networking'],
    isFeatured: false,
    isDemoData: true,
    problemVi: 'Đồng bộ hóa dữ liệu thời gian thực giữa nhiều thiết bị thường phụ thuộc vào máy chủ trung tâm đắt đỏ và gián đoạn khi mất kết nối mạng.',
    problemEn: 'Real-time collaborative sync remains bottlenecked by costly centralized cloud servers and fails entirely during network partitions.',
    solutionVi: 'HyperSyncer triển khai cấu trúc CRDTs (Conflict-free Replicated Data Types) nén qua WebRTC Datachannels, cho phép dữ liệu tự hội tụ khi tái kết nối.',
    solutionEn: 'HyperSyncer implements compressed delta-based CRDTs over authenticated WebRTC DataChannels with deterministic conflict resolution.',
    architectureVi: 'Mô hình đồ thị quan hệ Merkle DAG phân tán, hỗ trợ mã hóa đầu cuối (E2EE) và lưu trữ cục bộ qua IndexedDB/SQLite.',
    architectureEn: 'Distributed Merkle DAG ledger with authenticated end-to-end encryption (E2EE) and pluggable local storage adapters.',
    featuresVi: [
      'Đồng bộ tức thì qua mạng nội bộ LAN hoặc WebRTC',
      'Không yêu cầu máy chủ trung tâm lưu trữ dữ liệu',
      'Thuật toán giải quyết xung đột không mất mát dữ liệu',
      'Mã hóa đầu cuối dựa trên chuẩn ChaCha20-Poly1305'
    ],
    featuresEn: [
      'Instant local LAN discovery and WebRTC mesh sync',
      'Zero central server storage requirement',
      'Lossless deterministic conflict resolution',
      'End-to-end encryption based on ChaCha20-Poly1305'
    ],
    techStack: ['TypeScript', 'WebRTC', 'CRDTs', 'Merkle DAG', 'IndexedDB'],
    demoType: 'cli',
    demoInteractiveData: {
      terminalCommands: [
        { cmd: 'hypersync node init --name node-alpha', output: '✓ Node identity generated: 0x9f8c...42a (Curve25519)' },
        { cmd: 'hypersync mesh join --swarm acher-devnet', output: '✓ Connected to 3 peers over WebRTC direct mesh. Latency: 14ms' },
        { cmd: 'hypersync state delta-check', output: '✓ State converged: 1,482 operations reconciled with 0 conflicts.' }
      ],
      statsLabels: [
        { labelVi: 'Mô hình kết nối', labelEn: 'Topology', value: 'P2P Mesh' },
        { labelVi: 'Bảo mật', labelEn: 'Security', value: 'E2EE ChaCha20' },
        { labelVi: 'Cơ chế giải quyết', labelEn: 'Conflict Policy', value: 'State-based CRDT' }
      ]
    },
    githubUrl: 'https://github.com/acherlab',
    announcementTarget: '2026-12-10'
  },
  {
    id: 'vectraquery',
    slug: 'vectraquery',
    title: 'VectraQuery',
    taglineVi: 'Công cụ lập chỉ mục vector nhúng nhỏ gọn hoạt động trong trình duyệt và Edge Runtimes.',
    taglineEn: 'Ultra-compact in-memory vector indexing engine optimized for browser and edge WASM runtimes.',
    category: 'ai',
    status: 'In Development',
    tags: ['WebAssembly', 'HNSW', 'Vector Search', 'Edge Computing'],
    isFeatured: false,
    isDemoData: true,
    problemVi: 'Tìm kiếm tương đồng ngữ nghĩa vector thường đòi hỏi hạ tầng máy chủ cơ sở dữ liệu cồng kềnh, không phù hợp cho ứng dụng chạy phía máy khách hoặc thiết bị biên.',
    problemEn: 'Vector semantic search typically mandates expensive cloud databases, making client-side and edge privacy-preserving retrieval impractical.',
    solutionVi: 'VectraQuery biên dịch thuật toán HNSW (Hierarchical Navigable Small World) sang WebAssembly với kích thước chỉ 45KB và hỗ trợ SIMD tăng tốc.',
    solutionEn: 'VectraQuery compiles an optimized HNSW algorithm to a 45KB WebAssembly binary with explicit SIMD128 hardware acceleration.',
    architectureVi: 'Cấu trúc đồ thị nhiều tầng HNSW với bộ nhớ đệm FlatBuffers phân bổ tuần tự, tương thích trực tiếp với Float32Array trong JavaScript.',
    architectureEn: 'Multi-layer HNSW graph with contiguous FlatBuffers memory layout allowing zero-copy sharing with JavaScript Float32Array views.',
    featuresVi: [
      'Dung lượng nhị phân WASM siêu nhẹ (< 50KB)',
      'Tận dụng lệnh phần cứng WebAssembly SIMD',
      'Tìm kiếm top-K láng giềng trong dưới 3ms cho 100,000 vector',
      'Chạy hoàn toàn trên máy người dùng, bảo vệ quyền riêng tư 100%'
    ],
    featuresEn: [
      'Ultra-lightweight WASM footprint (< 50KB)',
      'Hardware acceleration via WebAssembly SIMD128',
      'Sub-3ms top-K retrieval over 100,000 embeddings',
      'Runs 100% locally on user hardware for total privacy'
    ],
    techStack: ['Rust', 'WebAssembly', 'SIMD', 'HNSW', 'TypeScript'],
    demoType: 'cli',
    demoInteractiveData: {
      terminalCommands: [
        { cmd: 'vectra index create --dim 384 --metric cosine', output: '✓ Created HNSW index with 384 dimensions (SIMD enabled)' },
        { cmd: 'vectra insert --batch ./embeddings.f32', output: '✓ Indexed 100,000 vectors in 1.42s' },
        { cmd: 'vectra search --query-sample --k 5', output: '✓ Top 5 matches found in 2.14ms (cosine distance: 0.082 ... 0.119)' }
      ],
      statsLabels: [
        { labelVi: 'Độ trễ tìm kiếm Top-5', labelEn: 'Query Latency (Top-5)', value: '2.1ms' },
        { labelVi: 'Kích thước WASM', labelEn: 'Binary Size', value: '45 KB' },
        { labelVi: 'Tăng tốc phần cứng', labelEn: 'Hardware Boost', value: 'WASM SIMD128' }
      ]
    },
    githubUrl: 'https://github.com/acherlab',
    announcementTarget: '2026-12-10'
  },
  {
    id: 'prismui',
    slug: 'prismui',
    title: 'PrismUI Design System',
    taglineVi: 'Hệ thống thiết kế vi mô và tokens cho giao diện công nghệ chuyên sâu, bảng điều khiển và laboratory tools.',
    taglineEn: 'Design system tokens and micro-interaction foundations for deep-tech tools and research consoles.',
    category: 'web',
    status: 'In Development',
    tags: ['Design System', 'Accessibility', 'Tailwind', 'Motion'],
    isFeatured: false,
    isDemoData: true,
    problemVi: 'Giao diện công cụ lập trình thường rơi vào 2 thái cực: quá thô sơ đơn điệu hoặc quá lạm dụng hiệu ứng gây mất tập trung và giảm hiệu năng.',
    problemEn: 'Developer tools often swing between raw unstyled utility and over-decorated interfaces that slow down real productivity.',
    solutionVi: 'PrismUI xác lập chuẩn mực thị giác: độ tương phản WCAG AAA, cấu trúc bố cục 1440px chuẩn xác, chuyển động dưới 180ms và triệt tiêu badge rác.',
    solutionEn: 'PrismUI codifies intentional restraint: WCAG AAA legibility, precise typographic scales, sub-180ms feedback, and zero-pill discipline.',
    architectureVi: 'Kiến trúc CSS Variables phân tầng, hỗ trợ chế độ tương phản cao (High Contrast Mode) và tương thích hoàn toàn chuẩn WCAG 2.2.',
    architectureEn: 'Layered token architecture driven by semantic CSS custom properties with native support for high-contrast accessibility modes.',
    featuresVi: [
      'Hệ thống màu 60-30-10 kiểm soát độ chói mắt ban đêm',
      'Hỗ trợ chế độ giảm chuyển động prefers-reduced-motion',
      'Thư viện components không phụ thuộc thư viện bên ngoài cồng kềnh',
      'Định dạng số liệu Tabular Numerals chuẩn xác'
    ],
    featuresEn: [
      'Disciplined 60-30-10 palette minimizing eye fatigue',
      'Native prefers-reduced-motion compliance',
      'Zero bloated third-party runtime dependencies',
      'Tabular figures alignment for critical metrics'
    ],
    techStack: ['Tailwind CSS', 'CSS Custom Properties', 'TypeScript', 'A11y'],
    demoType: 'interactive',
    demoInteractiveData: {
      terminalCommands: [],
      statsLabels: [
        { labelVi: 'Độ tương phản', labelEn: 'Contrast Ratio', value: 'WCAG AAA' },
        { labelVi: 'Thời gian tương tác', labelEn: 'Feedback Latency', value: '≤ 150ms' },
        { labelVi: 'Khối lượng Bundle', labelEn: 'Core Size', value: '8.2 KB' }
      ]
    },
    githubUrl: 'https://github.com/acherlab',
    announcementTarget: '2026-12-10'
  }
];

export const RESEARCH_AREAS = [
  {
    id: 'devtools',
    iconName: 'Terminal',
    titleVi: 'Developer Tooling & CLI',
    titleEn: 'Developer Tooling & CLI',
    descriptionVi: 'Xây dựng các công cụ dòng lệnh, tự động hóa môi trường phát triển và tối ưu trải nghiệm lập trình viên hàng ngày.',
    descriptionEn: 'Engineering high-speed CLI companions, environment orchestration, and ergonomic workflows for software engineers.'
  },
  {
    id: 'systems',
    iconName: 'Cpu',
    titleVi: 'Distributed Systems & Runtime',
    titleEn: 'Distributed Systems & Runtimes',
    descriptionVi: 'Thử nghiệm kiến trúc xử lý luồng, micro-kernels WebAssembly và các giao thức mạng ngang hàng P2P cục bộ.',
    descriptionEn: 'Investigating reactive event engines, lightweight WebAssembly kernels, and resilient peer-to-peer data synchronization.'
  },
  {
    id: 'web',
    iconName: 'Layers',
    titleVi: 'Creative Web & Interfaces',
    titleEn: 'Creative Web & Interfaces',
    descriptionVi: 'Khám phá tương tác canvas vô tận, kết xuất WebGL và hệ thống thiết kế có chiều sâu thị giác phục vụ khoa học máy tính.',
    descriptionEn: 'Exploring infinite visual workspaces, WebGL hardware rendering, and disciplined design tokens for technical computing.'
  },
  {
    id: 'ai',
    iconName: 'Sparkles',
    titleVi: 'Edge Computing & AI Prototypes',
    titleEn: 'Edge Computing & AI Prototypes',
    descriptionVi: 'Nghiên cứu các thuật toán chỉ mục vector nhúng, suy luận cục bộ bảo vệ quyền riêng tư trên thiết bị người dùng.',
    descriptionEn: 'Experimenting with compact vector search, in-browser embeddings, and privacy-preserving client-side computing.'
  }
];
