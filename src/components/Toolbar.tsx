import React from 'react';
import { ViewMode, SortOrder } from '../types';

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
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6 pb-8">
      {/* Search Input Box (Exact Stitch Spec) */}
      <div className="relative w-full lg:w-72 group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-white/40 group-focus-within:text-slate-800 dark:group-focus-within:text-white transition-colors">
          <span className="material-symbols-outlined text-[18px]">search</span>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search countdowns..."
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

      {/* Categories & View Controls Container (Exact Stitch Spec: View switcher & Soonest sort button) */}
      <div className="flex items-center justify-between w-full lg:w-auto gap-3 overflow-x-auto">
        <div className="flex items-center gap-2.5">
          {/* View switcher segmented control */}
          <div className="flex items-center p-1 bg-black/[0.05] dark:bg-[#18181b] rounded-full border border-black/5 dark:border-white/10 transition-colors" id="viewSwitcher">
            <button
              type="button"
              onClick={() => onViewModeChange('gallery')}
              id="galleryViewBtn"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                viewMode === 'gallery'
                  ? 'bg-white text-black font-semibold shadow-xs dark:bg-white dark:text-black'
                  : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>Gallery</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              id="listViewBtn"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-black font-semibold shadow-xs dark:bg-white dark:text-black'
                  : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_list</span>
              <span>List</span>
            </button>
          </div>

          {/* Sort button with fixed text container to eliminate width jitter */}
          <button
            type="button"
            onClick={onToggleSort}
            id="sortToggleBtn"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 hover:bg-white dark:bg-[#18181b] dark:hover:bg-[#232326] text-slate-800 hover:text-black dark:text-white/80 dark:hover:text-white font-medium text-xs border border-black/10 dark:border-white/10 shadow-xs transition-colors whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[16px]">swap_vert</span>
            <span className="inline-block w-[3.8rem] text-left capitalize">
              {sortOrder === 'soonest' ? 'Soonest' : 'Latest'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
