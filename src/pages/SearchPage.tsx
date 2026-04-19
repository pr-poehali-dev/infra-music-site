import { useState, useMemo, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "@/App";

interface SearchPageProps {
  onPlayTrack: (track: Track) => void;
  onOpenSidebar: () => void;
}

const ALL_TRACKS: Track[] = [
  { id: 1,   title: "Midnight Drift",    artist: "Neon Horizon",      duration: "3:42", mood: "calm" },
  { id: 2,   title: "Deep Focus",        artist: "Alpha Waves",        duration: "5:18", mood: "focused" },
  { id: 3,   title: "Electric Soul",     artist: "Synthwave X",        duration: "4:01", mood: "energetic" },
  { id: 4,   title: "Rainy Day",         artist: "Lo-Fi Dreams",       duration: "3:55", mood: "sad" },
  { id: 5,   title: "Summer Vibes",      artist: "Chill Collective",   duration: "4:22", mood: "happy" },
  { id: 10,  title: "Power Rush",        artist: "BeatForce",          duration: "3:22", mood: "energetic" },
  { id: 11,  title: "Adrenaline",        artist: "Neon Pulse",         duration: "4:05", mood: "energetic" },
  { id: 12,  title: "Thunder Road",      artist: "ElectroBeat",        duration: "3:47", mood: "energetic" },
  { id: 20,  title: "Ocean Breath",      artist: "Ambient Seas",       duration: "5:12", mood: "calm" },
  { id: 21,  title: "Morning Mist",      artist: "Drift Collective",   duration: "4:38", mood: "calm" },
  { id: 22,  title: "Still Water",       artist: "Chill Studio",       duration: "6:01", mood: "calm" },
  { id: 30,  title: "Empty Streets",     artist: "Melancholy",         duration: "4:55", mood: "sad" },
  { id: 31,  title: "Fallen Leaves",     artist: "Autumn Sound",       duration: "5:20", mood: "sad" },
  { id: 32,  title: "Quiet Thoughts",    artist: "Introspect",         duration: "3:44", mood: "sad" },
  { id: 40,  title: "Golden Hours",      artist: "Sunshine Crew",      duration: "3:18", mood: "happy" },
  { id: 41,  title: "Happy Feet",        artist: "Pop Vibes",          duration: "2:55", mood: "happy" },
  { id: 42,  title: "Summer Rain",       artist: "Chill Pop",          duration: "4:02", mood: "happy" },
  { id: 50,  title: "Deep Focus",        artist: "Alpha Waves",        duration: "8:00", mood: "focused" },
  { id: 51,  title: "Neural Flow",       artist: "Binaural Lab",       duration: "10:00", mood: "focused" },
  { id: 52,  title: "Zone In",           artist: "Focus Studio",       duration: "7:30", mood: "focused" },
  { id: 60,  title: "Tender Nights",     artist: "Soft Jazz",          duration: "4:44", mood: "romantic" },
  { id: 61,  title: "Candlelight",       artist: "Romance Keys",       duration: "5:10", mood: "romantic" },
  { id: 62,  title: "Close To You",      artist: "Piano Dreams",       duration: "3:58", mood: "romantic" },
  { id: 100, title: "Alpha State 40Hz",  artist: "Binaural Lab",       duration: "60:00", mood: "focused" },
  { id: 101, title: "Neural Flow",       artist: "Focus Science",      duration: "45:00", mood: "focused" },
  { id: 102, title: "Deep Work Zone",    artist: "Brain Waves",        duration: "90:00", mood: "focused" },
  { id: 110, title: "Piano Study",       artist: "Classical Focus",    duration: "35:00", mood: "calm" },
  { id: 111, title: "Bach for Focus",    artist: "Orchestra Works",    duration: "52:00", mood: "calm" },
  { id: 120, title: "Terminal Vibes",    artist: "Code & Beats",       duration: "25:00", mood: "focused" },
  { id: 121, title: "Dark Mode",         artist: "Dev Lounge",         duration: "30:00", mood: "focused" },
  { id: 130, title: "Forest Rain",       artist: "Nature Sounds",      duration: "20:00", mood: "calm" },
  { id: 131, title: "Ocean Waves",       artist: "Zen Studio",         duration: "30:00", mood: "calm" },
];

const MOODS = [
  { id: "all",      label: "Все",          emoji: "✦" },
  { id: "energetic",label: "Энергия",      emoji: "⚡" },
  { id: "calm",     label: "Спокойствие",  emoji: "🌊" },
  { id: "focused",  label: "Фокус",        emoji: "🎯" },
  { id: "happy",    label: "Радость",      emoji: "☀️" },
  { id: "sad",      label: "Грусть",       emoji: "🌧" },
  { id: "romantic", label: "Романтика",    emoji: "🌹" },
];

function highlight(text: string, query: string) {
  if (!query.trim()) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark style={{ background: "var(--im-yellow)", color: "#000", borderRadius: 2, padding: "0 2px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

export default function SearchPage({ onPlayTrack, onOpenSidebar }: SearchPageProps) {
  const [query, setQuery] = useState("");
  const [moodFilter, setMoodFilter] = useState("all");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ALL_TRACKS.filter(t => {
      const matchMood = moodFilter === "all" || t.mood === moodFilter;
      const matchQuery = !q || t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q);
      return matchMood && matchQuery;
    });
  }, [query, moodFilter]);

  const handlePlay = (track: Track) => {
    setPlayingId(track.id);
    onPlayTrack(track);
  };

  const isEmpty = query.trim() === "" && moodFilter === "all";

  return (
    <div className="p-4 md:p-8 min-h-full flex flex-col">
      {/* Topbar */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onOpenSidebar}
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 md:hidden"
          style={{ background: "var(--im-surface)" }}>
          <Icon name="Menu" size={18} color="white" />
        </button>
        <h1 className="font-oswald text-xl md:text-2xl font-bold text-white hidden md:block">Поиск</h1>

        {/* Search input */}
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name="Search" size={16} color="var(--im-text-muted)" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Трек, исполнитель..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{
              background: "var(--im-surface)",
              border: "1px solid var(--im-glass-border)",
              color: "var(--im-text)",
            }}
            onFocus={e => (e.target.style.borderColor = "rgba(245,197,24,0.5)")}
            onBlur={e => (e.target.style.borderColor = "var(--im-glass-border)")}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity">
              <Icon name="X" size={14} color="white" />
            </button>
          )}
        </div>
      </div>

      {/* Mood filters */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {MOODS.map(m => (
          <button
            key={m.id}
            onClick={() => setMoodFilter(m.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium flex-shrink-0 transition-all border"
            style={moodFilter === m.id ? {
              background: "var(--im-yellow)",
              borderColor: "var(--im-yellow)",
              color: "#000",
            } : {
              background: "var(--im-surface)",
              borderColor: "var(--im-glass-border)",
              color: "var(--im-text-muted)",
            }}>
            <span>{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      {!isEmpty && (
        <p className="text-xs mb-3" style={{ color: "var(--im-text-muted)" }}>
          {results.length > 0
            ? `Найдено: ${results.length} ${results.length === 1 ? "трек" : results.length < 5 ? "трека" : "треков"}`
            : "Ничего не найдено"}
        </p>
      )}

      {/* Empty state */}
      {isEmpty && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--im-surface)" }}>
            <Icon name="Search" size={28} color="var(--im-text-muted)" />
          </div>
          <p className="font-oswald text-lg font-semibold text-white">Найди свою музыку</p>
          <p className="text-sm max-w-xs" style={{ color: "var(--im-text-muted)" }}>
            Введи название трека или исполнителя, или выбери настроение
          </p>
        </div>
      )}

      {/* No results */}
      {!isEmpty && results.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--im-surface)" }}>
            <Icon name="SearchX" size={28} color="var(--im-text-muted)" />
          </div>
          <p className="font-oswald text-lg font-semibold text-white">Не найдено</p>
          <p className="text-sm" style={{ color: "var(--im-text-muted)" }}>
            Попробуй другой запрос или смени фильтр
          </p>
          <button
            onClick={() => { setQuery(""); setMoodFilter("all"); }}
            className="text-xs mt-1 px-4 py-2 rounded-xl transition-all"
            style={{ background: "var(--im-yellow)", color: "#000", fontWeight: 600 }}>
            Сбросить
          </button>
        </div>
      )}

      {/* Track list */}
      {results.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {results.map((track, i) => {
            const isPlaying = playingId === track.id;
            return (
              <button
                key={`${track.id}-${i}`}
                onClick={() => handlePlay(track)}
                className="rounded-xl px-3 py-2.5 flex items-center gap-3 text-left w-full group transition-all"
                style={{
                  background: isPlaying ? "var(--im-yellow-dim)" : "var(--im-surface)",
                  border: `1px solid ${isPlaying ? "rgba(245,197,24,0.3)" : "var(--im-glass-border)"}`,
                }}
              >
                {/* Play indicator */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: isPlaying ? "var(--im-yellow)" : "rgba(255,255,255,0.05)" }}>
                  {isPlaying ? (
                    <div className="soundbar flex items-end gap-0.5 h-4">
                      {[8, 14, 8, 14, 8].map((h, j) => (
                        <span key={j} style={{ height: `${h}px`, background: "#000" }} />
                      ))}
                    </div>
                  ) : (
                    <Icon name="Music" size={14} color="var(--im-text-muted)" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate" style={{ color: isPlaying ? "var(--im-yellow)" : "white" }}>
                    {highlight(track.title, query)}
                  </p>
                  <p className="text-xs truncate mt-0.5" style={{ color: "var(--im-text-muted)" }}>
                    {highlight(track.artist, query)}
                  </p>
                </div>

                {/* Mood tag */}
                {track.mood && (
                  <span className="text-xs px-1.5 py-0.5 rounded hidden sm:inline-block flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.06)", color: "var(--im-text-muted)" }}>
                    {MOODS.find(m => m.id === track.mood)?.emoji}
                  </span>
                )}

                <span className="text-xs tabular-nums flex-shrink-0" style={{ color: "var(--im-text-muted)" }}>
                  {track.duration}
                </span>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <Icon name="Play" size={14} color="var(--im-yellow)" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
