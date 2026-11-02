import React, { useState, useEffect, useRef } from 'react';
import {
  Keyboard,
  Sparkles,
  Volume2,
  VolumeX,
  Zap,
  Flame,
  RotateCcw,
  Sliders,
  CheckCircle2,
  ChevronRight,
  Trophy,
  Target,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { soundManager, SwitchSoundProfile } from '../utils/sound';

interface KeyConfig {
  label: string;
  code: string;
  finger: string;
  wide?: boolean;
  bump?: boolean;
  spacebar?: boolean;
  extraWide?: boolean;
}

const FINGER_MAP: Record<
  string,
  { bg: string; activeBg: string; text: string; glow: string; name: string; hand: string }
> = {
  'left-pinky': {
    bg: 'bg-rose-500/20 border-rose-500/60 text-rose-300',
    activeBg: 'bg-rose-500 text-white border-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.9)] scale-105',
    text: 'text-rose-400',
    glow: 'rgba(244,63,94,0.6)',
    name: 'বাম হাতের কনিষ্ঠা (Left Pinky)',
    hand: 'বাম হাত',
  },
  'left-ring': {
    bg: 'bg-amber-500/20 border-amber-500/60 text-amber-300',
    activeBg: 'bg-amber-500 text-white border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.9)] scale-105',
    text: 'text-amber-400',
    glow: 'rgba(245,158,11,0.6)',
    name: 'বাম হাতের অনামিকা (Left Ring)',
    hand: 'বাম হাত',
  },
  'left-middle': {
    bg: 'bg-yellow-500/20 border-yellow-500/60 text-yellow-300',
    activeBg: 'bg-yellow-400 text-black border-yellow-200 shadow-[0_0_25px_rgba(234,179,8,0.9)] scale-105',
    text: 'text-yellow-400',
    glow: 'rgba(234,179,8,0.6)',
    name: 'বাম হাতের মধ্যমা (Left Middle)',
    hand: 'বাম হাত',
  },
  'left-index': {
    bg: 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300',
    activeBg: 'bg-emerald-500 text-white border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.9)] scale-105',
    text: 'text-emerald-400',
    glow: 'rgba(16,185,129,0.6)',
    name: 'বাম হাতের তর্জনী (Left Index)',
    hand: 'বাম হাত',
  },
  'right-index': {
    bg: 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300',
    activeBg: 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.9)] scale-105',
    text: 'text-cyan-400',
    glow: 'rgba(6,182,212,0.6)',
    name: 'ডান হাতের তর্জনী (Right Index)',
    hand: 'ডান হাত',
  },
  'right-middle': {
    bg: 'bg-sky-500/20 border-sky-500/60 text-sky-300',
    activeBg: 'bg-sky-500 text-white border-sky-300 shadow-[0_0_25px_rgba(14,165,233,0.9)] scale-105',
    text: 'text-sky-400',
    glow: 'rgba(14,165,233,0.6)',
    name: 'ডান হাতের মধ্যমা (Right Middle)',
    hand: 'ডান হাত',
  },
  'right-ring': {
    bg: 'bg-purple-500/20 border-purple-500/60 text-purple-300',
    activeBg: 'bg-purple-500 text-white border-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.9)] scale-105',
    text: 'text-purple-400',
    glow: 'rgba(168,85,247,0.6)',
    name: 'ডান হাতের অনামিকা (Right Ring)',
    hand: 'ডান হাত',
  },
  'right-pinky': {
    bg: 'bg-fuchsia-500/20 border-fuchsia-500/60 text-fuchsia-300',
    activeBg: 'bg-fuchsia-500 text-white border-fuchsia-300 shadow-[0_0_25px_rgba(217,70,239,0.9)] scale-105',
    text: 'text-fuchsia-400',
    glow: 'rgba(217,70,239,0.6)',
    name: 'ডান হাতের কনিষ্ঠা (Right Pinky)',
    hand: 'ডান হাত',
  },
  thumbs: {
    bg: 'bg-[#d7ff64]/20 border-[#d7ff64]/60 text-[#d7ff64]',
    activeBg: 'bg-[#d7ff64] text-[#111310] border-white shadow-[0_0_35px_rgba(215,255,100,1)] scale-[1.02]',
    text: 'text-[#d7ff64]',
    glow: 'rgba(215,255,100,0.8)',
    name: 'উভয় হাতের বৃদ্ধাঙ্গুল (Both Thumbs)',
    hand: 'উভয় হাত',
  },
};

