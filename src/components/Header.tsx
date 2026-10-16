import React, { useState } from 'react';
import { SuzLabLogo } from './SuzLabLogo';
import { PageRoute } from '../types';
import { TranslationSchema } from '../data/translations32';
import { SUPPORTED_32_LANGUAGES } from '../types/languages';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  lang: string;
  onOpenLangModal: () => void;
  translations: TranslationSchema;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  lang,
  onOpenLangModal,
  translations,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations.nav;

  const currentLangObj =
    SUPPORTED_32_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_32_LANGUAGES[0];

  const navLinks: Array<{ route: PageRoute; label: string }> = [
    { route: 'home', label: t.home },
    { route: 'projects', label: t.projects },
    { route: 'compute', label: t.compute },
    { route: 'about', label: t.about },
    { route: 'roadmap', label: t.roadmap },
    { route: 'contact', label: t.contact },
  ];

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#07090e]/85 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single clean text element wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          aria-label="SuzLab Home"
        >
          <SuzLabLogo className="w-7 h-7 text-cyan-400 group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            SuzLab
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + 32-Language Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* 32 Languages Modal Trigger */}
          <button
            onClick={onOpenLangModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg border border-white/[0.1] hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={`Select language. Current: ${currentLangObj.name}`}
            title="Switch between 32 supported languages"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="font-semibold text-slate-200 hidden sm:inline">
              {currentLangObj.nativeName}
            </span>
            <span className="font-mono uppercase text-cyan-400 text-[11px] sm:hidden">
              {currentLangObj.code}
            </span>
            <span className="text-[10px] text-slate-500 font-mono hidden md:inline ml-0.5">
              (32)
            </span>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={() => handleNav('projects')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] rounded-lg transition-all shadow-sm shadow-cyan-500/20 whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span>{t.exploreBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg border border-white/[0.08] hover:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={mobileMenuOpen ? t.menuClose : t.menuToggle}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-b border-white/[0.1] bg-[#07090e]/95 backdrop-blur-xl px-4 py-5 space-y-3"
        >
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLangModal();
              }}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-200 bg-white/[0.05] rounded-lg border border-white/[0.08]"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>{currentLangObj.nativeName} (32 languages)</span>
            </button>

            <button
              onClick={() => handleNav('projects')}
              className="flex-1 py-2 text-center text-xs font-semibold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300"
            >
              {t.exploreBtn}
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};
