import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MinuteSpeedChallenge } from './components/MinuteSpeedChallenge';
import { InteractiveRGBKeyboard } from './components/InteractiveRGBKeyboard';
import { TypingTest } from './components/TypingTest';
import { GrammarSection } from './components/GrammarSection';
import { LearningCenter } from './components/LearningCenter';
import { TypingGames } from './components/TypingGames';
import { HomepageGameSection } from './components/HomepageGameSection';
import { HistoryView } from './components/HistoryView';
import { TypingGuidesSection } from './components/TypingGuidesSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PolicyModals, PolicyModalType } from './components/PolicyModals';
import {
  PrivacyPolicyPage,
  TermsOfServicePage,
  AboutPage,
  ContactPage,
} from './components/LegalPages';
import { NotFoundPage } from './components/NotFoundPage';
import { CookieConsent } from './components/CookieConsent';
import { Footer } from './components/Footer';
import { TestResult } from './types';
import { soundManager } from './utils/sound';

export type RouteTab =
  | 'test'
  | 'grammar'
  | 'learn'
  | 'guides'
  | 'games'
  | 'history'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'about'
  | 'contact'
  | 'not-found';

function getRouteFromPath(pathname: string): { tab: RouteTab; canonicalPath: string } {
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/test' || clean === '/speed-test') {
    return { tab: 'test', canonicalPath: '/' };
  }
  if (clean === '/grammar' || clean === '/ai-grammar' || clean === '/rewrite') {
    return { tab: 'grammar', canonicalPath: '/grammar' };
  }
  if (clean === '/lessons' || clean === '/learn') {
    return { tab: 'learn', canonicalPath: '/lessons' };
  }
  if (clean === '/guides' || clean === '/typing-guides') {
    return { tab: 'guides', canonicalPath: '/guides' };
  }
  if (clean === '/games' || clean === '/arcade') {
    return { tab: 'games', canonicalPath: '/games' };
  }
  if (clean === '/history' || clean === '/analytics') {
    return { tab: 'history', canonicalPath: '/history' };
  }
  if (clean === '/privacy' || clean === '/privacy-policy') {
    return { tab: 'privacy-policy', canonicalPath: '/privacy-policy' };
  }
  if (clean === '/terms' || clean === '/terms-of-service' || clean === '/terms-and-conditions') {
    return { tab: 'terms-of-service', canonicalPath: '/terms-of-service' };
  }
  if (clean === '/about' || clean === '/about-us') {
    return { tab: 'about', canonicalPath: '/about' };
  }
  if (clean === '/contact' || clean === '/contact-us') {
    return { tab: 'contact', canonicalPath: '/contact' };
  }

  return { tab: 'not-found', canonicalPath: clean };
}

