import React, { useState } from 'react';
import { History, Trash2, ArrowUpDown, Filter, Sparkles } from 'lucide-react';
import { TestResult, Language } from '../types';

interface HistoryViewProps {
  history: TestResult[];
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, onClearHistory }) => {
  const [filterLang, setFilterLang] = useState<'All' | Language>('All');

  const filteredHistory = history.filter((item) => {
    if (filterLang === 'All') return true;
    return item.language === filterLang;
  });

  return (
    <div className="space-y-8 google-anno-skip" data-google-ad-unit="none">
      {/* Header */}
      <section className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-4 py-1.5 text-xs font-bold tracking-wide text-[#d7ff64]">
          <History className="h-3.5 w-3.5" />
          <span>YOUR TYPING TRACK RECORD</span>
        </div>
        <h2 className="text-3xl font-black text-white sm:text-5xl">
          Test <span className="text-[#d7ff64]">History</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#a4a69d] sm:text-base">
          Review your completed typing speed tests, analyze error trends, and monitor consistency over time.
        </p>
      </section>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Language Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400">Filter:</span>
          {(['All', 'English', 'বাংলা'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setFilterLang(l)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                filterLang === l
                  ? 'bg-[#d7ff64] text-[#111310]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Clear Button */}
        {history.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear your local test history?')) {
                onClearHistory();
              }
            }}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#161814] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="border-b border-white/10 bg-[#111310]/70 text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="py-4 px-6">Date / Time</th>
                <th className="py-4 px-4">Language</th>
                <th className="py-4 px-4">Duration</th>
                <th className="py-4 px-4">Speed (WPM)</th>
                <th className="py-4 px-4">Accuracy</th>
                <th className="py-4 px-4">Mistakes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="transition hover:bg-white/[0.02]">
                  <td className="py-4 px-6 text-xs text-gray-400 font-mono">
                    {item.date}
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-200">
                    {item.language}
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-400">
                    {item.duration}s
                  </td>
                  <td className="py-4 px-4 font-mono text-base font-black text-[#d7ff64]">
                    {item.wpm}
                  </td>
                  <td className="py-4 px-4 font-mono font-medium text-gray-300">
                    {item.accuracy}%
                  </td>
                  <td className="py-4 px-4 font-mono font-medium text-red-400">
                    {item.errors}
                  </td>
                </tr>
              ))}

              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-gray-500">
                    <Sparkles className="mx-auto h-8 w-8 text-gray-600 mb-2" />
                    <p className="text-sm font-semibold">No typing tests recorded yet.</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Complete your first test in the Typing Test section to log your performance.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