const KEYBOARD_LAYOUT: KeyConfig[][] = [
  [
    { label: '`', code: 'Backquote', finger: 'left-pinky' },
    { label: '1', code: 'Digit1', finger: 'left-pinky' },
    { label: '2', code: 'Digit2', finger: 'left-ring' },
    { label: '3', code: 'Digit3', finger: 'left-middle' },
    { label: '4', code: 'Digit4', finger: 'left-index' },
    { label: '5', code: 'Digit5', finger: 'left-index' },
    { label: '6', code: 'Digit6', finger: 'right-index' },
    { label: '7', code: 'Digit7', finger: 'right-index' },
    { label: '8', code: 'Digit8', finger: 'right-middle' },
    { label: '9', code: 'Digit9', finger: 'right-ring' },
    { label: '0', code: 'Digit0', finger: 'right-pinky' },
    { label: '-', code: 'Minus', finger: 'right-pinky' },
    { label: '=', code: 'Equal', finger: 'right-pinky' },
    { label: 'Backspace', code: 'Backspace', finger: 'right-pinky', wide: true },
  ],
  [
    { label: 'Tab', code: 'Tab', finger: 'left-pinky', wide: true },
    { label: 'Q', code: 'KeyQ', finger: 'left-pinky' },
    { label: 'W', code: 'KeyW', finger: 'left-ring' },
    { label: 'E', code: 'KeyE', finger: 'left-middle' },
    { label: 'R', code: 'KeyR', finger: 'left-index' },
    { label: 'T', code: 'KeyT', finger: 'left-index' },
    { label: 'Y', code: 'KeyY', finger: 'right-index' },
    { label: 'U', code: 'KeyU', finger: 'right-index' },
    { label: 'I', code: 'KeyI', finger: 'right-middle' },
    { label: 'O', code: 'KeyO', finger: 'right-ring' },
    { label: 'P', code: 'KeyP', finger: 'right-pinky' },
    { label: '[', code: 'BracketLeft', finger: 'right-pinky' },
    { label: ']', code: 'BracketRight', finger: 'right-pinky' },
    { label: '\\', code: 'Backslash', finger: 'right-pinky' },
  ],
  [
    { label: 'Caps', code: 'CapsLock', finger: 'left-pinky', wide: true },
    { label: 'A', code: 'KeyA', finger: 'left-pinky' },
    { label: 'S', code: 'KeyS', finger: 'left-ring' },
    { label: 'D', code: 'KeyD', finger: 'left-middle' },
    { label: 'F', code: 'KeyF', finger: 'left-index', bump: true },
    { label: 'G', code: 'KeyG', finger: 'left-index' },
    { label: 'H', code: 'KeyH', finger: 'right-index' },
    { label: 'J', code: 'KeyJ', finger: 'right-index', bump: true },
    { label: 'K', code: 'KeyK', finger: 'right-middle' },
    { label: 'L', code: 'KeyL', finger: 'right-ring' },
    { label: ';', code: 'Semicolon', finger: 'right-pinky' },
    { label: "'", code: 'Quote', finger: 'right-pinky' },
    { label: 'Enter', code: 'Enter', finger: 'right-pinky', wide: true },
  ],
  [
    { label: 'Shift', code: 'ShiftLeft', finger: 'left-pinky', extraWide: true },
    { label: 'Z', code: 'KeyZ', finger: 'left-pinky' },
    { label: 'X', code: 'KeyX', finger: 'left-ring' },
    { label: 'C', code: 'KeyC', finger: 'left-middle' },
    { label: 'V', code: 'KeyV', finger: 'left-index' },
    { label: 'B', code: 'KeyB', finger: 'left-index' },
    { label: 'N', code: 'KeyN', finger: 'right-index' },
    { label: 'M', code: 'KeyM', finger: 'right-index' },
    { label: ',', code: 'Comma', finger: 'right-middle' },
    { label: '.', code: 'Period', finger: 'right-ring' },
    { label: '/', code: 'Slash', finger: 'right-pinky' },
    { label: 'Shift', code: 'ShiftRight', finger: 'right-pinky', extraWide: true },
  ],
  [
    {
      label: 'Spacebar (উভয় হাতের বৃদ্ধাঙ্গুল / Both Thumbs)',
      code: 'Space',
      finger: 'thumbs',
      spacebar: true,
    },
  ],
];

