import React from 'react';
import { TranslationSchema } from '../data/translations32';
import { PageRoute } from '../types';
import { SuzLabLogo } from '../components/SuzLabLogo';
import { SpotlightCard } from '../components/SpotlightCard';
import { ExternalLink, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  lang: string;
  onNavigate: (route: PageRoute) => void;
  translations: TranslationSchema;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  lang,
  onNavigate,
  translations,
}) => {
  const t = translations.about;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16"
    >
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/[0.08] text-xs font-mono text-cyan-400">
          <SuzLabLogo className="w-3.5 h-3.5" />
          <span>RESEARCH & ENGINEERING PHILOSOPHY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t.title}
        </h1>
        <p className="text-lg text-cyan-300 font-medium">
          {t.tagline}
        </p>
      </div>

      {/* Mission & Positioning */}
      <SpotlightCard className="p-8 sm:p-10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {t.missionTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.missionDesc}
        </p>
      </SpotlightCard>

      {/* Relationship with AcherLab */}
      <SpotlightCard className="p-8 sm:p-10 bg-gradient-to-br from-slate-900/90 to-[#07090e] border-cyan-500/20 space-y-5">
        <div className="flex items-center gap-3 text-cyan-400">
          <Cpu className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t.ecosystemTitle}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.ecosystemDesc}
        </p>
        <div>
          <a
            href="https://acherlab.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 group"
          >
            <span>Khám phá hệ sinh thái AcherLab (acherlab.xyz)</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </SpotlightCard>

      {/* The 4-Step Experimentation Cycle */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t.processTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SpotlightCard className="p-6 space-y-2">
            <h3 className="text-base font-bold text-cyan-300">{t.step1}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.step1Desc}</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 space-y-2">
            <h3 className="text-base font-bold text-sky-300">{t.step2}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.step2Desc}</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 space-y-2">
            <h3 className="text-base font-bold text-blue-300">{t.step3}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.step3Desc}</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 space-y-2">
            <h3 className="text-base font-bold text-teal-300">{t.step4}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.step4Desc}</p>
          </SpotlightCard>
        </div>
      </section>

      {/* Transparency Guarantee */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-emerald-500/20 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-white">
            {t.transparencyTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.transparencyDesc}
          </p>
        </div>
      </div>

      {/* Explore CTAs */}
      <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-slate-400">
          Target Announcement: <strong className="text-white">10/12/2026</strong>
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Khám phá dự án</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('roadmap')}
            className="px-5 py-2.5 rounded-xl lab-glass border border-white/[0.1] text-slate-200 hover:text-white font-medium text-xs transition-colors"
          >
            Xem lộ trình
          </button>
        </div>
      </div>
    </motion.div>
  );
};
