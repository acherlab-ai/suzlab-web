import React from 'react';
import { HeroLabCanvas } from '../components/HeroLabCanvas';
import { Countdown } from '../components/Countdown';
import { SuzLabLogo } from '../components/SuzLabLogo';
import { ProjectCard } from '../components/ProjectCard';
import { SpotlightCard } from '../components/SpotlightCard';
import { InteractiveTerminalPreview } from '../components/InteractiveTerminalPreview';
import { TranslationSchema } from '../data/translations32';
import { PROJECTS_DATA, RESEARCH_AREAS } from '../data/projectsData';
import { PageRoute, Project } from '../types';
import { ComputeClusterVisualizer } from '../components/ComputeClusterVisualizer';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Layers, 
  Sparkles, 
  ExternalLink, 
  Compass, 
  ShieldCheck, 
  Activity, 
  Code2, 
  Workflow,
  Zap,
  Server
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  lang: string;
  onNavigate: (route: PageRoute) => void;
  onOpenProjectModal: (project: Project) => void;
  translations: TranslationSchema;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onOpenProjectModal,
  translations,
}) => {
  const heroT = translations.hero;
  const overviewT = translations.overview;
  const researchT = translations.research;
  const featuredT = translations.featured;
  const experimentsT = translations.experiments;
  const roadmapPreviewT = translations.roadmapPreview;
  const communityT = translations.community;

  const featuredProjects = PROJECTS_DATA.filter((p) => p.isFeatured);
  const experimentProjects = PROJECTS_DATA.filter((p) => !p.isFeatured);

  const getAreaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-400" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <div className="relative overflow-hidden space-y-28 sm:space-y-36">
      
      {/* HERO SECTION */}
      <section className="relative pt-10 sm:pt-20 pb-12 sm:pb-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Lab Canvas Animation Layer */}
        <HeroLabCanvas />

        {/* Ambient Top Spotlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-cyan-500/12 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-7">
          {/* Logo & Lab Anchor */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/[0.1] text-xs text-slate-300 font-medium shadow-inner backdrop-blur-md"
          >
            <SuzLabLogo className="w-4 h-4 text-cyan-400" />
            <span className="tracking-wider uppercase font-mono">{heroT.badge}</span>
          </motion.div>

          {/* Primary Titles with Kinetic Stagger */}
          <div className="space-y-3 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white text-balance leading-[1.08]"
            >
              {heroT.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400"
            >
              {heroT.subheadline}
            </motion.p>
          </div>

          {/* Intro Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {heroT.description}
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
          >
            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <span>{heroT.ctaExplore}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl lab-glass border border-white/[0.1] hover:border-cyan-500/40 hover:bg-white/[0.05] text-slate-200 font-semibold text-sm transition-all"
            >
              {heroT.ctaAbout}
            </button>
          </motion.div>

          {/* Target Milestone Countdown to 10/12/2026 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Countdown translations={translations} />
          </motion.div>

          {/* Tier-1 Tech Showcase: Interactive Terminal / Workbench Preview */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-6"
          >
            <InteractiveTerminalPreview />
          </motion.div>
        </div>
      </section>


      {/* SECTION 1: OVERVIEW & PILLARS */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            {overviewT.kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance">
            {overviewT.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {overviewT.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpotlightCard className="p-6 space-y-3">
            <div className="p-3 w-fit rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">{overviewT.pillar1Title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {overviewT.pillar1Desc}
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 space-y-3">
            <div className="p-3 w-fit rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">{overviewT.pillar2Title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {overviewT.pillar2Desc}
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 space-y-3">
            <div className="p-3 w-fit rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">{overviewT.pillar3Title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {overviewT.pillar3Desc}
            </p>
          </SpotlightCard>
        </div>
      </motion.section>


      {/* SECTION 2: RESEARCH AREAS (BENTO STYLE) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            {researchT.kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance">
            {researchT.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {researchT.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESEARCH_AREAS.map((area) => (
            <SpotlightCard
              key={area.id}
              className="p-6 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-2.5 w-fit rounded-xl bg-slate-900 border border-white/[0.08]">
                  {getAreaIcon(area.iconName)}
                </div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'vi' ? area.titleVi : area.titleEn}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'vi' ? area.descriptionVi : area.descriptionEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.05] text-[11px] font-mono text-cyan-400/90 flex items-center justify-between">
                <span>Discipline</span>
                <span>Active R&D</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </motion.section>


      {/* SECTION 3: FEATURED PROJECTS */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              {featuredT.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {featuredT.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              {featuredT.description}
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="self-start sm:self-auto text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{featuredT.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              onOpenDetails={onOpenProjectModal}
            />
          ))}
        </div>
      </motion.section>


      {/* SECTION: GPU & ACCELERATED COMPUTE INFRASTRUCTURE */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              HẠ TẦNG TÍNH TOÁN HIỆU NĂNG CAO · ACHERLAB
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {lang === 'vi' ? 'Cụm GPU Quy Mô Lớn (H200, H100, A100, T4) & CPU Mật Độ Cao' : 'Massive GPU Clusters (H200, H100, A100, T4) & High-Density CPU'}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {lang === 'vi'
                ? 'SuzLab trang bị hạ tầng phần cứng điện toán đồ sộ với các dòng GPU tối tân nhất từ NVIDIA phục vụ huấn luyện mô hình, kiểm thử vi kiến trúc WASM và xử lý luồng dữ liệu song song.'
                : 'SuzLab leverages state-of-the-art NVIDIA GPU compute and dense AMD EPYC clusters powering foundation research, WASM micro-runtimes, and distributed stream processors.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('compute')}
            className="self-start sm:self-auto text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{lang === 'vi' ? 'Xem chi tiết thông số cụm' : 'View Full Compute Specs'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Cluster Visualizer */}
        <ComputeClusterVisualizer />
      </motion.section>


      {/* SECTION 4: IN-DEVELOPMENT EXPERIMENTS */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-8 sm:p-10 rounded-2xl lab-glass border border-white/[0.08] relative overflow-hidden">
          <div className="space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              {experimentsT.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {experimentsT.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              {experimentsT.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experimentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                lang={lang}
                onOpenDetails={onOpenProjectModal}
              />
            ))}
          </div>
        </div>
      </motion.section>


      {/* SECTION 5: ROADMAP PREVIEW */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#07090e] border border-cyan-500/25 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                {roadmapPreviewT.kicker}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {roadmapPreviewT.title}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('roadmap')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5"
            >
              <span>{roadmapPreviewT.viewFullRoadmap}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {roadmapPreviewT.description}
          </p>

          {/* 5 Stages Horizontal Walkthrough */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-cyan-500/30">
              <span className="text-[11px] font-mono text-cyan-400 block mb-1">01. Research</span>
              <span className="text-xs font-medium text-slate-200">Xác lập bài toán & tiêu chuẩn</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-cyan-500/30">
              <span className="text-[11px] font-mono text-cyan-400 block mb-1">02. Prototype</span>
              <span className="text-xs font-medium text-slate-200">Hiện thực hóa PoC vi mô</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.08]">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">03. Development</span>
              <span className="text-xs font-medium text-slate-300">Tối ưu hiệu năng & API</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.08]">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">04. Testing</span>
              <span className="text-xs font-medium text-slate-300">Kiểm thử diện hẹp nội bộ</span>
            </div>
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-400/50 relative">
              <span className="text-[11px] font-mono text-cyan-300 font-bold block mb-1">05. Launch</span>
              <span className="text-xs font-bold text-white">10/12/2026</span>
            </div>
          </div>
        </div>
      </motion.section>


      {/* SECTION 6: COMMUNITY INVITATION & ECOSYSTEM */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          {communityT.kicker}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
          {communityT.title}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {communityT.description}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-md shadow-cyan-500/20"
          >
            {communityT.ctaContact}
          </button>

          <a
            href="https://acherlab.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl lab-glass border border-white/[0.1] hover:border-cyan-500/40 text-slate-200 font-medium text-sm transition-all inline-flex items-center justify-center gap-2 group"
          >
            <span>{communityT.ecosystemLinkText}</span>
            <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </motion.section>

    </div>
  );
};
