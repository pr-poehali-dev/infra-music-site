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
    <div className="player-bar h-20 flex items-center px-6 gap-6 flex-shrink-0">
      {/* Track info */}
      <div className="flex items-center gap-3 w-56">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--im-purple), var(--im-blue))" }}>
          <Icon name="Music" size={18} color="white" />
          {isPlaying && (
            <div className="absolute inset-0 flex items-end justify-center gap-0.5 pb-1">
              <div className="soundbar flex items-end gap-0.5 h-5">
                {[8, 14, 10, 16, 8].map((h, i) => (
                  <span key={i} style={{ height: `${h}px`, background: "rgba(255,255,255,0.8)" }} />
                ))}
              </div>
            </div>
          )}
        </div>
        {track ? (
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{track.title}</p>
            <p className="text-xs truncate" style={{ color: "var(--im-text-muted)" }}>{track.artist}</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--im-text-muted)" }}>Выбери трек</p>
            <p className="text-xs" style={{ color: "var(--im-text-muted)" }}>ИнфраМузыка</p>
          </div>
        )}
        {track && <button className="ml-auto p-1 opacity-60 hover:opacity-100 transition-opacity">
          <Icon name="Heart" size={16} color="var(--im-text-muted)" />
        </button>}
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <button className="opacity-50 hover:opacity-100 transition-opacity">
            <Icon name="Shuffle" size={16} color="white" />
          </button>
          <button className="opacity-70 hover:opacity-100 transition-opacity">
            <Icon name="SkipBack" size={18} color="white" />
          </button>
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all animate-pulse-glow"
            style={{ background: "linear-gradient(135deg, var(--im-purple), #5a3dd4)" }}>
            <Icon name={isPlaying ? "Pause" : "Play"} size={18} color="white" />
          </button>
          <button className="opacity-70 hover:opacity-100 transition-opacity">
            <Icon name="SkipForward" size={18} color="white" />
          </button>
          <button className="opacity-50 hover:opacity-100 transition-opacity">
            <Icon name="Repeat" size={16} color="white" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 w-full max-w-md">
          <span className="text-xs tabular-nums" style={{ color: "var(--im-text-muted)" }}>1:24</span>
          <div className="flex-1 h-1 rounded-full relative" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--im-purple), var(--im-blue))" }} />
          </div>
          <span className="text-xs tabular-nums" style={{ color: "var(--im-text-muted)" }}>3:58</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 w-40">
        <button className="opacity-60 hover:opacity-100 transition-opacity">
          <Icon name={volume > 0 ? "Volume2" : "VolumeX"} size={16} color="white" />
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="progress-bar flex-1"
          style={{
            background: `linear-gradient(to right, var(--im-purple) ${volume}%, rgba(255,255,255,0.15) ${volume}%)`
          }}
        />
      </div>
    </div>
  );
}
