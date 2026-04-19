import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "@/App";

interface PlaylistsPageProps {
  selectedMood: string | null;
  onPlayTrack: (track: Track) => void;
  onOpenSidebar: () => void;
}

const moodPlaylists: Record<string, { name: string; desc: string; emoji: string; tracks: Track[] }> = {
  energetic: { name: "Энергия на максимум", desc: "Треки для мощного старта", emoji: "⚡",
    tracks: [
      { id: 10, title: "Power Rush",    artist: "BeatForce",   duration: "3:22" },
      { id: 11, title: "Adrenaline",    artist: "Neon Pulse",  duration: "4:05" },
      { id: 12, title: "Thunder Road",  artist: "ElectroBeat", duration: "3:47" },
    ]},
  calm: { name: "Волна спокойствия", desc: "Мягкие звуки для релакса", emoji: "🌊",
    tracks: [
      { id: 20, title: "Ocean Breath",  artist: "Ambient Seas",      duration: "5:12" },
      { id: 21, title: "Morning Mist",  artist: "Drift Collective",  duration: "4:38" },
      { id: 22, title: "Still Water",   artist: "Chill Studio",      duration: "6:01" },
    ]},
  sad: { name: "Дождливый день", desc: "Музыка для рефлексии", emoji: "🌧",
    tracks: [
      { id: 30, title: "Empty Streets", artist: "Melancholy",  duration: "4:55" },
      { id: 31, title: "Fallen Leaves", artist: "Auturm Sound",duration: "5:20" },
      { id: 32, title: "Quiet Thoughts",artist: "Introspect",  duration: "3:44" },
    ]},
  happy: { name: "Солнечный день", desc: "Позитив и хорошее настроение", emoji: "☀️",
    tracks: [
      { id: 40, title: "Golden Hours",  artist: "Sunshine Crew",duration: "3:18" },
      { id: 41, title: "Happy Feet",    artist: "Pop Vibes",    duration: "2:55" },
      { id: 42, title: "Summer Rain",   artist: "Chill Pop",    duration: "4:02" },
    ]},
  focused: { name: "В потоке", desc: "Концентрация и продуктивность", emoji: "🎯",
    tracks: [
      { id: 50, title: "Deep Focus",    artist: "Alpha Waves",  duration: "8:00" },
      { id: 51, title: "Neural Flow",   artist: "Binaural Lab", duration: "10:00" },
      { id: 52, title: "Zone In",       artist: "Focus Studio", duration: "7:30" },
    ]},
  romantic: { name: "Романтический вечер", desc: "Нежные мелодии", emoji: "🌹",
    tracks: [
      { id: 60, title: "Tender Nights", artist: "Soft Jazz",    duration: "4:44" },
      { id: 61, title: "Candlelight",   artist: "Romance Keys", duration: "5:10" },
      { id: 62, title: "Close To You",  artist: "Piano Dreams", duration: "3:58" },
    ]},
};

const allPlaylists = [
  { id: "pop",       name: "Хиты недели",    desc: "Лучшее прямо сейчас", emoji: "🔥" },
  { id: "indie",     name: "Инди атмосфера", desc: "Независимые артисты",  emoji: "🎸" },
  { id: "lofi",      name: "Lo-Fi Beats",    desc: "Кофе и работа",        emoji: "☕" },
  { id: "jazz",      name: "Jazz Lounge",    desc: "Классика жанра",       emoji: "🎷" },
  { id: "electronic",name: "Electronic",     desc: "Синтезаторы и ритмы",  emoji: "🎛" },
  { id: "classical", name: "Классика",       desc: "Вечные произведения",  emoji: "🎻" },
];

export default function PlaylistsPage({ selectedMood, onPlayTrack, onOpenSidebar }: PlaylistsPageProps) {
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const moodData = selectedMood ? moodPlaylists[selectedMood] : null;

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
              </div>
              <button className="glass-btn-primary px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-1.5 flex-shrink-0">
                <Icon name="Play" size={14} color="#000" />
                <span className="hidden sm:inline">Слушать</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {moodData.tracks.map((track, i) => (
                <button key={track.id} onClick={() => onPlayTrack(track)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full group transition-all"
                  style={{ background: "transparent" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <span className="text-xs w-4 text-center flex-shrink-0 tabular-nums"
                    style={{ color: "var(--im-text-muted)" }}>{i + 1}</span>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--im-yellow-dim)" }}>
                    <Icon name="Music" size={13} color="var(--im-yellow)" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">{track.title}</p>
                    <p className="text-xs truncate" style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
                  </div>
                  <span className="text-xs tabular-nums" style={{ color: "var(--im-text-muted)" }}>{track.duration}</span>
                </button>
              ))}
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
            <button key={pl.id} onClick={() => setActivePlaylist(activePlaylist === pl.id ? null : pl.id)}
              className="rounded-xl p-4 text-left transition-all"
              style={{
                background: activePlaylist === pl.id ? "var(--im-yellow-dim)" : "var(--im-surface)",
                border: `1px solid ${activePlaylist === pl.id ? "rgba(245,197,24,0.3)" : "var(--im-glass-border)"}`,
              }}>
              <div className="text-2xl mb-2">{pl.emoji}</div>
              <h3 className="font-oswald text-base font-semibold text-white leading-tight">{pl.name}</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--im-text-muted)" }}>{pl.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
