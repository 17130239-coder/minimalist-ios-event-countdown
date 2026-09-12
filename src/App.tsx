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
  // Theme state - always defaults to dark matching Stitch OLED aesthetic
  const [isDark, setIsDark] = useState<boolean>(true);

  // Events state - strictly initialize with canonical Stitch events
  const [events] = useState<CountdownEvent[]>(DEFAULT_EVENTS);

  // UI state
  const [currentTab, setCurrentTab] = useState<TabMode>('upcoming');
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [isSorted, setIsSorted] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('soonest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Purge any legacy localStorage keys that could corrupt user's browser
  useEffect(() => {
    try {
      [
        'countdown_events',
        'countdown_events_v2',
        'countdown_events_v3',
        'countdown_events_v4',
        'countdown_theme_pref',
        'countdown_theme_pref_v2',
        'countdown_theme_pref_v3',
        'countdown_theme_pref_v4',
        'countdown_theme_pref_v5',
      ].forEach((key) => localStorage.removeItem(key));
    } catch {
      // Ignore
    }
  }, []);

  // Apply theme class to <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
    <div className="font-body antialiased selection:bg-white selection:text-black min-h-screen relative overflow-x-hidden bg-[#0e0e10] text-[#e5e1e4] flex flex-col justify-between">
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
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="eventsStream">
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
              <section className="flex flex-col gap-4" id="eventsStream">
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
