import React from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Keyboard,
  BookOpen,
  Trophy,
  History,
  Gamepad2,
  Languages,
  Timer,
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  onScrollToGrammar: () => void;
  onScrollToMinuteSpeed?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setTab,
  soundEnabled,
  toggleSound,
  onScrollToGrammar,
  onScrollToMinuteSpeed,
}) => {
  const navItems = [
    { id: 'test', label: 'Typing Test', icon: Keyboard },
    { id: 'learn', label: 'Lessons', icon: BookOpen },
    { id: 'games', label: 'Typing Games', icon: Gamepad2 },
    { id: 'history', label: 'My History', icon: History },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#111310]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {/* Full-width container */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setTab('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 transition focus:outline-none"
            title="TypeMaster Home"
          >
            <div className="relative flex items-center">
              <img
                src="/logo.png"
                alt="TypeMaster"
                className="h-12 sm:h-16 md:h-20 w-auto max-w-[240px] sm:max-w-[320px] md:max-w-[400px] object-contain transition group-hover:scale-105 drop-shadow-[0_0_24px_rgba(215,255,100,0.35)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="hidden rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-[#d7ff64] xl:inline-block">
              v2.0 AI
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1.5 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                    active
                      ? 'border border-[#d7ff64]/40 bg-[#d7ff64]/15 text-[#d7ff64] shadow-[0_0_15px_rgba(215,255,100,0.15)]'
                      : 'border border-transparent text-[#9c9e94] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-[#d7ff64]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Dual Language Indicator Badge */}
            <div className="hidden lg:flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300">
              <Languages className="h-3.5 w-3.5 text-[#d7ff64]" />
              <span>বাংলা / EN</span>
            </div>

            {/* 1-Minute Speed Challenge Quick Jump */}
            {onScrollToMinuteSpeed && (
              <button
                onClick={onScrollToMinuteSpeed}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-gray-200 transition hover:border-[#d7ff64]/40 hover:bg-[#d7ff64]/10 hover:text-[#d7ff64] sm:text-sm"
                title="Jump to 1-Minute & Custom Minute Speed Test"
              >
                <Timer className="h-3.5 w-3.5 text-[#d7ff64]" />
                <span className="hidden sm:inline">1-Min</span> Challenge
              </button>
            )}

            {/* Grammar & AI Rewriter Quick Jump Button */}
            <button
              onClick={onScrollToGrammar}
              className="flex items-center gap-2 rounded-xl border border-[#d7ff64]/50 bg-[#d7ff64]/15 px-3.5 py-2 text-xs font-bold text-[#d7ff64] shadow-[0_0_20px_rgba(215,255,100,0.2)] transition hover:bg-[#d7ff64] hover:text-[#111310] sm:text-sm"
              title="Jump to AI Grammar & Rewriter"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Grammar &</span> Rewriter
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute keyboard sound' : 'Enable keyboard click sound'}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition hover:border-[#d7ff64]/40 hover:bg-white/10 hover:text-white"
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-[#d7ff64]" />
              ) : (
                <VolumeX className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Scroller */}
      <nav className="flex gap-1.5 overflow-x-auto px-4 pb-2.5 pt-1 border-t border-white/5 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                active
                  ? 'bg-[#d7ff64] font-bold text-[#111310]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
