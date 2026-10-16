import React, { useState, useMemo } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECTS_DATA } from '../data/projectsData';
import { TranslationSchema } from '../data/translations32';
import { Project } from '../types';
import { Search, RotateCcw, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectsPageProps {
  lang: string;
  onOpenProjectModal: (project: Project) => void;
  translations: TranslationSchema;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  lang,
  onOpenProjectModal,
  translations,
}) => {
  const t = translations.projectsPage;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.taglineVi.toLowerCase().includes(query) ||
        project.taglineEn.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query));

      const matchCategory =
        selectedCategory === 'all' || project.category === selectedCategory;

      const matchStatus =
        selectedStatus === 'all' || project.status === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  const categories: Array<{ id: string; label: string }> = [
    { id: 'all', label: t.filterAllCategories },
    { id: 'devtools', label: t.categoryDevtools },
    { id: 'systems', label: t.categorySystems },
    { id: 'web', label: t.categoryWeb },
    { id: 'ai', label: t.categoryAi },
  ];

  const statuses: Array<{ id: string; label: string }> = [
    { id: 'all', label: t.filterAllStatuses },
    { id: 'Research', label: t.statusResearch },
    { id: 'In Development', label: t.statusDevelopment },
    { id: 'Beta', label: t.statusBeta },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10"
    >
      {/* Page Title & Intro */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          SUZLAB REPOSITORY
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t.title}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Transparency Demo Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs sm:text-sm text-slate-300">
        <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{t.demoNotice}</p>
      </div>

      {/* Search & Filters Controls */}
      <div className="p-4 sm:p-5 rounded-2xl lab-glass border border-white/[0.08] space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/[0.1] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Status Select dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="status-filter" className="text-xs text-slate-400 font-medium">
              Status:
            </label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-white/[0.1] text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              {statuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div>
          {t.resultsCount.replace('{count}', String(filteredProjects.length))}
        </div>
        {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetFilters}</span>
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              onOpenDetails={onOpenProjectModal}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl lab-glass border border-white/[0.08] space-y-4 max-w-md mx-auto">
          <Search className="w-10 h-10 text-slate-500 mx-auto opacity-70" />
          <h3 className="text-lg font-bold text-white">{t.emptyTitle}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{t.emptyDesc}</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetFilters}</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};
