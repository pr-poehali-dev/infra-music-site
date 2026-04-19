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

// CC0 tracks from ccmixter.org and other CORS-friendly sources
const moodPlaylists: Record<string, { name: string; desc: string; emoji: string; tracks: Track[] }> = {
  energetic: {
    name: "Энергия на максимум", desc: "Треки для мощного старта", emoji: "⚡",
    tracks: [
      {
        id: 10, title: "Rollin at 5", artist: "Rolemusic",
        duration: "3:10", mood: "energetic",
        url: "https://ccmixter.org/content/rolemusic/rolemusic_-_Rollin_at_5.mp3",
      },
      {
        id: 11, title: "Vintage Education", artist: "Kevin MacLeod",
        duration: "2:40", mood: "energetic",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Vintage%20Education.mp3",
      },
      {
        id: 12, title: "Cipher", artist: "Kevin MacLeod",
        duration: "3:22", mood: "energetic",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Cipher.mp3",
      },
    ],
  },
  calm: {
    name: "Волна спокойствия", desc: "Мягкие звуки для релакса", emoji: "🌊",
    tracks: [
      {
        id: 20, title: "Relaxing Piano", artist: "Kevin MacLeod",
        duration: "3:30", mood: "calm",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Relaxing%20Piano%20Music.mp3",
      },
      {
        id: 21, title: "Meditation Impromptu", artist: "Kevin MacLeod",
        duration: "4:00", mood: "calm",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Meditation%20Impromptu%2001.mp3",
      },
      {
        id: 22, title: "Featherweight", artist: "Kevin MacLeod",
        duration: "3:45", mood: "calm",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Featherweight.mp3",
      },
    ],
  },
  sad: {
    name: "Дождливый день", desc: "Музыка для рефлексии", emoji: "🌧",
    tracks: [
      {
        id: 30, title: "Constancy Part Two", artist: "Kevin MacLeod",
        duration: "3:40", mood: "sad",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Constancy%20Part%20Two.mp3",
      },
      {
        id: 31, title: "Sad Trio", artist: "Kevin MacLeod",
        duration: "2:55", mood: "sad",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Sad%20Trio.mp3",
      },
      {
        id: 32, title: "Prelude No. 7", artist: "Kevin MacLeod",
        duration: "2:10", mood: "sad",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Prelude%20No.%207.mp3",
      },
    ],
  },
  happy: {
    name: "Солнечный день", desc: "Позитив и хорошее настроение", emoji: "☀️",
    tracks: [
      {
        id: 40, title: "Sunshine", artist: "Kevin MacLeod",
        duration: "2:15", mood: "happy",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Sunshine.mp3",
      },
      {
        id: 41, title: "Happy Bee", artist: "Kevin MacLeod",
        duration: "2:40", mood: "happy",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Happy%20Bee.mp3",
      },
      {
        id: 42, title: "Wallpaper", artist: "Kevin MacLeod",
        duration: "3:05", mood: "happy",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Wallpaper.mp3",
      },
    ],
  },
  focused: {
    name: "В потоке", desc: "Концентрация и продуктивность", emoji: "🎯",
    tracks: [
      {
        id: 50, title: "Investigations", artist: "Kevin MacLeod",
        duration: "4:30", mood: "focused",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Investigations.mp3",
      },
      {
        id: 51, title: "Hyperfun", artist: "Kevin MacLeod",
        duration: "3:50", mood: "focused",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Hyperfun.mp3",
      },
      {
        id: 52, title: "Carefree", artist: "Kevin MacLeod",
        duration: "2:55", mood: "focused",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Carefree.mp3",
      },
    ],
  },
  romantic: {
    name: "Романтический вечер", desc: "Нежные мелодии", emoji: "🌹",
    tracks: [
      {
        id: 60, title: "Canon in D", artist: "Kevin MacLeod",
        duration: "3:55", mood: "romantic",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Canon%20in%20D.mp3",
      },
      {
        id: 61, title: "Romantic Piano", artist: "Kevin MacLeod",
        duration: "4:20", mood: "romantic",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Romantic%20Piano.mp3",
      },
      {
        id: 62, title: "Reverie", artist: "Kevin MacLeod",
        duration: "3:35", mood: "romantic",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Reverie%20-%20Small%20Orchestra.mp3",
      },
    ],
  },
};

