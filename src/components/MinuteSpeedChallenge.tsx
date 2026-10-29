import React, { useState, useEffect, useRef } from 'react';
import {
  Timer,
  Flame,
  RotateCcw,
  Trophy,
  Target,
  Sparkles,
  Zap,
  CheckCircle2,
  Copy,
  Keyboard,
  Award,
  ArrowRight,
  TrendingUp,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { CelebrationPopup } from './CelebrationPopup';

const ENGLISH_WORDS = [
  'the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it', 'that', 'for',
  'they', 'with', 'as', 'not', 'on', 'she', 'at', 'by', 'this', 'we', 'you',
  'do', 'but', 'his', 'from', 'they', 'say', 'her', 'she', 'or', 'an', 'will',
  'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out',
  'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can',
  'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year',
  'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now',
  'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use',
  'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want',
  'because', 'any', 'these', 'give', 'day', 'most', 'us', 'great', 'between',
  'speed', 'focus', 'keyboard', 'practice', 'accuracy', 'typing', 'challenge',
  'master', 'computer', 'learn', 'rhythm', 'fingers', 'future', 'mind', 'power',
  'quick', 'brown', 'fox', 'jumps', 'lazy', 'dog', 'bright', 'stream', 'flow',
  'write', 'system', 'global', 'digital', 'screen', 'motion', 'light', 'energy',
];

const BANGLA_WORDS = [
  'আমি', 'তুমি', 'সে', 'আমরা', 'তোমরা', 'তারা', 'এই', 'সেই', 'কোন', 'সব',
  'হবে', 'করব', 'যাব', 'খাব', 'বলা', 'দেখা', 'শোনা', 'জানা', 'পড়া', 'লেখা',
  'সময়', 'দিন', 'রাত', 'কাজ', 'গতি', 'দ্রুত', 'শব্দ', 'বাক্য', 'কিবোর্ড',
  'টাইপ', 'অনুশীলন', 'দক্ষতা', 'সফলতা', 'বাংলা', 'ভাষা', 'জ্ঞান', 'শিক্ষা',
  'দেশ', 'মানুষ', 'জীবন', 'মন', 'কথা', 'আলো', 'বাতাস', 'ফুল', 'পাখি',
  'নতুন', 'ভালো', 'সুন্দর', 'সত্য', 'পথ', 'লক্ষ্য', 'স্বপ্ন', 'শক্তি', 'সাহস',
  'চেষ্টা', 'নিয়মিত', 'প্রতিদিন', 'নিখুঁত', 'আনন্দ', 'বিজয়', 'গৌরব', 'ইতিহাস',
];

type MinuteOption = 1 | 2 | 3 | 5;

export const MinuteSpeedChallenge: React.FC = () => {
  const [selectedMinutes, setSelectedMinutes] = useState<MinuteOption>(1);
  const [language, setLanguage] = useState<'English' | 'বাংলা'>('English');
  const [mode, setMode] = useState<'words' | 'free'>('words');

  const [words, setWords] = useState<string[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [wordStatuses, setWordStatuses] = useState<('correct' | 'error' | 'pending')[]>([]);

  // Free typing state
  const [freeText, setFreeText] = useState('');

  // Timer states
  const totalSeconds = selectedMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Score counters
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [errorWordsCount, setErrorWordsCount] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const freeTextareaRef = useRef<HTMLTextAreaElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  // Initialize word list
  const generateWords = (lang: 'English' | 'বাংলা') => {
    const source = lang === 'English' ? ENGLISH_WORDS : BANGLA_WORDS;
    const shuffled: string[] = [];
    for (let i = 0; i < 300; i++) {
      const randWord = source[Math.floor(Math.random() * source.length)];
      shuffled.push(randWord);
    }
    setWords(shuffled);
    setWordStatuses(new Array(shuffled.length).fill('pending'));
  };

  useEffect(() => {
    generateWords(language);
    resetTest(selectedMinutes);
  }, [language]);

  // Reset test
  const resetTest = (mins = selectedMinutes) => {
    setSelectedMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
    setIsFinished(false);
    setShowCelebration(false);
    setCurrentWordIdx(0);
    setCurrentInput('');
    setFreeText('');
    setCorrectWordsCount(0);
    setErrorWordsCount(0);
    setKeystrokes(0);
    generateWords(language);

    if (mode === 'words' && inputRef.current) {
      inputRef.current.focus();
    } else if (mode === 'free' && freeTextareaRef.current) {
      freeTextareaRef.current.focus();
    }
  };

  // Timer Countdown
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          setIsFinished(true);
          setShowCelebration(true);
          soundManager.playSuccess();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Auto-scroll word container to keep active word visible
  useEffect(() => {
    if (wordsContainerRef.current) {
      const activeEl = wordsContainerRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        (activeEl as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }
  }, [currentWordIdx]);

  // Handle Guided Word Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;

    if (!isRunning) {
      setIsRunning(true);
    }

    const value = e.target.value;
    setKeystrokes((prev) => prev + 1);
    soundManager.playKeyClick();

    // Check if space was pressed (submit word)
    if (value.endsWith(' ')) {
      const trimmed = value.trim();
      if (!trimmed) {
        setCurrentInput('');
        return;
      }

      const targetWord = words[currentWordIdx];
      const isCorrect = trimmed === targetWord;

      const newStatuses = [...wordStatuses];
      newStatuses[currentWordIdx] = isCorrect ? 'correct' : 'error';
      setWordStatuses(newStatuses);

      if (isCorrect) {
        setCorrectWordsCount((prev) => prev + 1);
      } else {
        setErrorWordsCount((prev) => prev + 1);
      }

      setCurrentWordIdx((prev) => prev + 1);
      setCurrentInput('');
    } else {
      setCurrentInput(value);
    }
  };

  // Handle Free Typing Input
  const handleFreeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFinished) return;

    if (!isRunning) {
      setIsRunning(true);
    }

    const val = e.target.value;
    setFreeText(val);
    setKeystrokes((prev) => prev + 1);
    soundManager.playKeyClick();

    // Word count in free mode
    const count = val.trim() ? val.trim().split(/\s+/).length : 0;
    setCorrectWordsCount(count);
  };

  // Time & Speed Calculations
  const elapsedSeconds = Math.max(1, totalSeconds - timeLeft);
  const elapsedMinutes = elapsedSeconds / 60;
  const currentWpm = Math.max(0, Math.round(correctWordsCount / elapsedMinutes));
  const totalAttempted = correctWordsCount + errorWordsCount;
  const accuracy = totalAttempted > 0 ? Math.round((correctWordsCount / totalAttempted) * 100) : 100;

  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  // Get Speed Ranking Badge
  const getSpeedRank = (wpmScore: number) => {
    if (wpmScore >= 80) return { title: '⚡ Supersonic Speedster', color: 'text-amber-300', note: 'Top 1% Typing Elite' };
    if (wpmScore >= 60) return { title: '🔥 Rapid Pro Typist', color: 'text-[#d7ff64]', note: 'Professional Standard' };
    if (wpmScore >= 40) return { title: '🎯 Fast & Accurate', color: 'text-cyan-400', note: 'Above Average Speed' };
    if (wpmScore >= 25) return { title: '🚀 Solid Rhythm', color: 'text-emerald-400', note: 'Steady Growth' };
    return { title: '🌱 Steady Learner', color: 'text-purple-300', note: 'Keep Practicing Daily' };
  };

  const rank = getSpeedRank(currentWpm);

  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Dynamic Speech bubble text based on live performance
  const getCompanionSpeech = () => {
    if (isFinished) {
      return `🎉 "Good job! You did great work speed! Look at that amazing score of ${correctWordsCount} words!"`;
    }
    if (isRunning) {
      if (currentWpm >= 80) {
        return `⚡ "SUPERSONIC! ${currentWpm} WPM! You are an absolute typing machine!"`;
      }
      if (currentWpm >= 45) {
        return `🔥 "Awesome flow! Look at your fingers fly! Keep up this great speed!"`;
      }
      return `🚀 "Great tempo! Keep going, your fingers are finding their rhythm!"`;
    }
    return `👋 "Hi! Ready to test your speed? Pick your minute target (${selectedMinutes} min) and start typing!"`;
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[\u{1F600}-\u{1F6FF}|[\u{2600}-\u{26FF}]|[🎉⚡🔥🚀👋"]/gu, '').trim();
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.05;
      utterance.pitch = 1.15;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  useEffect(() => {
    if (isFinished) {
      speakText(`Good job! You did great work speed! You completed ${correctWordsCount} words at ${currentWpm} words per minute!`);
    }
  }, [isFinished]);

  const copyResult = () => {
    const text = `🏆 I typed ${correctWordsCount} Words in ${selectedMinutes} Minute(s) on TypeMaster!\n⚡ Speed: ${currentWpm} WPM • Accuracy: ${accuracy}%\nTry it now at http://localhost:3000`;
    navigator.clipboard.writeText(text);
    setToastMessage('✓ Result copied to clipboard!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section id="minute-speed-section" className="scroll-mt-20 space-y-6 py-[25px] overflow-hidden">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-[#d7ff64]/50 bg-[#191b17] px-5 py-3 text-sm font-semibold text-[#d7ff64] shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="h-4 w-4 text-[#d7ff64]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-4 py-1 text-xs font-bold tracking-wider text-[#d7ff64] shadow-[0_0_20px_rgba(215,255,100,0.15)]">
          <Timer className="h-3.5 w-3.5" />
          <span>MINUTE-WISE SPEED CHALLENGE • 1 MIN • 2 MIN • 3 MIN • 5 MIN</span>
        </div>

        <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
          Let&apos;s Test Your Typing <span className="text-[#d7ff64]">Word Count Speed!</span>
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-[#a4a69d]">
          Select your minute target (1, 2, 3, or 5 minutes), start typing, and discover exactly how many words
          you can complete with real-time WPM, accuracy, and live countdown!
        </p>
      </div>

      {/* 3D Animated Typing Companion Motion Showcase */}
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-[#d7ff64]/25 bg-gradient-to-br from-[#1b1f17] via-[#141612] to-[#0e100d] p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          {/* Left: 3D Character Model with Video-like Live Motion */}
          <div className="relative md:col-span-5 flex flex-col items-center justify-center">
            {/* Dynamic Speech Bubble pointing to the girl */}
            <div className="relative mb-3 w-full max-w-sm rounded-2xl border border-[#d7ff64]/40 bg-[#181c15]/95 px-4 py-3 shadow-[0_10px_25px_rgba(215,255,100,0.2)] backdrop-blur-md animate-speech-pulse">
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5 mb-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#d7ff64]">
                  <Sparkles className="h-3 w-3 text-[#d7ff64]" />
                  <span>SPEED COACH • KAMI</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = !voiceEnabled;
                    setVoiceEnabled(next);
                    if (next) speakText(getCompanionSpeech());
                  }}
                  className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold text-gray-300 hover:text-[#d7ff64] transition"
                  title={voiceEnabled ? 'Mute coach voice' : 'Enable coach voice'}
                >
                  {voiceEnabled ? <Volume2 className="h-3 w-3 text-[#d7ff64]" /> : <VolumeX className="h-3 w-3 text-gray-500" />}
                  <span>{voiceEnabled ? 'Voice ON' : 'Muted'}</span>
                </button>
              </div>

              <p className="text-xs font-semibold leading-relaxed text-white sm:text-sm">
                {getCompanionSpeech()}
              </p>

              {/* Triangle Pointer down to girl's face */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0 w-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-[#181c15]" />
            </div>

            {/* 3D Character Container with Video-like motion and floating keycaps */}
            <div className="relative flex items-center justify-center w-full max-w-[280px] sm:max-w-[340px]">
              {/* Neon Glow Pulse behind Speedometer Gauge */}
              <div className="pointer-events-none absolute left-6 top-8 h-28 w-28 rounded-full bg-[#d7ff64]/25 blur-2xl animate-neon-pulse" />

              {/* Floating Keycaps ASDF */}
              <div className="pointer-events-none absolute -left-1 top-12 flex flex-col gap-2 z-10">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#d7ff64]/50 bg-[#161814]/90 font-mono text-xs font-black text-[#d7ff64] shadow-lg animate-float-key" style={{ animationDelay: '0s' }}>
                  A
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/50 bg-[#161814]/90 font-mono text-xs font-black text-cyan-400 shadow-lg animate-float-key" style={{ animationDelay: '0.4s' }}>
                  S
                </span>
              </div>
              <div className="pointer-events-none absolute -right-1 top-16 flex flex-col gap-2 z-10">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-400/50 bg-[#161814]/90 font-mono text-xs font-black text-emerald-400 shadow-lg animate-float-key" style={{ animationDelay: '0.2s' }}>
                  D
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-400/50 bg-[#161814]/90 font-mono text-xs font-black text-amber-400 shadow-lg animate-float-key" style={{ animationDelay: '0.6s' }}>
                  F
                </span>
              </div>

              {/* 3D Character Image with Motion Layers */}
              <div className={`relative transition-transform duration-300 animate-companion-breathe ${isRunning ? 'animate-companion-hands' : ''}`}>
                <div className="animate-companion-face">
                  <img
                    src="/typing-companion.png"
                    alt="3D Animated Typing Companion Coach"
                    className="h-auto w-full max-h-[260px] sm:max-h-[300px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Live Motion Status Tag */}
              <div className="absolute -bottom-2 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#111310]/90 px-3 py-1 text-[10px] font-bold text-gray-300 backdrop-blur-md shadow-lg">
                <span className={`h-2 w-2 rounded-full ${isRunning ? 'bg-[#d7ff64] animate-ping' : 'bg-emerald-400'}`} />
                <span>{isRunning ? 'Coach Observing Live Speed ⚡' : 'Live Motion Coach Active 🎬'}</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Speed Targets & Live Challenge Highlights */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#111310]/70 p-4 backdrop-blur-sm">
              <h4 className="flex items-center gap-2 text-sm font-black text-white sm:text-base">
                <Flame className="h-4 w-4 text-[#d7ff64]" />
                <span>Target Speed Goals & Live Feedback</span>
              </h4>
              <p className="mt-1 text-xs text-gray-400">
                Kami reacts to every word you type! Test your endurance and find out how many words you can conquer before the timer reaches 0:00.
              </p>

              {/* Badges Row */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2">
                  <span className="block text-[10px] font-bold text-gray-500 uppercase">Target</span>
                  <span className="text-xs font-black text-[#d7ff64] sm:text-sm">85+ WPM</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2">
                  <span className="block text-[10px] font-bold text-gray-500 uppercase">Standard</span>
                  <span className="text-xs font-black text-cyan-400 sm:text-sm">Faster & Better</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2">
                  <span className="block text-[10px] font-bold text-gray-500 uppercase">Feedback</span>
                  <span className="text-xs font-black text-emerald-400 sm:text-sm">Real-time Voice</span>
                </div>
              </div>
            </div>

            {/* Quick Interactive Prompt */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#d7ff64]/20 bg-[#d7ff64]/5 px-4 py-2.5">
              <span className="text-xs font-bold text-gray-300">
                💡 <strong className="text-white">Pro Tip:</strong> Select your minutes below, keep your eyes on the word stream, and press SPACE after each word!
              </span>
              <button
                type="button"
                onClick={() => {
                  speakText(getCompanionSpeech());
                }}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#d7ff64] hover:underline"
              >
                <span>🔊 Hear Kami</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Challenge Console */}
      <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-[#161814] p-4 shadow-2xl transition sm:p-8">
        {/* Top Controls: Minute Selector, Language, and Mode */}
        <div className="mb-6 flex flex-col gap-4 border-b border-white/5 pb-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Responsive Duration Selector */}
          <div className="w-full lg:w-auto">
            <div className="mb-1.5 flex items-center justify-between gap-2 sm:justify-start">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                <Timer className="h-3.5 w-3.5 text-[#d7ff64]" />
                Duration Target:
              </span>
              <span className="text-[11px] font-bold text-[#d7ff64] sm:hidden">
                {selectedMinutes} {selectedMinutes === 1 ? 'Minute' : 'Minutes'}
              </span>
            </div>

            {/* Responsive grid for 1m, 2m, 3m, 5m that NEVER clips or overflows */}
            <div className="grid grid-cols-4 gap-1.5 w-full sm:flex sm:items-center sm:gap-2">
              {([1, 2, 3, 5] as MinuteOption[]).map((mins) => (
                <button
                  key={mins}
                  onClick={() => resetTest(mins)}
                  disabled={isRunning}
                  className={`rounded-xl px-2.5 sm:px-3.5 py-2 text-xs font-bold transition text-center whitespace-nowrap ${
                    selectedMinutes === mins
                      ? 'border border-[#d7ff64]/60 bg-[#d7ff64] text-[#111310] shadow-[0_0_15px_rgba(215,255,100,0.35)] font-black'
                      : 'border border-white/10 bg-[#111310] text-gray-300 hover:border-white/25 hover:text-white'
                  } disabled:opacity-50`}
                >
                  <span className="sm:hidden">{mins}m</span>
                  <span className="hidden sm:inline">{mins} {mins === 1 ? 'Minute' : 'Minutes'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Controls: Mode + Language + Reset */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 w-full lg:w-auto">
            {/* Mode Selector */}
            <div className="flex items-center rounded-xl border border-white/5 bg-[#111310] p-1">
              <button
                onClick={() => {
                  setMode('words');
                  resetTest();
                }}
                className={`rounded-lg px-2.5 sm:px-3 py-1 text-xs font-bold transition ${
                  mode === 'words' ? 'bg-[#d7ff64] text-[#111310]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Word Stream
              </button>
              <button
                onClick={() => {
                  setMode('free');
                  resetTest();
                }}
                className={`rounded-lg px-2.5 sm:px-3 py-1 text-xs font-bold transition ${
                  mode === 'free' ? 'bg-[#d7ff64] text-[#111310]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Free Typing
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center rounded-xl border border-white/5 bg-[#111310] p-1">
              {(['English', 'বাংলা'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`rounded-lg px-2.5 sm:px-3 py-1 text-xs font-bold transition ${
                    language === lang ? 'bg-[#d7ff64] text-[#111310]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Restart Button */}
            <button
              onClick={() => resetTest()}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 transition hover:border-[#d7ff64]/40 hover:text-[#d7ff64]"
              title="Restart Test"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Telemetry Bar */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {/* Time Remaining */}
          <div className="rounded-2xl border border-white/5 bg-[#111310] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              TIME REMAINING
            </span>
            <p
              className={`mt-1 font-mono text-3xl font-black ${
                timeLeft <= 10 && isRunning ? 'animate-pulse text-red-400' : 'text-[#d7ff64]'
              }`}
            >
              {formatTime(timeLeft)}
            </p>
          </div>

          {/* Words Count */}
          <div className="rounded-2xl border border-white/5 bg-[#111310] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              WORDS COMPLETED
            </span>
            <p className="mt-1 font-mono text-3xl font-black text-white">
              {correctWordsCount}
            </p>
          </div>

          {/* Live Speed (WPM) */}
          <div className="rounded-2xl border border-white/5 bg-[#111310] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              SPEED (WPM)
            </span>
            <p className="mt-1 font-mono text-3xl font-black text-cyan-400">
              {currentWpm}
            </p>
          </div>

          {/* Accuracy */}
          <div className="rounded-2xl border border-white/5 bg-[#111310] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              ACCURACY
            </span>
            <p className="mt-1 font-mono text-3xl font-black text-emerald-400">
              {accuracy}%
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#d7ff64] to-[#22c55e] transition-all duration-300"
            style={{ width: `${((totalSeconds - timeLeft) / totalSeconds) * 100}%` }}
          />
        </div>

        {/* ============================================================== */}
        {/* MODE A: WORD STREAM (Word-by-word flow)                        */}
        {/* ============================================================== */}
        {mode === 'words' && !isFinished && (
          <div className="space-y-4">
            {/* Word Display Stream Box */}
            <div
              ref={wordsContainerRef}
              className="relative max-h-40 overflow-y-auto rounded-2xl border border-white/10 bg-[#111310] p-4 text-left font-mono text-lg leading-relaxed sm:text-xl"
            >
              <div className="flex flex-wrap gap-2">
                {words.slice(0, 150).map((word, idx) => {
                  const isActive = idx === currentWordIdx;
                  const status = wordStatuses[idx];

                  let colorClass = 'text-gray-500';
                  if (status === 'correct') colorClass = 'text-emerald-400';
                  if (status === 'error') colorClass = 'text-red-400 line-through';
                  if (isActive) colorClass = 'bg-[#d7ff64]/20 text-[#d7ff64] border-b-2 border-[#d7ff64] font-bold px-1.5 rounded';

                  return (
                    <span
                      key={idx}
                      data-active={isActive ? 'true' : undefined}
                      className={`transition-colors duration-150 ${colorClass}`}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Typing Input Field */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                disabled={isFinished}
                placeholder={
                  isRunning
                    ? 'Type the word and press SPACE...'
                    : `Start typing here to begin the ${selectedMinutes}-Minute Speed Test...`
                }
                className="w-full rounded-2xl border border-white/15 bg-[#111310] px-5 py-4 font-mono text-base text-white placeholder-gray-500 shadow-inner outline-none transition focus:border-[#d7ff64] focus:ring-2 focus:ring-[#d7ff64]/30 sm:text-lg"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                SPACE to submit
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODE B: FREE TYPING (Creative / Paragraphs)                    */}
        {/* ============================================================== */}
        {mode === 'free' && !isFinished && (
          <div className="space-y-4">
            <textarea
              ref={freeTextareaRef}
              value={freeText}
              onChange={handleFreeTextChange}
              disabled={isFinished}
              placeholder={
                isRunning
                  ? 'Keep typing freely! We are tracking your live word count and WPM...'
                  : `Type any thoughts, essay, or practice sentences here. Timer will begin on your first keystroke for ${selectedMinutes} minute(s)...`
              }
              rows={8}
              className="w-full resize-y rounded-2xl border border-white/15 bg-[#111310] p-4 font-mono text-sm leading-relaxed text-white placeholder-gray-500 outline-none transition focus:border-[#d7ff64] focus:ring-2 focus:ring-[#d7ff64]/30 sm:text-base"
              spellCheck="false"
            />
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Keystrokes: <strong className="text-white">{keystrokes}</strong></span>
              <span>Words: <strong className="text-[#d7ff64]">{correctWordsCount}</strong></span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* FINISH RESULTS & SPEED CERTIFICATE                             */}
        {/* ============================================================== */}
        {isFinished && (
          <div className="animate-in fade-in zoom-in-95 rounded-2xl border border-[#d7ff64]/40 bg-[#111310] p-6 text-center shadow-[0_0_50px_rgba(215,255,100,0.15)] sm:p-8">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d7ff64]/20 text-[#d7ff64] shadow-[0_0_20px_rgba(215,255,100,0.3)]">
              <Trophy className="h-8 w-8" />
            </div>

            <span className="inline-block rounded-full bg-[#d7ff64]/10 px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-widest text-[#d7ff64]">
              {selectedMinutes}-MINUTE SPRINT COMPLETED!
            </span>

            <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
              You typed <span className="text-[#d7ff64]">{correctWordsCount} Words</span> in {selectedMinutes} {selectedMinutes === 1 ? 'Minute' : 'Minutes'}!
            </h3>

            {/* Performance Badge */}
            <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-1.5">
              <Award className={`h-4 w-4 ${rank.color}`} />
              <span className={`text-sm font-bold ${rank.color}`}>{rank.title}</span>
              <span className="text-xs text-gray-400">• {rank.note}</span>
            </div>

            {/* Detailed Stats Grid */}
            <div className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <span className="text-[10px] font-bold text-gray-400">SPEED</span>
                <p className="mt-1 font-mono text-2xl font-black text-[#d7ff64]">{currentWpm} WPM</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <span className="text-[10px] font-bold text-gray-400">WORDS</span>
                <p className="mt-1 font-mono text-2xl font-black text-white">{correctWordsCount}</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <span className="text-[10px] font-bold text-gray-400">ACCURACY</span>
                <p className="mt-1 font-mono text-2xl font-black text-cyan-400">{accuracy}%</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <span className="text-[10px] font-bold text-gray-400">KEYSTROKES</span>
                <p className="mt-1 font-mono text-2xl font-black text-emerald-400">{keystrokes}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => resetTest(selectedMinutes)}
                className="flex items-center gap-2 rounded-xl bg-[#d7ff64] px-5 py-2.5 text-xs font-black text-[#111310] shadow-[0_0_20px_rgba(215,255,100,0.3)] transition hover:bg-[#e6ff8f] sm:text-sm"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Try {selectedMinutes}-Min Sprint Again</span>
              </button>

              <button
                onClick={() => resetTest(selectedMinutes === 1 ? 2 : 1)}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 sm:text-sm"
              >
                <TrendingUp className="h-4 w-4 text-[#d7ff64]" />
                <span>Switch to {selectedMinutes === 1 ? '2 Minutes' : '1 Minute'}</span>
              </button>

              <button
                onClick={copyResult}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-gray-300 transition hover:border-[#d7ff64] hover:text-[#d7ff64] sm:text-sm"
              >
                <Copy className="h-4 w-4" />
                <span>Share Score</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Celebration Video Popup */}
      <CelebrationPopup
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        onRetry={() => resetTest(selectedMinutes)}
        wpm={currentWpm}
        words={correctWordsCount}
        accuracy={accuracy}
      />
    </section>
  );
};
