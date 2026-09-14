import React, { useEffect, useState } from 'react';
import { CountdownEvent, TimeRemaining } from '../types';
import { calculateTimeRemaining } from '../utils/time';
import { FlipTile } from './FlipTile';
import { ShareModal } from './ShareModal';

interface CountdownDetailProps {
  event: CountdownEvent;
  onBack: () => void;
}

export const CountdownDetail: React.FC<CountdownDetailProps> = ({
  event,
  onBack,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(event.targetDate)
  );
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const checkAndTick = () => {
      setTimeLeft(calculateTimeRemaining(event.targetDate));
    };

    checkAndTick();
    const interval = setInterval(checkAndTick, 1000);
    return () => clearInterval(interval);
  }, [event.targetDate]);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12 flex-1 flex flex-col justify-between min-h-screen">
      {/* Top Action Pill Bar (Exact Stitch Screen 2 Detail Spec) */}
      <header className="flex items-center justify-between py-2 mb-8 sm:mb-14">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Countdowns"
          className="inline-flex items-center gap-1.5 py-2 px-2.5 rounded-full bg-black/5 hover:bg-black/10 dark:bg-surface-container/70 dark:hover:bg-surface-container-high/90 border border-black/10 dark:border-white/10 backdrop-blur-2xl text-slate-700 dark:text-on-surface-variant hover:text-black dark:hover:text-white transition-all duration-200 text-[14px] font-medium tracking-tight justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px]">arrow_back_ios_new</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleShare}
            id="share-card-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-surface-container/70 dark:hover:bg-surface-container-high/90 border border-black/10 dark:border-white/10 backdrop-blur-2xl text-slate-800 dark:text-on-surface hover:text-black dark:hover:text-white transition-all duration-200 text-[14px] font-medium tracking-tight cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-slate-800 dark:text-white">ios_share</span>
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Editorial Title: Pure Elegance & Minimalist Focus (Exact Stitch Spec) */}
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white select-none transition-colors">
          {event.name}
        </h1>
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

      {/* Share Modal with QR Code and Copy Link */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        event={event}
      />
    </div>
  );
};
