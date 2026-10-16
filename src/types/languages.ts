export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  direction?: 'ltr' | 'rtl';
}

export const SUPPORTED_32_LANGUAGES: LanguageInfo[] = [
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', region: 'Việt Nam' },
  { code: 'en', name: 'English', nativeName: 'English', region: 'Global / US' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', region: '日本' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', region: '대한민국' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', region: '中国' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', region: '台灣 / 香港' },
  { code: 'fr', name: 'French', nativeName: 'Français', region: 'France / Canada' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', region: 'Deutschland' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', region: 'España / Latam' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', region: 'Brasil / Portugal' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', region: 'Россия' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', region: 'Italia' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', region: 'Nederland' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', region: 'Polska' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', region: 'Türkiye' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: 'العالم العربي', direction: 'rtl' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'भारत' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', region: 'ประเทศไทย' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', region: 'Indonesia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', region: 'Malaysia' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', region: 'Sverige' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', region: 'Norge' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', region: 'Danmark' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', region: 'Suomi' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', region: 'Česko' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', region: 'Ελλάδα' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', region: 'Magyarország' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', region: 'România' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', region: 'ישראל', direction: 'rtl' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', region: 'Україна' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', region: 'Pilipinas' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'বাংলাদেশ / ভারত' },
];
