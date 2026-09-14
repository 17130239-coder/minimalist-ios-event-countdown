import React from 'react';
import { useI18n } from '../i18n/I18nContext';

interface EmptyStateProps {
  onResetFilters: () => void;
  title?: string;
  description?: string;
  actionText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onResetFilters,
  title,
  description,
  actionText,
}) => {
  const { t } = useI18n();

  const finalTitle = title || t.noMomentsFound;
  const finalDescription = description || t.clearSearchPrompt;
  const finalActionText = actionText || t.resetFilters;

  return (
    <section className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white dark:bg-[#141416] rounded-3xl mt-4 border border-slate-200/80 dark:border-white/10 shadow-xs">
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4 text-slate-400 dark:text-white/40 shadow-xs">
        <span className="material-symbols-outlined text-[32px]">event_busy</span>
      </div>
      <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">{finalTitle}</h3>
      <p className="text-slate-500 dark:text-white/60 max-w-sm mb-6 text-sm">
        {finalDescription}
      </p>
      <button
        type="button"
        onClick={onResetFilters}
        className="h-10 px-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wider uppercase transition-all hover:bg-black dark:hover:bg-white/90 shadow-xs hover:scale-[1.02] cursor-pointer"
      >
        {finalActionText}
      </button>
    </section>
  );
};
