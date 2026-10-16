export type Language = 'vi' | 'en';

export type ProjectStatus = 'Research' | 'In Development' | 'Beta' | 'Concept Demo';

export type ProjectCategory = 'devtools' | 'systems' | 'web' | 'ai';

export interface ProjectMilestone {
  stage: string;
  status: 'planned' | 'in-progress' | 'completed';
  notesVi: string;
  notesEn: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  taglineVi: string;
  taglineEn: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tags: string[];
  isFeatured?: boolean;
  isDemoData: boolean;
  problemVi: string;
  problemEn: string;
  solutionVi: string;
  solutionEn: string;
  architectureVi: string;
  architectureEn: string;
  featuresVi: string[];
  featuresEn: string[];
  techStack: string[];
  demoType: 'cli' | 'interactive' | 'canvas';
  demoInteractiveData?: {
    terminalCommands?: Array<{ cmd: string; output: string }>;
    statsLabels?: Array<{ labelVi: string; labelEn: string; value: string }>;
  };
  githubUrl?: string;
  websiteUrl?: string;
  announcementTarget: string;
}

export type PageRoute = 'home' | 'projects' | 'compute' | 'about' | 'roadmap' | 'contact' | 'not-found';
