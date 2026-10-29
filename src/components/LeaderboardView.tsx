import React from 'react';
import { Trophy, Medal, Crown, Star, Flame } from 'lucide-react';
import { DEMO_LEADERS } from '../data/passages';

interface LeaderboardViewProps {
  userBestWpm: number;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ userBestWpm }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-4 py-1.5 text-xs font-bold tracking-wide text-[#d7ff64]">
          <Trophy className="h-3.5 w-3.5" />
          <span>COMMUNITY HALL OF FAME</span>
        </div>
        <h2 className="text-3xl font-black text-white sm:text-5xl">
          Top Speed <span className="text-[#d7ff64]">Leaderboard</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#a4a69d] sm:text-base">
          Celebrate keystroke mastery and see how you compare to the top typists in the community.
        </p>
      </section>

      {/* User's Current Standing Card */}
      <div className="rounded-2xl border border-[#d7ff64]/40 bg-gradient-to-r from-[#d7ff64]/10 via-[#161814] to-transparent p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d7ff64] text-[#111310] font-black">
              YOU
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Your Personal Record</h4>
              <p className="text-xs text-gray-400">Recorded on this device</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                PEAK SPEED
              </span>
              <p className="font-mono text-2xl font-black text-[#d7ff64]">
                {userBestWpm} WPM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings List */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#161814] shadow-2xl">
        <div className="divide-y divide-white/5">
          {DEMO_LEADERS.map((player) => {
            const isTop3 = player.rank <= 3;
            return (
              <div
                key={player.rank}
                className="flex items-center justify-between p-5 transition hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black ${
                      player.rank === 1
                        ? 'bg-amber-400 text-[#111310] shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                        : player.rank === 2
                        ? 'bg-slate-300 text-[#111310]'
                        : player.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {player.rank === 1 ? <Crown className="h-5 w-5" /> : player.rank}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">
                        {player.name}
                      </span>
                      <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
                        {player.language}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{player.badge}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                      Accuracy
                    </span>
                    <p className="font-mono text-sm font-bold text-gray-300">
                      {player.accuracy}%
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                      Speed
                    </span>
                    <p className="font-mono text-xl font-black text-[#d7ff64]">
                      {player.wpm} <span className="text-xs font-semibold text-gray-400">WPM</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note about server & database */}
      <div className="rounded-2xl border border-white/5 bg-[#111310] p-4 text-xs text-gray-400 text-center">
        💡 Note: Rankings displayed above represent benchmark records. Global cloud multiplayer leaderboards and personal accounts are scheduled in the TypeMaster deployment roadmap.
      </div>
    </div>
  );
};
