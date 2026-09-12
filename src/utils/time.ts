import { TimeRemaining } from '../types';

export function calculateTimeRemaining(targetDate: string): TimeRemaining {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days),
    hours: hours < 10 ? '0' + hours : String(hours),
    minutes: minutes < 10 ? '0' + minutes : String(minutes),
    seconds: seconds < 10 ? '0' + seconds : String(seconds),
    totalMs: diff,
    isFinished: diff === 0,
  };
}

export function formatDateFull(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatDateShort(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function calculateProgress(createdAt: string, targetDate: string): number {
  const start = new Date(createdAt).getTime();
  const end = new Date(targetDate).getTime();
  const now = Date.now();

  if (end <= start) return 100;
  const elapsed = Math.max(0, now - start);
  const total = end - start;
  const percent = (elapsed / total) * 100;
  return Math.min(100, Math.max(0, Math.round(percent)));
}
