import React, { useRef, useEffect } from 'react';
import { RotateCcw, X, Sparkles, Trophy } from 'lucide-react';

interface CelebrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  wpm: number;
  words?: number;
  accuracy?: number;
}

export const CelebrationPopup: React.FC<CelebrationPopupProps> = ({
  isOpen,
  onClose,
  onRetry,
  wpm,
  words,
  accuracy,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If browser restricts unmuted autoplay, mute and play reliably
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play();
            }
          });
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-3xl border border-[#d7ff64]/50 bg-gradient-to-b from-[#1b1e17] via-[#141612] to-[#0e100d] p-5 sm:p-6 text-center shadow-[0_20px_70px_rgba(215,255,100,0.25)] zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
          title="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Video Player */}
        <div className="relative mx-auto mb-4 w-full overflow-hidden rounded-2xl border border-[#d7ff64]/30 bg-black shadow-[0_0_20px_rgba(0,0,0,0.9)] aspect-video flex items-center justify-center">
          <video
            ref={videoRef}
            src="/gratejobvideo.mp4"
            autoPlay
            playsInline
            controls={false}
            loop={false}
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>

        {/* Catchy Celebration Text */}
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d7ff64]/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#d7ff64]">
            <Sparkles className="h-3.5 w-3.5 text-[#d7ff64]" />
            <span>CHALLENGE COMPLETE</span>
          </span>

          <h3 className="text-2xl font-black text-white sm:text-3xl">
            🎉 Wow! You Did a <span className="text-[#d7ff64]">Great Job!</span>
          </h3>

          <p className="text-xs text-gray-400">
            Incredible rhythm and typing speed! You pushed your limits!
          </p>
        </div>

        {/* Stats Summary Pill */}
        <div className="mt-3 inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-300">
          <span>Speed: <strong className="text-[#d7ff64] font-mono text-sm">{wpm} WPM</strong></span>
          {words !== undefined && (
            <span>• Words: <strong className="text-white font-mono text-sm">{words}</strong></span>
          )}
          {accuracy !== undefined && (
            <span>• Accuracy: <strong className="text-cyan-400 font-mono text-sm">{accuracy}%</strong></span>
          )}
        </div>

        {/* Main "Let's Do It Again!" Action Button */}
        <button
          onClick={() => {
            onRetry();
            onClose();
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d7ff64] to-[#bbf43d] py-3.5 text-sm font-black text-[#111310] shadow-[0_0_25px_rgba(215,255,100,0.4)] transition hover:scale-[1.02] active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Let&apos;s Do It Again! 🚀</span>
        </button>

        {/* Secondary View Full Results link */}
        <button
          onClick={onClose}
          className="mt-2.5 text-xs font-semibold text-gray-400 hover:text-white transition"
        >
          Close & View Full Detailed Stats
        </button>
      </div>
    </div>
  );
};
