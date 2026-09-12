import React, { useEffect, useState } from 'react';
import { CountdownEvent, ViewMode, TimeRemaining } from '../types';
import { calculateTimeRemaining, formatDateShort } from '../utils/time';
import { RollerDigit } from './RollerDigit';
import { CATEGORY_LABELS } from '../data/defaultEvents';

interface EventCardProps {
  event: CountdownEvent;
  viewMode: ViewMode;
  onSelect: (event: CountdownEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  viewMode,
  onSelect,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(event.targetDate)
  );

  useEffect(() => {
    setTimeLeft(calculateTimeRemaining(event.targetDate));
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(event.targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [event.targetDate]);

  const catMeta = CATEGORY_LABELS[event.category] || { label: event.category, icon: 'bookmark' };

  if (viewMode === 'list') {
    return (
      <article
        onClick={() => onSelect(event)}
        className="gallery-card relative min-h-[110px] rounded-2xl cursor-pointer group border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#141416] shadow-xs hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-800 dark:text-white/90 border border-slate-200/60 dark:border-white/15 shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[24px] text-accent-indigo dark:text-indigo-300">{catMeta.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/80">
                {catMeta.label}
              </span>
              <span className="text-xs text-slate-500 dark:text-white/50">{formatDateShort(event.targetDate)}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-accent-indigo transition-colors">
              {event.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center justify-between bg-slate-50 dark:bg-black/80 border border-slate-200/80 dark:border-white/15 px-3 py-2 rounded-xl shadow-xs">
            <div className="flex items-center gap-1.5">
              <RollerDigit value={timeLeft.days} unitLabel="D" widthClass="min-w-[34px]" />
              <span className="text-slate-400 dark:text-white/30 font-bold text-xs select-none">:</span>
              <RollerDigit value={timeLeft.hours} unitLabel="H" widthClass="min-w-[28px]" />
              <span className="text-slate-400 dark:text-white/30 font-bold text-xs select-none">:</span>
              <RollerDigit value={timeLeft.minutes} unitLabel="M" widthClass="min-w-[28px]" />
              <span className="text-slate-400 dark:text-white/30 font-bold text-xs select-none">:</span>
              <RollerDigit value={timeLeft.seconds} unitLabel="S" widthClass="min-w-[28px]" isAccent={true} />
            </div>
          </div>

          <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white/70 group-hover:bg-[#007AFF] group-hover:text-white transition-all shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">north_east</span>
          </span>
        </div>
      </article>
    );
  }

  // Gallery Card (Exact Stitch Screen 1 Design)
  return (
    <article
      onClick={() => onSelect(event)}
      className="event-card gallery-card relative min-h-[380px] rounded-3xl overflow-hidden cursor-pointer group border border-slate-200/80 dark:border-white/10 bg-[#141416] flex flex-col justify-between p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Full-bleed background photo - natural bright colors, not dark grayscale */}
      <img
        src={event.imageUrl}
        alt={event.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 dark:opacity-75"
        loading="lazy"
      />
      {/* Subtle bottom gradient to ensure bold white title is crisp while keeping photo bright */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      {/* Top Bar: Category Pill & North-East Arrow (Stitch Spec) */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5 shadow-sm">
          <span className="material-symbols-outlined text-[14px]">{catMeta.icon}</span>
          {catMeta.label}
        </span>
        <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-white group-hover:text-black transition-all shadow-sm">
          <span className="material-symbols-outlined text-[16px]">north_east</span>
        </span>
      </div>

      {/* Bottom Area: Title + Horizontal Countdown Capsule Bar (Exact Stitch Spec) */}
      <div className="relative z-10 flex flex-col gap-3.5 mt-auto">
        <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">
          {event.name}
        </h2>

        {/* Horizontal Capsule Bar with crisp contrast */}
        <div className="flex items-center justify-between bg-white/95 dark:bg-black/85 backdrop-blur-xl border border-white/40 dark:border-white/15 px-3.5 py-2.5 rounded-2xl shadow-xl">
          <div className="flex items-center gap-1.5 w-full justify-between">
            <RollerDigit
              value={timeLeft.days}
              unitLabel="D"
              widthClass={parseInt(timeLeft.days, 10) > 99 ? 'min-w-[38px]' : 'min-w-[34px]'}
            />
            <span className="text-slate-400 dark:text-white/30 font-bold text-sm select-none">:</span>

            <RollerDigit value={timeLeft.hours} unitLabel="H" widthClass="min-w-[30px]" />
            <span className="text-slate-400 dark:text-white/30 font-bold text-sm select-none">:</span>

            <RollerDigit value={timeLeft.minutes} unitLabel="M" widthClass="min-w-[30px]" />
            <span className="text-slate-400 dark:text-white/30 font-bold text-sm select-none">:</span>

            <RollerDigit value={timeLeft.seconds} unitLabel="S" widthClass="min-w-[30px]" isAccent={true} />
          </div>
        </div>
      </div>
    </article>
  );
};
