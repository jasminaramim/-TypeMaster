import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Keyboard,
  Flame,
  ArrowDown,
  Zap,
  Globe2,
  ShieldCheck,
  Timer,
} from 'lucide-react';

interface HeroSectionProps {
  onStartTyping: () => void;
  onScrollToGrammar: () => void;
  onScrollToMinuteSpeed?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartTyping,
  onScrollToGrammar,
  onScrollToMinuteSpeed,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [durationTime, setDurationTime] = useState('0:00');
  const [showControls, setShowControls] = useState(true);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((curr / dur) * 100);
      setCurrentTime(formatTime(curr));
      setDurationTime(formatTime(dur));
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = newProgress * videoRef.current.duration;
  };

  return (
    <section className="relative mx-auto w-full py-[25px] overflow-hidden">
      {/* Background Neon Aura Effect */}
      <div
        className="pointer-events-none absolute left-1/2 -top-24 h-[500px] w-full max-w-5xl -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(215,255,100,0.35) 0%, rgba(34,197,94,0.15) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Top Banner Heading */}
      <div className="text-center">
        {/* Animated Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/40 bg-[#d7ff64]/10 px-4 py-1.5 text-xs font-bold tracking-wider text-[#d7ff64] shadow-[0_0_20px_rgba(215,255,100,0.15)] transition hover:border-[#d7ff64]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d7ff64] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d7ff64]" />
          </span>
          <Flame className="h-3.5 w-3.5" />
          <span>TYPE FASTER • THINK SMARTER • WRITE FLAWLESSLY</span>
        </div>

        {/* Big Catchy Title */}
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl sm:leading-[1.1] md:text-7xl">
          Master Keyboard Speed. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#d7ff64] via-[#bbf43d] to-[#22c55e] bg-clip-text text-transparent">
            Conquer Precision & Flow.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#a4a69d] sm:text-lg">
          Practice touch typing in <strong className="text-white">Bangla (বাংলা)</strong> &{' '}
          <strong className="text-white">English</strong> with live WPM analytics, interactive challenges,
          and a built-in <strong className="text-[#d7ff64]">AI Grammar & Text Rewriter</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onScrollToMinuteSpeed || onStartTyping}
            className="group flex items-center gap-2.5 rounded-2xl bg-[#d7ff64] px-6 py-3.5 text-sm font-black text-[#111310] shadow-[0_0_25px_rgba(215,255,100,0.4)] transition hover:scale-105 hover:bg-[#bbf43d]"
          >
            <Timer className="h-4 w-4 transition group-hover:rotate-12" />
            <span>1-Minute Word Speed Test</span>
          </button>

          <button
            onClick={onStartTyping}
            className="group flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:border-[#d7ff64]/50 hover:bg-[#d7ff64]/10 hover:text-[#d7ff64]"
          >
            <Keyboard className="h-4 w-4 text-[#d7ff64]" />
            <span>Passage Test</span>
          </button>

          <button
            onClick={onScrollToGrammar}
            className="group flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
          >
            <Sparkles className="h-4 w-4 text-[#d7ff64] transition group-hover:rotate-12" />
            <span>AI Grammar Rewriter</span>
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* THE BIG HERO VIDEO SHOWCASE                                      */}
      {/* ================================================================ */}
      <div className="relative mx-auto mt-10 w-full max-w-5xl">
        {/* Glow halo under the video player */}
        <div className="absolute -inset-1 sm:-inset-2 rounded-[2rem] bg-gradient-to-r from-[#d7ff64]/25 via-emerald-500/15 to-[#d7ff64]/20 blur-xl opacity-75" />

        {/* Video Card Outer Shell with Glassmorphism */}
        <div
          ref={containerRef}
          onMouseEnter={() => setShowControls(true)}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#161814]/90 p-2 sm:p-3 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(215,255,100,0.1)] backdrop-blur-2xl ring-1 ring-white/10"
        >
          {/* Top Titlebar / Control Bar */}
          <div className="mb-2 flex items-center justify-between px-3 py-1.5 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="ml-2 hidden font-mono text-[11px] tracking-wide text-gray-400 sm:inline">
                TypeMaster Live Engine • 1080p Ultra HD
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#d7ff64]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d7ff64] animate-pulse" />
                SHOWCASE
              </span>
              <span className="hidden font-mono text-[11px] text-gray-500 md:inline">
                Bangla + English
              </span>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner group">
            <video
              ref={videoRef}
              src="/herovideo.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={handleTogglePlay}
              className="h-full w-full object-cover cursor-pointer"
            />

            {/* Ambient Vignette Overlay */}
            <div
              onClick={handleTogglePlay}
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70"
            />

            {/* Top Overlay Badges */}
            <div className="pointer-events-none absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between gap-1.5">
              <div className="flex items-center">
                <div className="flex items-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl border border-white/10 bg-[#111310]/85 px-2 py-0.5 sm:px-3 sm:py-1.5 backdrop-blur-md whitespace-nowrap">
                  <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#d7ff64]" />
                  <span className="text-[10px] sm:text-xs font-semibold text-white">
                    <span className="inline sm:hidden">Live Engine</span>
                    <span className="hidden sm:inline">Real-Time Typing Experience</span>
                  </span>
                </div>
              </div>

              {isMuted && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleMute();
                  }}
                  className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl border border-white/15 bg-black/75 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-gray-200 backdrop-blur-md transition hover:border-[#d7ff64] hover:text-[#d7ff64] whitespace-nowrap shadow-sm"
                >
                  <VolumeX className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400" />
                  <span>
                    <span className="inline sm:hidden">Unmute</span>
                    <span className="hidden sm:inline">Click to Unmute</span>
                  </span>
                </button>
              )}
            </div>

            {/* Center Play/Pause Indicator Overlay when Paused */}
            {!isPlaying && (
              <div
                onClick={handleTogglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              >
                <div className="flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/20 bg-[#d7ff64] text-[#111310] shadow-[0_0_40px_rgba(215,255,100,0.6)] transition hover:scale-110">
                  <Play className="h-6 w-6 sm:h-8 sm:w-8 translate-x-0.5 fill-[#111310]" />
                </div>
              </div>
            )}

            {/* Bottom Overlay Controls Bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0 hover:opacity-100'
              }`}
            >
              {/* Progress Bar (Scrubbable) */}
              <div
                onClick={handleProgressClick}
                className="group/scrub relative mb-2 sm:mb-3 h-1 sm:h-1.5 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-2"
              >
                <div
                  className="h-full rounded-full bg-[#d7ff64] shadow-[0_0_8px_#d7ff64]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between gap-1.5 sm:gap-3 text-white">
                <div className="flex items-center gap-1.5 sm:gap-3">
                  {/* Play / Pause Button */}
                  <button
                    onClick={handleTogglePlay}
                    className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-white/10 text-white backdrop-blur-md transition hover:bg-[#d7ff64] hover:text-[#111310]"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current ml-0.5" />}
                  </button>

                  {/* Restart Button */}
                  <button
                    onClick={handleRestart}
                    className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                    title="Restart Video"
                  >
                    <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>

                  {/* Sound Toggle */}
                  <button
                    onClick={handleToggleMute}
                    className={`flex h-7 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl px-2 sm:px-3 text-[10px] sm:text-xs font-semibold backdrop-blur-md transition ${
                      isMuted
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                        : 'bg-[#d7ff64] text-[#111310] shadow-[0_0_15px_rgba(215,255,100,0.3)]'
                    }`}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" /> : <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />}
                    <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Sound On'}</span>
                  </button>

                  {/* Time Stamp */}
                  <span className="font-mono text-[10px] sm:text-xs text-gray-300">
                    {currentTime} / {durationTime}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Fullscreen Button */}
                  <button
                    onClick={handleToggleFullscreen}
                    className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:text-[#d7ff64]"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Feature Badges Row Under Video */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#161814]/80 p-3.5 backdrop-blur-md transition hover:border-[#d7ff64]/40">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d7ff64]/15 text-[#d7ff64]">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Dual Language Speed</p>
              <p className="text-[11px] text-gray-400">Bangla & English keyboard fluency</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#161814]/80 p-3.5 backdrop-blur-md transition hover:border-[#d7ff64]/40">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Real-Time Telemetry</p>
              <p className="text-[11px] text-gray-400">Instant WPM, accuracy & error tracking</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#161814]/80 p-3.5 backdrop-blur-md transition hover:border-[#d7ff64]/40">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-400/15 text-purple-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">AI Grammar Rewriter</p>
              <p className="text-[11px] text-gray-400">Built-in linguistic & AI proofreading</p>
            </div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center">
          <button
            onClick={onStartTyping}
            className="group flex flex-col items-center gap-1.5 text-xs font-medium text-gray-400 transition hover:text-[#d7ff64]"
          >
            <span>Scroll down to start typing</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition group-hover:border-[#d7ff64]/40 group-hover:bg-[#d7ff64]/10">
              <ArrowDown className="h-4 w-4 animate-bounce text-[#d7ff64]" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
