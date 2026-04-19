import { useState, useRef, useCallback, useEffect } from "react";
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
  url?: string;
}

export interface PlayerState {
  track: Track | null;
  queue: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
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
    queue: [],
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 70,
  });

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    audioRef.current.volume = player.volume / 100;
  }, [player.volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!player.track?.url) return;
    if (audio.src !== player.track.url) {
      audio.src = player.track.url;
      audio.load();
    }
    if (player.isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [player.track, player.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const onTime = () => setPlayer(p => ({ ...p, currentTime: audio.currentTime }));
    const onDuration = () => setPlayer(p => ({ ...p, duration: audio.duration || 0 }));
    const onEnded = () => {
      setPlayer(p => {
        const idx = p.queue.findIndex(t => t.id === p.track?.id);
        const next = idx >= 0 && idx < p.queue.length - 1 ? p.queue[idx + 1] : null;
        if (next) return { ...p, track: next, isPlaying: true, currentTime: 0 };
        return { ...p, isPlaying: false, currentTime: 0 };
      });
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onDuration);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

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

  // Play a single track, keeping existing queue or setting a new one
  const playTrack = (track: Track, queue?: Track[]) => {
    setPlayer(p => ({ ...p, track, queue: queue ?? p.queue, isPlaying: true, currentTime: 0 }));
  };

  const skipNext = () => {
    setPlayer(p => {
      const idx = p.queue.findIndex(t => t.id === p.track?.id);
      const next = idx >= 0 && idx < p.queue.length - 1 ? p.queue[idx + 1] : null;
      if (!next) return p;
      return { ...p, track: next, isPlaying: true, currentTime: 0 };
    });
  };

  const skipPrev = () => {
    setPlayer(p => {
      if (p.currentTime > 3) {
        audioRef.current.currentTime = 0;
        return { ...p, currentTime: 0 };
      }
      const idx = p.queue.findIndex(t => t.id === p.track?.id);
      const prev = idx > 0 ? p.queue[idx - 1] : null;
      if (!prev) return p;
      return { ...p, track: prev, isPlaying: true, currentTime: 0 };
    });
  };

  const togglePlay = () => {
    setPlayer(p => ({ ...p, isPlaying: !p.isPlaying }));
  };

  const seek = (time: number) => {
    audioRef.current.currentTime = time;
    setPlayer(p => ({ ...p, currentTime: time }));
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
        <div className="hidden md:flex">
          <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>

        {sidebarOpen && (
          <div className="sidebar-overlay md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <div className={`sidebar-drawer md:hidden ${sidebarOpen ? "open" : ""}`}
          style={{ background: "var(--im-bg2, #111)" }}>
          <Sidebar
            currentPage={currentPage}
            onNavigate={(p) => { setCurrentPage(p); setSidebarOpen(false); }}
          />
        </div>

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
              currentTrackId={player.track?.id ?? null}
              isPlaying={player.isPlaying}
              onTogglePlay={togglePlay}
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

      <div className="hidden md:block">
        <PlayerBar
          player={player}
          onTogglePlay={togglePlay}
          onVolumeChange={(v) => setPlayer(p => ({ ...p, volume: v }))}
          onSeek={seek}
          onSkipNext={skipNext}
          onSkipPrev={skipPrev}
        />
      </div>

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
