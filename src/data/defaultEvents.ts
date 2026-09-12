import { CountdownEvent } from '../types';

export const DEFAULT_EVENTS: CountdownEvent[] = [
  {
    id: 'evt_1',
    name: 'Summer Trip to Kyoto',
    description: 'Exploring ancient bamboo groves, moss gardens, and historic wooden shrines',
    targetDate: new Date(Date.now() + (84 * 24 + 14) * 3600 * 1000 + 29 * 60 * 1000).toISOString(),
    category: 'trips',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'evt_2',
    name: 'WWDC 2025 Keynote',
    description: 'Apple Worldwide Developers Conference platform state of the union and design awards',
    targetDate: new Date(Date.now() + (45 * 24 + 8) * 3600 * 1000 + 12 * 60 * 1000).toISOString(),
    category: 'work',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'evt_3',
    name: "Elena's 30th Birthday",
    description: 'Rooftop sunset celebration with close friends, ambient acoustic set and cake',
    targetDate: new Date(Date.now() + (111 * 24 + 17) * 3600 * 1000 + 58 * 60 * 1000).toISOString(),
    category: 'birthdays',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'evt_4',
    name: 'Half Marathon Sunrise Run',
    description: 'Coastal morning 21k race along scenic harbor cliffs and sunrise bays',
    targetDate: new Date(Date.now() + (163 * 24 + 11) * 3600 * 1000 + 37 * 60 * 1000).toISOString(),
    category: 'health',
    imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'evt_5',
    name: 'Product 2.0 Launch',
    description: 'Global release of modern glassmorphic interface update to early adopters',
    targetDate: new Date(Date.now() + (35 * 24 + 21) * 3600 * 1000 + 3 * 60 * 1000).toISOString(),
    category: 'work',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    createdAt: new Date().toISOString(),
  }
];

export const CATEGORY_LABELS: Record<string, { label: string; icon: string }> = {
  all: { label: 'All', icon: 'apps' },
  trips: { label: 'Trips', icon: 'flight_takeoff' },
  work: { label: 'Work', icon: 'business_center' },
  birthdays: { label: 'Birthdays', icon: 'cake' },
  health: { label: 'Health', icon: 'directions_run' },
  milestones: { label: 'Milestones', icon: 'flag' },
};

export const PRESET_IMAGES = [
  { label: 'Kyoto Temple', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80' },
  { label: 'Keynote & Tech', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80' },
  { label: 'Celebration', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80' },
  { label: 'Sunrise Athletic', url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&q=80' },
  { label: 'Workspace Focus', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80' },
  { label: 'Mountain Horizon', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
];
