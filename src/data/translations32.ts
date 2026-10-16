import { TRANSLATIONS } from './translations';

export interface TranslationSchema {
  nav: {
    home: string;
    projects: string;
    compute: string;
    about: string;
    roadmap: string;
    contact: string;
    exploreBtn: string;
    languageSwitch: string;
    menuToggle: string;
    menuClose: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    description: string;
    announcementTargetText: string;
    announcementDate: string;
    ctaExplore: string;
    ctaAbout: string;
    countdownTitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    launchedStatus: string;
    timezoneNote: string;
  };
  overview: {
    kicker: string;
    title: string;
    description: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
  };
  research: {
    kicker: string;
    title: string;
    description: string;
  };
  featured: {
    kicker: string;
    title: string;
    description: string;
    viewAll: string;
    demoBadge: string;
    statusLabel: string;
    detailsBtn: string;
    copyLink: string;
  };
  experiments: {
    kicker: string;
    title: string;
    description: string;
  };
  roadmapPreview: {
    kicker: string;
    title: string;
    description: string;
    viewFullRoadmap: string;
  };
  community: {
    kicker: string;
    title: string;
    description: string;
    ctaContact: string;
    ecosystemLabel: string;
    ecosystemLinkText: string;
  };
  projectsPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterAllCategories: string;
    categoryDevtools: string;
    categorySystems: string;
    categoryWeb: string;
    categoryAi: string;
    filterAllStatuses: string;
    statusResearch: string;
    statusDevelopment: string;
    statusBeta: string;
    statusConcept: string;
    resultsCount: string;
    emptyTitle: string;
    emptyDesc: string;
    resetFilters: string;
    demoNotice: string;
  };
  projectModal: {
    overview: string;
    problem: string;
    solution: string;
    architecture: string;
    features: string;
    techStack: string;
    interactiveSimulator: string;
    statsHeader: string;
    status: string;
    targetDate: string;
    copySuccess: string;
    close: string;
    runCommand: string;
  };
  about: {
    title: string;
    tagline: string;
    missionTitle: string;
    missionDesc: string;
    transparencyTitle: string;
    transparencyDesc: string;
    ecosystemTitle: string;
    ecosystemDesc: string;
    processTitle: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
    step4: string;
    step4Desc: string;
  };
  roadmap: {
    title: string;
    subtitle: string;
    targetBanner: string;
    stage1: string;
    stage1Desc: string;
    stage1Status: string;
    stage2: string;
    stage2Desc: string;
    stage2Status: string;
    stage3: string;
    stage3Desc: string;
    stage3Status: string;
    stage4: string;
    stage4Desc: string;
    stage4Status: string;
    stage5: string;
    stage5Desc: string;
    stage5Status: string;
    note: string;
  };
  contact: {
    title: string;
    subtitle: string;
    infoTitle: string;
    emailLabel: string;
    ecosystemLabel: string;
    locationLabel: string;
    locationValue: string;
    formTitle: string;
    formDemoNotice: string;
    nameLabel: string;
    namePlaceholder: string;
    emailInputLabel: string;
    emailPlaceholder: string;
    topicLabel: string;
    topicGeneral: string;
    topicCollaboration: string;
    topicProjectFeedback: string;
    topicOther: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    receiptTitle: string;
    receiptDesc: string;
    openMailtoBtn: string;
    copyMessageBtn: string;
    copiedToast: string;
    errors: {
      nameRequired: string;
      emailInvalid: string;
      messageShort: string;
    };
  };
  notFound: {
    code: string;
    title: string;
    desc: string;
    backHome: string;
    viewProjects: string;
  };
  footer: {
    tagline: string;
    ecosystem: string;
    ecosystemLink: string;
    officialSite: string;
    contactEmail: string;
    quickLinks: string;
    legalDisclaimer: string;
    copyright: string;
  };
}

// Base translations for English fallback
const enBase = TRANSLATIONS.en as TranslationSchema;

// Helper to create localized versions with native titles, subheadlines, countdowns, and buttons
function createLanguageTranslation(
  subheadline: string,
  exploreBtn: string,
  days: string,
  hours: string,
  mins: string,
  secs: string,
  navHome: string,
  navProjects: string,
  navAbout: string,
  navRoadmap: string,
  navContact: string,
  descOverride?: string,
  dateOverride?: string
): TranslationSchema {
  return {
    ...enBase,
    nav: {
      ...enBase.nav,
      home: navHome,
      projects: navProjects,
      about: navAbout,
      roadmap: navRoadmap,
      contact: navContact,
      exploreBtn: exploreBtn,
    },
    hero: {
      ...enBase.hero,
      subheadline,
      description: descOverride || enBase.hero.description,
      announcementDate: dateOverride || 'December 10, 2026',
      ctaExplore: exploreBtn,
      ctaAbout: navAbout,
      days,
      hours,
      minutes: mins,
      seconds: secs,
    },
    footer: {
      ...enBase.footer,
    }
  };
}

