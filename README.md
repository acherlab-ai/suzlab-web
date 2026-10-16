# SuzLab — Official Project Showcase Website
> *“Build. Experiment. Evolve. — Không ngừng thử nghiệm. Không ngừng kiến tạo.”*

Website giới thiệu chính thức cho phòng thí nghiệm công nghệ **SuzLab**, một tổ chức nghiên cứu và phát triển phần mềm thuộc hệ sinh thái **AcherLab** ([acherlab.xyz](https://acherlab.xyz)).

- **Tên miền chính thức:** [https://suzlab.com](https://suzlab.com)
- **Hệ sinh thái:** [AcherLab](https://acherlab.xyz)
- **Email liên hệ:** [admin@acherlab.xyz](mailto:admin@acherlab.xyz)
- **Ngày dự kiến công bố chính thức:** **10/12/2026** (10 tháng 12, 2026 - Múi giờ Việt Nam UTC+7)

---

## 1. Mục tiêu & Nguyên tắc thiết kế

1. **Minh bạch & Trung thực tuyệt đối:**
   - SuzLab không tự tạo số liệu người dùng ảo, đối tác thương mại hư cấu hay giải thưởng chưa kiểm chứng.
   - Các dự án hiện tại là các nguyên mẫu đang nghiên cứu trong phòng lab (**Concept Previews**), được gắn nhãn minh bạch.
2. **Phong cách thị giác Linear & Windows Fluent:**
   - Dark mode là giao diện mặc định với tông màu xanh cyan, sky blue và than obsidian (`#07090e`).
   - Glassmorphism có kiểm soát (`backdrop-blur-md`, viền hairline `border-white/[0.08]`).
   - Digital laboratory canvas mô phỏng các node liên kết di chuyển mượt mà và tương tác nhẹ theo con trỏ chuột.
   - Hỗ trợ chuẩn truy cập `prefers-reduced-motion`.
   - **Zero-Pill Discipline:** Không lạm dụng chip badge màu mè cho metadata tĩnh; sử dụng dấu phân tách typographic (`·`, `/`).
3. **Hệ thống tự động nhận diện ngôn ngữ theo IP (32 ngôn ngữ toàn cầu):**
   - Tự động phát hiện quốc gia và ngôn ngữ bản địa của người dùng thông qua Geo-IP (`https://ipapi.co/json/`) kết hợp dự phòng `navigator.languages`.
   - Hiển thị thông báo nhỏ gọn xác nhận ngôn ngữ cùng nút chuyển đổi nhanh sang bất kỳ ngôn ngữ nào trong 32 thứ tiếng (Tiếng Việt, English, 日本語, 한국어, 简体/繁體中文, Français, Deutsch, Español, Português, v.v.).
   - Hỗ trợ đầy đủ văn bản viết từ phải sang trái (RTL) cho tiếng Ả Rập và Do Thái.

4. **Hạ tầng tính toán quy mô lớn (NVIDIA GPU H200 / H100 / A100 / T4 & CPU EPYC/Xeon):**
   - Giới thiệu chi tiết năng lực phần cứng điện toán đồ sộ của SuzLab phục vụ hệ sinh thái AcherLab:
     - **NVIDIA H200 NVL (141GB HBM3e):** Băng thông 4.8 TB/s cho mô hình ngôn ngữ lớn và suy luận ngữ cảnh dài (Long-Context KV-Cache).
     - **NVIDIA H100 SXM5 (80GB HBM3):** Tăng tốc Transformer Engine và huấn luyện phân tán.
     - **NVIDIA A100 SXM4 (80GB HBM2e):** Nghiên cứu thị giác máy tính và tìm kiếm vector (VectraQuery).
     - **NVIDIA Tesla T4 (16GB GDDR6):** Nút mật độ cao tối ưu cho suy luận biên và kiểm thử WebAssembly sandbox.
     - **AMD EPYC 9654 (192 Cores / 384 Threads):** 1.5 TB RAM DDR5 ECC cùng mảng NVMe RAID-0 tốc độ ~28 GB/s.
   - Bộ mô phỏng Topo máy chủ thực tế (`ComputeClusterVisualizer`) với đo lường mức tải, nhiệt độ, công suất và dự án đang chạy.
   - Form đăng ký cấp phát tài nguyên tính toán (`ComputeQuotaModal`) cho kỹ sư và nhà nghiên cứu trong hệ sinh thái.

5. **Hiệu ứng chuyển cảnh & Lướt cuộn chuẩn Tier-1 (Linear / Vercel / Apple):**
   - Thanh tiến trình cuộn trang mượt mà ở cạnh trên màn hình (`scaleX` spring physics).
   - Hiệu ứng xuất hiện mượt mà khi cuộn tới (`whileInView`, staggered reveals).
   - Thẻ card Bento tương tác theo con trỏ chuột (`SpotlightCard` cursor tracking glow).
   - Bộ mô phỏng tương tác mã nguồn và dòng lệnh trực tiếp (`InteractiveTerminalPreview`) ngay trên Hero.
   - Nút nổi quay về đầu trang (Back to Top) mượt mà.
   - Chuyển trang không giật nhịp với `AnimatePresence`.

---

## 2. Kiến trúc & Cấu trúc thư mục

```
/
├── index.html                   # HTML entry point, SEO Meta, Open Graph, Favicon, Schema JSON-LD
├── metadata.json                # AI Studio Metadata
├── package.json                 # Dependencies & Build scripts
├── tsconfig.json                # TypeScript strict configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── README.md                    # Tài liệu hướng dẫn và triển khai
└── src/
    ├── main.tsx                 # React DOM root entry
    ├── App.tsx                  # Root App component, URL hash routing, modal state
    ├── index.css                # Global CSS, Tailwind v4, laboratory mesh styles, a11y
    ├── types/
    │   └── index.ts             # TypeScript interfaces cho Project, Language, Route
    ├── data/
    │   ├── projectsData.ts      # Danh mục dự án nghiên cứu SuzLab (modular & extensible)
    │   └── translations.ts      # Toàn bộ từ điển song ngữ VI/EN
    ├── components/
    │   ├── Header.tsx           # Thanh điều hướng chuẩn Top Bar Contract (3 zones)
    │   ├── Footer.tsx           # Footer chi tiết, link AcherLab và copyright
    │   ├── SuzLabLogo.tsx       # Logo SVG hình học phòng lab SuzLab
    │   ├── Countdown.tsx        # Bộ đếm ngược đến 10/12/2026 (UTC+7)
    │   ├── HeroLabCanvas.tsx    # Canvas đồ họa các node phân tán tương tác
    │   ├── ProjectCard.tsx      # Thẻ card dự án cao cấp (Zero-pill)
    │   ├── ProjectModal.tsx     # Chi tiết dự án, terminal CLI runner mô phỏng
    │   └── ContactForm.tsx      # Form liên hệ kèm thông báo Demo Mode & Mailto
    └── pages/
        ├── HomePage.tsx         # Trang chủ (Hero, Overview, Areas, Projects, Community)
        ├── ProjectsPage.tsx     # Danh mục tìm kiếm & lọc theo danh mục, trạng thái
        ├── AboutPage.tsx        # Triết lý vận hành, chu trình 4 bước, quan hệ với AcherLab
        ├── RoadmapPage.tsx      # 5 giai đoạn phát triển hướng tới 10/12/2026
        ├── ContactPage.tsx      # Trang liên hệ chính thức
        └── NotFoundPage.tsx     # Trang lỗi 404
```

---

## 3. Các dự án nghiên cứu mẫu (Concept Previews)

Hệ thống được thiết kế theo cấu trúc dữ liệu tách biệt (`src/data/projectsData.ts`), giúp thêm mới hoặc sửa đổi dự án chỉ bằng cách bổ sung một đối tượng TypeScript:

1. **SuzFlow:** Engine xử lý luồng sự kiện phân tán cho micro-workflows với WASM sandbox và độ trễ cực thấp.
2. **KuraCLI:** Công cụ dòng lệnh TUI quản lý môi trường phát triển và cấu hình tái lập (reproducible env stacks).
3. **AcherCanvas:** Thư viện Canvas vô tận tăng tốc phần cứng WebGL hỗ trợ hiển thị 50,000+ nodes mượt mà ở 60 FPS.
4. **HyperSyncer:** Giao thức đồng bộ trạng thái ngang hàng P2P qua CRDTs cho ứng dụng Local-First.
5. **VectraQuery:** Công cụ lập chỉ mục vector HNSW nhúng nhỏ gọn (< 50KB) biên dịch sang WebAssembly SIMD.
6. **PrismUI:** Hệ thống thiết kế vi mô và tokens cho giao diện công nghệ chuyên sâu và bảng điều khiển.

---

## 4. Hướng dẫn chạy và phát triển cục bộ

### Cài đặt dependencies
```bash
npm install
```

### Chạy máy chủ phát triển
```bash
npm run dev
```
Truy cập ứng dụng tại `http://localhost:3000`.

### Kiểm tra cú pháp và kiểu dữ liệu TypeScript
```bash
npm run lint
```

### Đóng gói ứng dụng (Build Production)
```bash
npm run build
```
Thư mục sản phẩm tĩnh sẽ được tạo tại `/dist`.

---

## 5. Hướng dẫn cấu hình tên miền tùy chỉnh (suzlab.com)

Để đưa website lên tên miền chính thức **https://suzlab.com**:

### Bước 1: Build mã nguồn tĩnh
Chạy lệnh `npm run build` để xuất toàn bộ static bundle vào thư mục `dist/`.

### Bước 2: Triển khai lên máy chủ lưu trữ (Hosting)
Có thể đưa thư mục `dist/` lên các nền tảng hạ tầng hiện đại:
- **Cloudflare Pages:** Kết nối kho mã GitHub của dự án, thiết lập Build command: `npm run build`, Output directory: `dist`.
- **Vercel / Netlify:** Import repository, chọn framework preset: `Vite`, Build command: `npm run build`.
- **Google Cloud Storage / Firebase Hosting:** 
  ```bash
  firebase init hosting
  # Chọn thư mục công khai: dist
  firebase deploy --only hosting
  ```

### Bước 3: Cấu hình bản ghi DNS tại nhà cung cấp tên miền cho `suzlab.com`
Thêm các bản ghi DNS sau vào bảng quản lý DNS của tên miền `suzlab.com`:
- **Apex domain (suzlab.com):**
  - Loại: `A` hoặc `CNAME` (tùy theo hướng dẫn của nhà cung cấp hosting).
- **Subdomain `www` (www.suzlab.com):**
  - Loại: `CNAME` trỏ về `suzlab.com` hoặc CNAME của hosting.
- **Chứng chỉ bảo mật SSL/TLS:** Bật tự động SSL (Let's Encrypt / Cloudflare Universal SSL) để kích hoạt giao thức HTTPS.

---

## 6. Liên hệ & Đóng góp

- **Email:** [admin@acherlab.xyz](mailto:admin@acherlab.xyz)
- **Ecosystem:** [https://acherlab.xyz](https://acherlab.xyz)
- **Website:** [https://suzlab.com](https://suzlab.com)