interface PracticePrompt {
  id: string;
  category: 'Pangram' | 'Home Row' | 'Speed Quote' | 'Bengali Avro';
  title: string;
  text: string;
}

const PRACTICE_PROMPTS: PracticePrompt[] = [
  {
    id: 'pangram-1',
    category: 'Pangram',
    title: 'The Quick Brown Fox (সবগুলো ইংরেজি অক্ষর)',
    text: 'the quick brown fox jumps over the lazy dog',
  },
  {
    id: 'home-row-1',
    category: 'Home Row',
    title: 'Home Row Drill (মূল আঙুল পজিশন ASDF JKL;)',
    text: 'asdf jkl; asdf jkl; all fall asks salad flask',
  },
  {
    id: 'speed-1',
    category: 'Speed Quote',
    title: 'Muscle Memory Master (দক্ষতার মূল সূত্র)',
    text: 'practice makes a master typist with steady rhythm and focus',
  },
  {
    id: 'pangram-2',
    category: 'Pangram',
    title: 'Five Dozen Liquor Jugs (চ্যালেঞ্জ প্যানগ্রাম)',
    text: 'pack my box with five dozen liquor jugs quickly',
  },
  {
    id: 'bengali-1',
    category: 'Bengali Avro',
    title: 'বাংলা ফনেটিক (জাতীয় সঙ্গীত লাইন)',
    text: 'amar shonar bangla ami tomay bhalobashi',
  },
  {
    id: 'bengali-2',
    category: 'Bengali Avro',
    title: 'টাইপিং স্পিড গাইডলাইন',
    text: 'shothik angul babohar kore druto type korun',
  },
];

interface InteractiveRGBKeyboardProps {
  onStartSpeedWorkout?: () => void;
}

