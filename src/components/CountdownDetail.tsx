import React, { useEffect, useState } from 'react';
import { CountdownEvent, TimeRemaining } from '../types';
import { calculateTimeRemaining } from '../utils/time';
import { FlipTile } from './FlipTile';
import { ShareModal } from './ShareModal';
import { useI18n } from '../i18n/I18nContext';

interface CountdownDetailProps {
  event: CountdownEvent;
  onBack: () => void;
}

export const CountdownDetail: React.FC<CountdownDetailProps> = ({
  event,
  onBack,
}) => {
  const { t, getEventDetails } = useI18n();
  const eventDetails = getEventDetails(event.id, event.name, event.description);

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
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-12 flex-1 flex flex-col justify-between min-h-screen">
      {/* Top Action Pill Bar */}
      <header className="flex items-center justify-between py-2 mb-8 sm:mb-14">
        <button
          type="button"
          onClick={onBack}
          aria-label={t.backToEvents}
          title={t.backToEvents}
          className="inline-flex items-center gap-1.5 py-2 px-3 rounded-full bg-black/5 hover:bg-black/10 dark:bg-[#1a1a1d] dark:hover:bg-[#252528] border border-black/10 dark:border-white/10 backdrop-blur-2xl text-slate-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-all duration-200 text-xs sm:text-sm font-medium tracking-tight justify-center cursor-pointer active:scale-95 shadow-xs"
        >
          <span className="material-symbols-outlined text-[17px]">arrow_back_ios_new</span>
          <span className="hidden sm:inline">{t.back}</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleShare}
            id="share-card-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-[#1a1a1d] dark:hover:bg-[#252528] border border-black/10 dark:border-white/10 backdrop-blur-2xl text-slate-800 dark:text-white hover:text-black transition-all duration-200 text-xs sm:text-sm font-medium tracking-tight cursor-pointer active:scale-95 shadow-xs"
          >
            <span className="material-symbols-outlined text-[17px]">ios_share</span>
            <span>{t.share}</span>
          </button>
        </div>
      </header>

      {/* Editorial Title */}
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white select-none transition-colors">
          {eventDetails.name}
        </h1>
        {eventDetails.description && (
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-white/60 max-w-xl mx-auto font-normal">
            {eventDetails.description}
          </p>
        )}
      </div>

      {/* Central Hero Countdown Stage: Ultra-smooth ticker cards */}
      <div className="w-full flex flex-col items-center justify-center my-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full max-w-4xl mx-auto px-2 sm:px-4">
          <FlipTile value={timeLeft.days} label={t.daysFull} />
          <FlipTile value={timeLeft.hours} label={t.hoursFull} />
          <FlipTile value={timeLeft.minutes} label={t.minsFull} />
          <FlipTile value={timeLeft.seconds} label={t.secsFull} />
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
