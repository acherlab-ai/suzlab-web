import React from 'react';
import { SuzLabLogo } from './SuzLabLogo';
import { TranslationSchema } from '../data/translations32';
import { PageRoute } from '../types';
import { ExternalLink, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  lang: string;
  translations: TranslationSchema;
  onOpenLangModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  lang,
  translations,
  onOpenLangModal,
}) => {
  const t = translations.footer;
  const navT = translations.nav;

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#05060a] border-t border-white/[0.08] text-slate-400 text-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/[0.08]">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <SuzLabLogo className="w-7 h-7 text-cyan-400" />
              <span className="text-xl font-bold tracking-tight text-white">SuzLab</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              {t.tagline}
            </p>
            <div className="pt-2 text-xs text-slate-500 leading-relaxed max-w-lg border-l border-cyan-500/30 pl-3">
              {t.legalDisclaimer}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {navT.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('projects')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {navT.projects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('compute')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {navT.compute}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {navT.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('roadmap')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {navT.roadmap}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {navT.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200">
              {t.ecosystem}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div>
                <a
                  href="https://acherlab.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium group"
                >
                  <span>acherlab.xyz</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <p className="text-slate-500 text-xs mt-0.5">Parent Innovation Ecosystem</p>
              </div>

              <div className="pt-2">
                <a
                  href="mailto:admin@acherlab.xyz"
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>admin@acherlab.xyz</span>
                </a>
                <p className="text-slate-500 text-xs mt-0.5">Official Direct Inquiries</p>
              </div>

              <div className="pt-2">
                <a
                  href="https://suzlab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200"
                >
                  <span>suzlab.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{t.copyright}</div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenLangModal}
              className="text-cyan-400 hover:text-cyan-300 transition-colors underline font-medium"
            >
              Languages (32)
            </button>
            <span className="font-mono text-cyan-400/80">Target Milestone: 10/12/2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
