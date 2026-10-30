import React from 'react';
import { Home, Keyboard, BookOpen, ArrowLeft, AlertTriangle } from 'lucide-react';

interface NotFoundPageProps {
  onGoHome: () => void;
  onGoToLessons?: () => void;
  onGoToGuides?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onGoHome,
  onGoToLessons,
  onGoToGuides,
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 google-anno-skip" data-google-ad-unit="none">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#161814] p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #d7ff64 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* 404 Icon & Badge */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
          ERROR 404 • PAGE NOT FOUND
        </span>

        <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-sm text-gray-400 leading-relaxed">
          The requested page or resource could not be found. You may have typed an incorrect address or the content has moved to another section.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#d7ff64] px-5 py-2.5 text-xs font-bold text-[#111310] transition hover:bg-[#e6ff8f] active:scale-95 shadow-[0_0_15px_rgba(215,255,100,0.3)]"
          >
            <Home className="h-4 w-4" />
            <span>হোমপেজে ফিরে যান</span>
          </button>

          {onGoToGuides && (
            <button
              onClick={onGoToGuides}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-gray-200 transition hover:bg-white/10 active:scale-95"
            >
              <BookOpen className="h-4 w-4 text-[#d7ff64]" />
              <span>টাইপিং গাইড দেখুন</span>
            </button>
          )}
        </div>

        {/* Policy Notice: Clean, Ad-Free Zone */}
        <div className="mt-8 border-t border-white/5 pt-4 text-[11px] text-gray-500">
          <span>TypeMaster Platform • Error & Navigation Fallback Page (No Ads)</span>
        </div>
      </div>
    </div>
  );
};
