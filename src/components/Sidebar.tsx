import Icon from "@/components/ui/icon";
import { Page } from "@/App";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home",      label: "Главная",       icon: "Home" },
  { id: "playlists", label: "Плейлисты",     icon: "Music2" },
  { id: "focus",     label: "Концентрация",  icon: "Brain" },
  { id: "profile",   label: "Профиль",       icon: "User" },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside
      className="w-52 flex-shrink-0 flex flex-col py-6 px-3 h-full border-r"
      style={{ background: "var(--im-bg)", borderColor: "var(--im-glass-border)" }}
    >
      {/* Logo */}
      <div className="px-2 mb-8">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--im-yellow)" }}
          >
            <Icon name="Radio" size={14} color="#000" />
          </div>
          <span className="font-oswald font-semibold text-white text-base tracking-wide">
            Инфра<span style={{ color: "var(--im-yellow)" }}>Музыка</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item text-left w-full ${currentPage === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} size={17} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Soundwave hint */}
      <div className="mt-auto px-2">
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-lg"
          style={{ background: "var(--im-surface)", border: "1px solid var(--im-glass-border)" }}
        >
          <div className="soundbar flex items-end gap-0.5 h-4 flex-shrink-0">
            {[10, 14, 8, 16, 10].map((h, i) => (
              <span key={i} style={{ height: `${h}px` }} />
            ))}
          </div>
          <span className="text-xs" style={{ color: "var(--im-text-muted)" }}>
            Сейчас играет
          </span>
        </div>
      </div>
    </aside>
  );
}
