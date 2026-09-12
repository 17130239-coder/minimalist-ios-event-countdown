import React from 'react';

interface EmptyStateProps {
  onResetFilters: () => void;
  title?: string;
  description?: string;
  actionText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onResetFilters,
  title = 'No moments found',
  description = 'No countdown moments match your selected filter or search terms.',
  actionText = 'Show All Countdowns',
}) => {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-6 text-center bg-[#141416] dark:bg-[#141416] bg-black/5 rounded-3xl mt-4 border border-white/10 dark:border-white/10 border-black/10">
      <div className="w-16 h-16 rounded-full bg-white/5 dark:bg-white/5 bg-black/5 flex items-center justify-center mb-4 text-white/40 dark:text-white/40 text-black/40">
        <span className="material-symbols-outlined text-[32px]">event_busy</span>
      </div>
      <h3 className="text-xl font-bold text-white dark:text-white text-black mb-2">{title}</h3>
      <p className="text-white/60 dark:text-white/60 text-black/60 max-w-sm mb-6 text-sm">
        {description}
      </p>
      <button
        type="button"
        onClick={onResetFilters}
        className="h-10 px-5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all hover:bg-white/90 shadow-sm hover:scale-[1.02]"
      >
        {actionText}
      </button>
    </section>
  );
};
