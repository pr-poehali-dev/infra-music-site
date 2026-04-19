import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "@/App";

interface FocusPageProps {
  onPlayTrack: (track: Track) => void;
}

const focusCategories = [
  {
    id: "deep", name: "Глубокая концентрация", desc: "Бинауральные ритмы и альфа-волны", emoji: "🧠",
    color: "#7c5af0", duration: "∞",
    tracks: [
      { id: 100, title: "Alpha State 40Hz", artist: "Binaural Lab", duration: "60:00" },
      { id: 101, title: "Neural Flow", artist: "Focus Science", duration: "45:00" },
      { id: 102, title: "Deep Work Zone", artist: "Brain Waves", duration: "90:00" },
    ]
  },
  {
    id: "study", name: "Учёба", desc: "Классика и неоклассика для запоминания", emoji: "📚",
    color: "#3eb8f0", duration: "2–4 ч",
    tracks: [
      { id: 110, title: "Piano Study", artist: "Classical Focus", duration: "35:00" },
      { id: 111, title: "Bach for Focus", artist: "Orchestra Works", duration: "52:00" },
      { id: 112, title: "Nocturne Mix", artist: "Study Sessions", duration: "40:00" },
    ]
  },
  {
    id: "code", name: "Для разработчиков", desc: "Lo-Fi и синт-поп без слов", emoji: "💻",
    color: "#3ef0c0", duration: "4+ ч",
    tracks: [
      { id: 120, title: "Terminal Vibes", artist: "Code & Beats", duration: "25:00" },
      { id: 121, title: "Dark Mode", artist: "Dev Lounge", duration: "30:00" },
      { id: 122, title: "Stack Overflow", artist: "Bug Fixers", duration: "28:00" },
    ]
  },
  {
    id: "meditate", name: "Медитация", desc: "Звуки природы и тишина", emoji: "🧘",
    color: "#f0a03e", duration: "15–60 мин",
    tracks: [
      { id: 130, title: "Forest Rain", artist: "Nature Sounds", duration: "20:00" },
      { id: 131, title: "Ocean Waves", artist: "Zen Studio", duration: "30:00" },
      { id: 132, title: "Mountain Wind", artist: "Calm Earth", duration: "25:00" },
    ]
  },
];

const timerOptions = [25, 45, 60, 90];

export default function FocusPage({ onPlayTrack }: FocusPageProps) {
  const [activeCategory, setActiveCategory] = useState("deep");
  const [selectedTimer, setSelectedTimer] = useState(25);
  const [timerActive, setTimerActive] = useState(false);

  const current = focusCategories.find(c => c.id === activeCategory)!;

  return (
    <div className="p-8 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-6 rounded-full" style={{ background: "var(--im-purple)" }} />
            <h1 className="font-oswald text-2xl font-bold text-white">Концентрация</h1>
          </div>
          <p className="text-sm ml-3.5" style={{ color: "var(--im-text-muted)" }}>
            Музыка для максимальной продуктивности
          </p>
        </div>

        {/* Pomodoro timer */}
        <div className="glass rounded-2xl p-4 flex items-center gap-4">
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--im-text-muted)" }}>Помодоро-таймер</p>
            <div className="flex gap-2">
              {timerOptions.map(t => (
                <button key={t}
                  onClick={() => setSelectedTimer(t)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                  style={selectedTimer === t ? {
                    background: "var(--im-purple)", color: "white"
                  } : {
                    background: "rgba(255,255,255,0.06)", color: "var(--im-text-muted)"
                  }}>
                  {t}м
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setTimerActive(!timerActive)}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: timerActive ? "rgba(124,90,240,0.3)" : "var(--im-purple)",
              border: "1px solid var(--im-purple)"
            }}>
            <Icon name={timerActive ? "Pause" : "Play"} size={16} color="white" />
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {focusCategories.map(cat => (
          <button key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium flex-shrink-0 transition-all"
            style={activeCategory === cat.id ? {
              background: `${cat.color}20`,
              border: `1px solid ${cat.color}50`,
              color: cat.color,
            } : {
              background: "var(--im-glass)",
              border: "1px solid var(--im-glass-border)",
              color: "var(--im-text-muted)",
            }}>
            <span>{cat.emoji}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Current category */}
      <div className="glass rounded-3xl p-6 mb-6"
        style={{ border: `1px solid ${current.color}30`, background: `${current.color}06` }}>
        <div className="flex items-center gap-5 mb-6">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 relative"
            style={{ background: `${current.color}15`, border: `1px solid ${current.color}30` }}>
            {current.emoji}
            {timerActive && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: current.color }}>
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium mb-1" style={{ color: current.color }}>РЕЖИМ КОНЦЕНТРАЦИИ</p>
            <h2 className="font-oswald text-2xl font-bold text-white mb-1">{current.name}</h2>
            <p className="text-sm" style={{ color: "var(--im-text-muted)" }}>{current.desc}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs flex items-center gap-1" style={{ color: "var(--im-text-muted)" }}>
                <Icon name="Clock" size={12} color="var(--im-text-muted)" />
                Сессия: {current.duration}
              </span>
              <span className="text-xs flex items-center gap-1" style={{ color: "var(--im-text-muted)" }}>
                <Icon name="Music" size={12} color="var(--im-text-muted)" />
                {current.tracks.length} трека
              </span>
            </div>
          </div>
          <button className="glass-btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
            <Icon name="Play" size={16} color="white" />
            Запустить
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {current.tracks.map((track, i) => (
            <button key={track.id} onClick={() => onPlayTrack(track)}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-left w-full group transition-all hover:bg-white/5">
              <span className="text-sm w-5 text-center flex-shrink-0" style={{ color: "var(--im-text-muted)" }}>{i + 1}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${current.color}20` }}>
                <Icon name="Music" size={14} color={current.color} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{track.title}</p>
                <p className="text-xs" style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
              </div>
              <span className="text-xs" style={{ color: "var(--im-text-muted)" }}>{track.duration}</span>
              <Icon name="Play" size={14} color={current.color} />
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-oswald text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Icon name="Lightbulb" size={18} color="var(--im-blue)" />
          Советы для концентрации
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { tip: "Используй наушники для максимального погружения", icon: "Headphones" },
            { tip: "Метод Помодоро: 25 минут работы, 5 отдыха", icon: "Timer" },
            { tip: "Исключи уведомления во время сессии", icon: "BellOff" },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-4"
              style={{ background: "rgba(62,184,240,0.06)", border: "1px solid rgba(62,184,240,0.15)" }}>
              <Icon name={item.icon} size={16} color="var(--im-blue)" />
              <p className="text-xs mt-2" style={{ color: "var(--im-text-muted)" }}>{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
