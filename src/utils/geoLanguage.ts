import { SUPPORTED_32_LANGUAGES } from '../types/languages';

export interface GeoDetectionResult {
  langCode: string;
  countryName?: string;
  source: 'ip' | 'browser' | 'saved';
}

const COUNTRY_TO_LANG: Record<string, string> = {
  VN: 'vi',
  US: 'en',
  GB: 'en',
  AU: 'en',
  CA: 'en',
  JP: 'ja',
  KR: 'ko',
  CN: 'zh-CN',
  TW: 'zh-TW',
  HK: 'zh-TW',
  FR: 'fr',
  DE: 'de',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  BR: 'pt',
  PT: 'pt',
  RU: 'ru',
  IT: 'it',
  NL: 'nl',
  PL: 'pl',
  TR: 'tr',
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  IN: 'hi',
  TH: 'th',
  ID: 'id',
  MY: 'ms',
  SE: 'sv',
  NO: 'no',
  DK: 'da',
  FI: 'fi',
  CZ: 'cs',
  GR: 'el',
  HU: 'hu',
  RO: 'ro',
  IL: 'he',
  UA: 'uk',
  PH: 'tl',
  BD: 'bn',
};

export async function detectUserLanguage(): Promise<GeoDetectionResult> {
  // 1. Check if user already explicitly saved a preferred language
  const saved = localStorage.getItem('suzlab_lang');
  if (saved && SUPPORTED_32_LANGUAGES.some((l) => l.code === saved)) {
    return { langCode: saved, source: 'saved' };
  }

  // 2. Try fast IP-based country detection
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const countryCode = data.country_code?.toUpperCase();
      const countryName = data.country_name;

      if (countryCode && COUNTRY_TO_LANG[countryCode]) {
        const mappedLang = COUNTRY_TO_LANG[countryCode];
        return {
          langCode: mappedLang,
          countryName,
          source: 'ip',
        };
      }
    }
  } catch (err) {
    // Fail silently and fall back to browser navigator
  }

  // 3. Fallback to browser locale
  const browserLanguages = navigator.languages || [navigator.language];
  for (const bl of browserLanguages) {
    const lower = bl.toLowerCase();
    const matched = SUPPORTED_32_LANGUAGES.find(
      (l) => l.code.toLowerCase() === lower || lower.startsWith(l.code.toLowerCase())
    );
    if (matched) {
      return { langCode: matched.code, source: 'browser' };
    }
  }

  // Default to Vietnamese as requested for SuzLab
  return { langCode: 'vi', source: 'browser' };
}
