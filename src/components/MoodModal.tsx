import { useState } from "react";
import Icon from "@/components/ui/icon";

interface MoodModalProps {
  onSelect: (mood: string) => void;
  heroImg: string;
}

const activities = [
  { id: "work",     emoji: "💼", label: "Работаю",     desc: "Офис, задачи, дедлайны" },
  { id: "train",    emoji: "🏋️", label: "Тренируюсь",  desc: "Спорт и движение" },
  { id: "relax",    emoji: "🛋️", label: "Отдыхаю",     desc: "Отдых и расслабление" },
  { id: "sleep",    emoji: "🌙", label: "Засыпаю",     desc: "Ночь, сон, тишина" },
];

const moods = [
  { id: "energetic", emoji: "⚡", label: "Энергия",     desc: "Драйв и мотивация" },
  { id: "calm",      emoji: "🌊", label: "Спокойствие", desc: "Релакс" },
  { id: "sad",       emoji: "🌧", label: "Грусть",      desc: "Рефлексия" },
  { id: "happy",     emoji: "☀️", label: "Радость",     desc: "Позитив" },
  { id: "focused",   emoji: "🎯", label: "Фокус",       desc: "Продуктивность" },
  { id: "romantic",  emoji: "🌹", label: "Романтика",   desc: "Нежность" },
];

// Activity → suggested mood mapping (will pre-select, but user still chooses freely)
const activityHint: Record<string, string> = {
  work:  "focused",
  train: "energetic",
  relax: "calm",
  sleep: "calm",
};

export default function MoodModal({ onSelect }: MoodModalProps) {
  const [step, setStep] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleActivitySelect = (id: string) => {
    if (animating) return;
    setSelectedActivity(id);
    setAnimating(true);
    // Pre-suggest a mood
    setSelectedMood(activityHint[id] ?? null);
    setTimeout(() => {
      setStep(1);
      setAnimating(false);
    }, 400);
  };

  const handleMoodSelect = (id: string) => {
    if (animating) return;
    setSelectedMood(id);
    setAnimating(true);
    setTimeout(() => onSelect(id), 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(10px)" }}
    >
      <div className="w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="text-center mb-6">
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

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-500"
              style={{ background: i <= step ? "var(--im-yellow)" : "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>

        {/* Step 1 — Activity */}
        {step === 0 && (
          <div>
            <p className="text-center text-base font-medium text-white mb-5">
              Что сейчас делаешь?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {activities.map((act) => {
                const isSelected = selectedActivity === act.id;
                return (
                  <button
                    key={act.id}
                    onClick={() => handleActivitySelect(act.id)}
                    className="rounded-2xl p-5 text-left transition-all duration-200 border flex flex-col gap-2"
                    style={{
                      background: isSelected ? "var(--im-yellow-dim)" : "var(--im-surface)",
                      borderColor: isSelected ? "var(--im-yellow)" : "var(--im-glass-border)",
                      transform: isSelected ? "scale(0.97)" : "scale(1)",
                    }}
                  >
                    <div className="text-3xl">{act.emoji}</div>
                    <div>
                      <div className="text-white text-sm font-semibold">{act.label}</div>
                      <div className="text-xs mt-0.5 leading-tight" style={{ color: "var(--im-text-muted)" }}>
                        {act.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-center text-xs mt-5" style={{ color: "var(--im-text-muted)" }}>
              1 / 2 — выбери активность
            </p>
          </div>
        )}

        {/* Step 2 — Mood */}
        {step === 1 && (
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <button
                onClick={() => { setStep(0); setSelectedMood(null); }}
                className="opacity-40 hover:opacity-80 transition-opacity"
              >
                <Icon name="ChevronLeft" size={18} color="white" />
              </button>
              <p className="text-base font-medium text-white">
                Какое у тебя настроение?
              </p>
            </div>
            {selectedActivity && (
              <p className="text-center text-xs mb-5" style={{ color: "var(--im-yellow)" }}>
                {activities.find(a => a.id === selectedActivity)?.emoji}{" "}
                {activities.find(a => a.id === selectedActivity)?.label}
              </p>
            )}
            <div className="grid grid-cols-3 gap-2.5">
              {moods.map((mood) => {
                const isSelected = selectedMood === mood.id;
                return (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
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
            <p className="text-center text-xs mt-5" style={{ color: "var(--im-text-muted)" }}>
              2 / 2 — выбери настроение → откроется плейлист
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
