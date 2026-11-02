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
  Radio,
} from 'lucide-react';
import { soundManager, SwitchSoundProfile } from '../utils/sound';

interface KeyConfig {
  label: string;
  code: string; // KeyboardEvent.code or lower key for matching
  finger: string;
  wide?: boolean;
  bump?: boolean;
  spacebar?: boolean;
  extraWide?: boolean;
}

const FINGER_MAP: Record<string, { bg: string; activeBg: string; text: string; glow: string; name: string; hand: string }> = {
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

interface InteractiveRGBKeyboardProps {
  onStartSpeedWorkout?: () => void;
}

export const InteractiveRGBKeyboard: React.FC<InteractiveRGBKeyboardProps> = ({
  onStartSpeedWorkout,
}) => {
  const [activeCodes, setActiveCodes] = useState<Set<string>>(new Set());
  const [lastKeyPressed, setLastKeyPressed] = useState<{ label: string; finger: string } | null>({
    label: 'F',
    finger: 'left-index',
  });
  const [typedText, setTypedText] = useState('');
  const [soundProfile, setSoundProfile] = useState<SwitchSoundProfile>('thock');
  const [soundMuted, setSoundMuted] = useState(false);
  const [lightingMode, setLightingMode] = useState<'reactive' | 'rainbow'>('reactive');
  const [keystrokeCount, setKeystrokeCount] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Trigger key press animation and sound
  const handleTriggerKey = (code: string, label: string, finger: string) => {
    setActiveCodes((prev) => new Set(prev).add(code));

    setLastKeyPressed({ label, finger });
    setKeystrokeCount((c) => c + 1);

    if (!soundMuted) {
      soundManager.playKeyClick(soundProfile);
    }

    // Auto remove lighting after 180ms
    setTimeout(() => {
      setActiveCodes((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
    }, 180);
  };

  // Listen to physical keyboard events globally when focused on container or input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      // Find matching key in layout
      for (const row of KEYBOARD_LAYOUT) {
        const found = row.find(
          (k) =>
            k.code === code ||
            k.label.toLowerCase() === e.key.toLowerCase() ||
            (k.spacebar && e.key === ' ')
        );
        if (found) {
          handleTriggerKey(found.code, found.label, found.finger);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundProfile, soundMuted]);

  const activeFingerInfo = lastKeyPressed ? FINGER_MAP[lastKeyPressed.finger] : null;

  return (
    <section
      id="interactive-rgb-keyboard"
      className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#161814] via-[#121410] to-[#0e100c] p-4 sm:p-7 shadow-[0_10px_50px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      {/* Ambient RGB Glow in Background */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[90%] rounded-full opacity-20 blur-[90px] transition-all duration-700"
        style={{
          background:
            lightingMode === 'rainbow'
              ? 'radial-gradient(circle, rgba(215,255,100,0.8) 0%, rgba(6,182,212,0.8) 50%, rgba(217,70,239,0.8) 100%)'
              : activeFingerInfo
              ? `radial-gradient(circle, ${activeFingerInfo.glow} 0%, transparent 70%)`
              : 'radial-gradient(circle, #d7ff64 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header & Controls Bar */}
      <div className="relative mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-3 py-1 text-xs font-bold text-[#d7ff64]">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>NEON MECHANICAL TYPING SUITE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>ইন্টারঅ্যাক্টিভ কীবোর্ড চার্ট ও লাইভ আরজিবি লাইটিং</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            যেকোনো কী স্পর্শ করুন অথবা টাইপ করুন — সাথে সাথে কীবোর্ডে রঙিন আলো ও মেকানিক্যাল সাউন্ড উপভোগ করুন!
          </p>
        </div>

        {/* Switch & Audio FX Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Switch Sound Profiles */}
          <div className="flex items-center rounded-xl border border-white/10 bg-[#111310] p-1 text-xs">
            <span className="px-2 text-gray-500 font-bold hidden sm:inline text-[10px] uppercase">
              Switch:
            </span>
            <button
              onClick={() => {
                setSoundProfile('thock');
                soundManager.playKeyClick('thock');
              }}
              className={`rounded-lg px-2.5 py-1 font-bold transition ${
                soundProfile === 'thock'
                  ? 'bg-[#d7ff64] text-[#111310] shadow-[0_0_10px_rgba(215,255,100,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Creamy Thock mechanical switch"
            >
              Thock
            </button>
            <button
              onClick={() => {
                setSoundProfile('blue');
                soundManager.playKeyClick('blue');
              }}
              className={`rounded-lg px-2.5 py-1 font-bold transition ${
                soundProfile === 'blue'
                  ? 'bg-cyan-400 text-[#111310] shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Clicky Blue mechanical switch"
            >
              Clicky
            </button>
            <button
              onClick={() => {
                setSoundProfile('linear');
                soundManager.playKeyClick('linear');
              }}
              className={`rounded-lg px-2.5 py-1 font-bold transition ${
                soundProfile === 'linear'
                  ? 'bg-rose-400 text-[#111310] shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Linear Red smooth switch"
            >
              Linear
            </button>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => setSoundMuted(!soundMuted)}
            className={`flex h-8 w-8 items-center justify-center rounded-xl border transition ${
              soundMuted
                ? 'border-white/10 bg-white/5 text-gray-500'
                : 'border-[#d7ff64]/40 bg-[#d7ff64]/10 text-[#d7ff64]'
            }`}
            title={soundMuted ? 'Unmute key click sounds' : 'Mute key click sounds'}
          >
            {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Live Active Keystroke Status Banner */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/5 bg-[#111310] px-4 py-2.5 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">
            সক্রিয় কী ও আঙুল:
          </span>
          {lastKeyPressed && activeFingerInfo ? (
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d7ff64] text-[#111310] font-black text-sm shadow-[0_0_10px_rgba(215,255,100,0.5)] font-mono animate-in zoom-in duration-100">
                {lastKeyPressed.label}
              </span>
              <span className={`font-bold ${activeFingerInfo.text}`}>
                {activeFingerInfo.name}
              </span>
              <span className="hidden sm:inline-block rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-gray-400">
                {activeFingerInfo.hand}
              </span>
            </div>
          ) : (
            <span className="text-gray-500 italic">যেকোনো কী চাপুন...</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-gray-400 text-xs">
          <span>
            স্ট্রোক কাউন্টার: <strong className="font-mono text-[#d7ff64]">{keystrokeCount}</strong>
          </span>
        </div>
      </div>

      {/* Interactive RGB Keyboard Layout (Matching User's Screenshot Exactly) */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0f0c] p-3 sm:p-6 overflow-x-auto select-none shadow-inner">
        <div className="min-w-[700px] space-y-2 font-mono text-xs">
          {KEYBOARD_LAYOUT.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-1.5 justify-center">
              {row.map((k, kIdx) => {
                const fingerConfig = FINGER_MAP[k.finger];
                const isPressed = activeCodes.has(k.code);
                const isSelected = lastKeyPressed?.label === k.label;

                return (
                  <button
                    key={kIdx}
                    type="button"
                    onMouseDown={() => handleTriggerKey(k.code, k.label, k.finger)}
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
                        : isSelected
                        ? `${fingerConfig.bg} ring-2 ring-[#d7ff64]/70 brightness-125`
                        : `${fingerConfig.bg} hover:brightness-125 hover:scale-105 active:scale-95`
                    }`}
                  >
                    <span>{k.label}</span>

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

      {/* Real-time Interactive Typing Console (Type and Watch the Keyboard Glow!) */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#111310] p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold text-gray-300 flex items-center gap-2">
            <Flame className="h-4 w-4 text-[#d7ff64]" />
            <span>লাইভ টাইপিং প্লে-গ্রাউন্ড (এখানে যেকোনো কিছু লিখুন):</span>
          </label>
          <span className="text-[11px] text-gray-500">
            টাইপ করার সাথে সাথে কীবোর্ডের বাটনগুলো স্বয়ংক্রিয়ভাবে জ্বলে উঠবে ⚡
          </span>
        </div>

        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={typedText}
            onChange={(e) => {
              const val = e.target.value;
              setTypedText(val);
              if (val.length > 0) {
                const char = val[val.length - 1];
                // Trigger sound and lighting for typed char
                for (const row of KEYBOARD_LAYOUT) {
                  const match = row.find(
                    (k) =>
                      k.label.toLowerCase() === char.toLowerCase() ||
                      (k.spacebar && char === ' ')
                  );
                  if (match) {
                    handleTriggerKey(match.code, match.label, match.finger);
                    break;
                  }
                }
              }
            }}
            placeholder="Type here to test keyboard lighting and mechanical sound effects..."
            className="w-full rounded-xl border border-white/10 bg-[#161814] px-4 py-3 text-sm text-[#d7ff64] placeholder-gray-600 font-mono focus:border-[#d7ff64] focus:outline-none focus:ring-1 focus:ring-[#d7ff64]/50 shadow-inner"
          />

          {typedText && (
            <button
              onClick={() => {
                setTypedText('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 px-2 py-1 text-[10px] text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Suggestion Quick Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-500 text-[11px]">ট্রাই করুন:</span>
          {[
            'The quick brown fox jumps over the lazy dog',
            'ASDF JKL; 12345',
            'টাইপমাস্টার বাংলাদেশ',
          ].map((snippet, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTypedText(snippet);
                inputRef.current?.focus();
                // Animate sequence
                let i = 0;
                const interval = setInterval(() => {
                  if (i >= snippet.length) {
                    clearInterval(interval);
                    return;
                  }
                  const ch = snippet[i];
                  for (const row of KEYBOARD_LAYOUT) {
                    const match = row.find(
                      (k) =>
                        k.label.toLowerCase() === ch.toLowerCase() ||
                        (k.spacebar && ch === ' ')
                    );
                    if (match) {
                      handleTriggerKey(match.code, match.label, match.finger);
                      break;
                    }
                  }
                  i++;
                }, 75);
              }}
              className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-[11px] text-gray-300 hover:border-[#d7ff64]/40 hover:text-[#d7ff64] transition"
            >
              &ldquo;{snippet}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Bottom CTA to Speed Challenge */}
      {onStartSpeedWorkout && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CheckCircle2 className="h-4 w-4 text-[#d7ff64]" />
            <span>১০ আঙুলের সঠিক পজিশন মুখস্থ রাখুন এবং টাইপিং স্পিড টেস্টে নিজেকে চ্যালেঞ্জ করুন।</span>
          </div>

          <button
            onClick={onStartSpeedWorkout}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d7ff64] to-[#bbf43d] px-4 py-2 text-xs font-bold text-[#111310] shadow-[0_0_15px_rgba(215,255,100,0.3)] transition hover:scale-105 active:scale-95"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>স্পিড টেস্ট শুরু করুন 🚀</span>
          </button>
        </div>
      )}
    </section>
  );
};
