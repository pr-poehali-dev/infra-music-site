import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PlayerBar from "@/components/PlayerBar";
import MoodModal from "@/components/MoodModal";
import HomePage from "@/pages/HomePage";
import PlaylistsPage from "@/pages/PlaylistsPage";
import FocusPage from "@/pages/FocusPage";
import ProfilePage from "@/pages/ProfilePage";

export type Page = "home" | "playlists" | "focus" | "profile";

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
  const [player, setPlayer] = useState<PlayerState>({
    track: null,
    isPlaying: false,
    progress: 35,
    volume: 70,
  });

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
    <div className="flex flex-col h-screen mesh-bg overflow-hidden">
      {showMoodModal && (
        <MoodModal onSelect={handleMoodSelect} heroImg={HERO_IMG} />
      )}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

        <main className="flex-1 overflow-y-auto">
          {currentPage === "home" && (
            <HomePage
              heroImg={HERO_IMG}
              onOpenMood={() => setShowMoodModal(true)}
              selectedMood={selectedMood}
              onNavigate={setCurrentPage}
              onPlayTrack={playTrack}
            />
          )}
          {currentPage === "playlists" && (
            <PlaylistsPage selectedMood={selectedMood} onPlayTrack={playTrack} />
          )}
          {currentPage === "focus" && (
            <FocusPage onPlayTrack={playTrack} />
          )}
          {currentPage === "profile" && (
            <ProfilePage selectedMood={selectedMood} onNavigate={setCurrentPage} />
          )}
        </main>
      </div>

      <PlayerBar
        player={player}
        onTogglePlay={togglePlay}
        onVolumeChange={(v) => setPlayer(p => ({ ...p, volume: v }))}
      />
    </div>
  );
}
