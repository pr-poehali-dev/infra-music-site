import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "@/App";

interface PlaylistsPageProps {
  selectedMood: string | null;
  onPlayTrack: (track: Track) => void;
}

const moodPlaylists: Record<string, { name: string; desc: string; emoji: string; color: string; tracks: Track[] }> = {
  energetic: {
    name: "Энергия на максимум", desc: "Треки для мощного старта дня", emoji: "⚡", color: "#f0a03e",
    tracks: [
      { id: 10, title: "Power Rush", artist: "BeatForce", duration: "3:22" },
      { id: 11, title: "Adrenaline", artist: "Neon Pulse", duration: "4:05" },
      { id: 12, title: "Thunder Road", artist: "ElectroBeat", duration: "3:47" },
    ],
  },
  calm: {
    name: "Волна спокойствия", desc: "Мягкие звуки для расслабления", emoji: "🌊", color: "#3eb8f0",
    tracks: [
      { id: 20, title: "Ocean Breath", artist: "Ambient Seas", duration: "5:12" },
      { id: 21, title: "Morning Mist", artist: "Drift Collective", duration: "4:38" },
      { id: 22, title: "Still Water", artist: "Chill Studio", duration: "6:01" },
    ],
  },
  sad: {
    name: "Дождливый день", desc: "Музыка для рефлексии и размышлений", emoji: "🌧", color: "#7c8cf0",
    tracks: [
      { id: 30, title: "Empty Streets", artist: "Melancholy", duration: "4:55" },
      { id: 31, title: "Fallen Leaves", artist: "Auturm Sound", duration: "5:20" },
      { id: 32, title: "Quiet Thoughts", artist: "Introspect", duration: "3:44" },
    ],
  },
  happy: {
    name: "Солнечный день", desc: "Позитивная музыка для хорошего настроения", emoji: "☀️", color: "#f0e03e",
    tracks: [
      { id: 40, title: "Golden Hours", artist: "Sunshine Crew", duration: "3:18" },
      { id: 41, title: "Happy Feet", artist: "Pop Vibes", duration: "2:55" },
      { id: 42, title: "Summer Rain", artist: "Chill Pop", duration: "4:02" },
    ],
  },
  focused: {
    name: "В потоке", desc: "Глубокая концентрация и продуктивность", emoji: "🎯", color: "#7c5af0",
    tracks: [
      { id: 50, title: "Deep Focus", artist: "Alpha Waves", duration: "8:00" },
      { id: 51, title: "Neural Flow", artist: "Binaural Lab", duration: "10:00" },
      { id: 52, title: "Zone In", artist: "Focus Studio", duration: "7:30" },
    ],
  },
  romantic: {
    name: "Романтический вечер", desc: "Нежные мелодии для особых моментов", emoji: "🌹", color: "#f05a8a",
    tracks: [
      { id: 60, title: "Tender Nights", artist: "Soft Jazz", duration: "4:44" },
      { id: 61, title: "Candlelight", artist: "Romance Keys", duration: "5:10" },
      { id: 62, title: "Close To You", artist: "Piano Dreams", duration: "3:58" },
    ],
  },
};

const allPlaylists = [
  { id: "pop", name: "Хиты недели", desc: "Лучшее прямо сейчас", emoji: "🔥", color: "#f0603e" },
  { id: "indie", name: "Инди атмосфера", desc: "Независимые артисты", emoji: "🎸", color: "#a03ef0" },
  { id: "lofi", name: "Lo-Fi Beats", desc: "Кофе и работа", emoji: "☕", color: "#8a7a60" },
  { id: "jazz", name: "Jazz Lounge", desc: "Классика жанра", emoji: "🎷", color: "#c0903e" },
  { id: "electronic", name: "Electronic", desc: "Синтезаторы и ритмы", emoji: "🎛", color: "#3ef0c0" },
  { id: "classical", name: "Классика", desc: "Вечные произведения", emoji: "🎻", color: "#e0d0b0" },
];

export default function PlaylistsPage({ selectedMood, onPlayTrack }: PlaylistsPageProps) {
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const moodData = selectedMood ? moodPlaylists[selectedMood] : null;

  return (
    <div className="p-8 min-h-full">
      {/* Mood playlist */}
      {moodData && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 rounded-full" style={{ background: "var(--im-purple)" }} />
            <h2 className="font-oswald text-xl font-semibold text-white">Подобрано для тебя</h2>
          </div>

          <div className="glass rounded-3xl p-6 mb-4"
            style={{ border: `1px solid ${moodData.color}30`, background: `${moodData.color}08` }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                style={{ background: `${moodData.color}20`, border: `1px solid ${moodData.color}40` }}>
                {moodData.emoji}
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: moodData.color }}>ТВОЙ ПЛЕЙЛИСТ</p>
                <h3 className="font-oswald text-2xl font-bold text-white mb-1">{moodData.name}</h3>
                <p className="text-sm" style={{ color: "var(--im-text-muted)" }}>{moodData.desc}</p>
              </div>
              <button className="ml-auto glass-btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
                <Icon name="Play" size={16} color="white" />
                Слушать всё
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {moodData.tracks.map((track, i) => (
                <button key={track.id} onClick={() => onPlayTrack(track)}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-left w-full group transition-all hover:bg-white/5">
                  <span className="text-sm w-5 text-center flex-shrink-0" style={{ color: "var(--im-text-muted)" }}>{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${moodData.color}20` }}>
                    <Icon name="Music" size={14} color={moodData.color} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{track.title}</p>
                    <p className="text-xs" style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
                  </div>
                  <span className="text-xs" style={{ color: "var(--im-text-muted)" }}>{track.duration}</span>
                  <Icon name="Play" size={14} color={moodData.color} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All playlists */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-6 rounded-full" style={{ background: "var(--im-blue)" }} />
          <h2 className="font-oswald text-xl font-semibold text-white">Все плейлисты</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {allPlaylists.map((pl) => (
            <button key={pl.id} onClick={() => setActivePlaylist(pl.id)}
              className={`glass glass-hover rounded-2xl p-5 text-left transition-all ${activePlaylist === pl.id ? "glow-purple" : ""}`}
              style={activePlaylist === pl.id ? { borderColor: pl.color, boxShadow: `0 0 30px ${pl.color}30` } : {}}>
              <div className="text-3xl mb-3">{pl.emoji}</div>
              <h3 className="font-oswald text-lg font-semibold text-white mb-1">{pl.name}</h3>
              <p className="text-xs" style={{ color: "var(--im-text-muted)" }}>{pl.desc}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-0.5 flex-1 rounded-full" style={{ background: `${pl.color}40` }} />
                <Icon name="ChevronRight" size={14} color={pl.color} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
