import React from 'react';
import { CountdownEvent } from '../types';
import { formatDateFull } from '../utils/time';
import { CATEGORY_LABELS } from '../data/defaultEvents';

interface CalendarViewProps {
  events: CountdownEvent[];
  onSelectEvent: (event: CountdownEvent) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onSelectEvent,
}) => {
  // Sort events chronologically
  const sorted = [...events].sort(
    (a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
  );

  // Group events by Month & Year
  const grouped = sorted.reduce<Record<string, CountdownEvent[]>>((acc, event) => {
    const d = new Date(event.targetDate);
    const key = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  return (
    <div className="space-y-8 max-w-4xl mx-auto pt-4 pb-16">
      {Object.entries(grouped).map(([monthYear, monthEvents]) => (
        <div key={monthYear} className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold tracking-tight text-white dark:text-white text-black">
              {monthYear}
            </h3>
            <div className="h-px flex-1 bg-white/10 dark:bg-white/10 bg-black/10" />
            <span className="text-xs font-semibold text-[#8e8e93] px-2.5 py-0.5 rounded-full bg-white/5 dark:bg-white/5 bg-black/5">
              {monthEvents.length} {monthEvents.length === 1 ? 'event' : 'events'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {monthEvents.map((evt) => {
              const d = new Date(evt.targetDate);
              const day = d.getDate();
              const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
              const catMeta = CATEGORY_LABELS[evt.category] || { label: evt.category, icon: 'bookmark' };

              return (
                <div
                  key={evt.id}
                  onClick={() => onSelectEvent(evt)}
                  className="p-4 rounded-2xl bg-[#141416] dark:bg-[#141416] bg-black/5 border border-white/10 dark:border-white/10 border-black/10 hover:border-accent-indigo/50 hover:bg-[#1a1a1e] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    {/* Date badge */}
                    <div className="w-12 h-12 rounded-xl bg-white/10 dark:bg-white/10 bg-black/5 flex flex-col items-center justify-center border border-white/15 dark:border-white/15 border-black/10 shrink-0">
                      <span className="text-[10px] uppercase font-bold text-accent-sky">
                        {weekday}
                      </span>
                      <span className="text-lg font-bold font-mono text-white dark:text-white text-black">
                        {day}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-black/5 text-[#8e8e93]">
                          {catMeta.label}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white dark:text-white text-black group-hover:text-accent-indigo transition-colors line-clamp-1">
                        {evt.name}
                      </h4>
                      <p className="text-xs text-[#8e8e93] mt-0.5">
                        {formatDateFull(evt.targetDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-white/5 dark:bg-white/5 bg-black/5 flex items-center justify-center text-white/50 group-hover:bg-accent-indigo group-hover:text-white transition-all shrink-0">
                      <span className="material-symbols-outlined text-[14px]">north_east</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
