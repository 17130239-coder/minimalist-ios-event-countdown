import React, { useEffect, useState } from 'react';
import { CountdownEvent, ViewMode, TimeRemaining } from '../types';
import { calculateTimeRemaining } from '../utils/time';
import { RollerDigit } from './RollerDigit';

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

  const daysWidth = 'min-w-[40px]';

  if (viewMode === 'list') {
    return (
      <article
        onClick={() => onSelect(event)}
        className="event-card gallery-card relative min-h-[140px] rounded-3xl overflow-hidden cursor-pointer group border border-white/10 bg-[#141416] flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4 shadow-xl transition-[transform,box-shadow,border-color] duration-300"
      >
        <img
          src={event.imageUrl}
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 opacity-65 group-hover:opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center gap-1 min-h-[2.5rem]">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight line-clamp-1 leading-tight">
            {event.name}
          </h2>
          {event.description && (
            <p className="text-xs text-white/60 line-clamp-1 max-w-md">
              {event.description}
            </p>
          )}
        </div>

        <div className="relative z-10 flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center justify-between bg-black/85 backdrop-blur-xl border border-white/15 px-3.5 py-2.5 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-1.5">
              <RollerDigit value={timeLeft.days} unitLabel="D" widthClass={daysWidth} />
              <span className="text-white/30 font-bold text-sm select-none">:</span>
              <RollerDigit value={timeLeft.hours} unitLabel="H" widthClass="min-w-[34px]" />
              <span className="text-white/30 font-bold text-sm select-none">:</span>
              <RollerDigit value={timeLeft.minutes} unitLabel="M" widthClass="min-w-[34px]" />
              <span className="text-white/30 font-bold text-sm select-none">:</span>
              <RollerDigit value={timeLeft.seconds} unitLabel="S" widthClass="min-w-[34px]" />
            </div>
          </div>

          <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all shrink-0">
            <span className="material-symbols-outlined text-[16px]">north_east</span>
          </span>
        </div>
      </article>
    );
  }

  // Gallery Card (Exact 1:1 match with Stitch Countdown - Gallery (Fixed & Running))
  return (
    <article
      onClick={() => onSelect(event)}
      className="event-card gallery-card relative min-h-[390px] h-[390px] rounded-3xl overflow-hidden cursor-pointer group border border-white/10 bg-[#141416] flex flex-col justify-between p-6 shadow-xl transition-[transform,box-shadow,border-color] duration-300"
    >
      <img
        src={event.imageUrl}
        alt={event.name}
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 opacity-65 group-hover:opacity-80"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top-right North-East arrow button */}
        <div className="flex justify-end">
          <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all">
            <span className="material-symbols-outlined text-[16px]">north_east</span>
          </span>
        </div>

        {/* Bottom Area: Title + Horizontal Countdown Capsule Bar */}
        <div className="flex flex-col gap-3.5 mt-auto">
          <div className="min-h-[3.75rem] flex items-end">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight line-clamp-2 leading-tight">
              {event.name}
            </h2>
          </div>

          <div className="flex items-center justify-between bg-black/85 backdrop-blur-xl border border-white/15 px-3.5 py-2.5 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-1.5 w-full justify-between">
              <RollerDigit
                value={timeLeft.days}
                unitLabel="D"
                widthClass={daysWidth}
              />
              <span className="text-white/30 font-bold text-sm select-none">:</span>

              <RollerDigit
                value={timeLeft.hours}
                unitLabel="H"
                widthClass="min-w-[34px]"
              />
              <span className="text-white/30 font-bold text-sm select-none">:</span>

              <RollerDigit
                value={timeLeft.minutes}
                unitLabel="M"
                widthClass="min-w-[34px]"
              />
              <span className="text-white/30 font-bold text-sm select-none">:</span>

              <RollerDigit
                value={timeLeft.seconds}
                unitLabel="S"
                widthClass="min-w-[34px]"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
