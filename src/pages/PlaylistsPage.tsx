import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "@/App";

interface PlaylistsPageProps {
  selectedMood: string | null;
  onPlayTrack: (track: Track, queue?: Track[]) => void;
  onOpenSidebar: () => void;
  currentTrackId?: number | null;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

const BASE = "https://incompetech.com/music/royalty-free/mp3-royaltyfree/";
const u = (name: string) => BASE + encodeURIComponent(name) + ".mp3";

const moodPlaylists: Record<string, { name: string; desc: string; emoji: string; tracks: Track[] }> = {
  energetic: {
    name: "Энергия", desc: "Треки для мощного старта", emoji: "⚡",
    tracks: [
      { id: 10, title: "Cipher",            artist: "Kevin MacLeod", duration: "3:22", mood: "energetic", url: u("Cipher") },
      { id: 11, title: "Vintage Education", artist: "Kevin MacLeod", duration: "2:40", mood: "energetic", url: u("Vintage Education") },
      { id: 12, title: "Hyperfun",          artist: "Kevin MacLeod", duration: "3:50", mood: "energetic", url: u("Hyperfun") },
      { id: 13, title: "Scheming Weasel",   artist: "Kevin MacLeod", duration: "2:08", mood: "energetic", url: u("Scheming Weasel (faster version)") },
      { id: 14, title: "Investigations",    artist: "Kevin MacLeod", duration: "4:30", mood: "energetic", url: u("Investigations") },
    ],
  },
  calm: {
    name: "Спокойствие", desc: "Мягкие звуки для релакса", emoji: "🌊",
    tracks: [
      { id: 20, title: "Meditation Impromptu", artist: "Kevin MacLeod", duration: "4:00", mood: "calm", url: u("Meditation Impromptu 01") },
      { id: 21, title: "Featherweight",        artist: "Kevin MacLeod", duration: "3:45", mood: "calm", url: u("Featherweight") },
      { id: 22, title: "Constancy Part Two",   artist: "Kevin MacLeod", duration: "3:40", mood: "calm", url: u("Constancy Part Two") },
      { id: 23, title: "Prelude No. 7",        artist: "Kevin MacLeod", duration: "2:10", mood: "calm", url: u("Prelude No. 7") },
      { id: 24, title: "Reverie",              artist: "Kevin MacLeod", duration: "3:35", mood: "calm", url: u("Reverie - Small Orchestra") },
    ],
  },
  sad: {
    name: "Грусть", desc: "Музыка для рефлексии", emoji: "🌧",
    tracks: [
      { id: 30, title: "Sad Trio",           artist: "Kevin MacLeod", duration: "2:55", mood: "sad", url: u("Sad Trio") },
      { id: 31, title: "Prelude No. 7",      artist: "Kevin MacLeod", duration: "2:10", mood: "sad", url: u("Prelude No. 7") },
      { id: 32, title: "Canon in D",         artist: "Kevin MacLeod", duration: "3:55", mood: "sad", url: u("Canon in D") },
      { id: 33, title: "Constancy Part Two", artist: "Kevin MacLeod", duration: "3:40", mood: "sad", url: u("Constancy Part Two") },
      { id: 34, title: "Reverie",            artist: "Kevin MacLeod", duration: "3:35", mood: "sad", url: u("Reverie - Small Orchestra") },
    ],
  },
  happy: {
    name: "Радость", desc: "Позитив и хорошее настроение", emoji: "☀️",
    tracks: [
      { id: 40, title: "Sunshine",  artist: "Kevin MacLeod", duration: "2:15", mood: "happy", url: u("Sunshine") },
      { id: 41, title: "Happy Bee", artist: "Kevin MacLeod", duration: "2:40", mood: "happy", url: u("Happy Bee") },
      { id: 42, title: "Wallpaper", artist: "Kevin MacLeod", duration: "3:05", mood: "happy", url: u("Wallpaper") },
      { id: 43, title: "Carefree",  artist: "Kevin MacLeod", duration: "2:55", mood: "happy", url: u("Carefree") },
      { id: 44, title: "Hyperfun",  artist: "Kevin MacLeod", duration: "3:50", mood: "happy", url: u("Hyperfun") },
    ],
  },
  focused: {
    name: "Фокус", desc: "Концентрация и продуктивность", emoji: "🎯",
    tracks: [
      { id: 50, title: "Investigations",       artist: "Kevin MacLeod", duration: "4:30", mood: "focused", url: u("Investigations") },
      { id: 51, title: "Hyperfun",             artist: "Kevin MacLeod", duration: "3:50", mood: "focused", url: u("Hyperfun") },
      { id: 52, title: "Cipher",               artist: "Kevin MacLeod", duration: "3:22", mood: "focused", url: u("Cipher") },
      { id: 53, title: "Featherweight",        artist: "Kevin MacLeod", duration: "3:45", mood: "focused", url: u("Featherweight") },
      { id: 54, title: "Meditation Impromptu", artist: "Kevin MacLeod", duration: "4:00", mood: "focused", url: u("Meditation Impromptu 01") },
    ],
  },
  romantic: {
    name: "Романтика", desc: "Нежные мелодии", emoji: "🌹",
    tracks: [
      { id: 60, title: "Canon in D",    artist: "Kevin MacLeod", duration: "3:55", mood: "romantic", url: u("Canon in D") },
      { id: 61, title: "Reverie",       artist: "Kevin MacLeod", duration: "3:35", mood: "romantic", url: u("Reverie - Small Orchestra") },
      { id: 62, title: "Sad Trio",      artist: "Kevin MacLeod", duration: "2:55", mood: "romantic", url: u("Sad Trio") },
      { id: 63, title: "Prelude No. 7", artist: "Kevin MacLeod", duration: "2:10", mood: "romantic", url: u("Prelude No. 7") },
      { id: 64, title: "Featherweight", artist: "Kevin MacLeod", duration: "3:45", mood: "romantic", url: u("Featherweight") },
    ],
  },
};

const genrePlaylists: Record<string, { name: string; desc: string; emoji: string; tracks: Track[] }> = {
  pop: {
    name: "Лёгкое", desc: "Простая и приятная музыка", emoji: "🎵",
    tracks: [
      { id: 201, title: "Sunshine",  artist: "Kevin MacLeod", duration: "2:15", url: u("Sunshine") },
      { id: 202, title: "Wallpaper", artist: "Kevin MacLeod", duration: "3:05", url: u("Wallpaper") },
      { id: 203, title: "Happy Bee", artist: "Kevin MacLeod", duration: "2:40", url: u("Happy Bee") },
      { id: 204, title: "Carefree",  artist: "Kevin MacLeod", duration: "2:55", url: u("Carefree") },
    ],
  },
  indie: {
    name: "Атмосферное", desc: "Фоновая музыка", emoji: "🎸",
    tracks: [
      { id: 211, title: "Featherweight",     artist: "Kevin MacLeod", duration: "3:45", url: u("Featherweight") },
      { id: 212, title: "Carefree",          artist: "Kevin MacLeod", duration: "2:55", url: u("Carefree") },
      { id: 213, title: "Cipher",            artist: "Kevin MacLeod", duration: "3:22", url: u("Cipher") },
      { id: 214, title: "Vintage Education", artist: "Kevin MacLeod", duration: "2:40", url: u("Vintage Education") },
    ],
  },
  lofi: {
    name: "Для работы", desc: "Фоновый ритм без отвлечений", emoji: "☕",
    tracks: [
      { id: 221, title: "Investigations",    artist: "Kevin MacLeod", duration: "4:30", url: u("Investigations") },
      { id: 222, title: "Hyperfun",          artist: "Kevin MacLeod", duration: "3:50", url: u("Hyperfun") },
      { id: 223, title: "Featherweight",     artist: "Kevin MacLeod", duration: "3:45", url: u("Featherweight") },
      { id: 224, title: "Cipher",            artist: "Kevin MacLeod", duration: "3:22", url: u("Cipher") },
    ],
  },
  jazz: {
    name: "Джаз", desc: "Мягкие джазовые мотивы", emoji: "🎷",
    tracks: [
      { id: 231, title: "Canon in D",           artist: "Kevin MacLeod", duration: "3:55", url: u("Canon in D") },
      { id: 232, title: "Reverie",              artist: "Kevin MacLeod", duration: "3:35", url: u("Reverie - Small Orchestra") },
      { id: 233, title: "Sad Trio",             artist: "Kevin MacLeod", duration: "2:55", url: u("Sad Trio") },
      { id: 234, title: "Meditation Impromptu", artist: "Kevin MacLeod", duration: "4:00", url: u("Meditation Impromptu 01") },
    ],
  },
  electronic: {
    name: "Электронное", desc: "Ритм и синтез", emoji: "🎛",
    tracks: [
      { id: 241, title: "Vintage Education", artist: "Kevin MacLeod", duration: "2:40", url: u("Vintage Education") },
      { id: 242, title: "Cipher",            artist: "Kevin MacLeod", duration: "3:22", url: u("Cipher") },
      { id: 243, title: "Hyperfun",          artist: "Kevin MacLeod", duration: "3:50", url: u("Hyperfun") },
      { id: 244, title: "Investigations",    artist: "Kevin MacLeod", duration: "4:30", url: u("Investigations") },
    ],
  },
  classical: {
    name: "Классика", desc: "Фортепиано и оркестр", emoji: "🎻",
    tracks: [
      { id: 251, title: "Meditation Impromptu", artist: "Kevin MacLeod", duration: "4:00", url: u("Meditation Impromptu 01") },
      { id: 252, title: "Prelude No. 7",        artist: "Kevin MacLeod", duration: "2:10", url: u("Prelude No. 7") },
      { id: 253, title: "Constancy Part Two",   artist: "Kevin MacLeod", duration: "3:40", url: u("Constancy Part Two") },
      { id: 254, title: "Reverie",              artist: "Kevin MacLeod", duration: "3:35", url: u("Reverie - Small Orchestra") },
      { id: 255, title: "Canon in D",           artist: "Kevin MacLeod", duration: "3:55", url: u("Canon in D") },
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

  useEffect(() => { window.scrollTo(0, 0); }, [selectedMood]);

  const handleTrackClick = (track: Track, tracks: Track[]) => {
    if (currentTrackId === track.id && onTogglePlay) {
      onTogglePlay();
    } else {
      onPlayTrack(track, tracks);
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-full">
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

      {moodData && (
        <div className="mb-6 md:mb-8">
          <p className="text-xs uppercase tracking-widest mb-3 font-medium"
            style={{ color: "var(--im-yellow)" }}>Подобрано для тебя</p>
          <div className="rounded-xl p-4 md:p-5"
            style={{ background: "var(--im-surface)", border: "1px solid rgba(245,197,24,0.12)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "var(--im-yellow-dim)" }}>
                {moodData.emoji}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-oswald text-base font-bold text-white">{moodData.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--im-text-muted)" }}>
                  {moodData.desc} · {moodData.tracks.length} треков
                </p>
              </div>
              <button onClick={() => handleTrackClick(moodData.tracks[0], moodData.tracks)}
                className="glass-btn-primary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
                <Icon name="Play" size={12} color="#000" />
                Слушать
              </button>
            </div>
            <TrackList
              tracks={moodData.tracks}
              currentTrackId={currentTrackId}
              isPlaying={isPlaying}
              onTrackClick={(t) => handleTrackClick(t, moodData.tracks)}
            />
          </div>
        </div>
      )}

      <div>
        <p className="text-xs uppercase tracking-widest mb-3 font-medium"
          style={{ color: "var(--im-text-muted)" }}>Все плейлисты</p>
        <div className="flex flex-col gap-1.5">
          {genreOrder.map((gid) => {
            const pl = genrePlaylists[gid];
            const isOpen = openGenre === gid;
            return (
              <div key={gid} className="rounded-xl overflow-hidden"
                style={{ background: "var(--im-surface)", border: `1px solid ${isOpen ? "rgba(245,197,24,0.12)" : "var(--im-glass-border)"}` }}>
                <button onClick={() => setOpenGenre(isOpen ? null : gid)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left">
                  <span className="text-lg flex-shrink-0">{pl.emoji}</span>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-white">{pl.name}</p>
                    <p className="text-xs" style={{ color: "var(--im-text-muted)" }}>
                      {pl.desc} · {pl.tracks.length} трека
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={(e) => { e.stopPropagation(); handleTrackClick(pl.tracks[0], pl.tracks); }}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: "var(--im-yellow)" }}>
                      <Icon name="Play" size={12} color="#000" />
                    </button>
                    <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={15} color="var(--im-text-muted)" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-3 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                    <div className="pt-2">
                      <TrackList
                        tracks={pl.tracks}
                        currentTrackId={currentTrackId}
                        isPlaying={isPlaying}
                        onTrackClick={(t) => handleTrackClick(t, pl.tracks)}
                      />
                    </div>
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

function TrackList({ tracks, currentTrackId, isPlaying, onTrackClick }: {
  tracks: Track[];
  currentTrackId?: number | null;
  isPlaying?: boolean;
  onTrackClick: (t: Track) => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      {tracks.map((track, i) => {
        const active = currentTrackId === track.id;
        return (
          <button key={track.id} onClick={() => onTrackClick(track)}
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-left w-full group transition-colors"
            style={{ background: active ? "rgba(245,197,24,0.07)" : "transparent" }}
            onMouseEnter={e => !active && (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
            onMouseLeave={e => !active && (e.currentTarget.style.background = "transparent")}>
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              {active ? (
                isPlaying ? (
                  <div className="soundbar flex items-end gap-0.5 h-3">
                    {[5, 9, 5, 9, 5].map((h, j) => <span key={j} style={{ height: `${h}px` }} />)}
                  </div>
                ) : (
                  <Icon name="Play" size={12} color="var(--im-yellow)" />
                )
              ) : (
                <>
                  <span className="text-xs group-hover:hidden" style={{ color: "var(--im-text-muted)" }}>{i + 1}</span>
                  <span className="hidden group-hover:block">
                    <Icon name="Play" size={12} color="var(--im-text-muted)" />
                  </span>
                </>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm truncate" style={{ color: active ? "var(--im-yellow)" : "var(--im-text)" }}>
                {track.title}
              </p>
              <p className="text-xs truncate" style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
            </div>
            <span className="text-xs tabular-nums flex-shrink-0" style={{ color: "var(--im-text-muted)" }}>
              {track.duration}
            </span>
          </button>
        );
      })}
    </div>
  );
}
