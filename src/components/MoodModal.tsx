import { useState } from "react";
import Icon from "@/components/ui/icon";

interface MoodModalProps {
  onSelect: (mood: string) => void;
  heroImg: string;
}

const moods = [
  { id: "energetic", emoji: "⚡", label: "Энергичное", desc: "Драйв и мотивация", color: "#f0a03e" },
  { id: "calm", emoji: "🌊", label: "Спокойное", desc: "Релакс и умиротворение", color: "#3eb8f0" },
  { id: "sad", emoji: "🌧", label: "Грустное", desc: "Задумчивость и рефлексия", color: "#7c8cf0" },
  { id: "happy", emoji: "☀️", label: "Радостное", desc: "Позитив и веселье", color: "#f0e03e" },
  { id: "focused", emoji: "🎯", label: "Концентрация", desc: "Фокус и продуктивность", color: "#7c5af0" },
  { id: "romantic", emoji: "🌹", label: "Романтичное", desc: "Нежность и тепло", color: "#f05a8a" },
];

const questions = [
  "Как ты себя чувствуешь прямо сейчас?",
  "Какую музыку хочется слушать?",
];

export default function MoodModal({ onSelect, heroImg }: MoodModalProps) {
  const [step, setStep] = useState(0);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSelect = (moodId: string) => {
    setSelectedMood(moodId);
    if (step < questions.length - 1) {
      setTimeout(() => { setStep(s => s + 1); setSelectedMood(null); }, 400);
    } else {
      setTimeout(() => onSelect(moodId), 400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(8,8,16,0.92)", backdropFilter: "blur(12px)" }}>

      <div className="relative w-full max-w-lg mx-4 animate-scale-in">
        {/* BG accent */}
        <div className="absolute -inset-8 rounded-3xl opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(124,90,240,0.4) 0%, transparent 70%)" }} />

        <div className="glass rounded-3xl p-8 relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--im-purple), var(--im-blue))" }}>
              <Icon name="Headphones" size={28} color="white" />
            </div>
            <h1 className="font-oswald text-3xl font-bold text-white mb-2">ИнфраМузыка</h1>
            <p className="text-sm" style={{ color: "var(--im-text-muted)" }}>Персональный музыкальный подбор</p>
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              {questions.map((_, i) => (
                <div key={i} className="h-1 flex-1 rounded-full transition-all duration-500"
                  style={{ background: i <= step ? "var(--im-purple)" : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
            <p className="text-center font-medium text-lg text-white mt-4">{questions[step]}</p>
          </div>

          {/* Mood grid */}
          <div className="grid grid-cols-3 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleSelect(mood.id)}
                className={`glass-hover glass rounded-2xl p-4 text-center transition-all duration-200 ${
                  selectedMood === mood.id ? "scale-95 opacity-70" : ""
                }`}
                style={selectedMood === mood.id ? { borderColor: mood.color, boxShadow: `0 0 20px ${mood.color}40` } : {}}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-white text-sm font-medium mb-0.5">{mood.label}</div>
                <div className="text-xs" style={{ color: "var(--im-text-muted)" }}>{mood.desc}</div>
              </button>
            ))}
          </div>

          <p className="text-center text-xs mt-6" style={{ color: "var(--im-text-muted)" }}>
            Шаг {step + 1} из {questions.length} · Ответь на вопросы и получи персональный плейлист
          </p>
        </div>
      </div>
    </div>
  );
}
