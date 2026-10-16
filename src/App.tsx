/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { LanguageModal } from './components/LanguageModal';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ComputePage } from './pages/ComputePage';
import { AboutPage } from './pages/AboutPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PROJECTS_DATA } from './data/projectsData';
import { ALL_32_TRANSLATIONS, TranslationSchema } from './data/translations32';
import { SUPPORTED_32_LANGUAGES } from './types/languages';
import { detectUserLanguage } from './utils/geoLanguage';
import { PageRoute, Project } from './types';
import { ArrowUp, Globe, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<string>(() => {
    const saved = localStorage.getItem('suzlab_lang');
    return saved && ALL_32_TRANSLATIONS[saved] ? saved : 'vi';
  });

  const [geoNotice, setGeoNotice] = useState<string | null>(null);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Active translation dictionary
  const currentTranslations: TranslationSchema =
    ALL_32_TRANSLATIONS[lang] || ALL_32_TRANSLATIONS['vi'];

  // Scroll Progress indicator
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track scroll position for Back-to-Top button
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowScrollTop(latest > 350);
    });
  }, [scrollY]);

  // IP Geolocation Auto-Detection on Initial Mount
  useEffect(() => {
    const runGeoDetection = async () => {
      const saved = localStorage.getItem('suzlab_lang');
      if (saved) return; // User already has a choice

      const detected = await detectUserLanguage();
      if (detected.langCode && ALL_32_TRANSLATIONS[detected.langCode]) {
        handleSelectLang(detected.langCode);

        const langMeta = SUPPORTED_32_LANGUAGES.find(
          (l) => l.code === detected.langCode
        );
        const name = langMeta ? langMeta.nativeName : detected.langCode.toUpperCase();
        
        if (detected.source === 'ip' && detected.countryName) {
          setGeoNotice(
            `Đã tự động nhận diện ngôn ngữ theo vị trí IP (${detected.countryName}): ${name}`
          );
        } else {
          setGeoNotice(
            `Đã tự động nhận diện ngôn ngữ theo trình duyệt của bạn: ${name}`
          );
        }

        // Auto dismiss after 8 seconds
        setTimeout(() => setGeoNotice(null), 8000);
      }
    };

    runGeoDetection();
  }, []);

  // Sync Language with document lang attribute, RTL direction, and localStorage
  const handleSelectLang = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('suzlab_lang', newLang);
    document.documentElement.lang = newLang;
    
    // Check direction (RTL for Arabic / Hebrew)
    const langMeta = SUPPORTED_32_LANGUAGES.find((l) => l.code === newLang);
    if (langMeta?.direction === 'rtl') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  // URL Hash routing listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      if (hash.startsWith('project-')) {
        const slug = hash.replace('project-', '');
        const found = PROJECTS_DATA.find((p) => p.slug === slug);
        if (found) {
          setSelectedProject(found);
          setCurrentRoute('projects');
          return;
        }
      }

      switch (hash) {
        case 'home':
        case 'projects':
        case 'compute':
        case 'about':
        case 'roadmap':
        case 'contact':
          setCurrentRoute(hash as PageRoute);
          break;
        default:
          break;
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === 'home' ? '' : route;
  };

  const handleOpenProjectModal = (project: Project) => {
    setSelectedProject(project);
    window.location.hash = `project-${project.slug}`;
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
    if (window.location.hash.startsWith('#project-')) {
      window.location.hash = currentRoute === 'home' ? '' : currentRoute;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070c] text-slate-100 lab-grid-pattern lab-radial-glow relative selection:bg-cyan-500/25 selection:text-cyan-200">
      
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyan-400 text-slate-950 font-bold rounded-lg shadow-lg"
      >
        {lang === 'vi' ? 'Chuyển thẳng tới nội dung chính' : 'Skip to main content'}
      </a>

      {/* IP Auto-Detected Language Toast Notification */}
      <AnimatePresence>
        {geoNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 max-w-sm p-3.5 rounded-xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl backdrop-blur-md text-xs flex items-center justify-between gap-3 text-slate-200"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{geoNotice}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="text-cyan-400 hover:text-cyan-300 font-bold underline text-[11px]"
              >
                Đổi / Change
              </button>
              <button
                onClick={() => setGeoNotice(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        lang={lang}
        onOpenLangModal={() => setIsLangModalOpen(true)}
        translations={currentTranslations}
      />

      {/* Main Content Area with Page Transition Animation */}
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            {currentRoute === 'home' && (
              <HomePage
                lang={lang}
                onNavigate={handleNavigate}
                onOpenProjectModal={handleOpenProjectModal}
                translations={currentTranslations}
              />
            )}
            {currentRoute === 'projects' && (
              <ProjectsPage
                lang={lang}
                onOpenProjectModal={handleOpenProjectModal}
                translations={currentTranslations}
              />
            )}
            {currentRoute === 'compute' && (
              <ComputePage
                lang={lang}
                translations={currentTranslations}
              />
            )}
            {currentRoute === 'about' && (
              <AboutPage
                lang={lang}
                onNavigate={handleNavigate}
                translations={currentTranslations}
              />
            )}
            {currentRoute === 'roadmap' && (
              <RoadmapPage
                lang={lang}
                onNavigate={handleNavigate}
                translations={currentTranslations}
              />
            )}
            {currentRoute === 'contact' && (
              <ContactPage
                lang={lang}
                translations={currentTranslations}
              />
            )}
            {currentRoute === 'not-found' && (
              <NotFoundPage
                lang={lang}
                onNavigate={handleNavigate}
                translations={currentTranslations}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Deep-dive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={handleCloseProjectModal}
        translations={currentTranslations}
      />

      {/* 32 Languages Selector Modal */}
      <LanguageModal
        isOpen={isLangModalOpen}
        currentLang={lang}
        onSelectLang={handleSelectLang}
        onClose={() => setIsLangModalOpen(false)}
      />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/90 text-cyan-400 border border-cyan-500/30 shadow-xl shadow-cyan-950/40 hover:bg-cyan-400 hover:text-slate-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 backdrop-blur-md"
            aria-label="Back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer with AcherLab ecosystem attribution */}
      <Footer
        onNavigate={handleNavigate}
        lang={lang}
        translations={currentTranslations}
        onOpenLangModal={() => setIsLangModalOpen(true)}
      />
    </div>
  );
}
