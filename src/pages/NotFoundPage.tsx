import React from 'react';
import { TranslationSchema } from '../data/translations32';
import { PageRoute } from '../types';
import { SuzLabLogo } from '../components/SuzLabLogo';
import { Home } from 'lucide-react';
import { motion } from 'motion/react';

interface NotFoundPageProps {
  lang: string;
  onNavigate: (route: PageRoute) => void;
  translations: TranslationSchema;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  lang,
  onNavigate,
  translations,
}) => {
  const t = translations.notFound;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[60vh] flex items-center justify-center px-4 py-20 text-center"
    >
      <div className="max-w-md mx-auto space-y-6">
        <SuzLabLogo className="w-12 h-12 text-cyan-400 mx-auto" />
        
        <div className="space-y-2">
          <span className="text-4xl font-extrabold font-mono text-cyan-400 block tracking-wider">
            {t.code}
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            {t.desc}
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{t.backHome}</span>
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl lab-glass border border-white/[0.1] text-slate-200 hover:text-white font-medium text-xs transition-colors"
          >
            {t.viewProjects}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
