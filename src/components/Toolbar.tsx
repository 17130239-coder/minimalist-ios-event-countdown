import React from 'react';
import { FilterCategory, ViewMode, SortOrder } from '../types';
import { CATEGORY_LABELS } from '../data/defaultEvents';

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: FilterCategory;
  onSelectCategory: (cat: FilterCategory) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortOrder: SortOrder;
  onToggleSort: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  viewMode,
  onViewModeChange,
  sortOrder,
  onToggleSort,
}) => {
  const categories: FilterCategory[] = ['all', 'trips', 'work', 'birthdays', 'health', 'milestones'];

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6 pb-8">
      {/* Search Input Box */}
      <div className="relative w-full lg:w-72 group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-white/40 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors">
          <span className="material-symbols-outlined text-[18px]">search</span>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search countdowns..."
          className="w-full h-10 pl-9 pr-8 rounded-full bg-white dark:bg-[#18181b] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 text-sm border border-slate-200/80 dark:border-white/10 focus:outline-none focus:border-accent-indigo shadow-xs transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">cancel</span>
          </button>
        )}
      </div>

      {/* Categories & View Controls Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full lg:w-auto gap-3 overflow-x-auto max-w-full">
        {/* Category filter pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/50 dark:bg-[#18181b] rounded-full border border-slate-200/60 dark:border-white/10 shadow-xs overflow-x-auto max-w-full">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const meta = CATEGORY_LABELS[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-white text-slate-950 dark:text-black font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white font-medium'
                }`}
              >
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Switcher & Sort Toggle */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
          {/* View switcher segmented control */}
          <div className="flex items-center p-1 bg-slate-200/50 dark:bg-[#18181b] rounded-full border border-slate-200/60 dark:border-white/10 shadow-xs">
            <button
              type="button"
              onClick={() => onViewModeChange('gallery')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                viewMode === 'gallery'
                  ? 'bg-white dark:bg-white text-slate-950 dark:text-black font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>Gallery</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-white text-slate-950 dark:text-black font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_list</span>
              <span>List</span>
            </button>
          </div>

          {/* Sort button */}
          <button
            type="button"
            onClick={onToggleSort}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white dark:bg-[#18181b] hover:bg-slate-50 dark:hover:bg-[#232326] text-slate-700 dark:text-white/80 hover:text-slate-950 dark:hover:text-white font-medium text-xs border border-slate-200/80 dark:border-white/10 shadow-xs transition-colors whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[16px]">swap_vert</span>
            <span className="capitalize">{sortOrder}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
