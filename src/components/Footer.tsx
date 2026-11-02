import React from 'react';
import { Sparkles, Keyboard, Heart, ShieldCheck, FileText, Info, Mail, ExternalLink, Wand2 } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
  onNavigate?: (path: string) => void;
  onOpenPolicyModal?: (modal: 'privacy' | 'terms' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ setTab, onNavigate, onOpenPolicyModal }) => {
  const handleLinkClick = (e: React.MouseEvent, path: string, tabId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      setTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-24 border-t border-white/10 bg-[#0d0f0c] pt-12 pb-10 text-xs text-gray-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand Info */}
          <div className="max-w-sm space-y-3">
            <div className="flex items-center gap-2.5">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, '/', 'test')}
                className="inline-block transition hover:opacity-90"
              >
                <img
                  src="/logo.png"
                  alt="TypeMaster Logo"
                  className="h-12 sm:h-16 md:h-20 w-auto max-w-[240px] sm:max-w-[300px] object-contain drop-shadow-[0_0_20px_rgba(215,255,100,0.35)]"
                />
              </a>
            </div>
            <p className="text-gray-400 leading-relaxed">
              An all-in-one typing speed and linguistic training ecosystem. Practice Bangla and English touch typing, conquer speed challenges, rewrite text with AI grammar assistance, and track live telemetry.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
                Typing & AI Tools
              </h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    onClick={(e) => handleLinkClick(e, '/', 'test')}
                    className="hover:text-[#d7ff64] transition"
                  >
                    Typing Speed Test
                  </a>
                </li>
                <li>
                  <a
                    href="/grammar"
                    onClick={(e) => handleLinkClick(e, '/grammar', 'grammar')}
                    className="hover:text-[#d7ff64] transition flex items-center gap-1.5"
                  >
                    <span>AI Grammar Rewriter</span>
                    <span className="rounded-full bg-[#d7ff64]/20 px-1.5 py-0.2 text-[9px] font-bold text-[#d7ff64]">
                      AI
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/lessons"
                    onClick={(e) => handleLinkClick(e, '/lessons', 'learn')}
                    className="hover:text-[#d7ff64] transition"
                  >
                    Key Row Lessons
                  </a>
                </li>
                <li>
                  <a
                    href="/games"
                    onClick={(e) => handleLinkClick(e, '/games', 'games')}
                    className="hover:text-[#d7ff64] transition"
                  >
                    Arcade Games Arena
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
                Speed & Progress
              </h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('/');
                      else setTab('test');
                      setTimeout(() => {
                        const el = document.getElementById('minute-speed-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-[#d7ff64] transition"
                  >
                    1-Min Speed Challenge
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('/');
                      else setTab('test');
                      setTimeout(() => {
                        const el = document.getElementById('typing-console');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-[#d7ff64] transition"
                  >
                    Passage Speed Workout
                  </a>
                </li>
                <li>
                  <a
                    href="/history"
                    onClick={(e) => handleLinkClick(e, '/history', 'history')}
                    className="hover:text-[#d7ff64] transition"
                  >
                    Keystroke Telemetry
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-[#d7ff64] uppercase tracking-wider mb-3 text-[11px]">
                Typing Guides & Academy
              </h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/guides"
                    onClick={(e) => handleLinkClick(e, '/guides', 'guides')}
                    className="hover:text-[#d7ff64] transition block"
                  >
                    What Is Typing Speed?
                  </a>
                </li>
                <li>
                  <a
                    href="/guides"
                    onClick={(e) => handleLinkClick(e, '/guides', 'guides')}
                    className="hover:text-[#d7ff64] transition block"
                  >
                    How to Improve Speed
                  </a>
                </li>
                <li>
                  <a
                    href="/guides"
                    onClick={(e) => handleLinkClick(e, '/guides', 'guides')}
                    className="hover:text-[#d7ff64] transition block"
                  >
                    Bangla & English Guides
                  </a>
                </li>
                <li>
                  <a
                    href="/guides"
                    onClick={(e) => handleLinkClick(e, '/guides', 'guides')}
                    className="hover:text-[#d7ff64] transition block"
                  >
                    Finger Placement & 10 Tips
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Publisher Legal & AdSense Compliance Bar */}
        <div className="mt-10 border-t border-white/5 pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px]">
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400" aria-label="Legal & Policy Links">
            <a
              href="/privacy-policy"
              onClick={(e) => handleLinkClick(e, '/privacy-policy', 'privacy-policy')}
              className="hover:text-[#d7ff64] transition underline underline-offset-2 flex items-center gap-1"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#d7ff64]" />
              <span>Privacy Policy (গোপনীয়তা নীতিমালা)</span>
            </a>

            <a
              href="/terms-of-service"
              onClick={(e) => handleLinkClick(e, '/terms-of-service', 'terms-of-service')}
              className="hover:text-cyan-300 transition underline underline-offset-2 flex items-center gap-1"
            >
              <FileText className="h-3.5 w-3.5 text-cyan-400" />
              <span>Terms of Service</span>
            </a>

            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, '/about', 'about')}
              className="hover:text-purple-300 transition underline underline-offset-2 flex items-center gap-1"
            >
              <Info className="h-3.5 w-3.5 text-purple-400" />
              <span>About Us (আমাদের সম্পর্কে)</span>
            </a>

            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact', 'contact')}
              className="hover:text-amber-300 transition underline underline-offset-2 flex items-center gap-1"
            >
              <Mail className="h-3.5 w-3.5 text-amber-400" />
              <span>Contact (যোগাযোগ)</span>
            </a>
          </nav>
        </div>

        {/* Copyright & Developer Attribution */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-center sm:flex-row text-[11px]">
          <p className="text-gray-400">
            © {new Date().getFullYear()} <span className="font-semibold text-white">TypeMaster</span>. Practice daily. Improve endlessly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-gray-500 hidden sm:inline">Bangla & English Touch Typing Platform</span>
            <span className="text-gray-700 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d7ff64]/20 bg-[#d7ff64]/5 px-3 py-1 text-gray-300 shadow-[0_0_12px_rgba(215,255,100,0.1)]">
              <span className="text-gray-400">Developed by</span>
              <a
                href="https://jasmin-v01.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-[#d7ff64] hover:text-[#e6ff8f] hover:underline transition inline-flex items-center gap-1"
                title="Jasmin Portfolio"
              >
                <span>Jasmin</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
