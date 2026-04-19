import Icon from "@/components/ui/icon";
import { Page, Track } from "@/App";

interface HomePageProps {
  heroImg: string;
  onOpenMood: () => void;
  selectedMood: string | null;
  onNavigate: (page: Page) => void;
  onPlayTrack: (track: Track) => void;
  onOpenSidebar: () => void;
}

const recentTracks: Track[] = [
  { id: 1, title: "Midnight Drift",  artist: "Neon Horizon",     duration: "3:42", mood: "calm" },
  { id: 2, title: "Deep Focus",      artist: "Alpha Waves",       duration: "5:18", mood: "focused" },
  { id: 3, title: "Electric Soul",   artist: "Synthwave X",       duration: "4:01", mood: "energetic" },
  { id: 4, title: "Rainy Day",       artist: "Lo-Fi Dreams",      duration: "3:55", mood: "sad" },
  { id: 5, title: "Summer Vibes",    artist: "Chill Collective",  duration: "4:22", mood: "happy" },
];

const moodLabels: Record<string, string> = {
  energetic: "⚡ Энергия", calm: "🌊 Спокойствие", sad: "🌧 Грусть",
  happy: "☀️ Радость",    focused: "🎯 Фокус",     romantic: "🌹 Романтика",
};

export default function HomePage({ heroImg, onOpenMood, selectedMood, onNavigate, onPlayTrack, onOpenSidebar }: HomePageProps) {
  return (
    <div className="p-4 md:p-8 min-h-full">
      {/* Mobile topbar */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <button
          onClick={onOpenSidebar}
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: "var(--im-surface)" }}
        >
          <Icon name="Menu" size={18} color="white" />
        </button>
        <span className="font-oswald font-semibold text-white text-base">
          Инфра<span style={{ color: "var(--im-yellow)" }}>Музыка</span>
        </span>
        {selectedMood ? (
          <span className="text-base">{moodLabels[selectedMood].split(" ")[0]}</span>
        ) : (
          <div className="w-9" />
        )}
      </div>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-5 md:mb-8" style={{ height: "clamp(160px, 30vw, 240px)" }}>
        <img src={heroImg} alt="hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(160deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.75) 100%)"
        }} />
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
          <h1 className="font-oswald text-2xl md:text-4xl font-bold text-white mb-3">
            ИнфраМузыка
          </h1>
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            Музыка под твоё настроение
          </p>
          <div className="flex gap-2 md:gap-3 flex-wrap">
            <button
              onClick={onOpenMood}
              className="glass-btn-primary px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-1.5"
            >
              <Icon name="Music" size={14} color="#000" />
              Подобрать музыку
            </button>
            <button
              onClick={() => onNavigate("focus")}
              className="glass-btn px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-1.5"
            >
              <Icon name="Brain" size={14} color="white" />
              Концентрация
            </button>
          </div>
        </div>
        {selectedMood && (
          <div className="absolute top-3 right-3 md:top-6 md:right-6 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(0,0,0,0.6)", border: "1px solid var(--im-glass-border)" }}>
            <span className="text-xs font-medium text-white">{moodLabels[selectedMood]}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-5 md:mb-8">
        {[
          { label: "Плейлисты", value: "12", icon: "Music2" },
          { label: "Треков",    value: "24", icon: "Headphones" },
          { label: "Минут",     value: "96", icon: "Clock" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-3 md:p-5 flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-4"
            style={{ background: "var(--im-surface)", border: "1px solid var(--im-glass-border)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--im-yellow-dim)", border: "1px solid rgba(245,197,24,0.2)" }}
            >
              <Icon name={stat.icon} size={15} color="var(--im-yellow)" />
            </div>
            <div className="text-center md:text-left">
              <p className="font-oswald text-xl md:text-2xl font-bold text-white leading-none">{stat.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--im-text-muted)" }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent tracks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-oswald text-lg md:text-xl font-semibold text-white">Недавно</h2>
          <button
            className="text-xs flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{ color: "var(--im-yellow)" }}
          >
            Все <Icon name="ChevronRight" size={13} color="var(--im-yellow)" />
          </button>
        </div>
        <div className="flex flex-col gap-1.5">
          {recentTracks.map((track, i) => (
            <button
              key={track.id}
              onClick={() => onPlayTrack(track)}
              className="rounded-xl px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-3 text-left w-full group transition-all"
              style={{ background: "var(--im-surface)", border: "1px solid var(--im-glass-border)" }}
            >
              <span className="text-xs w-4 text-center flex-shrink-0 tabular-nums"
                style={{ color: "var(--im-text-muted)" }}>
                {i + 1}
              </span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--im-yellow-dim)" }}
              >
                <Icon name="Music" size={14} color="var(--im-yellow)" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{track.title}</p>
                <p className="text-xs truncate" style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
              </div>
              <span className="text-xs flex-shrink-0 tabular-nums" style={{ color: "var(--im-text-muted)" }}>
                {track.duration}
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <Icon name="Play" size={14} color="var(--im-yellow)" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}