import React from 'react';
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
