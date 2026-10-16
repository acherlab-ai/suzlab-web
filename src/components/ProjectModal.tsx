import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { TranslationSchema } from '../data/translations32';
import { X, Copy, Check, ExternalLink, Terminal, Play, Cpu, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: Project | null;
  lang: string;
  onClose: () => void;
  translations: TranslationSchema;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  lang,
  onClose,
  translations,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeCliIndex, setActiveCliIndex] = useState(0);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [isRunningSim, setIsRunningSim] = useState(false);

  const t = translations.projectModal;

  useEffect(() => {
    if (project && project.demoInteractiveData?.terminalCommands) {
      setSimulatedLogs([
        `$ ${project.demoInteractiveData.terminalCommands[0].cmd}`,
        project.demoInteractiveData.terminalCommands[0].output
      ]);
      setActiveCliIndex(0);
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#project-${project.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRunNextCommand = () => {
    if (!project.demoInteractiveData?.terminalCommands) return;
    const commands = project.demoInteractiveData.terminalCommands;
    const nextIndex = (activeCliIndex + 1) % commands.length;
    setIsRunningSim(true);

    setTimeout(() => {
      setSimulatedLogs(prev => [
        ...prev,
        `$ ${commands[nextIndex].cmd}`,
        commands[nextIndex].output
      ]);
      setActiveCliIndex(nextIndex);
      setIsRunningSim(false);
    }, 280);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'devtools':
        return <Terminal className="w-6 h-6 text-cyan-400" />;
      case 'systems':
        return <Cpu className="w-6 h-6 text-sky-400" />;
      case 'web':
        return <Layers className="w-6 h-6 text-blue-400" />;
      case 'ai':
      default:
        return <Sparkles className="w-6 h-6 text-teal-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl my-8 bg-[#0a0e1a] border border-white/[0.12] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-start gap-4 pr-12 mb-6">
            <div className="p-3 bg-slate-900 border border-white/[0.08] rounded-xl shrink-0">
              {getCategoryIcon(project.category)}
            </div>
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1 flex-wrap">
                <span className="text-cyan-400 font-semibold uppercase">{project.category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{project.status}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="font-mono text-cyan-400/90">Preview</span>
              </div>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-1">
                {lang === 'vi' ? project.taglineVi : project.taglineEn}
              </p>
            </div>
          </div>

          {/* Project Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs mb-8">
            <div>
              <span className="text-slate-500 block">{t.status}</span>
              <span className="font-medium text-slate-200">{project.status}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{t.targetDate}</span>
              <span className="font-mono text-cyan-300 font-semibold">{project.announcementTarget}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Ecosystem</span>
              <a href="https://acherlab.xyz" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-cyan-400 flex items-center gap-1">
                AcherLab <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div>
              <span className="text-slate-500 block">Actions</span>
              <button
                onClick={handleCopyLink}
                className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy link'}</span>
              </button>
            </div>
          </div>

          {/* Deep Dive Sections: Problem vs Solution */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                  {t.problem}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === 'vi' ? project.problemVi : project.problemEn}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/25 border border-cyan-500/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                  {t.solution}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {lang === 'vi' ? project.solutionVi : project.solutionEn}
                </p>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/[0.06]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                {t.architecture}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'vi' ? project.architectureVi : project.architectureEn}
              </p>
            </div>

            {/* Interactive Simulation / Terminal CLI */}
            {project.demoInteractiveData?.terminalCommands && project.demoInteractiveData.terminalCommands.length > 0 && (
              <div className="rounded-xl border border-white/[0.1] bg-[#050811] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/[0.08] text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="font-mono text-slate-400 ml-2">{project.slug}-sandbox</span>
                  </div>
                  <button
                    onClick={handleRunNextCommand}
                    disabled={isRunningSim}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 rounded font-mono font-medium transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{t.runCommand}</span>
                  </button>
                </div>

                {/* Terminal Output */}
                <div className="p-4 font-mono text-xs sm:text-[13px] text-slate-300 space-y-1.5 max-h-48 overflow-y-auto">
                  {simulatedLogs.map((line, idx) => (
                    <div
                      key={idx}
                      className={line.startsWith('$') ? 'text-cyan-400 font-semibold pt-1' : 'text-slate-300 pl-2'}
                    >
                      {line}
                    </div>
                  ))}
                  {isRunningSim && (
                    <div className="text-slate-500 italic animate-pulse">Running step simulation...</div>
                  )}
                </div>
              </div>
            )}

            {/* Stats Bar */}
            {project.demoInteractiveData?.statsLabels && project.demoInteractiveData.statsLabels.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  {t.statsHeader}
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {project.demoInteractiveData.statsLabels.map((stat, i) => (
                    <div key={i} className="p-3 bg-slate-900/50 border border-white/[0.06] rounded-lg">
                      <span className="text-[11px] text-slate-400 block truncate">
                        {lang === 'vi' ? stat.labelVi : stat.labelEn}
                      </span>
                      <span className="text-sm sm:text-base font-bold font-mono text-cyan-300 tabular-nums">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Features */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                {t.features}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                {(lang === 'vi' ? project.featuresVi : project.featuresEn).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/30 border border-white/[0.04]">
                    <span className="text-cyan-400 font-mono mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Unboxed */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {t.techStack}
              </h4>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                {project.techStack.map((tech, idx) => (
                  <React.Fragment key={tech}>
                    {idx > 0 && <span aria-hidden="true" className="text-slate-600">/</span>}
                    <span className="font-mono text-cyan-300 bg-white/[0.03] px-2 py-1 rounded">
                      {tech}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              SuzLab · AcherLab Ecosystem
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {t.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
