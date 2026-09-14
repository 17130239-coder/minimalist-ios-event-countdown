import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { TabMode } from '../types';

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
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const tabRefs = useRef<{ [key in TabMode]?: HTMLButtonElement | null }>({});

  const updateIndicator = () => {
    const activeEl = tabRefs.current[currentTab];
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [currentTab]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [currentTab]);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#f2f2f7]/80 dark:bg-[#0e0e10]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="h-16 max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Brand / Logo (Exact Stitch Spec) */}
        <div
          onClick={() => onTabChange('upcoming')}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-sm transition-colors">
            <span className="material-symbols-outlined text-[19px]">hourglass_top</span>
          </div>
          <span className="text-slate-900 dark:text-white text-lg font-semibold tracking-tight transition-colors">
            Countdown
          </span>
        </div>

        {/* Center Segmented Pill Nav with smooth sliding animation */}
        <nav className="relative flex items-center p-1 bg-black/[0.05] dark:bg-[#1a1a1d] rounded-full border border-black/5 dark:border-white/10 transition-colors">
          {/* Animated Sliding Background Indicator */}
          {indicatorStyle.width > 0 && (
            <div
              className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm dark:bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
            />
          )}

          <button
            ref={(el) => {
              tabRefs.current['upcoming'] = el;
            }}
            type="button"
            onClick={() => onTabChange('upcoming')}
            className={`relative z-10 px-5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors duration-200 ${
              currentTab === 'upcoming'
                ? 'text-black'
                : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white font-medium'
            }`}
          >
            Upcoming
          </button>
          <button
            ref={(el) => {
              tabRefs.current['archive'] = el;
            }}
            type="button"
            onClick={() => onTabChange('archive')}
            className={`relative z-10 px-5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors duration-200 ${
              currentTab === 'archive'
                ? 'text-black'
                : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white font-medium'
            }`}
          >
            Archive
          </button>
          <button
            ref={(el) => {
              tabRefs.current['calendar'] = el;
            }}
            type="button"
            onClick={() => onTabChange('calendar')}
            className={`relative z-10 px-5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors duration-200 ${
              currentTab === 'calendar'
                ? 'text-black'
                : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white font-medium'
            }`}
          >
            Calendar
          </button>
        </nav>

        {/* Right Action Controls (Exact Stitch Spec - Sun & Language) */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-9 h-9 rounded-full bg-black/[0.05] hover:bg-black/10 dark:bg-[#1a1a1d] dark:hover:bg-[#252528] text-slate-700 dark:text-white/80 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors border border-black/5 dark:border-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Language Button */}
          <button
            type="button"
            aria-label="Select Language"
            className="h-9 px-3 rounded-full bg-black/[0.05] hover:bg-black/10 dark:bg-[#1a1a1d] dark:hover:bg-[#252528] border border-black/5 dark:border-white/10 flex items-center gap-1.5 text-slate-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors text-xs font-medium tracking-wider"
          >
            <span className="material-symbols-outlined text-[16px]">language</span>
            <span>EN</span>
          </button>
        </div>
      </div>
    </header>
  );
};
