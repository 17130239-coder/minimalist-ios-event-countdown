import { CountdownEvent } from '../types';

export const DEFAULT_EVENTS: CountdownEvent[] = [
  {
    id: 'evt_1',
    name: 'Summer Trip to Kyoto',
    description: 'Exploring ancient bamboo groves, moss gardens, and historic wooden shrines in Kyoto.',
    targetDate: new Date(Date.now() + (84 * 24 + 14) * 3600 * 1000 + 25 * 60 * 1000 + 11 * 1000).toISOString(),
    category: 'trips',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD-CJK--07K8btAOwprY6xLpceUvYKZCRRBsGJR_ku62SCp9GBNeBbC44X51KJRd8JX_FU-QxuQjCdgZJczHQhdmWjXOEfYH6ClOWYbXxweXAi-4mNNVoqcZWU4Kp7b6R4JwDeQAYzPFR0LhNJDw5caXcBh3QyuX8nrqaDJWxI-SiOKeYa7EqzXbskxPNWGVjeN9jFhEGj9Ez1hrGUa9QVu-OogrNWsjdA2LcUZTNMG9_EVHd_8Nfy',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'evt_2',
    name: 'WWDC 2025 Keynote',
    description: 'Apple Worldwide Developers Conference platform state of the union and design awards.',
    targetDate: new Date(Date.now() + (45 * 24 + 8) * 3600 * 1000 + 12 * 60 * 1000 + 44 * 1000).toISOString(),
    category: 'work',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG6SCao51IthvpnjtFzEg3Bhzo_wsm3Bk33cxcAzdJ4p4sdS_AMje7jhO_HZuEWEc6DsJWKGyUYioqJbedP-IRwhuzw_pxlbvxWE6xPEt3MgVABf2U9m3TyE229UBOx2Xn4XzC5yflCFITCnOzrcTrPm-plw9ftS4CVtW7m9tx7Qqc07cCTcoaXJDHN2fZjKWvs2KwI5W4uEkvt9NAw2f12vT_YsMByTgOn9Wtgdc2CA3mRXjFtrEC',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'evt_3',
    name: "Elena's 30th Birthday",
    description: 'Rooftop sunset celebration with close friends, ambient acoustic set and cake.',
    targetDate: new Date(Date.now() + (111 * 24 + 17) * 3600 * 1000 + 58 * 60 * 1000 + 30 * 1000).toISOString(),
    category: 'birthdays',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwguEZ84zgyLSQJ_IIdAmaQ0uZ_BhTiaNodKXNKz6mwTItVrPbVyXpmW7YlQIzgfC0r-EJqAV0XoJ13dnKIfFWCeUrafuZFltgfDYXA7m5HMmYKgxnX5eJcVby_2YPXK0s73QobSPEcbg-bUW9DJqwHWfLYa33BQHXMG2HFOvEoXUc2X4Z8uJXYCfw2EicllD9ddrS_AmOq97G7wZ4wdg_wJDCBX0uuOUtcN0219WB8zarzzYhNS0e',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'evt_4',
    name: 'Half Marathon Sunrise Run',
    description: 'Coastal morning 21k race along scenic harbor cliffs and sunrise bays.',
    targetDate: new Date(Date.now() + (163 * 24 + 11) * 3600 * 1000 + 37 * 60 * 1000 + 55 * 1000).toISOString(),
    category: 'health',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrF12WXRwHmQREUIzLYL1225zz_YzzFbtt6b-i4k3MHk8rJV02K4_qmJ-Jrvq7pp41-AEQF1-0ZxuR0XGoVqSC9Myq6BFMTyUWmwImfH7m2gnKzu57UV8vh7snVEDGaXWZdq25qILI1El5A1YwHGH02mZXl6QxIwF4077LE8UMv_nr0nB_rhArP3S3vSGRlu5QN6xjpRft8QucniGbB3lwVtjcqmWkvzmnKr6SRmS7ucdJ97ACDN9q',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'evt_5',
    name: 'Product 2.0 Launch',
    description: 'Global release of modern glassmorphic interface update to early adopters.',
    targetDate: new Date(Date.now() + (35 * 24 + 21) * 3600 * 1000 + 3 * 60 * 1000 + 9 * 1000).toISOString(),
    category: 'work',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnBK2bS9--LcE0KItLnWGvwEPPKwGu6NUmvqp7wK3jW4Bpb5IZpSVe9KHu6pHAaBEqhv6jVgsU-YBB9L5GKpvbx4I9wp7cdXvYFnMUvUBiT24MUQV2ZtXoFMc5GW59A_v8E2CKeVH0TDetrGp0hubZPtFlnMxQk91QRLlUur7IrctpxmmRnFgnAoVwAmLkziyrYKh4tkvkjqPiu_5-tZEf4lBWXqcnDp6jcA-TiELelFdcacvUPYBi',
    createdAt: new Date().toISOString(),
  },
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
  { label: 'Kyoto Temple', url: DEFAULT_EVENTS[0].imageUrl },
  { label: 'WWDC Keynote', url: DEFAULT_EVENTS[1].imageUrl },
  { label: 'Birthday Celebration', url: DEFAULT_EVENTS[2].imageUrl },
  { label: 'Half Marathon Run', url: DEFAULT_EVENTS[3].imageUrl },
  { label: 'Product 2.0 Launch', url: DEFAULT_EVENTS[4].imageUrl },
];
