# Minimalist iOS Event Countdown

> A refined personal event countdown web application with an authentic iOS 18+ Apple Native Modern Glass design system, interactive spotlight backgrounds, and live tabular digit countdowns. Inspired by the Stitch design **"Minimalist iOS Event Countdown"**.

🌐 **Live Demo**: [https://17130239-coder.github.io/minimalist-ios-event-countdown/](https://17130239-coder.github.io/minimalist-ios-event-countdown/)  
📦 **Repository**: [https://github.com/17130239-coder/minimalist-ios-event-countdown](https://github.com/17130239-coder/minimalist-ios-event-countdown)

![Countdown App Preview](https://lh3.googleusercontent.com/aida/AEtjO1XSphhcTYnIt11Slvb6tQSV4mB3jKg2NfIlSaJ1bJdWhunKYz6n_VJL3cTeAJg4F3LxTb84flnCk6SORb0G4sksGFY-W-Xr4LrRFgOrLhB1sYxJxbeo84FgU1jLlVa_g_eizzmxqVTbwsIEViY4mroLycedEsNB1FupcAV7jqPtH6AS0v-ZO7GcgU0er2pYNnItkiyBDty5p2owZ_O_YTi2_aXUuP2BRK1iTDeR-dsiJBeszrw-XwBqEQ)

---

## ✨ Features

### 🎨 Design System (Apple Native Modern Glass)
- **Palette**: Obsidian pitch canvas (`#0e0e10`), translucent elevated glass panels (`#141416`), luminous Indigo (`#4F46E5`), Sky Blue (`#38BDF8`), and Lavender (`#A855F7`).
- **Interactive Ambient Background**: Dynamic 24px dot-grid with mouse-tracking radial spotlight follower (`--mouse-x`, `--mouse-y`) and masked specular glow.
- **Micro-Physics**: Apple iOS 18 standard `cubic-bezier(0.16, 1, 0.3, 1)` spring curves throughout all transitions.
- **Typography**: Dual hierarchy combining **Inter** for editorial typography and **JetBrains Mono** for tabular, jitter-free countdown metrics.
- **Dark / Light Mode**: Seamless theme toggle with local storage persistence.

### 📱 Screen 1: Countdown Gallery & List Stream
- **Segmented Navigation**: Toggle between *Upcoming*, *Archive*, and *Calendar* views.
- **Live Search & Category Filtering**: Instant search across events with category pills (*Trips*, *Work*, *Birthdays*, *Health*, *Milestones*).
- **View Switcher**: Smooth toggle between full 3-column *Gallery* cards and compact *List* rows.
- **Sort Order**: Toggle sorting by *Soonest* or *Latest* milestone date.
- **Ticking Digit Rollers**: Each card displays a live countdown capsule with hardware-accelerated 3D slide-up roller animations (`D : H : M : S`).
- **Floating Action Button (FAB)**: Minimalist round `+` button elevated with specular rim highlights.

### ⏱️ Screen 2: Countdown Detail View
- **Editorial Headline**: Prominent event title with category indicator and formatted target date.
- **Hero Flip-Tile Stage**: 4 large seamless flip-tile digit cards (`DAYS`, `HOURS`, `MINS`, `SECS`) with 60fps/120fps entering/exiting slide-up animations.
- **Milestone Progress Ring**: Circular SVG progress gauge calculating elapsed journey percentage with gradient stroke (`#4F46E5` → `#38BDF8`).
- **Event Lifecycle**: Full Edit, Archive/Unarchive, and Delete capabilities.
- **One-Click Sharing**: Native `navigator.clipboard` share button with visual feedback.
- **Celebration Confetti**: Automatic celebratory confetti burst triggered when a countdown reaches zero.

### 📅 Calendar Timeline View
- Grouped chronological overview of all milestones by month and year.
- Quick navigation directly into event detail views.

### 💾 Data Persistence
- Client-side persistence using `localStorage` with preloaded default events matching the Stitch design.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables & Masking
- **Icons**: Material Symbols Outlined + Lucide Icons
- **Effects**: Canvas Confetti

---

## 🚀 Getting Started

### Installation
```bash
cd /Users/andynguyen/workspace/minimalist-ios-event-countdown
npm install
```

### Development Server
```bash
npm run dev
```
The app will be accessible at: `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

---

## 📐 Project Structure

```
minimalist-ios-event-countdown/
├── index.html                  # HTML entry with Apple web-app meta & Google Fonts
├── package.json                # Dependencies & scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Stitch design system color & typography tokens
├── tsconfig.json               # TypeScript project reference config
├── tsconfig.app.json           # Application TypeScript config
├── vite.config.ts              # Vite configuration
├── src/
│   ├── main.tsx                # Application mount point
│   ├── App.tsx                 # Main state coordinator & view router
│   ├── index.css               # Stitch glassmorphism, animations & background layers
│   ├── types.ts                # TypeScript interfaces (Event, Category, ViewMode)
│   ├── data/
│   │   └── defaultEvents.ts    # Curated Stitch design events & presets
│   ├── utils/
│   │   └── time.ts             # Time remaining, formatters & progress calculations
│   └── components/
│       ├── SpotlightBackground.tsx  # Interactive mouse cursor spotlight tracker
│       ├── Header.tsx               # iOS glass top navigation & controls
│       ├── Toolbar.tsx              # Search, filter chips, view switcher & sort
│       ├── RollerDigit.tsx          # Card-level smooth rolling digit capsules
│       ├── FlipTile.tsx             # Hero detail-level 3D sliding digit tiles
│       ├── EventCard.tsx            # Gallery grid & list stream event card
│       ├── CountdownDetail.tsx      # Screen 2 detail view with progress ring
│       ├── CalendarView.tsx         # Monthly calendar timeline overview
│       ├── EventModal.tsx           # iOS bottom-sheet modal for Add/Edit
│       └── EmptyState.tsx           # Placeholder for empty filter results
```
