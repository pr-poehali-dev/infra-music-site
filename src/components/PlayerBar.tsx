import Icon from "@/components/ui/icon";
import { PlayerState } from "@/App";

interface PlayerBarProps {
  player: PlayerState;
  onTogglePlay: () => void;
  onVolumeChange: (v: number) => void;
}

export default function PlayerBar({ player, onTogglePlay, onVolumeChange }: PlayerBarProps) {
  const { track, isPlaying, progress, volume } = player;

  return (
    <div className="player-bar flex items-center px-6 gap-6 flex-shrink-0" style={{ height: 70 }}>
      {/* Track */}
      <div className="flex items-center gap-3 w-52 flex-shrink-0">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--im-surface2, #1e1e1e)" }}
        >
          {isPlaying ? (
            <div className="soundbar flex items-end gap-0.5 h-4">
              {[8, 14, 8, 14, 8].map((h, i) => (
                <span key={i} style={{ height: `${h}px` }} />
              ))}
            </div>
          ) : (
            <Icon name="Music" size={15} color="var(--im-text-muted)" />
          )}
        </div>
        {track ? (
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{track.title}</p>
            <p className="text-xs truncate" style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
          </div>
        ) : (
          <p className="text-sm" style={{ color: "var(--im-text-muted)" }}>Не выбрано</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-2">
        <div className="flex items-center gap-5">
          <button className="opacity-30 hover:opacity-70 transition-opacity">
            <Icon name="Shuffle" size={15} color="white" />
          </button>
          <button className="opacity-60 hover:opacity-100 transition-opacity">
            <Icon name="SkipBack" size={17} color="white" />
          </button>
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{ background: "var(--im-yellow)" }}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={17} color="#000" />
          </button>
          <button className="opacity-60 hover:opacity-100 transition-opacity">
            <Icon name="SkipForward" size={17} color="white" />
          </button>
          <button className="opacity-30 hover:opacity-70 transition-opacity">
            <Icon name="Repeat" size={15} color="white" />
          </button>
        </div>
        <div className="flex items-center gap-3 w-full max-w-sm">
          <span className="text-xs tabular-nums w-8 text-right" style={{ color: "var(--im-text-muted)" }}>1:24</span>
          <div className="flex-1 h-px rounded-full relative" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "var(--im-yellow)" }} />
          </div>
          <span className="text-xs tabular-nums w-8" style={{ color: "var(--im-text-muted)" }}>3:58</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2.5 w-32 flex-shrink-0">
        <Icon name={volume > 0 ? "Volume2" : "VolumeX"} size={14} color="var(--im-text-muted)" />
        <input
          type="range" min={0} max={100} value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="progress-bar flex-1"
          style={{ background: `linear-gradient(to right, var(--im-yellow) ${volume}%, rgba(255,255,255,0.08) ${volume}%)` }}
        />
      </div>
    </div>
  );
}
