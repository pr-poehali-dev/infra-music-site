import { useState } from "react";
import Icon from "@/components/ui/icon";

interface MoodModalProps {
  onSelect: (mood: string) => void;
  heroImg: string;
}

const moods = [
  { id: "energetic", emoji: "⚡", label: "Энергия",     desc: "Драйв и мотивация" },
  { id: "calm",      emoji: "🌊", label: "Спокойствие", desc: "Релакс" },
  { id: "sad",       emoji: "🌧", label: "Грусть",      desc: "Рефлексия" },
  { id: "happy",     emoji: "☀️", label: "Радость",     desc: "Позитив" },
  { id: "focused",   emoji: "🎯", label: "Фокус",       desc: "Продуктивность" },
  { id: "romantic",  emoji: "🌹", label: "Романтика",   desc: "Нежность" },
];

const questions = [
  "Как ты себя чувствуешь?",
  "Что хочется услышать?",
];

export default function MoodModal({ onSelect }: MoodModalProps) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (step < questions.length - 1) {
      setTimeout(() => { setStep(s => s + 1); setSelected(null); }, 350);
    } else {
      setTimeout(() => onSelect(id), 350);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
    >
      <div className="w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "var(--im-yellow)" }}
          >
            <Icon name="Headphones" size={22} color="#000" />
          </div>
          <h1 className="font-oswald text-2xl font-bold text-white mb-1">ИнфраМузыка</h1>
          <p className="text-sm" style={{ color: "var(--im-text-muted)" }}>
            Персональный подбор музыки
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-5">
          {questions.map((_, i) => (
            <div
              key={i}
              className="h-0.5 flex-1 rounded-full transition-all duration-400"
              style={{ background: i <= step ? "var(--im-yellow)" : "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>

        <p className="text-center text-base font-medium text-white mb-5">
          {questions[step]}
        </p>

        {/* Mood grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {moods.map((mood) => {
            const isSelected = selected === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => handleSelect(mood.id)}
                className="rounded-xl p-4 text-center transition-all duration-200 border"
                style={{
                  background: isSelected ? "var(--im-yellow-dim)" : "var(--im-surface)",
                  borderColor: isSelected ? "var(--im-yellow)" : "var(--im-glass-border)",
                  transform: isSelected ? "scale(0.96)" : "scale(1)",
                }}
              >
                <div className="text-2xl mb-1.5">{mood.emoji}</div>
                <div className="text-white text-sm font-medium leading-tight">{mood.label}</div>
                <div className="text-xs mt-0.5 leading-tight" style={{ color: "var(--im-text-muted)" }}>
                  {mood.desc}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "var(--im-text-muted)" }}>
          {step + 1} / {questions.length} — ответь, чтобы получить плейлист
        </p>
      </div>
    </div>
  );
}
