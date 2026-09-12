import React, { useState, useEffect, useMemo } from 'react';
import { CountdownEvent, ViewMode, TabMode, SortOrder, FilterCategory } from './types';
import { DEFAULT_EVENTS } from './data/defaultEvents';
import { SpotlightBackground } from './components/SpotlightBackground';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { EventCard } from './components/EventCard';
import { CountdownDetail } from './components/CountdownDetail';
import { EventModal } from './components/EventModal';
import { EmptyState } from './components/EmptyState';
import { CalendarView } from './components/CalendarView';

const STORAGE_KEY = 'countdown_events_v2';
const THEME_KEY = 'countdown_theme_pref';

export const App: React.FC = () => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === 'dark';
    return true; // Dark mode by default matching Stitch
  });

  // Events state
  const [events, setEvents] = useState<CountdownEvent[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_EVENTS;
  });

  // UI state
  const [currentTab, setCurrentTab] = useState<TabMode>('upcoming');
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [sortOrder, setSortOrder] = useState<SortOrder>('soonest');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CountdownEvent | null>(null);

  // Apply theme class to <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  // Persist events to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

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

  // CRUD Handlers
  const handleSaveEvent = (
    eventData: Omit<CountdownEvent, 'id' | 'createdAt'>,
    editingId?: string
  ) => {
    if (editingId) {
      setEvents((prev) =>
        prev.map((e) => (e.id === editingId ? { ...e, ...eventData } : e))
      );
    } else {
      const newEvent: CountdownEvent = {
        ...eventData,
        id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString(),
      };
      setEvents((prev) => [newEvent, ...prev]);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    if (selectedEventId === id) {
      handleBackToList();
    }
  };

  const handleToggleArchive = (event: CountdownEvent) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id ? { ...e, isArchived: !e.isArchived } : e
      )
    );
  };

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: CountdownEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // Filtered & Sorted Events
  const filteredEvents = useMemo(() => {
    return events
      .filter((evt) => {
        // Tab filtering
        if (currentTab === 'upcoming' && evt.isArchived) return false;
        if (currentTab === 'archive' && !evt.isArchived) return false;

        // Category filter
        if (selectedCategory !== 'all' && evt.category !== selectedCategory) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = evt.name.toLowerCase().includes(q);
          const matchDesc = evt.description?.toLowerCase().includes(q);
          return matchName || matchDesc;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.targetDate).getTime();
        const timeB = new Date(b.targetDate).getTime();
        return sortOrder === 'soonest' ? timeA - timeB : timeB - timeA;
      });
  }, [events, currentTab, selectedCategory, searchQuery, sortOrder]);

  const archiveCount = useMemo(
    () => events.filter((e) => e.isArchived).length,
    [events]
  );

  return (
    <div className="relative min-h-screen text-on-surface bg-background flex flex-col justify-between selection:bg-white selection:text-black">
      {/* Interactive Background with Spotlight cursor tracker */}
      <SpotlightBackground />

      {/* Main Top Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (selectedEventId) handleBackToList();
        }}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onOpenAddModal={handleOpenAddModal}
        archiveCount={archiveCount}
      />

      {/* Main View Area */}
      <main className="relative z-10 w-full pt-20 max-w-7xl mx-auto px-4 sm:px-6 pb-28 flex-1">
        {selectedEvent ? (
          /* Detail View (Stitch Screen 2) */
          <CountdownDetail
            event={selectedEvent}
            onBack={handleBackToList}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteEvent}
            onToggleArchive={handleToggleArchive}
          />
        ) : currentTab === 'calendar' ? (
          /* Calendar Monthly Timeline View */
          <CalendarView
            events={events.filter((e) => !e.isArchived)}
            onSelectEvent={handleSelectEvent}
          />
        ) : (
          /* Gallery & List Streams (Stitch Screen 1) */
          <>
            <Toolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortOrder={sortOrder}
              onToggleSort={() =>
                setSortOrder((prev) => (prev === 'soonest' ? 'latest' : 'soonest'))
              }
            />

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
                    : 'Try selecting another category or clearing your search filter.'
                }
                onResetFilters={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              />
            ) : viewMode === 'gallery' ? (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <section className="flex flex-col gap-4">
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

      {/* Floating Action Button (FAB) at bottom-right */}
      {!selectedEvent && (
        <button
          type="button"
          onClick={handleOpenAddModal}
          aria-label="Add New Event"
          className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-white text-black shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-white/20 ring-4 ring-white/10"
        >
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>
      )}

      {/* Add / Edit Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        initialEvent={editingEvent}
      />
    </div>
  );
};

export default App;
