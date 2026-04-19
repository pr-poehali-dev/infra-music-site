import Icon from "@/components/ui/icon";
import { Page, Track } from "@/App";

interface HomePageProps {
  heroImg: string;
  onOpenMood: () => void;
  selectedMood: string | null;
  onNavigate: (page: Page) => void;
  onPlayTrack: (track: Track) => void;
}

const recentTracks: Track[] = [
  { id: 1, title: "Midnight Drift", artist: "Neon Horizon", duration: "3:42", mood: "calm" },
  { id: 2, title: "Deep Focus", artist: "Alpha Waves", duration: "5:18", mood: "focused" },
  { id: 3, title: "Electric Soul", artist: "Synthwave X", duration: "4:01", mood: "energetic" },
  { id: 4, title: "Rainy Day", artist: "Lo-Fi Dreams", duration: "3:55", mood: "sad" },
  { id: 5, title: "Summer Vibes", artist: "Chill Collective", duration: "4:22", mood: "happy" },
];

const moodLabels: Record<string, string> = {
  energetic: "⚡ Энергичное", calm: "🌊 Спокойное", sad: "🌧 Грустное",
  happy: "☀️ Радостное", focused: "🎯 Концентрация", romantic: "🌹 Романтичное",
};

export default function HomePage({ heroImg, onOpenMood, selectedMood, onNavigate, onPlayTrack }: HomePageProps) {
  return (
    <div className="p-8 min-h-full">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-8 h-64">
        <img src={heroImg} alt="hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(8,8,16,0.85) 0%, rgba(124,90,240,0.3) 50%, rgba(8,8,16,0.6) 100%)"
        }} />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <p className="text-sm font-medium mb-2 animate-fade-in" style={{ color: "var(--im-blue)" }}>
            ДОБРО ПОЖАЛОВАТЬ
          </p>
          <h1 className="font-oswald text-4xl font-bold text-white mb-3 animate-fade-in delay-100">
            Музыка для твоего<br />настроения
          </h1>
          <div className="flex gap-3 animate-fade-in delay-200">
            <button
              onClick={onOpenMood}
              className="glass-btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <Icon name="Sparkles" size={16} color="white" />
              Обновить настроение
            </button>
            <button
              onClick={() => onNavigate("focus")}
              className="glass-btn px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <Icon name="Brain" size={16} color="white" />
              Концентрация
            </button>
          </div>
        </div>

        {/* Mood badge */}
        {selectedMood && (
          <div className="absolute top-6 right-6 glass px-4 py-2 rounded-xl animate-fade-in">
            <span className="text-sm font-medium text-white">{moodLabels[selectedMood]}</span>
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Плейлистов", value: "12", icon: "Music2", color: "var(--im-purple)" },
          { label: "Треков сегодня", value: "24", icon: "Headphones", color: "var(--im-blue)" },
          { label: "Минут музыки", value: "96", icon: "Clock", color: "#f0a03e" },
        ].map((stat) => (
          <div key={stat.label} className="glass glass-hover rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${stat.color}25`, border: `1px solid ${stat.color}40` }}>
              <Icon name={stat.icon} size={18} color={stat.color} />
            </div>
            <div>
              <p className="font-oswald text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs" style={{ color: "var(--im-text-muted)" }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent tracks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-oswald text-xl font-semibold text-white">Недавно слушал</h2>
          <button className="text-xs flex items-center gap-1 hover:opacity-80 transition-opacity"
            style={{ color: "var(--im-purple)" }}>
            Все треки <Icon name="ChevronRight" size={14} color="var(--im-purple)" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {recentTracks.map((track, i) => (
            <button
              key={track.id}
              onClick={() => onPlayTrack(track)}
              className="glass glass-hover rounded-xl px-4 py-3 flex items-center gap-4 text-left w-full group"
            >
              <span className="text-sm w-5 text-center flex-shrink-0" style={{ color: "var(--im-text-muted)" }}>
                {i + 1}
              </span>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, var(--im-purple)40, var(--im-blue)40)" }}>
                <Icon name="Music" size={16} color="var(--im-purple)" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{track.title}</p>
                <p className="text-xs truncate" style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
              </div>
              <span className="text-xs flex-shrink-0" style={{ color: "var(--im-text-muted)" }}>{track.duration}</span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="Play" size={16} color="var(--im-purple)" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
