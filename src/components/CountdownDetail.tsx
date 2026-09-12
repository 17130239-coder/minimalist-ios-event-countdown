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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
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
          colors: ['#FFFFFF', '#A855F7', '#38BDF8', '#10B981'],
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
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c20] text-white border border-white/15 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium shadow-2xl flex items-center gap-1.5 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-white text-[16px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Pill Bar (Exact Stitch Screen 2 Detail Spec) */}
      <header className="flex items-center justify-between py-2 mb-8 sm:mb-14">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Countdowns"
          className="inline-flex items-center gap-1.5 py-2 px-2.5 rounded-full bg-[#1c1c20]/70 hover:bg-[#26262b]/90 border border-white/10 backdrop-blur-2xl text-[#8e8e93] hover:text-white transition-all duration-200 text-[14px] font-medium tracking-tight justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px]">arrow_back_ios_new</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Edit Button */}
          <button
            type="button"
            onClick={() => onEdit(event)}
            title="Edit Countdown"
            aria-label="Edit Countdown"
            className="w-9 h-9 rounded-full bg-[#1c1c20]/70 hover:bg-[#26262b]/90 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete "${event.name}"?`)) {
                onDelete(event.id);
              }
            }}
            title="Delete Countdown"
            aria-label="Delete Countdown"
            className="w-9 h-9 rounded-full bg-[#1c1c20]/70 hover:bg-[#26262b]/90 border border-white/10 text-white/70 hover:text-rose-400 flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>

          {/* Archive Toggle Button */}
          <button
            type="button"
            onClick={() => {
              onToggleArchive(event);
              showToast(event.isArchived ? 'Moment unarchived' : 'Moment archived');
            }}
            title={event.isArchived ? 'Unarchive' : 'Archive'}
            aria-label="Archive Countdown"
            className="w-9 h-9 rounded-full bg-[#1c1c20]/70 hover:bg-[#26262b]/90 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">
              {event.isArchived ? 'unarchive' : 'archive'}
            </span>
          </button>

          {/* Share Button (Exact Stitch Spec) */}
          <button
            type="button"
            onClick={handleShare}
            id="share-card-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1c1c20]/70 hover:bg-[#26262b]/90 border border-white/10 backdrop-blur-2xl text-[#f5f5f7] hover:text-white transition-all duration-200 text-[14px] font-medium tracking-tight cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-white">ios_share</span>
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Editorial Title: Pure Elegance & Minimalist Focus (Exact Stitch Spec) */}
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white select-none">
          {event.name}
        </h1>
        {event.description && (
          <p className="text-[#8e8e93] text-sm sm:text-base mt-3 max-w-xl mx-auto font-normal">
            {event.description}
          </p>
        )}
      </div>

      {/* Central Hero Countdown Stage: Ultra-smooth slide-up ticker cards (Exact Stitch Spec) */}
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