// Extra tracks per genre playlist
const genrePlaylists: Record<string, { name: string; desc: string; emoji: string; tracks: Track[] }> = {
  pop: {
    name: "Хиты недели", desc: "Лучшее прямо сейчас", emoji: "🔥",
    tracks: [
      { id: 201, title: "Sunshine", artist: "Kevin MacLeod", duration: "2:15", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Sunshine.mp3" },
      { id: 202, title: "Wallpaper", artist: "Kevin MacLeod", duration: "3:05", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Wallpaper.mp3" },
      { id: 203, title: "Happy Bee", artist: "Kevin MacLeod", duration: "2:40", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Happy%20Bee.mp3" },
    ],
  },
  indie: {
    name: "Инди атмосфера", desc: "Независимые артисты", emoji: "🎸",
    tracks: [
      { id: 211, title: "Rollin at 5", artist: "Rolemusic", duration: "3:10", url: "https://ccmixter.org/content/rolemusic/rolemusic_-_Rollin_at_5.mp3" },
      { id: 212, title: "Carefree", artist: "Kevin MacLeod", duration: "2:55", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Carefree.mp3" },
      { id: 213, title: "Cipher", artist: "Kevin MacLeod", duration: "3:22", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Cipher.mp3" },
    ],
  },
  lofi: {
    name: "Lo-Fi Beats", desc: "Кофе и работа", emoji: "☕",
    tracks: [
      { id: 221, title: "Investigations", artist: "Kevin MacLeod", duration: "4:30", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Investigations.mp3" },
      { id: 222, title: "Hyperfun", artist: "Kevin MacLeod", duration: "3:50", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Hyperfun.mp3" },
      { id: 223, title: "Featherweight", artist: "Kevin MacLeod", duration: "3:45", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Featherweight.mp3" },
    ],
  },
  jazz: {
    name: "Jazz Lounge", desc: "Классика жанра", emoji: "🎷",
    tracks: [
      { id: 231, title: "Canon in D", artist: "Kevin MacLeod", duration: "3:55", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Canon%20in%20D.mp3" },
      { id: 232, title: "Reverie", artist: "Kevin MacLeod", duration: "3:35", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Reverie%20-%20Small%20Orchestra.mp3" },
      { id: 233, title: "Romantic Piano", artist: "Kevin MacLeod", duration: "4:20", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Romantic%20Piano.mp3" },
    ],
  },
  electronic: {
    name: "Electronic", desc: "Синтезаторы и ритмы", emoji: "🎛",
    tracks: [
      { id: 241, title: "Vintage Education", artist: "Kevin MacLeod", duration: "2:40", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Vintage%20Education.mp3" },
      { id: 242, title: "Cipher", artist: "Kevin MacLeod", duration: "3:22", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Cipher.mp3" },
      { id: 243, title: "Hyperfun", artist: "Kevin MacLeod", duration: "3:50", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Hyperfun.mp3" },
    ],
  },
  classical: {
    name: "Классика", desc: "Вечные произведения", emoji: "🎻",
    tracks: [
      { id: 251, title: "Meditation Impromptu", artist: "Kevin MacLeod", duration: "4:00", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Meditation%20Impromptu%2001.mp3" },
      { id: 252, title: "Prelude No. 7", artist: "Kevin MacLeod", duration: "2:10", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Prelude%20No.%207.mp3" },
      { id: 253, title: "Constancy Part Two", artist: "Kevin MacLeod", duration: "3:40", url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Constancy%20Part%20Two.mp3" },
    ],
  },
};

const genreOrder = ["pop", "indie", "lofi", "jazz", "electronic", "classical"];

export default function PlaylistsPage({
  selectedMood,
  onPlayTrack,
  onOpenSidebar,
  currentTrackId,
  isPlaying,
  onTogglePlay,
}: PlaylistsPageProps) {
  const [openGenre, setOpenGenre] = useState<string | null>(null);
  const moodData = selectedMood ? moodPlaylists[selectedMood] : null;

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

      <div className="hidden md:flex items-center gap-2 mb-6">
        <div className="w-1 h-6 rounded-full" style={{ background: "var(--im-yellow)" }} />
        <h1 className="font-oswald text-2xl font-bold text-white">Плейлисты</h1>
      </div>

      {/* Mood playlist */}
      {moodData && (
        <div className="mb-6 md:mb-8">
          <p className="text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--im-yellow)" }}>Подобрано для тебя</p>

          <div className="rounded-2xl p-4 md:p-6"
            style={{ background: "var(--im-surface)", border: "1px solid rgba(245,197,24,0.15)" }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: "var(--im-yellow-dim)", border: "1px solid rgba(245,197,24,0.2)" }}>
                {moodData.emoji}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-oswald text-lg font-bold text-white truncate">{moodData.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--im-text-muted)" }}>{moodData.desc}</p>
                <p className="text-xs mt-1" style={{ color: "var(--im-text-muted)" }}>{moodData.tracks.length} трека · CC0</p>
              </div>
              <button onClick={handlePlayAll}
                className="glass-btn-primary px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
                <Icon name="Play" size={14} color="#000" />
                <span className="hidden sm:inline">Слушать</span>
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
                      border: `1px solid ${active ? "rgba(245,197,24,0.2)" : "transparent"}`,
                    }}>
                    <div className="w-7 flex items-center justify-center flex-shrink-0">
                      {active ? (
                        isPlaying ? (
                          <div className="soundbar flex items-end gap-0.5 h-4">
                            {[8, 14, 8, 14, 8].map((h, j) => <span key={j} style={{ height: `${h}px` }} />)}
                          </div>
                        ) : (
                          <Icon name="Play" size={14} color="var(--im-yellow)" />
                        )
                      ) : (
                        <>
                          <span className="text-xs tabular-nums group-hover:hidden block"
                            style={{ color: "var(--im-text-muted)" }}>{i + 1}</span>
                          <span className="hidden group-hover:flex items-center">
                            <Icon name="Play" size={14} color="var(--im-yellow)" />
                          </span>
                        </>
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

      {/* Genre playlists */}
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "var(--im-text-muted)" }}>Все плейлисты</p>
        <div className="flex flex-col gap-2">
          {genreOrder.map((gid) => {
            const pl = genrePlaylists[gid];
            const isOpen = openGenre === gid;
            return (
              <div key={gid} className="rounded-xl overflow-hidden"
                style={{ background: "var(--im-surface)", border: `1px solid ${isOpen ? "rgba(245,197,24,0.2)" : "var(--im-glass-border)"}` }}>

                {/* Header row */}
                <button
                  onClick={() => setOpenGenre(isOpen ? null : gid)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all"
                  style={{ background: isOpen ? "rgba(245,197,24,0.05)" : "transparent" }}>
                  <span className="text-xl flex-shrink-0">{pl.emoji}</span>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-semibold text-white">{pl.name}</p>
                    <p className="text-xs" style={{ color: "var(--im-text-muted)" }}>{pl.desc} · {pl.tracks.length} трека</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); onPlayTrack(pl.tracks[0]); }}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ background: "var(--im-yellow)" }}>
                      <Icon name="Play" size={12} color="#000" />
                    </button>
                    <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} color="var(--im-text-muted)" />
                  </div>
                </button>

                {/* Track list */}
                {isOpen && (
                  <div className="border-t px-4 py-2 flex flex-col gap-0.5"
                    style={{ borderColor: "rgba(245,197,24,0.1)" }}>
                    {pl.tracks.map((track, i) => {
                      const active = currentTrackId === track.id;
                      return (
                        <button key={track.id}
                          onClick={() => active && onTogglePlay ? onTogglePlay() : onPlayTrack(track)}
                          className="flex items-center gap-3 px-2 py-2 rounded-lg text-left w-full group transition-all"
                          style={{ background: active ? "rgba(245,197,24,0.08)" : "transparent" }}>
                          <div className="w-5 flex items-center justify-center flex-shrink-0">
                            {active ? (
                              isPlaying ? (
                                <div className="soundbar flex items-end gap-0.5 h-3">
                                  {[6, 10, 6, 10, 6].map((h, j) => <span key={j} style={{ height: `${h}px` }} />)}
                                </div>
                              ) : (
                                <Icon name="Play" size={12} color="var(--im-yellow)" />
                              )
                            ) : (
                              <>
                                <span className="text-xs group-hover:hidden block"
                                  style={{ color: "var(--im-text-muted)" }}>{i + 1}</span>
                                <span className="hidden group-hover:flex items-center">
                                  <Icon name="Play" size={12} color="var(--im-yellow)" />
                                </span>
                              </>
                            )}
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="text-sm truncate"
                              style={{ color: active ? "var(--im-yellow)" : "white" }}>{track.title}</p>
                            <p className="text-xs truncate" style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
                          </div>
                          <span className="text-xs tabular-nums" style={{ color: "var(--im-text-muted)" }}>{track.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
