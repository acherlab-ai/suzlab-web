import React from 'react';
import { TranslationSchema } from '../data/translations32';
import { PageRoute } from '../types';
import { Calendar, CircleDashed, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface RoadmapPageProps {
  lang: string;
  onNavigate: (route: PageRoute) => void;
  translations: TranslationSchema;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  lang,
  onNavigate,
  translations,
}) => {
  const t = translations.roadmap;

  const stages = [
    {
      index: '01',
      title: t.stage1,
      desc: t.stage1Desc,
      statusText: t.stage1Status,
      isActive: true,
      isTarget: false,
    },
    {
      index: '02',
      title: t.stage2,
      desc: t.stage2Desc,
      statusText: t.stage2Status,
      isActive: true,
      isTarget: false,
    },
    {
      index: '03',
      title: t.stage3,
      desc: t.stage3Desc,
      statusText: t.stage3Status,
      isActive: false,
      isTarget: false,
    },
    {
      index: '04',
      title: t.stage4,
      desc: t.stage4Desc,
      statusText: t.stage4Status,
      isActive: false,
      isTarget: false,
    },
    {
      index: '05',
      title: t.stage5,
      desc: t.stage5Desc,
      statusText: t.stage5Status,
      isActive: false,
      isTarget: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12"
    >
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          EVOLUTION MILESTONES
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t.title}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Target Announcement Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-400/40 shadow-xl shadow-cyan-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-300 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block">
              Official Target
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              10/12/2026 (10 tháng 12, 2026)
            </h2>
          </div>
        </div>
        <div className="text-xs font-mono text-slate-400 sm:text-right">
          Múi giờ Việt Nam (UTC+7)
        </div>
      </div>

      {/* Roadmap Stages Timeline */}
      <div className="space-y-6">
        {stages.map((stage) => {
          return (
            <motion.div
              key={stage.index}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              className={`p-6 sm:p-7 rounded-2xl border transition-all ${
                stage.isTarget
                  ? 'bg-cyan-950/20 border-cyan-500/40 shadow-lg shadow-cyan-950/30'
                  : stage.isActive
                  ? 'lab-glass border-cyan-500/25'
                  : 'bg-slate-900/30 border-white/[0.06]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs px-2 py-1 rounded bg-slate-900 border border-white/[0.1] text-cyan-300 font-semibold shrink-0">
                    STAGE {stage.index}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {stage.title}
                  </h3>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-1.5 text-xs font-medium shrink-0">
                  {stage.isActive ? (
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  ) : stage.isTarget ? (
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  ) : (
                    <CircleDashed className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  )}
                  <span
                    className={
                      stage.isActive
                        ? 'text-cyan-300'
                        : stage.isTarget
                        ? 'text-amber-300 font-semibold'
                        : 'text-slate-400'
                    }
                  >
                    {stage.statusText}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-0 sm:pl-11">
                {stage.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Honesty Note */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.08] text-xs text-slate-400 leading-relaxed text-center">
        {t.note}
      </div>
    </motion.div>
  );
};
