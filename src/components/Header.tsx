import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { TabMode } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface HeaderProps {
  currentTab: TabMode;
  onTabChange: (tab: TabMode) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  isDark,
  onToggleTheme,
}) => {
  const { t, toggleLanguage } = useI18n();

  // Desktop indicator state & refs
  const [desktopIndicator, setDesktopIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const tabRefsDesktop = useRef<{ [key in TabMode]?: HTMLButtonElement | null }>({});

  // Mobile indicator state & refs
  const [mobileIndicator, setMobileIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const tabRefsMobile = useRef<{ [key in TabMode]?: HTMLButtonElement | null }>({});

  const updateIndicators = () => {
    const dtEl = tabRefsDesktop.current[currentTab];
    if (dtEl) {
      setDesktopIndicator({
        left: dtEl.offsetLeft,
        width: dtEl.offsetWidth,
      });
    }

    const mbEl = tabRefsMobile.current[currentTab];
    if (mbEl) {
      setMobileIndicator({
        left: mbEl.offsetLeft,
        width: mbEl.offsetWidth,
      });
    }
  };

  useLayoutEffect(() => {
    updateIndicators();
  }, [currentTab, t.langCode]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicators);
    // Double check after font or layout paint
    const timer = setTimeout(updateIndicators, 50);
    return () => {
      window.removeEventListener('resize', updateIndicators);
      clearTimeout(timer);
    };
  }, [currentTab, t.langCode]);

  const tabs: { id: TabMode; label: string }[] = [
    { id: 'upcoming', label: t.upcoming },
    { id: 'archive', label: t.archive },
    { id: 'calendar', label: t.calendar },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#f2f2f7]/85 dark:bg-[#0e0e10]/85 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Row: Brand on left, Action Controls on right (Always visible on all screen sizes) */}
        <div className="h-14 md:h-16 flex items-center justify-between gap-3">
          {/* Brand / Logo */}
          <div
            onClick={() => onTabChange('upcoming')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[19px]">hourglass_top</span>
            </div>
            <span className="text-slate-900 dark:text-white text-base sm:text-lg font-bold tracking-tight transition-colors">
              {t.brand}
            </span>
          </div>

          {/* Desktop Center Segmented Pill Nav (Hidden on mobile) */}
          <nav className="hidden md:flex relative items-center p-1 bg-black/[0.05] dark:bg-[#1a1a1d] rounded-full border border-black/5 dark:border-white/10 transition-colors">
            {/* Animated Sliding Background Indicator */}
            {desktopIndicator.width > 0 && (
              <div
                className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm dark:bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                style={{
                  left: `${desktopIndicator.left}px`,
                  width: `${desktopIndicator.width}px`,
                }}
              />
            )}

            {tabs.map((tab) => (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefsDesktop.current[tab.id] = el;
                }}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`relative z-10 px-5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors duration-200 ${
                  currentTab === tab.id
                    ? 'text-black font-bold'
                    : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white font-medium'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls: Sun & Language (Always accessible) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? t.switchToLight : t.switchToDark}
              title={isDark ? t.switchToLight : t.switchToDark}
              className="w-9 h-9 rounded-full bg-black/[0.05] hover:bg-black/10 dark:bg-[#1a1a1d] dark:hover:bg-[#252528] text-slate-700 dark:text-white/80 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors border border-black/5 dark:border-white/10 active:scale-95 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Language Switcher Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t.selectLanguage}
              title={t.selectLanguage}
              id="languageToggleBtn"
              className="h-9 px-3 rounded-full bg-black/[0.05] hover:bg-black/10 dark:bg-[#1a1a1d] dark:hover:bg-[#252528] border border-black/5 dark:border-white/10 flex items-center gap-1.5 text-slate-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-all text-xs font-semibold tracking-wider active:scale-95 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">language</span>
              <span className="font-mono font-bold">{t.langCode}</span>
            </button>
          </div>
        </div>

        {/* Mobile Row 2: Center Segmented Pill Nav (Visible on screens < md) */}
        <div className="pb-2.5 md:hidden flex justify-center w-full">
          <nav className="relative flex items-center p-1 bg-black/[0.05] dark:bg-[#1a1a1d] rounded-full border border-black/5 dark:border-white/10 transition-colors w-full max-w-sm">
            {/* Animated Sliding Background Indicator */}
            {mobileIndicator.width > 0 && (
              <div
                className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm dark:bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                style={{
                  left: `${mobileIndicator.left}px`,
                  width: `${mobileIndicator.width}px`,
                }}
              />
            )}

            {tabs.map((tab) => (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefsMobile.current[tab.id] = el;
                }}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`relative z-10 flex-1 py-1.5 text-center rounded-full font-semibold text-[11px] tracking-wider uppercase transition-colors duration-200 truncate ${
                  currentTab === tab.id
                    ? 'text-black font-bold'
                    : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white font-medium'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
