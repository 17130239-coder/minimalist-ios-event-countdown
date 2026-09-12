import React from 'react';
import { TabMode } from '../types';

interface HeaderProps {
  currentTab: TabMode;
  onTabChange: (tab: TabMode) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAddModal: () => void;
  archiveCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  isDark,
  onToggleTheme,
  onOpenAddModal,
  archiveCount,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0e0e10]/80 dark:bg-[#0e0e10]/80 bg-white/80 backdrop-blur-xl border-b border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] transition-colors">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => onTabChange('upcoming')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[19px]">hourglass_top</span>
          </div>
          <span className="text-white dark:text-white text-black text-lg font-semibold tracking-tight hidden xs:inline">
            Countdown
          </span>
        </div>

        {/* Center Segmented Pill Nav */}
        <nav className="flex items-center p-1 bg-[#1a1a1d] dark:bg-[#1a1a1d] bg-black/5 rounded-full border border-white/10 dark:border-white/10 border-black/5">
          <button
            type="button"
            onClick={() => onTabChange('upcoming')}
            className={`px-3.5 sm:px-5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all ${
              currentTab === 'upcoming'
                ? 'bg-white text-black shadow-sm'
                : 'text-white/60 dark:text-white/60 text-black/60 hover:text-white dark:hover:text-white hover:text-black font-medium'
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => onTabChange('archive')}
            className={`px-3.5 sm:px-5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              currentTab === 'archive'
                ? 'bg-white text-black shadow-sm'
                : 'text-white/60 dark:text-white/60 text-black/60 hover:text-white dark:hover:text-white hover:text-black font-medium'
            }`}
          >
            Archive
            {archiveCount > 0 && (
              <span className="w-4 h-4 rounded-full text-[10px] bg-white/20 dark:bg-white/20 bg-black/10 flex items-center justify-center">
                {archiveCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => onTabChange('calendar')}
            className={`px-3.5 sm:px-5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all ${
              currentTab === 'calendar'
                ? 'bg-white text-black shadow-sm'
                : 'text-white/60 dark:text-white/60 text-black/60 hover:text-white dark:hover:text-white hover:text-black font-medium'
            }`}
          >
            Calendar
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Add Button */}
          <button
            type="button"
            onClick={onOpenAddModal}
            aria-label="Add Event"
            className="h-9 px-3.5 rounded-full bg-white text-black hover:bg-white/90 flex items-center gap-1 text-xs font-semibold tracking-wider transition-all shadow-sm hover:scale-[1.02]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden md:inline">New</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-full bg-[#1a1a1d] dark:bg-[#1a1a1d] bg-black/5 hover:bg-[#252528] dark:hover:bg-[#252528] hover:bg-black/10 text-white/80 dark:text-white/80 text-black/80 hover:text-white flex items-center justify-center transition-colors border border-white/10 dark:border-white/10 border-black/5"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Language Pill */}
          <button
            type="button"
            aria-label="Select Language"
            className="h-9 px-3 rounded-full bg-[#1a1a1d] dark:bg-[#1a1a1d] bg-black/5 hover:bg-[#252528] dark:hover:bg-[#252528] border border-white/10 dark:border-white/10 border-black/5 hidden sm:flex items-center gap-1.5 text-white/80 dark:text-white/80 text-black/80 hover:text-white transition-colors text-xs font-medium tracking-wider"
          >
            <span className="material-symbols-outlined text-[16px]">language</span>
            <span>EN</span>
          </button>
        </div>
      </div>
    </header>
  );
};
