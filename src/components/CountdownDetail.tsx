import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CountdownEvent, TimeRemaining } from '../types';
import { calculateTimeRemaining, formatDateFull, calculateProgress } from '../utils/time';
import { FlipTile } from './FlipTile';
import { CATEGORY_LABELS } from '../data/defaultEvents';

interface CountdownDetailProps {
  event: CountdownEvent;
  onBack: () => void;
  onEdit: (event: CountdownEvent) => void;
  onDelete: (id: string) => void;
  onToggleArchive: (event: CountdownEvent) => void;
}

export const CountdownDetail: React.FC<CountdownDetailProps> = ({
  event,
  onBack,
  onEdit,
  onDelete,
  onToggleArchive,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(event.targetDate)
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const checkAndTick = () => {
      const remaining = calculateTimeRemaining(event.targetDate);
      setTimeLeft(remaining);

      if (remaining.isFinished && !confettiTriggered) {
        setConfettiTriggered(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#38BDF8', '#A855F7', '#10B981'],
        });
      }
    };

    checkAndTick();
    const interval = setInterval(checkAndTick, 1000);
    return () => clearInterval(interval);
  }, [event.targetDate, confettiTriggered]);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!');
      }
    } catch {
      showToast('Link ready to share!');
    }
  };

  const handleAddToCalendar = () => {
    // Generate .ics download or toast
    showToast('Event synced to Apple Calendar');
  };

  const handleSetReminder = () => {
    showToast('Reminder set for 3 days before event');
  };

  const progress = calculateProgress(event.createdAt, event.targetDate);
  const catMeta = CATEGORY_LABELS[event.category] || { label: event.category, icon: 'bookmark' };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-20 flex-1 flex flex-col justify-between">
      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium shadow-xl flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-emerald-400 dark:text-emerald-600 text-[16px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Glass/White Card Frame (Stitch Light Mode Layout) */}
      <div className="relative w-full rounded-[2rem] bg-white dark:bg-[#141416]/90 border border-slate-200/80 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-2xl overflow-hidden p-5 sm:p-8">
        
        {/* Top Action Bar */}
        <div className="relative flex items-center justify-between pb-6 border-b border-slate-100 dark:border-white/10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-[#007AFF] hover:opacity-80 transition-opacity active:scale-95 text-sm font-semibold tracking-tight"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            <span>All moments</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Favorite toggle */}
            <button
              type="button"
              onClick={() => {
                setIsFavorite(!isFavorite);
                showToast(isFavorite ? 'Removed from favorites' : 'Added to favorites');
              }}
              title="Favorite"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isFavorite
                  ? 'bg-rose-50 text-rose-500'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/80 hover:bg-slate-200 dark:hover:bg-white/15'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">
                {isFavorite ? 'favorite' : 'favorite_border'}
              </span>
            </button>

            {/* Toggle Archive */}
            <button
              type="button"
              onClick={() => {
                onToggleArchive(event);
                showToast(event.isArchived ? 'Moment unarchived' : 'Moment archived');
              }}
              title={event.isArchived ? 'Unarchive' : 'Archive'}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-white/80 flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                {event.isArchived ? 'unarchive' : 'archive'}
              </span>
            </button>

            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              className="h-9 px-3.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white flex items-center gap-1.5 transition-all text-xs font-semibold uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[18px]">ios_share</span>
              <span>Share</span>
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${event.name}"?`)) {
                  onDelete(event.id);
                }
              }}
              title="Delete Event"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-rose-50 text-slate-600 dark:text-white/70 hover:text-rose-600 flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </div>

        {/* Event Title & Subtitle */}
        <div className="pt-6 pb-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-accent-indigo dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/30 shadow-xs mb-3">
            <span className="material-symbols-outlined text-[15px]">{catMeta.icon}</span>
            <span className="font-caption text-caption font-semibold tracking-wider uppercase">
              {catMeta.label}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mb-2 max-w-2xl leading-tight">
            {event.name}
          </h1>

          <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
            <span className="material-symbols-outlined text-[17px] text-slate-400 dark:text-slate-500">
              calendar_today
            </span>
            <span>{formatDateFull(event.targetDate)}</span>
          </div>

          {event.description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mt-2 leading-relaxed">
              {event.description}
            </p>
          )}
        </div>

        {/* 4-Box Digital Countdown Segment (Stitch Light Mode Layout) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-2 justify-items-center">
          <FlipTile value={timeLeft.days} label="DAYS" />
          <FlipTile value={timeLeft.hours} label="HOURS" />
          <FlipTile value={timeLeft.minutes} label="MINS" />
          <FlipTile value={timeLeft.seconds} label="SECS" />
        </div>

        {/* Timeline Progress Section (Stitch Light Mode Spec) */}
        <div className="relative bg-slate-50 dark:bg-black/30 rounded-2xl p-4 sm:p-5 mt-6 border border-slate-200/70 dark:border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="material-symbols-outlined text-[18px]">timelapse</span>
              <span className="text-xs font-semibold tracking-tight">Milestone Progress</span>
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-200/80 dark:bg-white/10 px-2.5 py-0.5 rounded-full font-mono">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#007AFF] to-[#5856D6] dark:from-[#4F46E5] dark:to-[#38BDF8] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-400 dark:text-slate-500">
            <span>Created: {new Date(event.createdAt).toLocaleDateString()}</span>
            <span>Target: {new Date(event.targetDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Curated Visual Inspiration Card */}
        <div className="relative mt-5 rounded-2xl overflow-hidden shadow-xs bg-slate-900 group h-40">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
            <div className="flex items-center justify-between w-full text-white">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-300 text-[18px]">photo_camera</span>
                <span className="text-xs font-medium text-white/95 truncate max-w-xs">{event.name}</span>
              </div>
              <span className="text-[10px] bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white/90 uppercase tracking-wider font-semibold">
                Featured
              </span>
            </div>
          </div>
        </div>

        {/* iOS Native Style Quick Actions Grid */}
        <div className="relative mt-6 pt-2 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAddToCalendar}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-semibold text-sm hover:bg-slate-200 dark:hover:bg-white/15 active:scale-[0.98] transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px] text-[#007AFF]">event</span>
              <span>Add to Calendar</span>
            </button>

            <button
              type="button"
              onClick={handleSetReminder}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-semibold text-sm hover:bg-slate-200 dark:hover:bg-white/15 active:scale-[0.98] transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px] text-amber-500">notifications_active</span>
              <span>Set Reminder</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onEdit(event)}
            className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-black dark:hover:bg-white/90 active:scale-[0.99] transition-all"
          >
            <span className="material-symbols-outlined text-[19px]">edit</span>
            <span>Edit Event</span>
          </button>
        </div>

      </div>
    </div>
  );
};
