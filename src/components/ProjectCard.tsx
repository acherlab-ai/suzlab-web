import React, { useState } from 'react';
import { Project } from '../types';
import { SpotlightCard } from './SpotlightCard';
import { ArrowRight, Copy, Check, Terminal, Cpu, Layers, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  lang: string;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  lang,
  onOpenDetails,
}) => {
  const [copied, setCopied] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'devtools':
        return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'systems':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'web':
        return <Layers className="w-5 h-5 text-blue-400" />;
      case 'ai':
      default:
        return <Sparkles className="w-5 h-5 text-teal-400" />;
    }
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#project-${project.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const statusLabel = {
    'Research': lang === 'vi' ? 'Nghiên cứu' : 'Research',
    'In Development': lang === 'vi' ? 'Đang phát triển' : 'In Development',
    'Beta': lang === 'vi' ? 'Thử nghiệm Beta' : 'Beta',
    'Concept Demo': 'Concept Demo',
  }[project.status];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="h-full"
    >
      <SpotlightCard
        onClick={() => onOpenDetails(project)}
        className="group relative flex flex-col justify-between p-6 h-full cursor-pointer"
        spotlightColor="rgba(34, 211, 238, 0.14)"
      >
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-cyan-300 uppercase tracking-wider text-[11px]">
                {project.category}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">{statusLabel}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-cyan-400/80 text-[11px]">Preview</span>
            </div>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              title={lang === 'vi' ? 'Sao chép liên kết dự án' : 'Copy project link'}
              aria-label={lang === 'vi' ? `Sao chép liên kết ${project.title}` : `Copy link for ${project.title}`}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Header: Icon & Title */}
          <div className="flex items-start gap-3 mb-2.5">
            <div className="p-2 rounded-xl bg-slate-900 border border-white/[0.08] shrink-0 mt-0.5 group-hover:border-cyan-400/40 transition-colors">
              {getCategoryIcon(project.category)}
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
              {project.title}
            </h3>
          </div>

          {/* Tagline / Description */}
          <p className="text-sm text-slate-300 leading-relaxed mb-5">
            {lang === 'vi' ? project.taglineVi : project.taglineEn}
          </p>

          {/* Unboxed Tech Stack List */}
          <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap mb-4">
            <span className="text-slate-500 font-medium text-[11px]">Stack:</span>
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <React.Fragment key={tech}>
                {idx > 0 && <span aria-hidden="true" className="text-slate-600">/</span>}
                <span className="text-slate-300 font-mono text-[11px]">{tech}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Card Action Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs mt-2">
          <span className="text-slate-500 font-mono text-[11px]">
            Target: 10/12/2026
          </span>
          <div className="inline-flex items-center gap-1 font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
            <span>{lang === 'vi' ? 'Xem chi tiết' : 'Details'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};
