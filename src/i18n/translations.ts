import { Language } from '../types';

export interface Translations {
  // Brand & Header
  brand: string;
  upcoming: string;
  archive: string;
  calendar: string;
  switchToLight: string;
  switchToDark: string;
  selectLanguage: string;
  langCode: string;

  // Toolbar
  searchPlaceholder: string;
  gallery: string;
  list: string;
  soonest: string;
  latest: string;
  sortPrefix: string;

  // Time Units
  daysFull: string;
  hoursFull: string;
  minsFull: string;
  secsFull: string;
  daysShort: string;
  hoursShort: string;
  minsShort: string;
  secsShort: string;

  // Countdown Detail
  back: string;
  backToEvents: string;
  share: string;
  targetDate: string;

  // Share Modal
  shareTitle: string;
  scanInstructions: string;
  copyLink: string;
  copied: string;
  moreShareOptions: string;

  // Empty State
  noMomentsFound: string;
  noArchivedMoments: string;
  clearSearchPrompt: string;
  archiveSafekeepingPrompt: string;
  resetFilters: string;

  // Calendar
  eventSingular: string;
  eventPlural: string;
  noEventsMonth: string;

  // Categories
  categories: {
    all: string;
    trips: string;
    work: string;
    birthdays: string;
    health: string;
    milestones: string;
  };

  // Localized Event Names & Descriptions
  events: Record<
    string,
    {
      name: string;
      description: string;
    }
  >;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brand: 'Countdown',
    upcoming: 'Upcoming',
    archive: 'Archive',
    calendar: 'Calendar',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    selectLanguage: 'Select Language',
    langCode: 'EN',

    searchPlaceholder: 'Search countdowns...',
    gallery: 'Gallery',
    list: 'List',
    soonest: 'Soonest',
    latest: 'Latest',
    sortPrefix: 'Sort:',

    daysFull: 'DAYS',
    hoursFull: 'HOURS',
    minsFull: 'MINS',
    secsFull: 'SECS',
    daysShort: 'D',
    hoursShort: 'H',
    minsShort: 'M',
    secsShort: 'S',

    back: 'Back',
    backToEvents: 'Back to Events',
    share: 'Share',
    targetDate: 'Target Date',

    shareTitle: 'Share Countdown',
    scanInstructions: 'Scan with iPhone Camera to view countdown',
    copyLink: 'Copy Link',
    copied: 'Copied!',
    moreShareOptions: 'More sharing options...',

    noMomentsFound: 'No countdown moments found',
    noArchivedMoments: 'No archived moments',
    clearSearchPrompt: 'Try clearing your search filter.',
    archiveSafekeepingPrompt: 'Moments you archive will appear here for safekeeping.',
    resetFilters: 'Reset Filters',

    eventSingular: 'event',
    eventPlural: 'events',
    noEventsMonth: 'No events scheduled for this month',

    categories: {
      all: 'All',
      trips: 'Trips',
      work: 'Work',
      birthdays: 'Birthdays',
      health: 'Health',
      milestones: 'Milestones',
    },

    events: {
      evt_1: {
        name: 'Summer Trip to Kyoto',
        description: 'Exploring ancient bamboo groves, moss gardens, and historic wooden shrines in Kyoto.',
      },
      evt_2: {
        name: 'WWDC 2025 Keynote',
        description: 'Apple Worldwide Developers Conference platform state of the union and design awards.',
      },
      evt_3: {
        name: "Elena's 30th Birthday",
        description: 'Rooftop sunset celebration with close friends, ambient acoustic set and cake.',
      },
      evt_4: {
        name: 'Half Marathon Sunrise Run',
        description: 'Coastal morning 21k race along scenic harbor cliffs and sunrise bays.',
      },
      evt_5: {
        name: 'Product 2.0 Launch',
        description: 'Global release of modern glassmorphic interface update to early adopters.',
      },
    },
  },
  vi: {
    brand: 'Đếm ngược',
    upcoming: 'Sắp tới',
    archive: 'Lưu trữ',
    calendar: 'Lịch',
    switchToLight: 'Chuyển sang Giao diện Sáng',
    switchToDark: 'Chuyển sang Giao diện Tối',
    selectLanguage: 'Chọn ngôn ngữ',
    langCode: 'VI',

    searchPlaceholder: 'Tìm kiếm sự kiện đếm ngược...',
    gallery: 'Bộ sưu tập',
    list: 'Danh sách',
    soonest: 'Sắp tới',
    latest: 'Mới nhất',
    sortPrefix: 'Sắp xếp:',

    daysFull: 'NGÀY',
    hoursFull: 'GIỜ',
    minsFull: 'PHÚT',
    secsFull: 'GIÂY',
    daysShort: 'D',
    hoursShort: 'H',
    minsShort: 'M',
    secsShort: 'S',

    back: 'Quay lại',
    backToEvents: 'Quay lại danh sách',
    share: 'Chia sẻ',
    targetDate: 'Ngày diễn ra',

    shareTitle: 'Chia sẻ đếm ngược',
    scanInstructions: 'Quét bằng camera điện thoại để xem đếm ngược',
    copyLink: 'Sao chép liên kết',
    copied: 'Đã sao chép!',
    moreShareOptions: 'Tùy chọn chia sẻ khác...',

    noMomentsFound: 'Không tìm thấy khoảnh khắc đếm ngược nào',
    noArchivedMoments: 'Chưa có khoảnh khắc lưu trữ nào',
    clearSearchPrompt: 'Hãy thử xóa bộ lọc tìm kiếm.',
    archiveSafekeepingPrompt: 'Các khoảnh khắc bạn lưu trữ sẽ xuất hiện tại đây.',
    resetFilters: 'Đặt lại bộ lọc',

    eventSingular: 'sự kiện',
    eventPlural: 'sự kiện',
    noEventsMonth: 'Không có sự kiện nào trong tháng này',

    categories: {
      all: 'Tất cả',
      trips: 'Chuyến đi',
      work: 'Công việc',
      birthdays: 'Sinh nhật',
      health: 'Sức khỏe',
      milestones: 'Cột mốc',
    },

    events: {
      evt_1: {
        name: 'Chuyến du lịch hè Kyoto',
        description: 'Khám phá rừng tre cổ thụ, vườn rêu thanh tịnh và các ngôi đền lịch sử tại Kyoto.',
      },
      evt_2: {
        name: 'Hội nghị WWDC 2025',
        description: 'Hội nghị các nhà phát triển toàn cầu của Apple với sự kiện ra mắt nền tảng mới.',
      },
      evt_3: {
        name: 'Sinh nhật tuổi 30 của Elena',
        description: 'Bữa tiệc hoàng hôn trên sân thượng cùng bạn thân, ban nhạc acoustic và bánh kem.',
      },
      evt_4: {
        name: 'Giải chạy bán marathon bình minh',
        description: 'Đường chạy ven biển 21km đón bình minh rực rỡ qua các vách đá và bến cảng.',
      },
      evt_5: {
        name: 'Ra mắt sản phẩm 2.0',
        description: 'Phát hành toàn cầu bản cập nhật giao diện kính mờ hiện đại cho người dùng trải nghiệm sớm.',
      },
    },
  },
};
