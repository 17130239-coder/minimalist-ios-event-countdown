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
    // Immediate initial sync
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
        className="gallery-card relative min-h-[130px] rounded-2xl overflow-hidden cursor-pointer group border border-white/10 dark:border-white/10 border-black/10 bg-[#141416] dark:bg-[#141416] bg-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4"
      >
        <img
          src={event.imageUrl}
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/90 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white/90 border border-white/15 shrink-0">
            <span className="material-symbols-outlined text-[24px]">{catMeta.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                {catMeta.label}
              </span>
              <span className="text-xs text-white/50">{formatDateShort(event.targetDate)}</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-white/90 transition-colors">
              {event.name}
            </h3>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center justify-between bg-black/80 backdrop-blur-xl border border-white/15 px-3 py-2 rounded-xl shadow-xl">
            <div className="flex items-center gap-1.5">
              <RollerDigit value={timeLeft.days} unitLabel="D" widthClass="min-w-[34px]" />
              <span className="text-white/30 font-bold text-xs select-none">:</span>
              <RollerDigit value={timeLeft.hours} unitLabel="H" widthClass="min-w-[28px]" />
              <span className="text-white/30 font-bold text-xs select-none">:</span>
              <RollerDigit value={timeLeft.minutes} unitLabel="M" widthClass="min-w-[28px]" />
              <span className="text-white/30 font-bold text-xs select-none">:</span>
              <RollerDigit value={timeLeft.seconds} unitLabel="S" widthClass="min-w-[28px]" />
            </div>
          </div>

          <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all shrink-0">
            <span className="material-symbols-outlined text-[16px]">north_east</span>
          </span>
        </div>
      </article>
    );
  }

  // Gallery Grid Card (Stitch Screen 1)
  return (
    <article
      onClick={() => onSelect(event)}
      className="gallery-card relative min-h-[380px] rounded-3xl overflow-hidden cursor-pointer group border border-white/10 dark:border-white/10 border-black/10 bg-[#141416] dark:bg-[#141416] bg-neutral-900 flex flex-col justify-between p-6"
    >
      <img
        src={event.imageUrl}
        alt={event.name}
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 opacity-65"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

      {/* Top Bar: Category Pill & North-East Arrow */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 border border-white/15 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px]">{catMeta.icon}</span>
          {catMeta.label}
        </span>
        <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all shadow-sm">
          <span className="material-symbols-outlined text-[16px]">north_east</span>
        </span>
      </div>

      {/* Bottom Area: Event Title + Ticking Capsule Bar */}
      <div className="relative z-10 flex flex-col gap-3.5 mt-auto">
        <h2 className="text-2xl font-bold text-white tracking-tight line-clamp-2">
          {event.name}
        </h2>

        <div className="flex items-center justify-between bg-black/85 backdrop-blur-xl border border-white/15 px-3.5 py-2.5 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-1.5 w-full justify-between">
            <RollerDigit
              value={timeLeft.days}
              unitLabel="D"
              widthClass={parseInt(timeLeft.days, 10) > 99 ? 'min-w-[38px]' : 'min-w-[34px]'}
            />
            <span className="text-white/30 font-bold text-sm select-none">:</span>

            <RollerDigit value={timeLeft.hours} unitLabel="H" widthClass="min-w-[30px]" />
            <span className="text-white/30 font-bold text-sm select-none">:</span>

            <RollerDigit value={timeLeft.minutes} unitLabel="M" widthClass="min-w-[30px]" />
            <span className="text-white/30 font-bold text-sm select-none">:</span>

            <RollerDigit value={timeLeft.seconds} unitLabel="S" widthClass="min-w-[30px]" />
          </div>
        </div>
      </div>
    </article>
  );
};
