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
  const [copied, setCopied] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
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
          colors: ['#4F46E5', '#38BDF8', '#A855F7', '#FFFFFF'],
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
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const progress = calculateProgress(event.createdAt, event.targetDate);
  const catMeta = CATEGORY_LABELS[event.category] || { label: event.category, icon: 'bookmark' };

  // SVG Progress Ring calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 flex-1 flex flex-col justify-between min-h-[calc(100vh-5rem)]">
      {/* Top Action Pill Bar (iOS Native Minimal Style) */}
      <header className="flex items-center justify-between py-2 mb-8 sm:mb-12">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full bg-[#1c1c20]/70 dark:bg-[#1c1c20]/70 bg-black/5 hover:bg-[#26262b]/90 dark:hover:bg-[#26262b]/90 hover:bg-black/10 border border-white/10 dark:border-white/10 border-black/10 backdrop-blur-2xl text-[#8e8e93] hover:text-white dark:hover:text-white hover:text-black transition-all duration-200 text-[14px] font-medium tracking-tight select-none cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px]">arrow_back_ios_new</span>
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Toggle Archive */}
          <button
            type="button"
            onClick={() => onToggleArchive(event)}
            title={event.isArchived ? 'Unarchive' : 'Archive'}
            className="w-10 h-10 rounded-full bg-[#1c1c20]/70 dark:bg-[#1c1c20]/70 bg-black/5 hover:bg-[#26262b]/90 dark:hover:bg-[#26262b]/90 border border-white/10 dark:border-white/10 border-black/10 backdrop-blur-2xl text-[#8e8e93] hover:text-white dark:hover:text-white hover:text-black flex items-center justify-center transition-all"
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
            className="w-10 h-10 rounded-full bg-[#1c1c20]/70 dark:bg-[#1c1c20]/70 bg-black/5 hover:bg-[#26262b]/90 dark:hover:bg-[#26262b]/90 border border-white/10 dark:border-white/10 border-black/10 backdrop-blur-2xl text-[#8e8e93] hover:text-white dark:hover:text-white hover:text-black flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
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
            className="w-10 h-10 rounded-full bg-[#1c1c20]/70 dark:bg-[#1c1c20]/70 bg-black/5 hover:bg-rose-500/20 border border-white/10 dark:border-white/10 border-black/10 backdrop-blur-2xl text-[#8e8e93] hover:text-rose-400 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1c1c20]/70 dark:bg-[#1c1c20]/70 bg-black/5 hover:bg-[#26262b]/90 dark:hover:bg-[#26262b]/90 hover:bg-black/10 border border-white/10 dark:border-white/10 border-black/10 backdrop-blur-2xl text-white dark:text-white text-black hover:text-white transition-all duration-200 text-[14px] font-medium tracking-tight cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">
              {copied ? 'check' : 'ios_share'}
            </span>
            <span>{copied ? 'Copied link' : 'Share'}</span>
          </button>
        </div>
      </header>

      {/* Editorial Title & Badges */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-white/10 bg-black/5 border border-white/10 dark:border-white/10 border-black/5 text-xs font-semibold uppercase tracking-wider text-white/80 dark:text-white/80 text-black/80 mb-4">
          <span className="material-symbols-outlined text-[15px]">{catMeta.icon}</span>
          <span>{catMeta.label}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white dark:text-white text-black select-none max-w-3xl mx-auto leading-tight">
          {event.name}
        </h1>

        <p className="text-sm sm:text-base text-[#8e8e93] mt-3 font-medium">
          {formatDateFull(event.targetDate)}
        </p>

        {event.description && (
          <p className="text-sm text-white/70 dark:text-white/70 text-black/70 max-w-xl mx-auto mt-2 leading-relaxed">
            {event.description}
          </p>
        )}
      </div>

      {/* Central Hero Countdown Stage: Ultra-smooth slide-up ticker cards */}
      <div className="w-full flex flex-col items-center justify-center my-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full max-w-4xl mx-auto px-2 sm:px-4 justify-items-center">
          <FlipTile value={timeLeft.days} label="DAYS" />
          <FlipTile value={timeLeft.hours} label="HOURS" />
          <FlipTile value={timeLeft.minutes} label="MINS" />
          <FlipTile value={timeLeft.seconds} label="SECS" />
        </div>
      </div>

      {/* Milestone Progress Ring & Timeline info */}
      <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 py-6 px-8 rounded-3xl bg-[#141416]/70 dark:bg-[#141416]/70 bg-black/5 backdrop-blur-xl border border-white/10 dark:border-white/10 border-black/10 max-w-xl mx-auto w-full">
        {/* Progress Circular SVG */}
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="text-white/10 dark:text-white/10 text-black/10"
              strokeWidth="7"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Progress animated circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="url(#gradient-accent)"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-xl font-bold text-white dark:text-white text-black">
              {progress}%
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#8e8e93] font-semibold">
              Elapsed
            </span>
          </div>
        </div>

        {/* Milestone info text */}
        <div className="text-center sm:text-left">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white dark:text-white text-black mb-1">
            Milestone Progress
          </h4>
          <p className="text-xs text-[#8e8e93] leading-relaxed">
            {timeLeft.isFinished
              ? 'This countdown moment has arrived! 🎉'
              : `${progress}% of the journey towards ${event.name} has elapsed. Anticipation builds with every second.`}
          </p>
        </div>
      </div>
    </div>
  );
};
