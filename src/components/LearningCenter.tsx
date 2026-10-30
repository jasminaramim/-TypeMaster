import React, { useState } from 'react';
import { BookOpen, Check, ArrowRight, Sparkles, Layers, FileText } from 'lucide-react';
import { TYPING_LESSONS } from '../data/passages';
import { soundManager } from '../utils/sound';
import { TypingGuidesSection } from './TypingGuidesSection';

export const LearningCenter: React.FC = () => {
  const [subTab, setSubTab] = useState<'guides' | 'drills'>('guides');
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [completed, setCompleted] = useState(false);

  const lesson = TYPING_LESSONS[activeLessonIdx];
  const targetChars = Array.from(lesson.keys);
  const typedChars = Array.from(typed);

  const correctCount = typedChars.filter((c, i) => c === targetChars[i]).length;
  const accuracy = typedChars.length ? Math.round((correctCount / typedChars.length) * 100) : 100;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newChar = val[val.length - 1];
    const expectedChar = targetChars[val.length - 1];

    if (newChar === expectedChar) {
      soundManager.playKeyClick();
    } else if (newChar !== undefined) {
      soundManager.playError();
    }

    setTyped(val);

    if (val.trim() === lesson.keys.trim()) {
      setCompleted(true);
      soundManager.playSuccess();
    }
  };

  const handleNextLesson = () => {
    setTyped('');
    setCompleted(false);
    setActiveLessonIdx((prev) => (prev + 1) % TYPING_LESSONS.length);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-4 py-1.5 text-xs font-bold tracking-wide text-[#d7ff64]">
          <BookOpen className="h-3.5 w-3.5" />
          <span>KEYBOARD LEARNING ACADEMY</span>
        </div>
        <h2 className="text-3xl font-black text-white sm:text-5xl">
          Learn, Understand & Build <span className="text-[#d7ff64]">Muscle Memory</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#a4a69d] sm:text-base leading-relaxed">
          কীভাবে টাইপিং স্পিড বাড়াবেন তার সম্পূর্ণ বৈজ্ঞানিক গাইড পড়ুন এবং রো-বাই-রো ইন্টারেক্টিভ কী প্র্যাকটিস করে আঙ্গুলের নিয়ন্ত্রণ পাকা করুন।
        </p>

        {/* Learning Hub Sub-Navigation Switcher */}
        <div className="mt-6 inline-flex rounded-2xl border border-white/10 bg-[#161814] p-1.5">
          <button
            onClick={() => setSubTab('guides')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition ${
              subTab === 'guides'
                ? 'bg-[#d7ff64] text-[#111310] shadow-[0_0_15px_rgba(215,255,100,0.25)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>১. পূর্ণাঙ্গ টাইপিং গাইড ও ডিকশনারি</span>
          </button>

          <button
            onClick={() => setSubTab('drills')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition ${
              subTab === 'drills'
                ? 'bg-[#d7ff64] text-[#111310] shadow-[0_0_15px_rgba(215,255,100,0.25)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>২. প্র্যাকটিক্যাল কী ড্রিল (Drills)</span>
          </button>
        </div>
      </section>

      {/* Sub-tab 1: Guides and Knowledge Base */}
      {subTab === 'guides' && (
        <TypingGuidesSection initialTopic="what-is-speed" />
      )}

      {/* Sub-tab 2: Interactive Key Drills */}
      {subTab === 'drills' && (
        <div className="space-y-6 google-anno-skip" data-google-ad-unit="none">
          {/* Lesson Selector Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TYPING_LESSONS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveLessonIdx(idx);
                  setTyped('');
                  setCompleted(false);
                }}
                className={`rounded-2xl border p-5 text-left transition ${
                  activeLessonIdx === idx
                    ? 'border-[#d7ff64]/60 bg-[#d7ff64]/10 shadow-[0_0_20px_rgba(215,255,100,0.15)]'
                    : 'border-white/10 bg-[#161814] hover:border-white/25 hover:bg-white/5'
                }`}
              >
                <span className="text-xs font-bold text-[#d7ff64] tracking-wider uppercase">
                  LESSON 0{idx + 1}
                </span>
                <h3 className="mt-2 text-base font-bold text-white">
                  {item.title.split(' — ')[1] || item.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400 line-clamp-2">
                  {item.subtitle}
                </p>
              </button>
            ))}
          </div>

          {/* Active Lesson Interactive Console (Tagged with google-anno-skip) */}
          <div className="rounded-3xl border border-white/10 bg-[#161814] p-6 shadow-2xl sm:p-10 google-anno-skip">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
              <div>
                <span className="text-xs font-bold text-[#d7ff64] tracking-widest uppercase">
                  CURRENT PRACTICE
                </span>
                <h3 className="text-2xl font-black text-white sm:text-3xl">
                  {lesson.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400">{lesson.subtitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-xl border border-white/10 bg-[#111310] px-3.5 py-1.5 text-xs text-gray-300">
                  Accuracy: <strong className="text-[#d7ff64]">{accuracy}%</strong>
                </span>
              </div>
            </div>

            {/* Tip Box */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/5 bg-[#111310] p-4 text-xs text-gray-300">
              <Sparkles className="h-4 w-4 shrink-0 text-[#d7ff64] mt-0.5" />
              <div>
                <strong className="text-white">Pro Tip: </strong>
                {lesson.tips}
              </div>
            </div>

            {/* Key Display */}
            <div className="my-8 rounded-2xl border border-white/5 bg-[#111310] p-6 text-center select-none">
              <p className="font-mono text-2xl font-black tracking-widest text-[#d7ff64] sm:text-4xl">
                {lesson.keys}
              </p>
            </div>

            {/* Typing Bar */}
            <div>
              <label htmlFor="lesson-input" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                Type the sequence above
              </label>
              <input
                id="lesson-input"
                type="text"
                value={typed}
                onChange={handleInput}
                placeholder="Type the keys exactly as shown..."
                className="w-full rounded-2xl border border-white/10 bg-[#111310] p-4 font-mono text-lg text-white placeholder-gray-600 outline-none transition focus:border-[#d7ff64] focus:ring-1 focus:ring-[#d7ff64]"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-gray-400">
                Progress: {typed.length} / {lesson.keys.length} characters
              </p>

              <div className="flex items-center gap-3">
                {completed && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#d7ff64]">
                    <Check className="h-4 w-4" />
                    Lesson Complete!
                  </span>
                )}
                <button
                  onClick={handleNextLesson}
                  className="flex items-center gap-2 rounded-xl bg-[#d7ff64] px-5 py-2.5 text-xs font-bold text-[#111310] transition hover:bg-[#e6ff8f]"
                >
                  <span>{completed ? 'Next Lesson' : 'Skip to Next'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
