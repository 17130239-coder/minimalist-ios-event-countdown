import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CountdownEvent, TimeRemaining } from '../types';
import { calculateTimeRemaining } from '../utils/time';
import { FlipTile } from './FlipTile';

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

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12 flex-1 flex flex-col justify-between min-h-[calc(100vh-6rem)]">
      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium shadow-xl flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-emerald-400 dark:text-emerald-600 text-[16px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Bar (Stitch Detail Spec) */}
      <header className="flex items-center justify-between py-2 mb-8 sm:mb-14">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 py-2 px-3 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-slate-300/80 dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/10 backdrop-blur-2xl text-slate-700 dark:text-white/80 hover:text-slate-950 dark:hover:text-white transition-all duration-200 text-[14px] font-medium tracking-tight shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span>
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
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
              isFavorite
                ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-500 border-rose-200 dark:border-rose-500/30'
                : 'bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-white/80 hover:bg-slate-300 dark:hover:bg-white/20 border-slate-200/80 dark:border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
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
            className="w-9 h-9 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-white/80 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              {event.isArchived ? 'unarchive' : 'archive'}
            </span>
          </button>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => onEdit(event)}
            title="Edit Event"
            className="w-9 h-9 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-white/80 flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">edit</span>
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
            className="w-9 h-9 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-slate-700 dark:text-white/80 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200/80 dark:border-white/10 flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">delete</span>
          </button>

          {/* Share Button (Exact Stitch Spec) */}
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-slate-300/80 dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/10 backdrop-blur-2xl text-slate-800 dark:text-white transition-all duration-200 text-[14px] font-medium tracking-tight shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">ios_share</span>
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Editorial Title: Pure Elegance & Minimalist Focus (Exact Stitch Spec) */}
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-950 dark:text-white select-none">
          {event.name}
        </h1>
        {event.description && (
          <p className="text-slate-500 dark:text-white/60 text-sm sm:text-base mt-3 max-w-xl mx-auto font-normal">
            {event.description}
          </p>
        )}
      </div>

      {/* Central Hero Countdown Stage: 4-Flip Tiles (Exact Stitch Spec) */}
      <div className="w-full flex flex-col items-center justify-center my-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full max-w-4xl mx-auto px-2 sm:px-4">
          <FlipTile value={timeLeft.days} label="DAYS" />
          <FlipTile value={timeLeft.hours} label="HOURS" />
          <FlipTile value={timeLeft.minutes} label="MINS" />
          <FlipTile value={timeLeft.seconds} label="SECS" />
        </div>
      </div>

      <div className="py-6" />
    </div>
  );
};
