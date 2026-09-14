export type Category = 'trips' | 'work' | 'birthdays' | 'health' | 'milestones';
export type FilterCategory = 'all' | Category;

export interface CountdownEvent {
  id: string;
  name: string;
  description: string;
  targetDate: string; // ISO string
  category: Category;
  imageUrl: string;
  createdAt: string;
  isArchived?: boolean;
}

export type ViewMode = 'gallery' | 'list';
export type TabMode = 'upcoming' | 'archive' | 'calendar';
export type SortOrder = 'soonest' | 'latest';
export type Language = 'en' | 'vi';

export interface TimeRemaining {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  totalMs: number;
  isFinished: boolean;
}
