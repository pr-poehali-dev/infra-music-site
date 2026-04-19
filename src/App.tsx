import { useState, useRef, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import PlayerBar from "@/components/PlayerBar";
import MoodModal from "@/components/MoodModal";
import HomePage from "@/pages/HomePage";
import PlaylistsPage from "@/pages/PlaylistsPage";
import FocusPage from "@/pages/FocusPage";
import ProfilePage from "@/pages/ProfilePage";
import BottomNav from "@/components/BottomNav";
import SearchPage from "@/pages/SearchPage";

export type Page = "home" | "playlists" | "focus" | "profile" | "search";

export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  mood?: string;
}

export interface PlayerState {
  track: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
}

export const HERO_IMG = "https://cdn.poehali.dev/projects/10dd74f9-da46-482b-b42b-a06097240542/files/65ea86d4-3cc9-4d64-b278-044c1c187a5d.jpg";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [showMoodModal, setShowMoodModal] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [player, setPlayer] = useState<PlayerState>({
    track: null,
    isPlaying: false,
    progress: 35,
    volume: 70,
  });

  // Swipe detection
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    // Only horizontal swipes (angle < 45°)
    if (dy > Math.abs(dx) * 0.8) return;
    if (dx > 48 && touchStartX.current < 40) setSidebarOpen(true);
    if (dx < -48) setSidebarOpen(false);
    touchStartX.current = null;
    touchStartY.current = null;
  }, []);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowMoodModal(false);
    setCurrentPage("playlists");
  };

  const playTrack = (track: Track) => {
    setPlayer(p => ({ ...p, track, isPlaying: true }));
  };

  const togglePlay = () => {
    setPlayer(p => ({ ...p, isPlaying: !p.isPlaying }));
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden mesh-bg"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {showMoodModal && (
        <MoodModal onSelect={handleMoodSelect} heroImg={HERO_IMG} />
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop sidebar */}
        <div className="hidden md:flex">
          <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile sidebar drawer */}
        <div className={`sidebar-drawer md:hidden ${sidebarOpen ? "open" : ""}`}
          style={{ background: "var(--im-bg2, #111)" }}>
          <Sidebar
            currentPage={currentPage}
            onNavigate={(p) => { setCurrentPage(p); setSidebarOpen(false); }}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {currentPage === "home" && (
            <HomePage
              heroImg={HERO_IMG}
              onOpenMood={() => setShowMoodModal(true)}
              selectedMood={selectedMood}
              onNavigate={setCurrentPage}
              onPlayTrack={playTrack}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          )}
          {currentPage === "playlists" && (
            <PlaylistsPage
              selectedMood={selectedMood}
              onPlayTrack={playTrack}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          )}
          {currentPage === "focus" && (
            <FocusPage
              onPlayTrack={playTrack}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          )}
          {currentPage === "profile" && (
            <ProfilePage
              selectedMood={selectedMood}
              onNavigate={setCurrentPage}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          )}
          {currentPage === "search" && (
            <SearchPage
              onPlayTrack={playTrack}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Player */}
      <div className="hidden md:block">
        <PlayerBar
          player={player}
          onTogglePlay={togglePlay}
          onVolumeChange={(v) => setPlayer(p => ({ ...p, volume: v }))}
        />
      </div>

      {/* Mobile bottom nav + mini player */}
      <div className="md:hidden">
        <BottomNav
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          player={player}
          onTogglePlay={togglePlay}
        />
      </div>
    </div>
  );
}