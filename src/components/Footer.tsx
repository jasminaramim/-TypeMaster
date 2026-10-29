import React from 'react';
import { Sparkles, Keyboard, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToGrammar: () => void;
  setTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToGrammar, setTab }) => {
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
              An all-in-one typing & writing ecosystem. Practice Bangla and English typing, elevate your speed, and polish your prose with our AI Grammar Checker and Text Rewriter.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
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
                AI Tools & Records
              </h5>
              <ul className="space-y-2">
                <li>
                  <button onClick={onScrollToGrammar} className="text-[#d7ff64] hover:underline flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Grammar Checker</span>
                  </button>
                </li>
                <li>
                  <button onClick={onScrollToGrammar} className="hover:text-[#d7ff64] transition">
                    AI Text Rewriter
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
                <li>
                  <button
                    onClick={() => {
                      setTab('leaderboard');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#d7ff64] transition"
                  >
                    Leaderboard
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-center sm:flex-row">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-white">TypeMaster</span>. Practice daily. Improve endlessly.
          </p>
          <p className="flex items-center gap-1.5 text-gray-500">
            <span>Bangla & English Typing Platform</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
