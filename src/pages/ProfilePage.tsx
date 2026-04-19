import Icon from "@/components/ui/icon";
import { Page } from "@/App";

interface ProfilePageProps {
  selectedMood: string | null;
  onNavigate: (page: Page) => void;
  onOpenSidebar: () => void;
}

const moodLabels: Record<string, string> = {
  energetic: "⚡ Энергия", calm: "🌊 Спокойствие", sad: "🌧 Грусть",
  happy: "☀️ Радость",    focused: "🎯 Фокус",     romantic: "🌹 Романтика",
};

const history = [
  { date: "Сегодня",      mood: "focused",  tracks: 8,  minutes: 42, emoji: "🎯" },
  { date: "Вчера",        mood: "calm",     tracks: 14, minutes: 71, emoji: "🌊" },
  { date: "2 дня назад",  mood: "energetic",tracks: 22, minutes: 98, emoji: "⚡" },
  { date: "3 дня назад",  mood: "happy",    tracks: 11, minutes: 55, emoji: "☀️" },
  { date: "4 дня назад",  mood: "sad",      tracks: 6,  minutes: 33, emoji: "🌧" },
];

const stats = [
  { label: "Дней подряд",   value: "7",     icon: "Flame" },
  { label: "Часов",         value: "24",    icon: "Clock" },
  { label: "Жанр",          value: "Lo-Fi", icon: "Star" },
  { label: "Сохранено",     value: "48",    icon: "Heart" },
];

// stable random bars per item
const bars = history.map(item =>
  Array.from({ length: 6 }, (_, j) => ({
    filled: j < Math.round(item.tracks / 4),
    h: 30 + ((item.tracks * 7 + j * 13) % 70),
  }))
);

export default function ProfilePage({ selectedMood, onNavigate, onOpenSidebar }: ProfilePageProps) {
  return (
    <div className="p-4 md:p-8 min-h-full">
      {/* Mobile topbar */}
      <div className="flex items-center gap-3 mb-5 md:hidden">
        <button onClick={onOpenSidebar}
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--im-surface)" }}>
          <Icon name="Menu" size={18} color="white" />
        </button>
        <h1 className="font-oswald text-xl font-bold text-white">Профиль</h1>
      </div>

      {/* Profile card */}
      <div className="rounded-2xl p-4 md:p-6 mb-4 md:mb-6 flex items-center gap-4 md:gap-6"
        style={{ background: "var(--im-surface)", border: "1px solid rgba(245,197,24,0.12)" }}>
        <div
          className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: "var(--im-yellow-dim)", border: "1px solid rgba(245,197,24,0.2)" }}
        >
          🎧
        </div>
        <div className="flex-1 overflow-hidden">
          <h1 className="font-oswald text-xl md:text-2xl font-bold text-white">Пользователь</h1>
          <p className="text-xs mt-0.5 mb-2" style={{ color: "var(--im-text-muted)" }}>
            Слушает с апреля 2025
          </p>
          {selectedMood && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
              style={{ background: "var(--im-yellow-dim)", border: "1px solid rgba(245,197,24,0.25)", color: "var(--im-yellow)" }}>
              <Icon name="Sparkles" size={12} color="var(--im-yellow)" />
              {moodLabels[selectedMood]}
            </div>
          )}
        </div>
        <button onClick={() => onNavigate("playlists")}
          className="glass-btn-primary px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-1.5 flex-shrink-0">
          <Icon name="Music2" size={14} color="#000" />
          <span className="hidden sm:inline">Плейлисты</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
        {stats.map((s) => (
          <div key={s.label}
            className="rounded-xl p-3 text-center"
            style={{ background: "var(--im-surface)", border: "1px solid var(--im-glass-border)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
              style={{ background: "var(--im-yellow-dim)" }}>
              <Icon name={s.icon} size={15} color="var(--im-yellow)" />
            </div>
            <p className="font-oswald text-lg md:text-xl font-bold text-white leading-none">{s.value}</p>
            <p className="text-xs mt-0.5 leading-tight" style={{ color: "var(--im-text-muted)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* History */}
      <div className="rounded-2xl p-4 md:p-6"
        style={{ background: "var(--im-surface)", border: "1px solid var(--im-glass-border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: "var(--im-yellow)" }} />
          <h2 className="font-oswald text-lg md:text-xl font-semibold text-white">История</h2>
        </div>

        <div className="flex flex-col gap-1.5">
          {history.map((item, i) => (
            <div key={i}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
              style={{ background: "transparent" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <span className="text-lg flex-shrink-0">{item.emoji}</span>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-white">{item.date}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: "var(--im-yellow-dim)", color: "var(--im-yellow)" }}>
                    {moodLabels[item.mood]}
                  </span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: "var(--im-text-muted)" }}>
                  {item.tracks} треков · {item.minutes} мин
                </p>
              </div>
              {/* Mini bars */}
              <div className="hidden sm:flex items-end gap-0.5 h-7 flex-shrink-0">
                {bars[i].map((bar, j) => (
                  <div key={j} className="w-1.5 rounded-sm"
                    style={{
                      height: `${bar.h}%`,
                      background: bar.filled ? "var(--im-yellow)" : "rgba(255,255,255,0.08)"
                    }} />
                ))}
              </div>
              <Icon name="ChevronRight" size={14} color="var(--im-text-muted)" />
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t text-center" style={{ borderColor: "var(--im-glass-border)" }}>
          <p className="text-xs" style={{ color: "var(--im-text-muted)" }}>
            5 дней в истории · Слушай больше!
          </p>
        </div>
      </div>
    </div>
  );
}
