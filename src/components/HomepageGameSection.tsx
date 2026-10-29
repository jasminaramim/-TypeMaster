import React from 'react';
import {
  Gamepad2,
  Rocket,
  Flame,
  Trophy,
  Bomb,
  Zap,
  Target,
  Sparkles,
  Swords,
} from 'lucide-react';
import { TypingGames } from './TypingGames';

interface HomepageGameSectionProps {
  onStartSprint: () => void;
  onStartAccuracyChallenge: () => void;
}

export const HomepageGameSection: React.FC<HomepageGameSectionProps> = ({
  onStartSprint,
  onStartAccuracyChallenge,
}) => {
  return (
    <section id="homepage-games-section" className="relative scroll-mt-20 py-[25px] overflow-hidden">
      {/* Background Neon Aura */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(215,255,100,0.35) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Floating Gaming Icons - Left Side (Desktop) */}
      <div className="pointer-events-none absolute left-0 top-16 hidden xl:flex flex-col gap-6 z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d7ff64]/50 bg-[#161814]/95 text-[#d7ff64] shadow-[0_0_25px_rgba(215,255,100,0.35)] backdrop-blur-md animate-float-game-1">
          <Gamepad2 className="h-6 w-6" />
        </div>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/50 bg-[#161814]/95 text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.35)] backdrop-blur-md animate-float-game-2"
          style={{ animationDelay: '0.6s' }}
        >
          <Rocket className="h-5 w-5" />
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/50 bg-[#161814]/95 text-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.35)] backdrop-blur-md animate-float-game-3"
          style={{ animationDelay: '1.2s' }}
        >
          <Flame className="h-5 w-5" />
        </div>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-[#161814]/90 font-mono text-xs font-black text-white shadow-lg animate-float-key"
          style={{ animationDelay: '0.4s' }}
        >
          W
        </div>
      </div>

      {/* Floating Gaming Icons - Right Side (Desktop) */}
      <div className="pointer-events-none absolute right-0 top-16 hidden xl:flex flex-col gap-6 z-10">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/50 bg-[#161814]/95 text-purple-400 shadow-[0_0_25px_rgba(192,132,252,0.35)] backdrop-blur-md animate-float-game-2"
          style={{ animationDelay: '0.3s' }}
        >
          <Trophy className="h-6 w-6" />
        </div>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-400/50 bg-[#161814]/95 text-red-400 shadow-[0_0_25px_rgba(248,113,113,0.35)] backdrop-blur-md animate-float-game-1"
          style={{ animationDelay: '0.9s' }}
        >
          <Bomb className="h-5 w-5" />
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/50 bg-[#161814]/95 text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.35)] backdrop-blur-md animate-float-game-3"
          style={{ animationDelay: '1.5s' }}
        >
          <Zap className="h-5 w-5" />
        </div>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-[#161814]/90 font-mono text-xs font-black text-white shadow-lg animate-float-key"
          style={{ animationDelay: '0.8s' }}
        >
          D
        </div>
      </div>

      {/* Floating Pill Icons Strip on Mobile / Tablet */}
      <div className="pointer-events-none mb-3 flex items-center justify-center gap-3 xl:hidden">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d7ff64]/40 bg-[#161814] text-[#d7ff64] shadow-md animate-float-game-1">
          <Gamepad2 className="h-4 w-4" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/40 bg-[#161814] text-cyan-400 shadow-md animate-float-game-2">
          <Rocket className="h-4 w-4" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-400/40 bg-[#161814] text-amber-400 shadow-md animate-float-game-3">
          <Flame className="h-4 w-4" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-purple-400/40 bg-[#161814] text-purple-400 shadow-md animate-float-game-1">
          <Trophy className="h-4 w-4" />
        </span>
      </div>

      {/* Interactive Arcade Games Component */}
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <TypingGames
          onStartSprint={onStartSprint}
          onStartAccuracyChallenge={onStartAccuracyChallenge}
        />
      </div>
    </section>
  );
};
