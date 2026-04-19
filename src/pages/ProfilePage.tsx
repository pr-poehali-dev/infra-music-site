import Icon from "@/components/ui/icon";
import { Page } from "@/App";

interface ProfilePageProps {
  selectedMood: string | null;
  onNavigate: (page: Page) => void;
}

const moodLabels: Record<string, string> = {
  energetic: "⚡ Энергичное", calm: "🌊 Спокойное", sad: "🌧 Грустное",
  happy: "☀️ Радостное", focused: "🎯 Концентрация", romantic: "🌹 Романтичное",
};

const history = [
  { date: "Сегодня", mood: "focused", tracks: 8, minutes: 42, icon: "🎯" },
  { date: "Вчера", mood: "calm", tracks: 14, minutes: 71, icon: "🌊" },
  { date: "2 дня назад", mood: "energetic", tracks: 22, minutes: 98, icon: "⚡" },
  { date: "3 дня назад", mood: "happy", tracks: 11, minutes: 55, icon: "☀️" },
  { date: "4 дня назад", mood: "sad", tracks: 6, minutes: 33, icon: "🌧" },
];

const stats = [
  { label: "Дней подряд", value: "7", icon: "Flame", color: "#f0603e" },
  { label: "Всего часов", value: "24", icon: "Clock", color: "var(--im-blue)" },
  { label: "Любимый жанр", value: "Lo-Fi", icon: "Star", color: "#f0e03e" },
  { label: "Треков сохранено", value: "48", icon: "Heart", color: "#f05a8a" },
];

export default function ProfilePage({ selectedMood, onNavigate }: ProfilePageProps) {
  return (
    <div className="p-8 min-h-full">
      {/* Profile hero */}
      <div className="glass rounded-3xl p-6 mb-6 flex items-center gap-6"
        style={{ background: "linear-gradient(135deg, rgba(124,90,240,0.12), rgba(62,184,240,0.08))" }}>
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg, var(--im-purple), var(--im-blue))" }}>
          🎧
        </div>
        <div className="flex-1">
          <h1 className="font-oswald text-2xl font-bold text-white mb-1">Пользователь</h1>
          <p className="text-sm mb-3" style={{ color: "var(--im-text-muted)" }}>Слушает с апреля 2025</p>
          {selectedMood && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
              style={{ background: "rgba(124,90,240,0.2)", border: "1px solid rgba(124,90,240,0.3)", color: "white" }}>
              <Icon name="Sparkles" size={14} color="var(--im-purple)" />
              Настроение: {moodLabels[selectedMood]}
            </div>
          )}
        </div>
        <button
          onClick={() => onNavigate("playlists")}
          className="glass-btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Icon name="Music2" size={16} color="white" />
          Мои плейлисты
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="glass glass-hover rounded-2xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}>
              <Icon name={s.icon} size={18} color={s.color} />
            </div>
            <p className="font-oswald text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "var(--im-text-muted)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* History */}
      <div className="glass rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1.5 h-6 rounded-full" style={{ background: "var(--im-purple)" }} />
          <h2 className="font-oswald text-xl font-semibold text-white">История прослушивания</h2>
        </div>

        <div className="flex flex-col gap-3">
          {history.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:bg-white/5">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-white">{item.date}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(124,90,240,0.2)", color: "var(--im-purple)" }}>
                    {moodLabels[item.mood]}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--im-text-muted)" }}>
                  {item.tracks} треков · {item.minutes} минут
                </p>
              </div>
              {/* Mini bar chart */}
              <div className="flex items-end gap-0.5 h-8">
                {Array.from({ length: 8 }).map((_, j) => (
                  <div key={j} className="w-1.5 rounded-sm"
                    style={{
                      height: `${Math.random() * 70 + 30}%`,
                      background: j < Math.round(item.tracks / 3)
                        ? "var(--im-purple)"
                        : "rgba(255,255,255,0.1)"
                    }} />
                ))}
              </div>
              <Icon name="ChevronRight" size={16} color="var(--im-text-muted)" />
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 text-center">
          <p className="text-xs" style={{ color: "var(--im-text-muted)" }}>
            Всего 5 дней в истории · Начни слушать больше!
          </p>
        </div>
      </div>
    </div>
  );
}