export const InteractiveRGBKeyboard: React.FC<InteractiveRGBKeyboardProps> = ({
  onStartSpeedWorkout,
}) => {
  // Practice Prompts State
  const [promptIndex, setPromptIndex] = useState(0);
  const currentPrompt = PRACTICE_PROMPTS[promptIndex];
  const targetText = currentPrompt.text;

  // Typing tracking state
  const [typedInput, setTypedInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Active Key Effects
  const [activeCodes, setActiveCodes] = useState<Set<string>>(new Set());
  const [lastKeyPressed, setLastKeyPressed] = useState<{ label: string; finger: string } | null>({
    label: 'F',
    finger: 'left-index',
  });

  // Sound & Switch settings
  const [soundProfile, setSoundProfile] = useState<SwitchSoundProfile>('thock');
  const [soundMuted, setSoundMuted] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'guided' | 'free'>('guided');
  const [freeText, setFreeText] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  // Determine the NEXT character that needs to be typed
  const nextTargetChar =
    typedInput.length < targetText.length ? targetText[typedInput.length] : null;

  // Find which key config on keyboard corresponds to a char
  const findKeyForChar = (char: string | null): KeyConfig | null => {
    if (!char) return null;
    for (const row of KEYBOARD_LAYOUT) {
      for (const k of row) {
        if (k.spacebar && char === ' ') return k;
        if (k.label.toLowerCase() === char.toLowerCase()) return k;
      }
    }
    return null;
  };

  const nextTargetKeyConfig = findKeyForChar(nextTargetChar);
  const nextTargetFinger = nextTargetKeyConfig ? FINGER_MAP[nextTargetKeyConfig.finger] : null;

  // Trigger sound and key flash animation
  const handleTriggerKey = (code: string, label: string, finger: string, isError = false) => {
    setActiveCodes((prev) => new Set(prev).add(code));
    setLastKeyPressed({ label, finger });

    if (!soundMuted) {
      if (isError) {
        soundManager.playError();
      } else {
        soundManager.playKeyClick(soundProfile);
      }
    }

    setTimeout(() => {
      setActiveCodes((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
    }, 180);
  };

  // Reset current sentence practice
  const handleResetPrompt = () => {
    setTypedInput('');
    setStartTime(null);
    setErrorCount(0);
    setIsCompleted(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Change to another sentence prompt
  const handleSelectPrompt = (index: number) => {
    setPromptIndex(index);
    setTypedInput('');
    setStartTime(null);
    setErrorCount(0);
    setIsCompleted(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Handle typing input
  const handleInputKeystroke = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (practiceMode === 'free') {
      const val = e.target.value;
      setFreeText(val);
      if (val.length > 0) {
        const char = val[val.length - 1];
        const kConfig = findKeyForChar(char);
        if (kConfig) {
          handleTriggerKey(kConfig.code, kConfig.label, kConfig.finger);
        }
      }
      return;
    }

    if (isCompleted) return;

    const val = e.target.value;
    if (val.length < typedInput.length) {
      // User pressed Backspace
      setTypedInput(val);
      return;
    }

    if (!startTime) {
      setStartTime(Date.now());
    }

    const typedChar = val[val.length - 1];
    const expectedChar = targetText[typedInput.length];

    const kConfig = findKeyForChar(typedChar);

    if (typedChar === expectedChar) {
      // Correct character typed
      if (kConfig) {
        handleTriggerKey(kConfig.code, kConfig.label, kConfig.finger, false);
      }
      const updated = typedInput + typedChar;
      setTypedInput(updated);

      if (updated.length === targetText.length) {
        setIsCompleted(true);
        if (!soundMuted) soundManager.playSuccess();
      }
    } else {
      // Wrong character typed
      setErrorCount((prev) => prev + 1);
      if (kConfig) {
        handleTriggerKey(kConfig.code, kConfig.label, kConfig.finger, true);
      } else {
        if (!soundMuted) soundManager.playError();
      }
    }
  };

  // Calculate live metrics
  const elapsedMinutes = startTime ? Math.max(0.01, (Date.now() - startTime) / 60000) : 0;
  const currentWpm =
    startTime && typedInput.length > 0
      ? Math.round(typedInput.length / 5 / elapsedMinutes)
      : 0;

  const currentAccuracy =
    typedInput.length + errorCount > 0
      ? Math.max(0, Math.round((typedInput.length / (typedInput.length + errorCount)) * 100))
      : 100;

  const progressPercent = Math.min(
    100,
    Math.round((typedInput.length / targetText.length) * 100)
  );

  return (
    <section
      id="interactive-rgb-keyboard"
      onClick={() => inputRef.current?.focus()}
      className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#161814] via-[#121410] to-[#0e100c] p-4 sm:p-7 shadow-[0_10px_50px_rgba(0,0,0,0.6)] overflow-hidden transition cursor-text"
    >
      {/* Dynamic Background Backlight Glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[90%] rounded-full opacity-20 blur-[90px] transition-all duration-700"
        style={{
          background: nextTargetFinger
            ? `radial-gradient(circle, ${nextTargetFinger.glow} 0%, transparent 70%)`
            : 'radial-gradient(circle, #d7ff64 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Top Header & Settings Controls */}
      <div className="relative mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-3 py-1 text-xs font-bold text-[#d7ff64]">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>INTERACTIVE FOLLOW-ALONG KEYBOARD</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>নিচের টেক্সট দেখে দেখে কীবোর্ডে টাইপ করুন</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            প্রতিটি অক্ষর টাইপ করার সাথে সাথে কীবোর্ডে লাইভ আলো জ্বলবে এবং মেকানিক্যাল সুইচ সাউন্ড হবে ⚡
          </p>
        </div>

        {/* Switch Profile & Audio Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center rounded-xl border border-white/10 bg-[#111310] p-1 text-xs">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPracticeMode('guided');
                handleResetPrompt();
              }}
              className={`rounded-lg px-3 py-1 font-bold transition flex items-center gap-1.5 ${
                practiceMode === 'guided'
                  ? 'bg-[#d7ff64] text-[#111310] shadow-[0_0_10px_rgba(215,255,100,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Target className="h-3.5 w-3.5" />
              <span>অনুশীলন বাক্য</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPracticeMode('free');
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              className={`rounded-lg px-3 py-1 font-bold transition flex items-center gap-1.5 ${
                practiceMode === 'free'
                  ? 'bg-[#d7ff64] text-[#111310] shadow-[0_0_10px_rgba(215,255,100,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              <span>ফ্রি টাইপিং</span>
            </button>
          </div>

          {/* Mechanical Sound Switch Profile */}
          <div className="flex items-center rounded-xl border border-white/10 bg-[#111310] p-1 text-xs">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSoundProfile('thock');
                soundManager.playKeyClick('thock');
              }}
              className={`rounded-lg px-2.5 py-1 font-bold transition ${
                soundProfile === 'thock'
                  ? 'bg-amber-400 text-black shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Creamy Thock sound"
            >
              Thock
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSoundProfile('blue');
                soundManager.playKeyClick('blue');
              }}
              className={`rounded-lg px-2.5 py-1 font-bold transition ${
                soundProfile === 'blue'
                  ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Clicky Blue switch sound"
            >
              Clicky
            </button>
          </div>

          {/* Sound Mute */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSoundMuted(!soundMuted);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-xl border transition ${
              soundMuted
                ? 'border-white/10 bg-white/5 text-gray-500'
                : 'border-[#d7ff64]/40 bg-[#d7ff64]/10 text-[#d7ff64]'
            }`}
            title={soundMuted ? 'Unmute key sounds' : 'Mute key sounds'}
          >
            {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🎯 TARGET TEXT PROMPT DISPLAY CARD (যেটা দেখে দেখে ইউজার টাইপ করবে)       */}
      {/* ========================================================================= */}
      {practiceMode === 'guided' && (
        <div className="relative mb-5 rounded-2xl border border-white/10 bg-[#111310] p-5 shadow-2xl">
          {/* Top Bar of Prompt: Category Selector & Live Stats */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3.5 mb-4">
            {/* Prompt Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mr-1">
                বাক্য নির্বাচন:
              </span>
              {PRACTICE_PROMPTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPrompt(idx);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    promptIndex === idx
                      ? 'bg-[#d7ff64] text-[#111310] font-bold shadow-[0_0_12px_rgba(215,255,100,0.3)]'
                      : 'border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  #{idx + 1} {p.category}
                </button>
              ))}
            </div>

            {/* Live Telemetry Chips */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1 text-gray-300">
                <span className="text-gray-500 text-[10px] uppercase">গতি:</span>
                <strong className="text-[#d7ff64] font-bold text-sm">{currentWpm} WPM</strong>
              </div>
              <span className="text-gray-700">•</span>
              <div className="flex items-center gap-1 text-gray-300">
                <span className="text-gray-500 text-[10px] uppercase">নির্ভুলতা:</span>
                <strong className="text-cyan-400 font-bold text-sm">{currentAccuracy}%</strong>
              </div>
              <span className="text-gray-700">•</span>
              <div className="flex items-center gap-1 text-gray-300">
                <span className="text-gray-500 text-[10px] uppercase">অগ্রগতি:</span>
                <strong className="text-white font-bold">{progressPercent}%</strong>
              </div>
            </div>
          </div>

          {/* Prompt Title */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="font-semibold text-gray-300">
              {currentPrompt.title}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleResetPrompt();
              }}
              className="flex items-center gap-1 text-gray-400 hover:text-[#d7ff64] transition"
              title="Reset current sentence"
            >
              <RotateCcw className="h-3 w-3" />
              <span>রিসেট (Reset)</span>
            </button>
          </div>

          {/* THE CHARACTER-BY-CHARACTER TARGET STREAM */}
          <div className="relative rounded-xl border border-white/5 bg-[#141612] p-4 text-base sm:text-xl font-mono leading-relaxed select-none tracking-wide min-h-[70px] flex items-center flex-wrap">
            {targetText.split('').map((char, index) => {
              const isTyped = index < typedInput.length;
              const isCurrent = index === typedInput.length;
              const isCorrect = isTyped && typedInput[index] === char;

              if (isTyped) {
                return (
                  <span
                    key={index}
                    className={
                      isCorrect
                        ? 'text-[#d7ff64] font-extrabold underline decoration-[#d7ff64]/50'
                        : 'text-rose-400 bg-rose-500/20 underline decoration-rose-400 font-bold'
                    }
                  >
                    {char === ' ' ? '␣' : char}
                  </span>
                );
              }

              if (isCurrent) {
                return (
                  <span
                    key={index}
                    className="relative mx-0.5 rounded px-1.5 py-0.5 bg-[#d7ff64] text-[#111310] font-black shadow-[0_0_18px_rgba(215,255,100,0.9)] animate-pulse"
                  >
                    {char === ' ' ? '␣' : char}
                  </span>
                );
              }

              return (
                <span key={index} className="text-gray-500">
                  {char}
                </span>
              );
            })}
          </div>

          {/* Sentence Completion Banner */}
          {isCompleted && (
            <div className="mt-4 rounded-xl border border-[#d7ff64]/30 bg-[#d7ff64]/10 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <Trophy className="h-5 w-5 text-[#d7ff64]" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  🎉 অসাধারণ! বাক্যটি সম্পূর্ণ হয়েছে! গতি:{' '}
                  <strong className="text-[#d7ff64]">{currentWpm} WPM</strong> • নির্ভুলতা:{' '}
                  <strong className="text-cyan-400">{currentAccuracy}%</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResetPrompt();
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10"
                >
                  আবার করুন ↺
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextIdx = (promptIndex + 1) % PRACTICE_PROMPTS.length;
                    handleSelectPrompt(nextIdx);
                  }}
                  className="rounded-lg bg-[#d7ff64] px-3.5 py-1.5 text-xs font-bold text-[#111310] hover:bg-[#e6ff8f] flex items-center gap-1 shadow-[0_0_10px_rgba(215,255,100,0.3)]"
                >
                  <span>পরবর্তী বাক্য</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Next Key Guidance Bar */}
          {!isCompleted && nextTargetKeyConfig && nextTargetFinger && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-medium">পরবর্তী কী চাপুন:</span>
                <span className="rounded-md border border-[#d7ff64] bg-[#d7ff64]/20 px-2.5 py-0.5 font-mono font-black text-[#d7ff64] text-sm shadow-[0_0_10px_rgba(215,255,100,0.3)]">
                  {nextTargetKeyConfig.spacebar ? 'Spacebar (স্পেস)' : nextTargetKeyConfig.label}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">প্রস্তাবিত আঙুল:</span>
                <span className={`font-bold ${nextTargetFinger.text}`}>
                  {nextTargetFinger.name}
                </span>
              </div>
              <span className="text-[11px] text-gray-500 italic">
                (কীবোর্ডে সবুজ আভা লক্ষ্য করুন)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Free Typing Playground mode if selected */}
      {practiceMode === 'free' && (
        <div className="mb-5 rounded-2xl border border-white/10 bg-[#111310] p-4 space-y-2">
          <label className="text-xs font-bold text-gray-300 flex items-center gap-2">
            <Flame className="h-4 w-4 text-[#d7ff64]" />
            <span>ফ্রি টাইপিং মোড (এখানে যেকোনো কিছু লিখুন):</span>
          </label>
          <input
            type="text"
            value={freeText}
            onChange={(e) => {
              setFreeText(e.target.value);
              const char = e.target.value.slice(-1);
              const k = findKeyForChar(char);
              if (k) handleTriggerKey(k.code, k.label, k.finger);
            }}
            placeholder="Type anything here freely to watch the keys ignite..."
            className="w-full rounded-xl border border-white/10 bg-[#161814] px-4 py-3 text-sm text-[#d7ff64] font-mono focus:border-[#d7ff64] focus:outline-none"
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* ⌨️ INTERACTIVE RGB KEYBOARD WITH TARGET BEACON LIGHTING                    */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0f0c] p-3 sm:p-6 overflow-x-auto select-none shadow-inner">
        <div className="min-w-[700px] space-y-2 font-mono text-xs">
          {KEYBOARD_LAYOUT.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-1.5 justify-center">
              {row.map((k, kIdx) => {
                const fingerConfig = FINGER_MAP[k.finger];
                const isPressed = activeCodes.has(k.code);
                const isNextTarget =
                  practiceMode === 'guided' &&
                  !isCompleted &&
                  nextTargetKeyConfig?.code === k.code;

                return (
                  <button
                    key={kIdx}
                    type="button"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      // Trigger click simulation
                      handleTriggerKey(k.code, k.label, k.finger);
                      if (practiceMode === 'guided' && !isCompleted) {
                        const expected = targetText[typedInput.length];
                        const clickedChar = k.spacebar ? ' ' : k.label.toLowerCase();
                        if (clickedChar === expected.toLowerCase()) {
                          const updated = typedInput + expected;
                          setTypedInput(updated);
                          if (updated.length === targetText.length) {
                            setIsCompleted(true);
                            if (!soundMuted) soundManager.playSuccess();
                          }
                        } else {
                          setErrorCount((c) => c + 1);
                        }
                      }
                      inputRef.current?.focus();
                    }}
                    className={`relative flex items-center justify-center rounded-lg border font-bold transition-all duration-75 cursor-pointer outline-none ${
                      k.spacebar
                        ? 'w-full py-3 max-w-lg text-xs tracking-wide'
                        : k.extraWide
                        ? 'px-4 py-2.5 min-w-[65px] text-[11px]'
                        : k.wide
                        ? 'px-3 py-2.5 min-w-[52px] text-[11px]'
                        : 'h-10 w-10 sm:h-11 sm:w-11 text-xs sm:text-sm'
                    } ${
                      isPressed
                        ? fingerConfig.activeBg
                        : isNextTarget
                        ? `${fingerConfig.bg} ring-2 ring-[#d7ff64] shadow-[0_0_20px_rgba(215,255,100,0.8)] scale-110 z-20 brightness-150 animate-pulse`
                        : `${fingerConfig.bg} hover:brightness-125 hover:scale-105 active:scale-95`
                    }`}
                  >
                    <span>{k.label}</span>

                    {/* Next Key Badge indicator */}
                    {isNextTarget && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d7ff64] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d7ff64]" />
                      </span>
                    )}

                    {/* F and J Tactile Bump Guides */}
                    {k.bump && (
                      <span className="absolute bottom-1 h-0.5 w-3.5 rounded-full bg-white opacity-90 shadow-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Hidden Focus Input for seamless physical typing anywhere in section */}
      <input
        ref={inputRef}
        type="text"
        value={practiceMode === 'guided' ? typedInput : freeText}
        onChange={handleInputKeystroke}
        className="opacity-0 absolute -z-10 h-0 w-0 pointer-events-none"
        aria-hidden="true"
        autoFocus
      />

      {/* Bottom CTA to Speed Challenge */}
      {onStartSpeedWorkout && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CheckCircle2 className="h-4 w-4 text-[#d7ff64]" />
            <span>
              কীবোর্ডে না তাকিয়ে স্ক্রিনে বাক্য দেখে টাইপ করার অভ্যাস করুন। নিয়মিত অনুশীলনে গতি বাড়বে!
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartSpeedWorkout();
            }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d7ff64] to-[#bbf43d] px-4 py-2 text-xs font-bold text-[#111310] shadow-[0_0_15px_rgba(215,255,100,0.3)] transition hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>১-মিনিট স্পিড টেস্ট শুরু করুন 🚀</span>
          </button>
        </div>
      )}
    </section>
  );
};
