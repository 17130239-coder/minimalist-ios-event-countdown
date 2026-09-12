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
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0e0e10]/80 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand / Logo (Exact Stitch Spec) */}
        <div
          onClick={() => onTabChange('upcoming')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[19px]">hourglass_top</span>
          </div>
          <span className="text-white text-lg font-semibold tracking-tight hidden xs:inline">
            Countdown
          </span>
        </div>

        {/* Center Segmented Pill Nav (Exact Stitch Spec) */}
        <nav className="flex items-center p-1 bg-[#1a1a1d] rounded-full border border-white/10">
          <button
            type="button"
            onClick={() => onTabChange('upcoming')}
            className={`px-4 sm:px-5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-colors ${
              currentTab === 'upcoming'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white font-medium'
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => onTabChange('archive')}
            className={`px-4 sm:px-5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
              currentTab === 'archive'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white font-medium'
            }`}
          >
            Archive
            {archiveCount > 0 && (
              <span className="w-4 h-4 rounded-full text-[10px] bg-white/20 text-white flex items-center justify-center font-bold">
                {archiveCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => onTabChange('calendar')}
            className={`px-4 sm:px-5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-colors ${
              currentTab === 'calendar'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white font-medium'
            }`}
          >
            Calendar
          </button>
        </nav>

        {/* Right Action Controls (Exact Stitch Spec) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Add Button */}
          <button
            type="button"
            onClick={onOpenAddModal}
            aria-label="Add Event"
            className="h-9 px-3.5 rounded-full bg-white text-black hover:bg-white/90 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-[17px]">add</span>
            <span className="hidden md:inline">New</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-full bg-[#1a1a1d] hover:bg-[#252528] text-white/80 hover:text-white flex items-center justify-center transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Language Button */}
          <button
            type="button"
            aria-label="Select Language"
            className="h-9 px-3 rounded-full bg-[#1a1a1d] hover:bg-[#252528] border border-white/10 hidden sm:flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-xs font-medium tracking-wider"
          >
            <span className="material-symbols-outlined text-[16px]">language</span>
            <span>EN</span>
          </button>
        </div>
      </div>
    </header>
  );
};
