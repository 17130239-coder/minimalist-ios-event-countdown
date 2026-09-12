import React from 'react';
import { TabMode } from '../types';

interface HeaderProps {
  currentTab: TabMode;
  onTabChange: (tab: TabMode) => void;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onToggleTheme,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0e0e10]/80 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="h-16 max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Brand / Logo (Exact Stitch Spec) */}
        <div
          onClick={() => onTabChange('upcoming')}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-sm">
            <span className="material-symbols-outlined text-[19px]">hourglass_top</span>
          </div>
          <span className="text-white text-lg font-semibold tracking-tight">
            Countdown
          </span>
        </div>

        {/* Center Segmented Pill Nav (Exact Stitch Spec) */}
        <nav className="flex items-center p-1 bg-[#1a1a1d] rounded-full border border-white/10">
          <button
            type="button"
            onClick={() => onTabChange('upcoming')}
            className={`px-5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors ${
              currentTab === 'upcoming'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white font-medium'
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => onTabChange('archive')}
            className={`px-5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors ${
              currentTab === 'archive'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white font-medium'
            }`}
          >
            Archive
          </button>
          <button
            type="button"
            onClick={() => onTabChange('calendar')}
            className={`px-5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors ${
              currentTab === 'calendar'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white font-medium'
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
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-full bg-[#1a1a1d] hover:bg-[#252528] text-white/80 hover:text-white flex items-center justify-center transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">light_mode</span>
          </button>

          {/* Language Button */}
          <button
            type="button"
            aria-label="Select Language"
            className="h-9 px-3 rounded-full bg-[#1a1a1d] hover:bg-[#252528] border border-white/10 flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-xs font-medium tracking-wider"
          >
            <span className="material-symbols-outlined text-[16px]">language</span>
            <span>EN</span>
          </button>
        </div>
      </div>
    </header>
  );
};
