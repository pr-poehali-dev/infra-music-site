import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "@/App";

interface FocusPageProps {
  onPlayTrack: (track: Track) => void;
  onOpenSidebar: () => void;
}

const focusCategories = [
  { id: "deep",     name: "Глубокий фокус", desc: "Бинауральные ритмы",     emoji: "🧠", duration: "∞",
    tracks: [
      { id: 100, title: "Alpha State 40Hz", artist: "Binaural Lab",  duration: "60:00" },
      { id: 101, title: "Neural Flow",      artist: "Focus Science", duration: "45:00" },
      { id: 102, title: "Deep Work Zone",   artist: "Brain Waves",   duration: "90:00" },
    ]},
  { id: "study",    name: "Учёба",          desc: "Классика и неоклассика",  emoji: "📚", duration: "2–4 ч",
    tracks: [
      { id: 110, title: "Piano Study",      artist: "Classical Focus",  duration: "35:00" },
      { id: 111, title: "Bach for Focus",   artist: "Orchestra Works",  duration: "52:00" },
      { id: 112, title: "Nocturne Mix",     artist: "Study Sessions",   duration: "40:00" },
    ]},
  { id: "code",     name: "Разработка",     desc: "Lo-Fi без слов",          emoji: "💻", duration: "4+ ч",
    tracks: [
      { id: 120, title: "Terminal Vibes",   artist: "Code & Beats",  duration: "25:00" },
      { id: 121, title: "Dark Mode",        artist: "Dev Lounge",    duration: "30:00" },
      { id: 122, title: "Stack Overflow",   artist: "Bug Fixers",    duration: "28:00" },
    ]},
  { id: "meditate", name: "Медитация",      desc: "Звуки природы",           emoji: "🧘", duration: "15–60 мин",
    tracks: [
      { id: 130, title: "Forest Rain",      artist: "Nature Sounds", duration: "20:00" },
      { id: 131, title: "Ocean Waves",      artist: "Zen Studio",    duration: "30:00" },
      { id: 132, title: "Mountain Wind",    artist: "Calm Earth",    duration: "25:00" },
    ]},
];

const timerOptions = [25, 45, 60, 90];

export default function FocusPage({ onPlayTrack, onOpenSidebar }: FocusPageProps) {
  const [activeCategory, setActiveCategory] = useState("deep");
  const [selectedTimer, setSelectedTimer] = useState(25);
  const [timerActive, setTimerActive] = useState(false);

  const current = focusCategories.find(c => c.id === activeCategory)!;

  return (
    <div className="p-4 md:p-8 min-h-full">
      {/* Mobile topbar */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <button onClick={onOpenSidebar}
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: "var(--im-surface)" }}>
          <Icon name="Menu" size={18} color="white" />
        </button>
        <h1 className="font-oswald text-xl font-bold text-white">Концентрация</h1>
        <div className="w-9" />
      </div>

      {/* Desktop title + timer row */}
      <div className="hidden md:flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 rounded-full" style={{ background: "var(--im-yellow)" }} />
          <h1 className="font-oswald text-2xl font-bold text-white">Концентрация</h1>
        </div>
        <PomodoroTimer selectedTimer={selectedTimer} setSelectedTimer={setSelectedTimer}
          timerActive={timerActive} setTimerActive={setTimerActive} />
      </div>

      {/* Mobile pomodoro */}
      <div className="md:hidden mb-4">
        <PomodoroTimer selectedTimer={selectedTimer} setSelectedTimer={setSelectedTimer}
          timerActive={timerActive} setTimerActive={setTimerActive} />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {focusCategories.map(cat => (
          <button key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-medium flex-shrink-0 transition-all border"
            style={activeCategory === cat.id ? {
              background: "var(--im-yellow-dim)",
              borderColor: "rgba(245,197,24,0.3)",
              color: "var(--im-yellow)",
            } : {
              background: "var(--im-surface)",
              borderColor: "var(--im-glass-border)",
              color: "var(--im-text-muted)",
            }}>
            <span>{cat.emoji}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Current category */}
      <div className="rounded-2xl p-4 md:p-6 mb-4 md:mb-6"
        style={{ background: "var(--im-surface)", border: "1px solid rgba(245,197,24,0.12)" }}>
        <div className="flex items-center gap-3 md:gap-5 mb-4">
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center text-3xl md:text-4xl flex-shrink-0 relative"
            style={{ background: "var(--im-yellow-dim)", border: "1px solid rgba(245,197,24,0.2)" }}>
            {current.emoji}
            {timerActive && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "var(--im-yellow)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              </div>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium uppercase tracking-widest mb-0.5"
              style={{ color: "var(--im-yellow)" }}>Режим</p>
            <h2 className="font-oswald text-lg md:text-xl font-bold text-white truncate">{current.name}</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--im-text-muted)" }}>{current.desc}</p>
          </div>
          <button className="glass-btn-primary px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-1.5 flex-shrink-0">
            <Icon name="Play" size={14} color="#000" />
            <span className="hidden sm:inline">Запустить</span>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {current.tracks.map((track, i) => (
            <button key={track.id} onClick={() => onPlayTrack(track)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full transition-all"
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

      {/* Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
        {[
          { tip: "Используй наушники для погружения", icon: "Headphones" },
          { tip: "25 мин работы — 5 мин отдыха (помодоро)", icon: "Timer" },
          { tip: "Выключи уведомления во время сессии", icon: "BellOff" },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-3 md:p-4 flex items-center gap-3 md:block"
            style={{ background: "var(--im-surface)", border: "1px solid var(--im-glass-border)" }}>
            <Icon name={item.icon} size={16} color="var(--im-yellow)" />
            <p className="text-xs md:mt-2" style={{ color: "var(--im-text-muted)" }}>{item.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PomodoroTimer({ selectedTimer, setSelectedTimer, timerActive, setTimerActive }: {
  selectedTimer: number;
  setSelectedTimer: (t: number) => void;
  timerActive: boolean;
  setTimerActive: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3"
      style={{ background: "var(--im-surface)", border: "1px solid var(--im-glass-border)" }}>
      <span className="text-xs flex-shrink-0" style={{ color: "var(--im-text-muted)" }}>Помодоро</span>
      <div className="flex gap-1.5">
        {[25, 45, 60, 90].map(t => (
          <button key={t} onClick={() => setSelectedTimer(t)}
            className="px-2 py-1 rounded-lg text-xs font-medium transition-all"
            style={selectedTimer === t ? {
              background: "var(--im-yellow)", color: "#000"
            } : {
              background: "rgba(255,255,255,0.06)", color: "var(--im-text-muted)"
            }}>
            {t}м
          </button>
        ))}
      </div>
      <button onClick={() => setTimerActive(!timerActive)}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
        style={{ background: timerActive ? "rgba(245,197,24,0.2)" : "var(--im-yellow)" }}>
        <Icon name={timerActive ? "Pause" : "Play"} size={14} color={timerActive ? "var(--im-yellow)" : "#000"} />
      </button>
    </div>
  );
}
