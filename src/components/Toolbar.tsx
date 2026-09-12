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
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40 dark:text-white/40 text-black/40 group-focus-within:text-white dark:group-focus-within:text-white group-focus-within:text-black transition-colors">
          <span className="material-symbols-outlined text-[18px]">search</span>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search countdowns..."
          className="w-full h-10 pl-9 pr-8 rounded-full bg-[#18181b] dark:bg-[#18181b] bg-black/5 text-white dark:text-white text-black placeholder:text-white/40 dark:placeholder:text-white/40 placeholder:text-black/40 text-sm border border-white/10 dark:border-white/10 border-black/10 focus:outline-none focus:border-white/40 dark:focus:border-white/40 focus:border-black/30 transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 dark:text-white/40 text-black/40 hover:text-white dark:hover:text-white hover:text-black"
          >
            <span className="material-symbols-outlined text-[16px]">cancel</span>
          </button>
        )}
      </div>

      {/* Categories & View Controls Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full lg:w-auto gap-3 overflow-x-auto">
        {/* Category filter pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#18181b] dark:bg-[#18181b] bg-black/5 rounded-full border border-white/10 dark:border-white/10 border-black/5 overflow-x-auto max-w-full">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const meta = CATEGORY_LABELS[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-white/60 dark:text-white/60 text-black/60 hover:text-white dark:hover:text-white hover:text-black font-medium'
                }`}
              >
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Switcher & Sort Toggle */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* View switcher segmented control */}
          <div className="flex items-center p-1 bg-[#18181b] dark:bg-[#18181b] bg-black/5 rounded-full border border-white/10 dark:border-white/10 border-black/5">
            <button
              type="button"
              onClick={() => onViewModeChange('gallery')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                viewMode === 'gallery'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 dark:text-white/60 text-black/60 hover:text-white dark:hover:text-white hover:text-black font-medium'
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
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 dark:text-white/60 text-black/60 hover:text-white dark:hover:text-white hover:text-black font-medium'
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
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#18181b] dark:bg-[#18181b] bg-black/5 hover:bg-[#232326] dark:hover:bg-[#232326] hover:bg-black/10 text-white/80 dark:text-white/80 text-black/80 hover:text-white dark:hover:text-white hover:text-black font-medium text-xs border border-white/10 dark:border-white/10 border-black/10 transition-colors whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[16px]">swap_vert</span>
            <span className="capitalize">{sortOrder}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