export const ALL_32_TRANSLATIONS: Record<string, TranslationSchema> = {
  // 1. Tiếng Việt
  vi: TRANSLATIONS.vi as TranslationSchema,

  // 2. English
  en: TRANSLATIONS.en as TranslationSchema,

  // 3. 日本語 (Japanese)
  ja: createLanguageTranslation(
    '絶えざる実験。創造の進化。',
    'プロジェクトを見る',
    '日',
    '時間',
    '分',
    '秒',
    'ホーム',
    'プロジェクト',
    'SuzLabについて',
    'ロードマップ',
    'お問い合わせ',
    'SuzLabは、AcherLabエコシステムに属する先端技術研究所です。実験的ソフトウェアと開発者ツールの次世代プロトタイプを開発しています。'
  ),

  // 4. 한국어 (Korean)
  ko: createLanguageTranslation(
    '끊임없는 실험. 지속적인 진화.',
    '프로젝트 탐색',
    '일',
    '시간',
    '분',
    '초',
    '홈',
    '프로젝트',
    '소개',
    '로드맵',
    '문의',
    'SuzLab은 AcherLab 생태계 내의 독립 디지털 연구 개발 연구소입니다. 공개 전 차세대 개발자 도구 및 시스템 아키텍처를 실험합니다.'
  ),

  // 5. 简体中文 (Simplified Chinese)
  'zh-CN': createLanguageTranslation(
    '不断实验，持续进化。',
    '探索项目',
    '天',
    '小时',
    '分钟',
    '秒',
    '首页',
    '项目',
    '关于SuzLab',
    '路线图',
    '联系我们',
    'SuzLab是AcherLab生态系统旗下的独立数字技术研究实验室，专注于探索前沿软件架构、下一代开发者工具及空间界面。'
  ),

  // 6. 繁體中文 (Traditional Chinese)
  'zh-TW': createLanguageTranslation(
    '持續實驗，不斷進化。',
    '探索專案',
    '天',
    '小時',
    '分鐘',
    '秒',
    '首頁',
    '專案目錄',
    '關於SuzLab',
    '發展藍圖',
    '聯絡我們',
    'SuzLab為AcherLab生態體系中的前沿技術實驗室，致力於在公開發表前驗證創新軟體架構與高效能開發者工具。'
  ),

  // 7. Français (French)
  fr: createLanguageTranslation(
    'Expérimenter sans cesse. Évoluer constamment.',
    'Explorer les projets',
    'Jours',
    'Heures',
    'Min',
    'Sec',
    'Accueil',
    'Projets',
    'À propos',
    'Feuille de route',
    'Contact',
    'SuzLab est un laboratoire de recherche technologique indépendant au sein de l’écosystème AcherLab.'
  ),

  // 8. Deutsch (German)
  de: createLanguageTranslation(
    'Unaufhörlich experimentieren. Kontinuierlich erschaffen.',
    'Projekte erkunden',
    'Tage',
    'Std',
    'Min',
    'Sek',
    'Startseite',
    'Projekte',
    'Über SuzLab',
    'Roadmap',
    'Kontakt',
    'SuzLab ist ein technologisches Forschungslabor im AcherLab-Ökosystem für zukunftsweisende Entwicklerwerkzeuge.'
  ),

  // 9. Español (Spanish)
  es: createLanguageTranslation(
    'Experimentar sin descanso. Evolucionar constantemente.',
    'Explorar proyectos',
    'Días',
    'Horas',
    'Min',
    'Seg',
    'Inicio',
    'Proyectos',
    'Acerca de',
    'Hoja de ruta',
    'Contacto',
    'SuzLab es un laboratorio de investigación digital dentro del ecosistema AcherLab enfocado en software y herramientas para desarrolladores.'
  ),

  // 10. Português (Portuguese)
  pt: createLanguageTranslation(
    'Constante experimentação. Evolução contínua.',
    'Explorar projetos',
    'Dias',
    'Horas',
    'Min',
    'Seg',
    'Início',
    'Projetos',
    'Sobre nós',
    'Roteiro',
    'Contato',
    'SuzLab é um laboratório de pesquisa e desenvolvimento tecnológico no ecossistema AcherLab.'
  ),

  // 11. Русский (Russian)
  ru: createLanguageTranslation(
    'Непрерывные эксперименты. Постоянная эволюция.',
    'Смотреть проекты',
    'Дней',
    'Часов',
    'Мин',
    'Сек',
    'Главная',
    'Проекты',
    'О лабе',
    'План развития',
    'Контакты',
    'SuzLab — независимая цифровая лаборатория в экосистеме AcherLab для исследования архитектур ПО и инструментов разработчиков.'
  ),

  // 12. Italiano (Italian)
  it: createLanguageTranslation(
    'Sperimentazione instancabile. Evoluzione continua.',
    'Esplora progetti',
    'Giorni',
    'Ore',
    'Min',
    'Sec',
    'Home',
    'Progetti',
    'Chi siamo',
    'Roadmap',
    'Contatti',
    'SuzLab è un laboratorio di ricerca e innovazione digitale all’interno dell’ecosistema AcherLab.'
  ),

  // 13. Nederlands (Dutch)
  nl: createLanguageTranslation(
    'Blijven experimenteren. Voortdurend evolueren.',
    'Ontdek projecten',
    'Dagen',
    'Uren',
    'Min',
    'Sec',
    'Home',
    'Projecten',
    'Over SuzLab',
    'Roadmap',
    'Contact'
  ),

  // 14. Polski (Polish)
  pl: createLanguageTranslation(
    'Nieustanne eksperymenty. Ciągła ewolucja.',
    'Odkryj projekty',
    'Dni',
    'Godz',
    'Min',
    'Sek',
    'Start',
    'Projekty',
    'O nas',
    'Harmonogram',
    'Kontakt'
  ),

  // 15. Türkçe (Turkish)
  tr: createLanguageTranslation(
    'Sürekli deney. Kesintisiz evrim.',
    'Projeleri Keşfet',
    'Gün',
    'Saat',
    'Dak',
    'San',
    'Ana Sayfa',
    'Projeler',
    'Hakkımızda',
    'Yol Haritası',
    'İletişim'
  ),

  // 16. العربية (Arabic)
  ar: createLanguageTranslation(
    'تجربة مستمرة. تطور دائم.',
    'استكشف المشاريع',
    'أيام',
    'ساعات',
    'دقائق',
    'ثواني',
    'الرئيسية',
    'المشاريع',
    'حول المختبر',
    'خريطة الطريق',
    'اتصل بنا'
  ),

  // 17. हिन्दी (Hindi)
  hi: createLanguageTranslation(
    'अनवरत प्रयोग। निरंतर विकास।',
    'परियोजनाएं देखें',
    'दिन',
    'घंटे',
    'मिनट',
    'सेकंड',
    'होम',
    'परियोजनाएं',
    'परिचय',
    'रोडमैप',
    'संपर्क'
  ),

  // 18. ไทย (Thai)
  th: createLanguageTranslation(
    'ทดลองไม่หยุดยั้ง สร้างสรรค์ไม่สิ้นสุด',
    'สำรวจโครงการ',
    'วัน',
    'ชั่วโมง',
    'นาที',
    'วินาที',
    'หน้าแรก',
    'โครงการ',
    'เกี่ยวกับ',
    'แผนงาน',
    'ติดต่อ'
  ),

  // 19. Bahasa Indonesia (Indonesian)
  id: createLanguageTranslation(
    'Eksperimen tiada henti. Terus berevolusi.',
    'Jelajahi Proyek',
    'Hari',
    'Jam',
    'Menit',
    'Detik',
    'Beranda',
    'Proyek',
    'Tentang',
    'Peta Jalan',
    'Kontak'
  ),

  // 20. Bahasa Melayu (Malay)
  ms: createLanguageTranslation(
    'Eksperimen berterusan. Evolusi tanpa henti.',
    'Terokai Projek',
    'Hari',
    'Jam',
    'Minit',
    'Saat',
    'Utama',
    'Projek',
    'Mengenai',
    'Peta Laluan',
    'Hubungi'
  ),

  // 21. Svenska (Swedish)
  sv: createLanguageTranslation(
    'Ständiga experiment. Kontinuerlig utveckling.',
    'Utforska projekt',
    'Dagar',
    'Timmar',
    'Min',
    'Sek',
    'Hem',
    'Projekt',
    'Om SuzLab',
    'Färdplan',
    'Kontakt'
  ),

  // 22. Norsk (Norwegian)
  no: createLanguageTranslation(
    'Kontinuerlig eksperimentering. Stadig evolusjon.',
    'Utforsk prosjekter',
    'Dager',
    'Timer',
    'Min',
    'Sek',
    'Hjem',
    'Prosjekter',
    'Om oss',
    'Veikart',
    'Kontakt'
  ),

  // 23. Dansk (Danish)
  da: createLanguageTranslation(
    'Uophørlig eksperimentering. Kontinuerlig udvikling.',
    'Udforsk projekter',
    'Dage',
    'Timer',
    'Min',
    'Sek',
    'Forside',
    'Projekter',
    'Om SuzLab',
    'Tidsplan',
    'Kontakt'
  ),

  // 24. Suomi (Finnish)
  fi: createLanguageTranslation(
    'Jatkuvaa kokeilua. Päättymätöntä kehitystä.',
    'Tutustu projekteihin',
    'Päivää',
    'Tuntia',
    'Min',
    'Sek',
    'Etusivu',
    'Projektit',
    'Tietoa meistä',
    'Tiekartta',
    'Yhteystiedot'
  ),

  // 25. Čeština (Czech)
  cs: createLanguageTranslation(
    'Neustálé experimenty. Plynulá evoluce.',
    'Prozkoumat projekty',
    'Dní',
    'Hodin',
    'Min',
    'Sek',
    'Domů',
    'Projekty',
    'O laboratoři',
    'Harmonogram',
    'Kontakt'
  ),

  // 26. Ελληνικά (Greek)
  el: createLanguageTranslation(
    'Ασταμάτητος πειραματισμός. Συνεχής εξέλιξη.',
    'Εξερεύνηση έργων',
    'Ημέρες',
    'Ώρες',
    'Λεπτά',
    'Δευτ',
    'Αρχική',
    'Έργα',
    'Σχετικά',
    'Χρονοδιάγραμμα',
    'Επικοινωνία'
  ),

  // 27. Magyar (Hungarian)
  hu: createLanguageTranslation(
    'Folytonos kísérletezés. Állandó fejlődés.',
    'Projektek felfedezése',
    'Nap',
    'Óra',
    'Perc',
    'Mp',
    'Kezdőlap',
    'Projektek',
    'Rólunk',
    'Ütemterv',
    'Kapcsolat'
  ),

  // 28. Română (Romanian)
  ro: createLanguageTranslation(
    'Experimentare neîncetată. Evoluție continuă.',
    'Explorează proiecte',
    'Zile',
    'Ore',
    'Min',
    'Sec',
    'Acasă',
    'Proiecte',
    'Despre',
    'Foaie de parcurs',
    'Contact'
  ),

  // 29. עברית (Hebrew)
  he: createLanguageTranslation(
    'ניסוי ללא הרף. אבולוציה מתמדת.',
    'גלה פרויקטים',
    'ימים',
    'שעות',
    'דקות',
    'שניות',
    'בית',
    'פרויקטים',
    'אודות',
    'מפת דרכים',
    'צור קשר'
  ),

  // 30. Українська (Ukrainian)
  uk: createLanguageTranslation(
    'Невпинні експерименти. Постійна еволюція.',
    'Дослідити проекти',
    'Днів',
    'Годин',
    'Хв',
    'Сек',
    'Головна',
    'Проекти',
    'Про нас',
    'План дій',
    'Контакти'
  ),

  // 31. Filipino (Tagalog)
  tl: createLanguageTranslation(
    'Walang-humpay na eksperimento. Patuloy na pag-unlad.',
    'Tuklasin ang mga Proyekto',
    'Araw',
    'Oras',
    'Min',
    'Seg',
    'Home',
    'Mga Proyekto',
    'Tungkol',
    'Plano',
    'Makipag-ugnayan'
  ),

  // 32. বাংলা (Bengali)
  bn: createLanguageTranslation(
    'নিরন্তর পরীক্ষা। অবিরাম বিবর্তন।',
    'প্রকল্পসমূহ দেখুন',
    'দিন',
    'ঘণ্টা',
    'মিনিট',
    'সেকেন্ড',
    'হোম',
    'প্রকল্প',
    'সম্পর্কে',
    'রোডম্যাপ',
    'যোগাযোগ'
  ),
};
