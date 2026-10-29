import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Shuffle, Trophy, Flame, Target, Award, ArrowDown, CheckCircle2 } from 'lucide-react';
import { Language, TestResult } from '../types';
import { ENGLISH_PASSAGES, BANGLA_PASSAGES } from '../data/passages';
import { soundManager } from '../utils/sound';
import { CelebrationPopup } from './CelebrationPopup';

interface TypingTestProps {
  onTestComplete: (result: TestResult) => void;
  bestWpm: number;
  averageWpm: number;
  totalTests: number;
}

export const TypingTest: React.FC<TypingTestProps> = ({
  onTestComplete,
  bestWpm,
  averageWpm,
  totalTests,
}) => {
  const [language, setLanguage] = useState<Language>('English');
  const [passageIndex, setPassageIndex] = useState(0);
  const [duration, setDuration] = useState(30);
  const [typed, setTyped] = useState('');
  const [remaining, setRemaining] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const passages = language === 'English' ? ENGLISH_PASSAGES : BANGLA_PASSAGES;
  const currentPassage = passages[passageIndex % passages.length];
  const targetChars = Array.from(currentPassage.text);
  const typedChars = Array.from(typed);

  const correct = typedChars.filter((char, index) => char === targetChars[index]).length;
  const errors = typedChars.filter((char, index) => char !== targetChars[index]).length;
  const accuracy = typedChars.length ? Math.round((correct / typedChars.length) * 100) : 100;
  const elapsed = Math.max(1, duration - remaining);
  const wpm = Math.max(0, Math.round((correct / 5) / (elapsed / 60)));

  // Countdown timer
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          setFinished(true);
          setShowCelebration(true);
          soundManager.playSuccess();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Save history upon completion
  useEffect(() => {
    if (!finished) return;

    const result: TestResult = {
      id: Date.now(),
      language,
      wpm,
      accuracy,
      errors,
      duration,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
      passageSnippet: currentPassage.title,
    };

    onTestComplete(result);
  }, [finished]);

  const resetTest = (nextDuration = duration, nextPassageIdx = passageIndex) => {
    setTyped('');
    setRemaining(nextDuration);
    setDuration(nextDuration);
    setPassageIndex(nextPassageIdx);
    setIsRunning(false);
    setFinished(false);
    setShowCelebration(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleLanguageChange = (nextLang: Language) => {
    setLanguage(nextLang);
    setPassageIndex(0);
    resetTest(duration, 0);
  };

  const handleNextPassage = () => {
    const nextIdx = (passageIndex + 1) % passages.length;
    setPassageIndex(nextIdx);
    resetTest(duration, nextIdx);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (finished || remaining === 0) return;

    const value = e.target.value;
    const prevLen = typed.length;
    const newLen = value.length;

    // Audio feedback
    if (newLen > prevLen) {
      const lastTypedChar = value[newLen - 1];
      const targetChar = targetChars[newLen - 1];
      if (lastTypedChar === targetChar) {
        soundManager.playKeyClick();
      } else {
        soundManager.playError();
      }
    }

    setTyped(value);

    if (value.length > 0 && !isRunning) {
      setIsRunning(true);
    }

    // Auto finish if reached end of passage
    if (Array.from(value).length >= targetChars.length) {
      setIsRunning(false);
      setFinished(true);
      setShowCelebration(true);
      soundManager.playSuccess();
    }
  };

  const getPerformanceBadge = (speed: number, acc: number) => {
    if (speed >= 100 && acc >= 96) return { title: '⚡ Grandmaster Speed', color: 'text-amber-300' };
    if (speed >= 80 && acc >= 95) return { title: '🔥 Elite Typist', color: 'text-[#d7ff64]' };
    if (speed >= 60 && acc >= 92) return { title: '🎯 Fast & Accurate', color: 'text-cyan-400' };
    if (speed >= 40) return { title: '🚀 Solid Rhythm', color: 'text-emerald-400' };
    return { title: '🌱 Steady Learner', color: 'text-purple-300' };
  };

  return (
    <div className="space-y-6 py-[25px] overflow-hidden">
      {/* Main Typing Console */}
      <section id="typing-console" className="scroll-mt-20 rounded-3xl border border-white/10 bg-[#161814] p-4 shadow-2xl transition sm:p-8">
        {/* Controls Bar: Language + Timer + Randomize */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5">
          {/* Language Selector */}
          <div className="flex items-center rounded-xl bg-[#111310] p-1 border border-white/5">
            {(['English', 'বাংলা'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition sm:text-sm ${
                  language === lang
                    ? 'bg-[#d7ff64] text-[#111310] shadow-[0_0_12px_rgba(215,255,100,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Passage metadata & Next button */}
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-gray-400 sm:inline">
              Topic: <strong className="text-gray-200">{currentPassage.title}</strong>
            </span>
            <button
              onClick={handleNextPassage}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:border-[#d7ff64]/40 hover:text-[#d7ff64]"
              title="Change passage"
            >
              <Shuffle className="h-3 w-3" />
              <span>Next Passage</span>
            </button>
          </div>

          {/* Timer Buttons */}
          <div className="flex items-center gap-1.5">
            {[15, 30, 60, 120].map((seconds) => (
              <button
                key={seconds}
                onClick={() => resetTest(seconds)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                  duration === seconds
                    ? 'border-[#d7ff64]/50 bg-[#d7ff64]/10 text-[#d7ff64]'
                    : 'border-white/10 bg-[#111310] text-gray-400 hover:border-white/20 hover:text-gray-200'
                }`}
              >
                {seconds}s
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/5 bg-[#111310] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              TIME REMAINING
            </span>
            <p className="mt-1 text-2xl font-black text-[#d7ff64] sm:text-3xl">
              {remaining}s
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111310] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              LIVE SPEED (WPM)
            </span>
            <p className="mt-1 text-2xl font-black text-[#d7ff64] sm:text-3xl">
              {wpm}
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111310] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              ACCURACY
            </span>
            <p className="mt-1 text-2xl font-black text-[#d7ff64] sm:text-3xl">
              {accuracy}%
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111310] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              MISTAKES
            </span>
            <p className="mt-1 text-2xl font-black text-red-400 sm:text-3xl">
              {errors}
            </p>
          </div>
        </div>

        {/* Target Passage Character Stream Box */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="relative mb-5 min-h-36 cursor-text rounded-2xl border border-white/5 bg-[#111310] p-5 sm:p-7 select-none"
        >
          <div className="mb-3 flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-widest">
            <span>{currentPassage.title}</span>
            <span>
              {typedChars.length} / {targetChars.length} chars
            </span>
          </div>

          <div className="font-mono text-lg leading-relaxed tracking-wide sm:text-xl break-words">
            {targetChars.map((char, index) => {
              let charClass = 'text-[#565950]';

              if (index < typedChars.length) {
                if (char === typedChars[index]) {
                  charClass = 'text-[#d7ff64] font-medium';
                } else {
                  charClass = 'text-red-300 bg-red-500/25 rounded px-0.5';
                }
              }

              // Active cursor
              const isCursor = index === typedChars.length && !finished;

              return (
                <span
                  key={index}
                  className={`${charClass} ${isCursor ? 'border-l-2 border-[#d7ff64] cursor-caret' : ''}`}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>

        {/* Live Typing Input Area */}
        <div className="relative">
          <label htmlFor="typing-input" className="sr-only">
            Type here
          </label>
          <textarea
            id="typing-input"
            ref={inputRef}
            value={typed}
            onChange={handleTyping}
            disabled={finished || remaining === 0}
            placeholder={
              finished
                ? 'Test finished! Click Try Again or see your stats below.'
                : 'Click here and start typing to begin the countdown...'
            }
            rows={3}
            className="w-full resize-none rounded-2xl border border-white/10 bg-[#111310] p-4 font-mono text-base leading-relaxed text-white placeholder-gray-600 outline-none transition focus:border-[#d7ff64]/70 focus:ring-1 focus:ring-[#d7ff64]/50 disabled:opacity-50"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>

        {/* Action Bottom Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>
              Typed: <strong className="text-white">{typedChars.length}</strong> chars
            </span>
            <span>
              Language: <strong className="text-[#d7ff64]">{language}</strong>
            </span>
            {language === 'বাংলা' && (
              <span className="text-[11px] text-gray-500">
                (অভ্র / ইউনিকোড কিবোর্ড সমর্থিত)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => resetTest()}
              className="flex items-center gap-2 rounded-xl bg-[#d7ff64] px-5 py-2.5 text-sm font-bold text-[#111310] shadow-[0_0_15px_rgba(215,255,100,0.25)] transition hover:bg-[#e6ff8f] active:scale-95"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>

        {/* Finished Result Showcase Modal/Banner */}
        {finished && (
          <div className="mt-6 rounded-2xl border border-[#d7ff64]/30 bg-gradient-to-r from-[#d7ff64]/10 via-[#161814] to-[#d7ff64]/5 p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#d7ff64]" />
                  <h3 className="text-xl font-extrabold text-white">
                    Test Completed!
                  </h3>
                  <span
                    className={`ml-2 rounded-full border border-current px-3 py-0.5 text-xs font-bold ${
                      getPerformanceBadge(wpm, accuracy).color
                    }`}
                  >
                    {getPerformanceBadge(wpm, accuracy).title}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-300">
                  You reached <span className="font-bold text-[#d7ff64]">{wpm} WPM</span> with{' '}
                  <span className="font-bold text-white">{accuracy}% accuracy</span> and{' '}
                  <span className="font-bold text-red-400">{errors} mistakes</span> in {duration} seconds.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => resetTest()}
                  className="flex items-center gap-2 rounded-xl bg-[#d7ff64] px-5 py-2.5 text-xs font-black text-[#111310] shadow-[0_0_15px_rgba(215,255,100,0.3)] transition hover:bg-[#e6ff8f] hover:scale-105"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Practice Again</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Stats Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#161814] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              PERSONAL BEST
            </p>
            <Trophy className="h-4 w-4 text-[#d7ff64]" />
          </div>
          <p className="mt-3 text-3xl font-black text-white">
            {bestWpm} <span className="text-sm font-semibold text-gray-400">WPM</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">Highest record on this device</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#161814] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              AVERAGE SPEED
            </p>
            <Target className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="mt-3 text-3xl font-black text-white">
            {averageWpm} <span className="text-sm font-semibold text-gray-400">WPM</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">Cumulative average over session</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#161814] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              TESTS COMPLETED
            </p>
            <Award className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-3 text-3xl font-black text-white">
            {totalTests}
          </p>
          <p className="mt-1 text-xs text-gray-500">Practice runs recorded</p>
        </div>
      </section>

      {/* Celebration Video Popup */}
      <CelebrationPopup
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        onRetry={() => resetTest()}
        wpm={wpm}
        words={Math.round(correct / 5)}
        accuracy={accuracy}
      />
    </div>
  );
};
