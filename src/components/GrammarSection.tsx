import React, { useState } from 'react';
import {
  Sparkles,
  CheckCheck,
  Wand2,
  Copy,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  FileText,
  Clock,
  Layers,
  ArrowRight,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { GrammarCheckResult, GrammarIssue, RewriteTone } from '../types';
import { SAMPLE_TEXTS } from '../data/passages';
import {
  runLocalGrammarCheck,
  runLocalGrammarCorrect,
  runLocalRewrite,
} from '../utils/grammarEngine';

export const GrammarSection: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedTone, setSelectedTone] = useState<RewriteTone>('Professional');

  // Loading states
  const [checking, setChecking] = useState(false);
  const [correcting, setCorrecting] = useState(false);
  const [rewriting, setRewriting] = useState(false);

  // Result states
  const [checkResult, setCheckResult] = useState<GrammarCheckResult | null>(null);
  const [appliedHighlights, setAppliedHighlights] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'issues' | 'output'>('output');

  // UI feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Counters
  const charCount = inputText.length;
  const charCountNoSpaces = inputText.replace(/\s+/g, '').length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const sentenceCount = inputText.trim()
    ? (inputText.match(/[.!?।]+(?:\s|$)/g) || []).length || (wordCount > 0 ? 1 : 0)
    : 0;
  const readingTime = Math.ceil(wordCount / 200);

  const outputWordCount = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Check Grammar
  const handleCheckGrammar = async () => {
    if (!inputText.trim()) {
      setErrorMessage('Please enter or paste some text first.');
      return;
    }

    setErrorMessage(null);
    setChecking(true);
    setCheckResult(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch('/api/grammar/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (res.ok && data.success) {
        setCheckResult({
          score: data.score,
          summary: data.summary,
          issues: data.issues || [],
        });
        setActiveTab('issues');
        showToast(`Grammar check complete: found ${data.issues?.length || 0} issues.`);
        return;
      }
      throw new Error(data.message || 'Server check failed');
    } catch {
      clearTimeout(timeoutId);
      // Seamless local linguistic check fallback
      const local = runLocalGrammarCheck(inputText);
      setCheckResult({
        score: local.score,
        summary: local.summary,
        issues: local.issues,
      });
      setActiveTab('issues');
      showToast(`Grammar check complete: found ${local.issues.length} issues.`);
    } finally {
      setChecking(false);
    }
  };

  // 2. Correct Grammar (Full auto-correct)
  const handleCorrectGrammar = async () => {
    if (!inputText.trim()) {
      setErrorMessage('Please enter or paste some text first.');
      return;
    }

    setErrorMessage(null);
    setCorrecting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch('/api/grammar/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (res.ok && data.success) {
        setOutputText(data.correctedText || '');
        setAppliedHighlights(data.improvements || []);
        setActiveTab('output');
        showToast('Text successfully corrected and polished!');
        return;
      }
      throw new Error(data.message || 'Server correction failed');
    } catch {
      clearTimeout(timeoutId);
      const local = runLocalGrammarCorrect(inputText);
      setOutputText(local.correctedText);
      setAppliedHighlights(local.improvements);
      setActiveTab('output');
      showToast('Text successfully corrected and polished!');
    } finally {
      setCorrecting(false);
    }
  };

  // 3. Rewrite Text with Chosen Tone
  const handleRewrite = async (toneToUse = selectedTone) => {
    if (!inputText.trim()) {
      setErrorMessage('Please enter or paste some text first.');
      return;
    }

    setErrorMessage(null);
    setRewriting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch('/api/grammar/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, tone: toneToUse }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (res.ok && data.success) {
        setOutputText(data.rewrittenText || '');
        setAppliedHighlights(data.highlights || []);
        setActiveTab('output');
        showToast(`Rewritten in ${toneToUse} style.`);
        return;
      }
      throw new Error(data.message || 'Server rewrite failed');
    } catch {
      clearTimeout(timeoutId);
      const local = runLocalRewrite(inputText, toneToUse);
      setOutputText(local.rewrittenText);
      setAppliedHighlights(local.highlights);
      setActiveTab('output');
      showToast(`Rewritten in ${toneToUse} style.`);
    } finally {
      setRewriting(false);
    }
  };

  // 4. Copy to Clipboard
  const handleCopy = async () => {
    if (!outputText) {
      showToast('No output text to copy.');
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      showToast('✓ Copied corrected text to clipboard!');
    } catch {
      showToast('Could not copy automatically. Please select text manually.');
    }
  };

  // 5. Clear and Reset
  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setCheckResult(null);
    setAppliedHighlights([]);
    setErrorMessage(null);
    showToast('Reset all fields.');
  };

  // 6. Apply individual issue fix to the input text
  const applySingleFix = (issue: GrammarIssue) => {
    if (!inputText.includes(issue.original)) {
      showToast(`Could not locate "${issue.original}" in the current text.`);
      return;
    }
    const updated = inputText.replace(issue.original, issue.suggestion);
    setInputText(updated);
    // Remove fixed issue from local list
    if (checkResult) {
      setCheckResult({
        ...checkResult,
        issues: checkResult.issues.filter((i) => i !== issue),
      });
    }
    showToast(`Replaced "${issue.original}" with "${issue.suggestion}".`);
  };

  // 7. Load Sample Texts
  const loadSample = (sampleType: keyof typeof SAMPLE_TEXTS) => {
    const text = SAMPLE_TEXTS[sampleType];
    setInputText(text);
    setOutputText('');
    setCheckResult(null);
    setErrorMessage(null);
    showToast('Sample text loaded! Now click Check Grammar or Correct.');
  };

  const tones: { id: RewriteTone; label: string; desc: string }[] = [
    { id: 'Professional', label: '💼 Professional', desc: 'Polished & business-ready' },
    { id: 'Simple English', label: '💡 Simple English', desc: 'Clear, plain language' },
    { id: 'Formal', label: '🏛️ Formal', desc: 'Academic & sophisticated' },
    { id: 'Friendly', label: '😊 Friendly', desc: 'Warm & conversational' },
    { id: 'Improve Clarity', label: '⚡ Improve Clarity', desc: 'Concise & punchy' },
  ];

  return (
    <section id="grammar-section" className="scroll-mt-24 space-y-8 pt-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-[#d7ff64]/50 bg-[#191b17] px-5 py-3 text-sm font-semibold text-[#d7ff64] shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle className="h-4 w-4 text-[#d7ff64]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-4 py-1.5 text-xs font-bold tracking-wide text-[#d7ff64]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI WRITING ASSISTANT</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
          Grammar Checker & <span className="text-[#d7ff64]">Text Rewriter</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[#a4a69d] italic sm:text-lg">
          “Write better. Correct mistakes. Express yourself clearly.”
        </p>
      </div>

      {/* Quick Sample Text Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-gray-400 font-medium mr-1">Try samples:</span>
        <button
          onClick={() => loadSample('emailWithErrors')}
          className="rounded-xl border border-white/10 bg-[#161814] px-3 py-1.5 text-xs text-gray-300 transition hover:border-[#d7ff64]/40 hover:text-[#d7ff64]"
        >
          📧 Email with mistakes
        </button>
        <button
          onClick={() => loadSample('essayWithErrors')}
          className="rounded-xl border border-white/10 bg-[#161814] px-3 py-1.5 text-xs text-gray-300 transition hover:border-[#d7ff64]/40 hover:text-[#d7ff64]"
        >
          📝 Essay sample
        </button>
        <button
          onClick={() => loadSample('banglaWithErrors')}
          className="rounded-xl border border-white/10 bg-[#161814] px-3 py-1.5 text-xs text-gray-300 transition hover:border-[#d7ff64]/40 hover:text-[#d7ff64]"
        >
          🇧🇩 বাংলা বাক্য সংশোধন
        </button>
      </div>

      {/* Error banner if present */}
      {errorMessage && (
        <div className="rounded-2xl border border-red-500/40 bg-red-950/30 p-4 text-sm text-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
            <div>
              <p className="font-semibold">{errorMessage}</p>
              <p className="mt-1 text-xs text-red-300/80">
                Note: Grammar checking requires an active server API key. TypeMaster runs on secure server-side validation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dual Panel Layout: Input & Output */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT PANEL: Original Text Input */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-[#161814] p-5 shadow-2xl sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-[#d7ff64]">
                1
              </span>
              <h3 className="font-bold text-white text-base">Paste Your Text</h3>
            </div>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition"
              title="Clear input and output"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear & Reset</span>
            </button>
          </div>

          {/* Text Area */}
          <div className="relative flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste paragraphs, essays, emails, job applications, or other text here to check grammar, spelling, and clarity..."
              rows={11}
              className="w-full resize-y rounded-2xl border border-white/10 bg-[#111310] p-4 font-sans text-sm leading-relaxed text-white placeholder-gray-600 outline-none transition focus:border-[#d7ff64]/70 focus:ring-1 focus:ring-[#d7ff64]/40"
              spellCheck={true}
            />
          </div>

          {/* Counters bar */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 border-t border-white/5 pt-3">
            <div className="flex items-center gap-3">
              <span>
                Words: <strong className="text-white">{wordCount}</strong>
              </span>
              <span>
                Characters: <strong className="text-white">{charCount}</strong>
              </span>
              <span className="hidden sm:inline">
                Sentences: <strong className="text-white">{sentenceCount}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span>~{readingTime} min read</span>
            </div>
          </div>

          {/* Action Buttons for Left Panel */}
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <button
              onClick={handleCheckGrammar}
              disabled={checking || correcting || rewriting || !inputText.trim()}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#d7ff64]/50 bg-[#d7ff64]/10 py-3 px-4 text-sm font-bold text-[#d7ff64] transition hover:bg-[#d7ff64] hover:text-[#111310] disabled:opacity-40"
            >
              {checking ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Checking Grammar...</span>
                </>
              ) : (
                <>
                  <CheckCheck className="h-4 w-4" />
                  <span>Check Grammar</span>
                </>
              )}
            </button>

            <button
              onClick={handleCorrectGrammar}
              disabled={checking || correcting || rewriting || !inputText.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#d7ff64] py-3 px-4 text-sm font-bold text-[#111310] shadow-[0_0_20px_rgba(215,255,100,0.25)] transition hover:bg-[#e6ff8f] disabled:opacity-40"
            >
              {correcting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#111310] border-t-transparent" />
                  <span>Correcting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Correct Grammar</span>
                </>
              )}
            </button>
          </div>

          {/* Rewrite Options Strip */}
          <div className="mt-5 rounded-2xl border border-white/5 bg-[#111310] p-4">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                AI Rewrite Styles
              </span>
              <span className="text-[11px] text-[#d7ff64]">Preserves original meaning</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tones.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTone(t.id);
                    handleRewrite(t.id);
                  }}
                  disabled={rewriting || !inputText.trim()}
                  title={t.desc}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    selectedTone === t.id
                      ? 'border border-[#d7ff64]/60 bg-[#d7ff64]/20 text-[#d7ff64]'
                      : 'border border-white/10 bg-white/5 text-gray-300 hover:border-white/25 hover:text-white'
                  } disabled:opacity-40`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleRewrite(selectedTone)}
              disabled={rewriting || !inputText.trim()}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-gray-200 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
            >
              {rewriting ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Rewriting as {selectedTone}...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-3.5 w-3.5 text-[#d7ff64]" />
                  <span>Rewrite Text in &ldquo;{selectedTone}&rdquo;</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Output & Grammar Issue Details */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-[#161814] p-5 shadow-2xl sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-[#d7ff64]">
                2
              </span>
              <h3 className="font-bold text-white text-base">
                {checkResult && checkResult.issues.length > 0
                  ? 'Analysis & Polished Output'
                  : 'Corrected & Rewritten Output'}
              </h3>
            </div>

            {/* Toggle Tabs if check results exist */}
            {checkResult && checkResult.issues.length > 0 && (
              <div className="flex items-center rounded-lg bg-[#111310] p-1 border border-white/5">
                <button
                  onClick={() => setActiveTab('issues')}
                  className={`rounded-md px-2.5 py-1 text-xs font-bold transition ${
                    activeTab === 'issues'
                      ? 'bg-[#d7ff64] text-[#111310]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Issues ({checkResult.issues.length})
                </button>
                <button
                  onClick={() => setActiveTab('output')}
                  className={`rounded-md px-2.5 py-1 text-xs font-bold transition ${
                    activeTab === 'output'
                      ? 'bg-[#d7ff64] text-[#111310]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Output
                </button>
              </div>
            )}
          </div>

          {/* Sub-view A: Interactive Issues List */}
          {activeTab === 'issues' && checkResult && (
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1">
              {/* Score Card */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111310] p-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    OVERALL QUALITY SCORE
                  </span>
                  <p className="mt-1 text-xs text-gray-300">{checkResult.summary}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#d7ff64]">
                    {checkResult.score}/100
                  </span>
                </div>
              </div>

              {checkResult.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-[#111310] p-4 text-xs transition hover:border-[#d7ff64]/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-red-500/10 px-2 py-0.5 font-bold uppercase text-red-400">
                      {issue.category}
                    </span>
                    <button
                      onClick={() => applySingleFix(issue)}
                      className="rounded-lg border border-[#d7ff64]/40 bg-[#d7ff64]/10 px-2.5 py-1 text-[11px] font-bold text-[#d7ff64] transition hover:bg-[#d7ff64] hover:text-[#111310]"
                    >
                      Apply Fix
                    </button>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="line-through text-red-400 font-mono bg-red-500/10 px-1.5 py-0.5 rounded">
                      {issue.original}
                    </span>
                    <ArrowRight className="h-3 w-3 text-gray-500" />
                    <span className="text-[#d7ff64] font-mono font-semibold bg-[#d7ff64]/10 px-1.5 py-0.5 rounded">
                      {issue.suggestion}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-400 leading-relaxed">{issue.explanation}</p>
                </div>
              ))}

              <button
                onClick={handleCorrectGrammar}
                className="w-full mt-2 rounded-xl bg-[#d7ff64] py-2.5 text-xs font-bold text-[#111310] transition hover:bg-[#e6ff8f]"
              >
                Apply All Fixes & View Corrected Text
              </button>
            </div>
          )}

          {/* Sub-view B: Corrected Output Area */}
          {(activeTab === 'output' || !checkResult || checkResult.issues.length === 0) && (
            <div className="relative flex-1">
              <textarea
                value={outputText}
                readOnly
                placeholder="The fully corrected grammar version or rewritten text will appear here. You can then copy it with one click."
                rows={11}
                className="w-full resize-y rounded-2xl border border-white/10 bg-[#111310] p-4 font-sans text-sm leading-relaxed text-gray-100 placeholder-gray-600 outline-none"
              />
            </div>
          )}

          {/* Output Metadata & Copy action */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 border-t border-white/5 pt-3">
            <div>
              Output Words: <strong className="text-white">{outputWordCount}</strong>
            </div>

            <button
              onClick={handleCopy}
              disabled={!outputText}
              className="flex items-center gap-1.5 rounded-xl bg-[#d7ff64] px-4 py-2 text-xs font-bold text-[#111310] shadow-[0_0_15px_rgba(215,255,100,0.2)] transition hover:bg-[#e6ff8f] disabled:opacity-40"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Corrected Text</span>
            </button>
          </div>

          {/* Key Improvements Highlights */}
          {appliedHighlights.length > 0 && (
            <div className="mt-4 rounded-2xl border border-white/5 bg-[#111310] p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#d7ff64]">
                <Lightbulb className="h-3.5 w-3.5" />
                <span>Improvements & Changes</span>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-gray-300">
                {appliedHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#d7ff64] font-bold">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Privacy & No-Storage Guarantee Notice */}
          <p className="mt-4 text-center text-[11px] text-gray-500">
            🔒 Privacy First: Your submitted text is processed in real time and never stored on any database without your consent.
          </p>
        </div>
      </div>
    </section>
  );
};
