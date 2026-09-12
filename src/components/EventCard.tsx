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

  // Gallery Grid Card (Pure iOS 18 Light Mode Layout)
  return (
    <article
      onClick={() => onSelect(event)}
      className="gallery-card relative rounded-3xl overflow-hidden cursor-pointer group border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#141416] p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1"
    >
      {/* Top Media Banner */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-3.5 bg-slate-100 dark:bg-black/40 shadow-inner">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-black/70 backdrop-blur-md text-slate-800 dark:text-white shadow-xs border border-white/20">
          <span className="material-symbols-outlined text-[14px] text-accent-indigo dark:text-indigo-300">
            {catMeta.icon}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider">
            {catMeta.label}
          </span>
        </div>

        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 dark:bg-black/70 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-white shadow-xs group-hover:bg-[#007AFF] group-hover:text-white transition-colors border border-white/20">
          <span className="material-symbols-outlined text-[16px]">north_east</span>
        </div>
      </div>

      {/* Event Title & Date on Crisp White Background */}
      <div className="mb-3 px-0.5">
        <h2 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white truncate group-hover:text-accent-indigo transition-colors mb-1">
          {event.name}
        </h2>
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
          <span className="material-symbols-outlined text-[15px] text-slate-400">calendar_today</span>
          <span>{formatDateShort(event.targetDate)}</span>
          {event.description && (
            <>
              <span className="inline-block w-1 h-1 rounded-full bg-slate-300 mx-0.5" />
              <span className="truncate max-w-[160px]">{event.description}</span>
            </>
          )}
        </div>
      </div>

      {/* 4-Box Digital Countdown Segment matching Stitch light mode */}
      <div className="grid grid-cols-4 gap-2 text-center my-1">
        <div className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 shadow-xs">
          <span className="font-mono text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
            {timeLeft.days}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 dark:text-white/40 uppercase tracking-widest mt-0.5">
            DAYS
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 shadow-xs">
          <span className="font-mono text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
            {timeLeft.hours}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 dark:text-white/40 uppercase tracking-widest mt-0.5">
            HRS
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 shadow-xs">
          <span className="font-mono text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
            {timeLeft.minutes}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 dark:text-white/40 uppercase tracking-widest mt-0.5">
            MINS
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-blue-50 dark:bg-[#007AFF]/15 border border-blue-100 dark:border-[#007AFF]/20 text-[#007AFF] dark:text-[#38BDF8] relative overflow-hidden shadow-xs">
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
          <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight">
            {timeLeft.seconds}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-[#007AFF]/80 dark:text-[#38BDF8]/80 uppercase tracking-widest mt-0.5">
            SECS
          </span>
        </div>
      </div>

      {/* Footer metadata */}
      <div className="flex items-center justify-between pt-3 px-0.5 text-slate-500 dark:text-white/50 text-xs border-t border-slate-100 dark:border-white/5 mt-2">
        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined text-[15px] text-[#007AFF]">timelapse</span>
          <span>Active Countdown</span>
        </span>
        <span className="text-[11px] font-semibold text-[#007AFF] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
          View details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </span>
      </div>
    </article>
  );
};
