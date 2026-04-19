import Icon from "@/components/ui/icon";
import { Page } from "@/App";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "playlists", label: "Плейлисты", icon: "Music2" },
  { id: "focus", label: "Концентрация", icon: "Brain" },
  { id: "profile", label: "Профиль", icon: "User" },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-56 flex-shrink-0 flex flex-col py-6 px-3 gap-1 border-r border-white/5"
      style={{ background: "rgba(8,8,16,0.6)", backdropFilter: "blur(20px)" }}>

      {/* Logo */}
      <div className="px-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--im-purple), var(--im-blue))" }}>
            <Icon name="Radio" size={16} color="white" />
          </div>
          <span className="font-oswald font-semibold text-white text-lg tracking-wide">
            Инфра<span style={{ color: "var(--im-purple)" }}>Музыка</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item text-left w-full ${currentPage === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Mood hint */}
      <div className="mt-auto mx-1 p-3 rounded-xl"
        style={{ background: "rgba(124,90,240,0.12)", border: "1px solid rgba(124,90,240,0.25)" }}>
        <p className="text-xs font-medium mb-1" style={{ color: "var(--im-purple)" }}>Настроение дня</p>
        <div className="flex items-center gap-2">
          <div className="soundbar flex items-end gap-0.5 h-5">
            {[14, 10, 20, 8, 16].map((h, i) => (
              <span key={i} style={{ height: `${h}px` }} />
            ))}
          </div>
          <span className="text-xs" style={{ color: "var(--im-text-muted)" }}>Играет сейчас</span>
        </div>
      </div>
    </aside>
  );
}