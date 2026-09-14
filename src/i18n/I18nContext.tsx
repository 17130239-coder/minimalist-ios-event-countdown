import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, Translations } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  formatDate: (date: string | Date, options?: Intl.DateTimeFormatOptions) => string;
  getEventDetails: (
    eventId: string,
    fallbackName: string,
    fallbackDesc: string
  ) => { name: string; description: string };
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('countdown_language');
      if (saved === 'en' || saved === 'vi') return saved;
    } catch {}

    // Auto-detect browser language, default to 'vi' if Vietnamese, else 'en'
    if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('vi')) {
      return 'vi';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('countdown_language', lang);
    } catch {}
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'vi' : 'en';
    setLanguage(nextLang);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = TRANSLATIONS[language];

  const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const locale = language === 'vi' ? 'vi-VN' : 'en-US';
    return d.toLocaleDateString(locale, options);
  };

  const getEventDetails = (
    eventId: string,
    fallbackName: string,
    fallbackDesc: string
  ) => {
    const localized = t.events[eventId];
    if (localized) {
      return {
        name: localized.name,
        description: localized.description,
      };
    }
    return { name: fallbackName, description: fallbackDesc };
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        formatDate,
        getEventDetails,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
