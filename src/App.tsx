import React, { useState, useEffect, useMemo } from 'react';
import { CountdownEvent, ViewMode, TabMode, SortOrder } from './types';
import { DEFAULT_EVENTS } from './data/defaultEvents';
import { SpotlightBackground } from './components/SpotlightBackground';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { EventCard } from './components/EventCard';
import { CountdownDetail } from './components/CountdownDetail';
import { EmptyState } from './components/EmptyState';
import { CalendarView } from './components/CalendarView';

export const App: React.FC = () => {
  // Theme state - defaults to dark, persists to localStorage
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('countdown_theme');
      if (saved) return saved === 'dark';
    } catch {}
    return true;
  });

  // Events state - strictly initialize with canonical Stitch events
  const [events] = useState<CountdownEvent[]>(DEFAULT_EVENTS);

  // UI state
  const [currentTab, setCurrentTab] = useState<TabMode>('upcoming');
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [isSorted, setIsSorted] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('soonest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Apply theme class to <html> and persist
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('countdown_theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('countdown_theme', 'light');
      } catch {}
    }
  }, [isDark]);

  // URL Hash Sync for sharing / direct link
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/event/')) {
        const id = hash.replace('#/event/', '');
        setSelectedEventId(id);
      } else {
        setSelectedEventId(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectEvent = (event: CountdownEvent) => {
    window.location.hash = `#/event/${event.id}`;
    setSelectedEventId(event.id);
  };

  const handleBackToList = () => {
    window.location.hash = '#/';
    setSelectedEventId(null);
  };

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId) || null,
    [events, selectedEventId]
  );

  const handleToggleSort = () => {
    if (!isSorted) {
      setIsSorted(true);
      setSortOrder('soonest');
    } else if (sortOrder === 'soonest') {
      setSortOrder('latest');
    } else {
      setIsSorted(false);
      setSortOrder('soonest');
    }
  };

  // Filtered & Sorted Events
  const filteredEvents = useMemo(() => {
    const list = events.filter((evt) => {
      if (currentTab === 'upcoming' && evt.isArchived) return false;
      if (currentTab === 'archive' && !evt.isArchived) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return evt.name.toLowerCase().includes(q) || (evt.description && evt.description.toLowerCase().includes(q));
      }

      return true;
    });

    if (isSorted) {
      return list.slice().sort((a, b) => {
        const timeA = new Date(a.targetDate).getTime();
        const timeB = new Date(b.targetDate).getTime();
        return sortOrder === 'soonest' ? timeA - timeB : timeB - timeA;
      });
    }

    return list;
  }, [events, currentTab, searchQuery, isSorted, sortOrder]);

  return (
    <div className="font-body antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black min-h-screen relative overflow-x-hidden bg-[#f2f2f7] dark:bg-[#0e0e10] text-[#1c1c1e] dark:text-[#e5e1e4] flex flex-col justify-between transition-colors duration-200">
      {/* Interactive Dynamic Background: Ambient Dot Grid & Spotlight Glow */}
      <SpotlightBackground />

      {/* 1. Top Navigation Bar: Shown only on Gallery / List / Calendar views, matching Stitch spec */}
      {!selectedEvent && (
        <Header
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            if (selectedEventId) handleBackToList();
          }}
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
        />
      )}

      {/* Main Container */}
      <main
        className={`relative z-10 w-full mx-auto flex-1 ${
          selectedEvent
            ? 'max-w-5xl px-4 sm:px-6 pt-8 pb-12 flex flex-col justify-between'
            : 'pt-20 max-w-7xl px-6 pb-28'
        }`}
      >
        {selectedEvent ? (
          /* Detail View: Exact match with Stitch Countdown - Detail (Fixed & Running) */
          <CountdownDetail
            event={selectedEvent}
            onBack={handleBackToList}
          />
        ) : currentTab === 'calendar' ? (
          /* Calendar View */
          <CalendarView
            events={events.filter((e) => !e.isArchived)}
            onSelectEvent={handleSelectEvent}
          />
        ) : (
          /* Gallery & List Streams: Exact match with Stitch Countdown - Gallery (Fixed & Running) */
          <>
            {/* 2. Toolbar / Filter Section (Exact Stitch Spec) */}
            <Toolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortOrder={sortOrder}
              onToggleSort={handleToggleSort}
            />

            {/* 3. Event Cards Stream (Exact Stitch Spec) */}
            {filteredEvents.length === 0 ? (
              <EmptyState
                title={
                  currentTab === 'archive'
                    ? 'No archived moments'
                    : 'No countdown moments found'
                }
                description={
                  currentTab === 'archive'
                    ? 'Moments you archive will appear here for safekeeping.'
                    : 'Try clearing your search filter.'
                }
                onResetFilters={() => {
                  setSearchQuery('');
                }}
              />
            ) : viewMode === 'gallery' ? (
              <section key="gallery" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" id="eventsStream">
                {filteredEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    viewMode="gallery"
                    onSelect={handleSelectEvent}
                  />
                ))}
              </section>
            ) : (
              <section key="list" className="flex flex-col gap-4 animate-fade-in" id="eventsStream">
                {filteredEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    viewMode="list"
                    onSelect={handleSelectEvent}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
