import Icon from "@/components/ui/icon";
import { Page, PlayerState } from "@/App";

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  player: PlayerState;
  onTogglePlay: () => void;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home",      label: "Главная",  icon: "Home" },
  { id: "search",    label: "Поиск",    icon: "Search" },
  { id: "playlists", label: "Музыка",   icon: "Music2" },
  { id: "focus",     label: "Фокус",    icon: "Brain" },
  { id: "profile",   label: "Профиль",  icon: "User" },
];

export default function BottomNav({ currentPage, onNavigate, player, onTogglePlay }: BottomNavProps) {
  const { track, isPlaying } = player;

  return (
    <div className="bottom-nav flex flex-col">
      {/* Mini player strip */}
      {track && (
        <div
          className="flex items-center gap-3 px-4 py-2.5 border-b"
          style={{ borderColor: "var(--im-glass-border)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--im-yellow-dim)", border: "1px solid rgba(245,197,24,0.3)" }}
          >
            <Icon name="Music" size={14} color="var(--im-yellow)" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium text-white truncate">{track.title}</p>
            <p className="text-xs truncate" style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
          </div>
          <button
            onClick={onTogglePlay}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--im-yellow)" }}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={14} color="#000" />
          </button>
        </div>
      )}

      {/* Nav tabs */}
      <div className="flex items-center">
        {navItems.map((item) => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-all"
              style={{ color: active ? "var(--im-yellow)" : "var(--im-text-muted)" }}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-xs font-medium">{item.label}</span>
              {active && (
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: "var(--im-yellow)" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}