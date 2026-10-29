import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TypingTest } from './components/TypingTest';
import { LearningCenter } from './components/LearningCenter';
import { TypingGames } from './components/TypingGames';
import { HistoryView } from './components/HistoryView';
import { LeaderboardView } from './components/LeaderboardView';
import { GrammarSection } from './components/GrammarSection';
import { Footer } from './components/Footer';
import { TestResult } from './types';
import { soundManager } from './utils/sound';

export default function App() {
  const [tab, setTab] = useState<'test' | 'learn' | 'games' | 'history' | 'leaderboard'>('test');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [history, setHistory] = useState<TestResult[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('typemaster-history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch {
      setHistory([]);
    }
    setLoaded(true);
  }, []);

  const handleTestComplete = (newResult: TestResult) => {
    setHistory((prev) => {
      const updated = [newResult, ...prev].slice(0, 50);
      try {
        localStorage.setItem('typemaster-history', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('typemaster-history');
    } catch {}
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setEnabled(next);
  };

  const scrollToGrammar = () => {
    // If not on test tab, switch to test tab first
    if (tab !== 'test') {
      setTab('test');
    }
    setTimeout(() => {
      const section = document.getElementById('grammar-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const scrollToTypingConsole = () => {
    if (tab !== 'test') {
      setTab('test');
    }
    setTimeout(() => {
      const section = document.getElementById('typing-console');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        const textarea = section.querySelector('textarea');
        if (textarea) {
          textarea.focus();
        }
      }
    }, 100);
  };

  const bestWpm = history.length ? Math.max(...history.map((h) => h.wpm)) : 0;
  const averageWpm = history.length
    ? Math.round(history.reduce((acc, curr) => acc + curr.wpm, 0) / history.length)
    : 0;

  return (
    <div className="min-h-screen bg-[#111310] text-[#eeeeea] flex flex-col selection:bg-[#d7ff64] selection:text-[#111310]">
      {/* Top Header */}
      <Header
        currentTab={tab}
        setTab={(t) => setTab(t as any)}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        onScrollToGrammar={scrollToGrammar}
      />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {tab === 'test' && (
          <div className="space-y-16">
            <HeroSection
              onStartTyping={scrollToTypingConsole}
              onScrollToGrammar={scrollToGrammar}
            />

            <TypingTest
              onTestComplete={handleTestComplete}
              bestWpm={bestWpm}
              averageWpm={averageWpm}
              totalTests={history.length}
              onScrollToGrammar={scrollToGrammar}
            />

            {/* Separator Accent Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#111310] px-4 text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                  ✦ Integrated AI Writing Tools ✦
                </span>
              </div>
            </div>

            {/* Grammar Checker & AI Text Rewriter Section */}
            <GrammarSection />
          </div>
        )}

        {tab === 'learn' && <LearningCenter />}

        {tab === 'games' && (
          <TypingGames
            onStartSprint={() => {
              setTab('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartAccuracyChallenge={() => {
              setTab('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {tab === 'history' && (
          <HistoryView history={history} onClearHistory={handleClearHistory} />
        )}

        {tab === 'leaderboard' && (
          <LeaderboardView userBestWpm={bestWpm} />
        )}
      </main>

      {/* Footer */}
      <Footer onScrollToGrammar={scrollToGrammar} setTab={(t) => setTab(t as any)} />
    </div>
  );
}