export default function App() {
  const [tab, setTab] = useState<RouteTab>(() => {
    if (typeof window !== 'undefined') {
      return getRouteFromPath(window.location.pathname).tab;
    }
    return 'test';
  });

  const [policyModal, setPolicyModal] = useState<PolicyModalType>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [history, setHistory] = useState<TestResult[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Navigate function that supports HTML5 pushState
  const navigateTo = useCallback((targetPath: string) => {
    const { tab: newTab, canonicalPath } = getRouteFromPath(targetPath);
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== canonicalPath) {
        window.history.pushState({}, '', canonicalPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTab(newTab);
  }, []);

  // Listen to browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const { tab: popTab } = getRouteFromPath(window.location.pathname);
      setTab(popTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document title and meta based on current route
  useEffect(() => {
    if (typeof document === 'undefined') return;

    switch (tab) {
      case 'grammar':
        document.title = 'AI Grammar Checker & Text Rewriter — TypeMaster';
        break;
      case 'learn':
        document.title = 'Touch Typing Lessons & Key Row Drills — TypeMaster';
        break;
      case 'guides':
        document.title = 'Typing Guides, Speed Tips & Bangla Conjunct Rules — TypeMaster';
        break;
      case 'games':
        document.title = 'Typing Arcade Arena (9 Games) — TypeMaster';
        break;
      case 'history':
        document.title = 'My Typing Telemetry & Speed Records — TypeMaster';
        break;
      case 'privacy-policy':
        document.title = 'Privacy Policy — TypeMaster';
        break;
      case 'terms-of-service':
        document.title = 'Terms of Service — TypeMaster';
        break;
      case 'about':
        document.title = 'About Us & Creator Profile — TypeMaster';
        break;
      case 'contact':
        document.title = 'Contact Support & Feedback — TypeMaster';
        break;
      case 'not-found':
        document.title = 'Page Not Found (404) — TypeMaster';
        break;
      case 'test':
      default:
        document.title = 'TypeMaster — Typing Practice & AI Grammar Rewriter';
        break;
    }
  }, [tab]);

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

  const scrollToTypingConsole = () => {
    if (tab !== 'test') {
      navigateTo('/');
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

  const scrollToMinuteSpeed = () => {
    if (tab !== 'test') {
      navigateTo('/');
    }
    setTimeout(() => {
      const section = document.getElementById('minute-speed-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        const input = section.querySelector('input') || section.querySelector('textarea');
        if (input) {
          (input as HTMLInputElement).focus();
        }
      }
    }, 100);
  };

  const bestWpm = history.length ? Math.max(...history.map((h) => h.wpm)) : 0;
  const averageWpm = history.length
    ? Math.round(history.reduce((acc, curr) => acc + curr.wpm, 0) / history.length)
    : 0;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#111310] text-[#eeeeea] flex flex-col selection:bg-[#d7ff64] selection:text-[#111310]">
        {/* Top Header */}
        <Header
          currentTab={tab}
          setTab={(t) => {
            const pathMap: Record<string, string> = {
              test: '/',
              grammar: '/grammar',
              learn: '/lessons',
              guides: '/guides',
              games: '/games',
              history: '/history',
            };
            navigateTo(pathMap[t] || '/');
          }}
          onNavigate={navigateTo}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          onScrollToMinuteSpeed={scrollToMinuteSpeed}
        />

        {/* Main Content Area */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-3 sm:px-6 py-[25px] overflow-x-hidden">
          {/* 1. Main Speed Test Workout Route */}
          {tab === 'test' && (
            <div className="space-y-6">
              <HeroSection
                onStartTyping={scrollToMinuteSpeed}
                onScrollToMinuteSpeed={scrollToMinuteSpeed}
              />

              {/* 1-Minute & Custom Minute Word Count Speed Test Section */}
              <MinuteSpeedChallenge />

              {/* Interactive RGB Neon Lighting Keyboard & Mechanical Audio Suite */}
              <InteractiveRGBKeyboard onStartSpeedWorkout={scrollToMinuteSpeed} />

              {/* Separator Accent Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#111310] px-4 text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                    ✦ Guided Passage Speed Workout ✦
                  </span>
                </div>
              </div>

              <TypingTest
                onTestComplete={handleTestComplete}
                bestWpm={bestWpm}
                averageWpm={averageWpm}
                totalTests={history.length}
              />

              {/* Separator Accent Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#111310] px-4 text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                    ✦ Arcade Arena • Floating Interactive Games ✦
                  </span>
                </div>
              </div>

              {/* Homepage Arcade Game Section with Floating Gaming Icons */}
              <HomepageGameSection
                onStartSprint={scrollToMinuteSpeed}
                onStartAccuracyChallenge={scrollToMinuteSpeed}
              />

              {/* Separator Accent Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#d7ff64]/20" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#111310] px-4 text-xs font-extrabold uppercase tracking-widest text-[#d7ff64] shadow-sm">
                    ✦ Comprehensive Typing Guides & Learning Academy ✦
                  </span>
                </div>
              </div>

              {/* Original Content & Educational Guides Section on Homepage */}
              <TypingGuidesSection initialTopic="what-is-speed" />
            </div>
          )}

          {/* 2. AI Grammar Checker & Text Rewriter Route */}
          {tab === 'grammar' && <GrammarSection />}

          {/* 3. Key Row Lessons Route */}
          {tab === 'learn' && <LearningCenter />}

          {/* 4. Comprehensive Typing Guides Route */}
          {tab === 'guides' && (
            <div className="space-y-6">
              <TypingGuidesSection initialTopic="what-is-speed" />
            </div>
          )}

          {/* 5. Arcade Games Arena Route */}
          {tab === 'games' && (
            <TypingGames
              onStartSprint={() => {
                navigateTo('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartAccuracyChallenge={() => {
                navigateTo('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* 6. Telemetry & History Route */}
          {tab === 'history' && (
            <HistoryView history={history} onClearHistory={handleClearHistory} />
          )}

          {/* 7. Dedicated Privacy Policy Route */}
          {tab === 'privacy-policy' && <PrivacyPolicyPage onNavigate={navigateTo} />}

          {/* 8. Dedicated Terms of Service Route */}
          {tab === 'terms-of-service' && <TermsOfServicePage onNavigate={navigateTo} />}

          {/* 9. Dedicated About Us Route */}
          {tab === 'about' && <AboutPage onNavigate={navigateTo} />}

          {/* 10. Dedicated Contact Us Route */}
          {tab === 'contact' && <ContactPage onNavigate={navigateTo} />}

          {/* 11. Clean 404 Fallback Route */}
          {tab === 'not-found' && (
            <NotFoundPage
              onGoHome={() => navigateTo('/')}
              onGoToGuides={() => navigateTo('/guides')}
              onGoToLessons={() => navigateTo('/lessons')}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          setTab={(t) => {
            const pathMap: Record<string, string> = {
              test: '/',
              grammar: '/grammar',
              learn: '/lessons',
              guides: '/guides',
              games: '/games',
              history: '/history',
              'privacy-policy': '/privacy-policy',
              'terms-of-service': '/terms-of-service',
              about: '/about',
              contact: '/contact',
            };
            navigateTo(pathMap[t] || '/');
          }}
          onNavigate={navigateTo}
          onOpenPolicyModal={setPolicyModal}
        />

        {/* GDPR / Google AdSense Cookie Consent Banner */}
        <CookieConsent onNavigatePolicy={navigateTo} />

        {/* AdSense-Compliant Policy Modals (preserved for secondary triggers) */}
        <PolicyModals activeModal={policyModal} onClose={() => setPolicyModal(null)} />
      </div>
    </ErrorBoundary>
  );
}
