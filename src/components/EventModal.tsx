import React, { useState, useEffect } from 'react';
import { CountdownEvent, Category } from '../types';
import { CATEGORY_LABELS, PRESET_IMAGES } from '../data/defaultEvents';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: Omit<CountdownEvent, 'id' | 'createdAt'>, editingId?: string) => void;
  initialEvent?: CountdownEvent | null;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialEvent,
}) => {
  const [name, setName] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState<Category>('trips');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialEvent) {
      setName(initialEvent.name);
      const d = new Date(initialEvent.targetDate);
      const tzOffset = d.getTimezoneOffset() * 60000;
      const localISOTime = new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
      setTargetDate(localISOTime);
      setCategory(initialEvent.category);
      setDescription(initialEvent.description);
      setImageUrl(initialEvent.imageUrl);
    } else {
      setName('');
      const future = new Date(Date.now() + 30 * 24 * 3600 * 1000);
      const tzOffset = future.getTimezoneOffset() * 60000;
      const localISOTime = new Date(future.getTime() - tzOffset).toISOString().slice(0, 16);
      setTargetDate(localISOTime);
      setCategory('trips');
      setDescription('');
      setImageUrl(PRESET_IMAGES[0].url);
    }
    setError('');
  }, [initialEvent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter an event title');
      return;
    }
    if (!targetDate) {
      setError('Please pick a target date and time');
      return;
    }

    const isoDate = new Date(targetDate).toISOString();
    onSave(
      {
        name: name.trim(),
        targetDate: isoDate,
        category,
        description: description.trim(),
        imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
        isArchived: initialEvent?.isArchived || false,
      },
      initialEvent ? initialEvent.id : undefined
    );
    onClose();
  };

  const categories: Category[] = ['trips', 'work', 'birthdays', 'health', 'milestones'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#141416] border border-slate-200/80 dark:border-white/15 shadow-2xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-accent-indigo text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">
                {initialEvent ? 'edit' : 'add_alarm'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              {initialEvent ? 'Edit Countdown' : 'New Countdown'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8e8e93] mb-1.5">
              Event Title
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Vacation in Tokyo"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 text-sm focus:outline-none focus:border-accent-indigo shadow-xs transition-colors"
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8e8e93] mb-1.5">
              Target Date & Time
            </label>
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-accent-indigo shadow-xs transition-colors"
            />
          </div>

          {/* Category Chips */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8e8e93] mb-1.5">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const meta = CATEGORY_LABELS[cat];
                const isSel = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSel
                        ? 'bg-accent-indigo text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-black/30 text-slate-700 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-black/50 border border-slate-200/80 dark:border-white/10'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">{meta.icon}</span>
                    <span>{meta.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8e8e93] mb-1.5">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Add personal notes or milestones..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 text-sm focus:outline-none focus:border-accent-indigo shadow-xs transition-colors resize-none"
            />
          </div>

          {/* Image Presets */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8e8e93] mb-1.5">
              Background Aesthetic
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {PRESET_IMAGES.map((preset) => {
                const isSel = imageUrl === preset.url;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`relative h-14 rounded-lg overflow-hidden border transition-all ${
                      isSel
                        ? 'border-accent-indigo ring-2 ring-accent-indigo/50'
                        : 'border-slate-200 dark:border-white/10 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-black/70 text-[9px] text-white py-0.5 truncate px-1 text-center font-medium">
                      {preset.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-medium text-slate-600 dark:text-white/70 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-accent-indigo hover:bg-accent-indigo/90 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-indigo-500/25 active:scale-95"
            >
              {initialEvent ? 'Save Changes' : 'Create Moment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
