import React from 'react';
import { Sparkles, Keyboard, Heart, ShieldCheck, FileText, Info, Mail, ExternalLink } from 'lucide-react';
import { PolicyModalType } from './PolicyModals';

interface FooterProps {
  setTab: (tab: string) => void;
  onOpenPolicyModal?: (modal: 'privacy' | 'terms' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ setTab, onOpenPolicyModal }) => {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#0d0f0c] pt-12 pb-10 text-xs text-gray-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand Info */}
          <div className="max-w-sm space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="TypeMaster Logo"
                className="h-12 sm:h-16 md:h-20 w-auto max-w-[240px] sm:max-w-[300px] object-contain drop-shadow-[0_0_20px_rgba(215,255,100,0.35)]"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              An all-in-one typing speed ecosystem. Practice Bangla and English touch typing, conquer speed challenges, and track live telemetry with 3D AI speed coaching.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
                Typing Practice
              </h5>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setTab('test');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition"
                  >
                    Typing Speed Test
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setTab('learn');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition"
                  >
                    Key Row Lessons
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setTab('games');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition"
                  >
                    15s Sprint & Games
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
                Speed & Progress
              </h5>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setTab('test');
                      const el = document.getElementById('minute-speed-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition"
                  >
                    1-Min Speed Challenge
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setTab('test');
                      const el = document.getElementById('typing-console');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition"
                  >
                    Passage Speed Workout
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setTab('history');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition"
                  >
                    Browser History
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-[#d7ff64] uppercase tracking-wider mb-3 text-[11px]">
                Typing Guides & Academy
              </h5>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setTab('guides');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition text-left"
                  >
                    What Is Typing Speed?
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setTab('guides');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition text-left"
                  >
                    How to Improve Speed
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setTab('guides');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition text-left"
                  >
                    Bangla & English Guides
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setTab('guides');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition text-left"
                  >
                    Finger Placement & 10 Tips
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Publisher Legal & AdSense Compliance Bar */}
        <div className="mt-10 border-t border-white/5 pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400">
            {onOpenPolicyModal && (
              <>
                <button
                  onClick={() => onOpenPolicyModal('privacy')}
                  className="hover:text-[#d7ff64] transition underline underline-offset-2 flex items-center gap-1"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#d7ff64]" />
                  <span>Privacy Policy</span>
                </button>

                <button
                  onClick={() => onOpenPolicyModal('terms')}
                  className="hover:text-cyan-300 transition underline underline-offset-2 flex items-center gap-1"
                >
                  <FileText className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Terms of Service</span>
                </button>

                <button
                  onClick={() => onOpenPolicyModal('about')}
                  className="hover:text-purple-300 transition underline underline-offset-2 flex items-center gap-1"
                >
                  <Info className="h-3.5 w-3.5 text-purple-400" />
                  <span>About Us</span>
                </button>

                <button
                  onClick={() => onOpenPolicyModal('contact')}
                  className="hover:text-amber-300 transition underline underline-offset-2 flex items-center gap-1"
                >
                  <Mail className="h-3.5 w-3.5 text-amber-400" />
                  <span>Contact</span>
                </button>
              </>
            )}
          </div>
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
