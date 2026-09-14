import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { ViewMode, SortOrder } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortOrder: SortOrder;
  onToggleSort: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortOrder,
  onToggleSort,
}) => {
  const { t } = useI18n();

  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const viewRefs = useRef<{ [key in ViewMode]?: HTMLButtonElement | null }>({});

  const updateIndicator = () => {
    const activeEl = viewRefs.current[viewMode];
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [viewMode, t.langCode]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    const timer = setTimeout(updateIndicator, 50);
    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timer);
    };
  }, [viewMode, t.langCode]);

  return (
    <section className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 sm:pt-6 pb-6 sm:pb-8">
      {/* Search Input Box */}
      <div className="relative w-full sm:w-72 group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-white/40 group-focus-within:text-slate-800 dark:group-focus-within:text-white transition-colors">
          <span className="material-symbols-outlined text-[18px]">search</span>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full h-10 pl-9 pr-8 rounded-full bg-white/80 dark:bg-[#18181b] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 text-sm border border-black/10 dark:border-white/10 focus:outline-none focus:border-black/30 dark:focus:border-white/40 shadow-xs transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 dark:text-white/40 hover:text-slate-800 dark:hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">cancel</span>
          </button>
        )}
      </div>

      {/* View Controls & Sort Button */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-3 overflow-x-auto">
        <div className="flex items-center gap-2.5">
          {/* View switcher segmented control */}
          <div
            className="relative flex items-center p-1 bg-black/[0.05] dark:bg-[#18181b] rounded-full border border-black/5 dark:border-white/10 transition-colors"
            id="viewSwitcher"
          >
            {/* Animated Sliding Background Indicator */}
            {indicatorStyle.width > 0 && (
              <div
                className="absolute top-1 bottom-1 rounded-full bg-white shadow-xs dark:bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
            )}

            <button
              ref={(el) => {
                viewRefs.current['gallery'] = el;
              }}
              type="button"
              onClick={() => onViewModeChange('gallery')}
              id="galleryViewBtn"
              className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-colors duration-200 ${
                viewMode === 'gallery'
                  ? 'text-black font-semibold'
                  : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>{t.gallery}</span>
            </button>
            <button
              ref={(el) => {
                viewRefs.current['list'] = el;
              }}
              type="button"
              onClick={() => onViewModeChange('list')}
              id="listViewBtn"
              className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'text-black font-semibold'
                  : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_list</span>
              <span>{t.list}</span>
            </button>
          </div>

          {/* Sort button */}
          <button
            type="button"
            onClick={onToggleSort}
            id="sortToggleBtn"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 hover:bg-white dark:bg-[#18181b] dark:hover:bg-[#232326] text-slate-800 hover:text-black dark:text-white/80 dark:hover:text-white font-medium text-xs border border-black/10 dark:border-white/10 shadow-xs transition-colors whitespace-nowrap active:scale-95"
          >
            <span
              className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                sortOrder === 'latest' ? 'rotate-180' : ''
              }`}
            >
              swap_vert
            </span>
            <span className="inline-block min-w-[3.5rem] text-left">
              {sortOrder === 'soonest' ? t.soonest : t.latest}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
