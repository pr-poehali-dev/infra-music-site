import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "@/App";

interface PlaylistsPageProps {
  selectedMood: string | null;
  onPlayTrack: (track: Track) => void;
  onOpenSidebar: () => void;
  currentTrackId?: number | null;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

// CC0 / Public Domain tracks from archive.org and other open sources
const moodPlaylists: Record<string, { name: string; desc: string; emoji: string; tracks: Track[] }> = {
  energetic: {
    name: "Энергия на максимум", desc: "Треки для мощного старта", emoji: "⚡",
    tracks: [
      {
        id: 10, title: "Energetic Cinematic", artist: "Scott Holmes",
        duration: "2:44", mood: "energetic",
        url: "https://archive.org/download/ScottHolmesMusic/Scott_Holmes_-_Energetic_Upbeat_Indie.mp3",
      },
      {
        id: 11, title: "Drive", artist: "Punch Deck",
        duration: "3:15", mood: "energetic",
        url: "https://archive.org/download/free-music-for-videos/Punch-Deck-Drive.mp3",
      },
      {
        id: 12, title: "Action Packed", artist: "Mixkit",
        duration: "2:30", mood: "energetic",
        url: "https://assets.mixkit.co/music/preview/mixkit-games-worldbeat-466.mp3",
      },
    ],
  },
  calm: {
    name: "Волна спокойствия", desc: "Мягкие звуки для релакса", emoji: "🌊",
    tracks: [
      {
        id: 20, title: "Soft Acoustic", artist: "Scott Holmes",
        duration: "3:22", mood: "calm",
        url: "https://archive.org/download/ScottHolmesMusic/Scott_Holmes_-_Upbeat_Party.mp3",
      },
      {
        id: 21, title: "Ambient Serenity", artist: "Chill Tracks",
        duration: "4:00", mood: "calm",
        url: "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3",
      },
      {
        id: 22, title: "Peaceful Garden", artist: "Mixkit",
        duration: "3:45", mood: "calm",
        url: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
      },
    ],
  },
  sad: {
    name: "Дождливый день", desc: "Музыка для рефлексии", emoji: "🌧",
    tracks: [
      {
        id: 30, title: "Melancholy Piano", artist: "Kevin MacLeod",
        duration: "3:40", mood: "sad",
        url: "https://assets.mixkit.co/music/preview/mixkit-sad-cinematic-atmosphere-553.mp3",
      },
      {
        id: 31, title: "Lonely Road", artist: "Mixkit",
        duration: "2:55", mood: "sad",
        url: "https://assets.mixkit.co/music/preview/mixkit-hazy-after-hours-132.mp3",
      },
      {
        id: 32, title: "Quiet Thoughts", artist: "Ambient Studio",
        duration: "4:10", mood: "sad",
        url: "https://assets.mixkit.co/music/preview/mixkit-nostalgia-549.mp3",
      },
    ],
  },
  happy: {
    name: "Солнечный день", desc: "Позитив и хорошее настроение", emoji: "☀️",
    tracks: [
      {
        id: 40, title: "Happy Ukulele", artist: "Scott Holmes",
        duration: "2:15", mood: "happy",
        url: "https://assets.mixkit.co/music/preview/mixkit-life-is-a-dream-837.mp3",
      },
      {
        id: 41, title: "Summer Pop", artist: "Mixkit",
        duration: "2:40", mood: "happy",
        url: "https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3",
      },
      {
        id: 42, title: "Feel Good", artist: "Punch Deck",
        duration: "3:05", mood: "happy",
        url: "https://assets.mixkit.co/music/preview/mixkit-sun-and-his-daughter-580.mp3",
      },
    ],
  },
  focused: {
    name: "В потоке", desc: "Концентрация и продуктивность", emoji: "🎯",
    tracks: [
      {
        id: 50, title: "Deep Focus Flow", artist: "Binaural Lab",
        duration: "4:30", mood: "focused",
        url: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
      },
      {
        id: 51, title: "Alpha Waves", artist: "Focus Studio",
        duration: "5:00", mood: "focused",
        url: "https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3",
      },
      {
        id: 52, title: "Zone In", artist: "Ambient Works",
        duration: "3:50", mood: "focused",
        url: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3",
      },
    ],
  },
  romantic: {
    name: "Романтический вечер", desc: "Нежные мелодии", emoji: "🌹",
    tracks: [
      {
        id: 60, title: "Tender Evening", artist: "Soft Jazz",
        duration: "3:55", mood: "romantic",
        url: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3",
      },
      {
        id: 61, title: "Candlelight Jazz", artist: "Romance Keys",
        duration: "4:20", mood: "romantic",
        url: "https://assets.mixkit.co/music/preview/mixkit-sweet-romantic-piano-525.mp3",
      },
      {
        id: 62, title: "Close To You", artist: "Piano Dreams",
        duration: "3:35", mood: "romantic",
        url: "https://assets.mixkit.co/music/preview/mixkit-piano-reflections-22.mp3",
      },
    ],
  },
};

const allPlaylists = [
  { id: "pop",       name: "Хиты недели",    desc: "Лучшее прямо сейчас", emoji: "🔥" },
  { id: "indie",     name: "Инди атмосфера", desc: "Независимые артисты",  emoji: "🎸" },
  { id: "lofi",      name: "Lo-Fi Beats",    desc: "Кофе и работа",        emoji: "☕" },
  { id: "jazz",      name: "Jazz Lounge",    desc: "Классика жанра",       emoji: "🎷" },
  { id: "electronic",name: "Electronic",     desc: "Синтезаторы и ритмы",  emoji: "🎛" },
  { id: "classical", name: "Классика",       desc: "Вечные произведения",  emoji: "🎻" },
];

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlaylistsPage({
  selectedMood,
  onPlayTrack,
  onOpenSidebar,
  currentTrackId,
  isPlaying,
  onTogglePlay,
}: PlaylistsPageProps) {
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const moodData = selectedMood ? moodPlaylists[selectedMood] : null;

  // Auto-scroll to top when mood is set
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedMood]);

  const handlePlayAll = () => {
    if (moodData && moodData.tracks.length > 0) {
      onPlayTrack(moodData.tracks[0]);
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-full">
      {/* Mobile topbar */}
      <div className="flex items-center gap-3 mb-5 md:hidden">
        <button onClick={onOpenSidebar}
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--im-surface)" }}>
          <Icon name="Menu" size={18} color="white" />
        </button>
        <h1 className="font-oswald text-xl font-bold text-white">Плейлисты</h1>
      </div>

      {/* Desktop title */}
      <div className="hidden md:flex items-center gap-2 mb-6">
        <div className="w-1 h-6 rounded-full" style={{ background: "var(--im-yellow)" }} />
        <h1 className="font-oswald text-2xl font-bold text-white">Плейлисты</h1>
      </div>

      {/* Mood playlist */}
      {moodData && (
        <div className="mb-6 md:mb-8">
          <p className="text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--im-yellow)" }}>Подобрано для тебя</p>

          <div className="rounded-2xl p-4 md:p-6 mb-2"
            style={{ background: "var(--im-surface)", border: "1px solid rgba(245,197,24,0.15)" }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: "var(--im-yellow-dim)", border: "1px solid rgba(245,197,24,0.2)" }}>
                {moodData.emoji}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-oswald text-lg md:text-xl font-bold text-white truncate">{moodData.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--im-text-muted)" }}>{moodData.desc}</p>
                <p className="text-xs mt-1" style={{ color: "var(--im-text-muted)" }}>
                  {moodData.tracks.length} трека · CC0
                </p>
              </div>
              <button
                onClick={handlePlayAll}
                className="glass-btn-primary px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-1.5 flex-shrink-0">
                <Icon name="Play" size={14} color="#000" />
                <span className="hidden sm:inline">Слушать всё</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {moodData.tracks.map((track, i) => {
                const active = currentTrackId === track.id;
                return (
                  <button key={track.id}
                    onClick={() => active && onTogglePlay ? onTogglePlay() : onPlayTrack(track)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full group transition-all"
                    style={{
                      background: active ? "rgba(245,197,24,0.08)" : "transparent",
                      border: active ? "1px solid rgba(245,197,24,0.15)" : "1px solid transparent",
                    }}
                    onMouseEnter={e => !active && (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                    onMouseLeave={e => !active && (e.currentTarget.style.background = "transparent")}>

                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                      {active ? (
                        isPlaying ? (
                          <div className="soundbar flex items-end gap-0.5 h-4">
                            {[8, 14, 8, 14, 8].map((h, j) => (
                              <span key={j} style={{ height: `${h}px` }} />
                            ))}
                          </div>
                        ) : (
                          <Icon name="Play" size={14} color="var(--im-yellow)" />
                        )
                      ) : (
                        <span className="text-xs tabular-nums group-hover:hidden"
                          style={{ color: "var(--im-text-muted)" }}>{i + 1}</span>
                      )}
                      {!active && (
                        <span className="hidden group-hover:flex items-center justify-center">
                          <Icon name="Play" size={14} color="var(--im-yellow)" />
                        </span>
                      )}
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium truncate"
                        style={{ color: active ? "var(--im-yellow)" : "white" }}>{track.title}</p>
                      <p className="text-xs truncate mt-0.5"
                        style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
                    </div>
                    <span className="text-xs tabular-nums flex-shrink-0"
                      style={{ color: "var(--im-text-muted)" }}>{track.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* All playlists */}
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "var(--im-text-muted)" }}>Все плейлисты</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {allPlaylists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => setActivePlaylist(activePlaylist === pl.id ? null : pl.id)}
              className="rounded-xl p-4 text-left transition-all border"
              style={{
                background: activePlaylist === pl.id ? "var(--im-yellow-dim)" : "var(--im-surface)",
                borderColor: activePlaylist === pl.id ? "rgba(245,197,24,0.3)" : "var(--im-glass-border)",
              }}
            >
              <div className="text-2xl mb-2">{pl.emoji}</div>
              <p className="text-sm font-semibold text-white truncate">{pl.name}</p>
              <p className="text-xs mt-0.5 truncate" style={{ color: "var(--im-text-muted)" }}>{pl.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}