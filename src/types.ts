export type Language = 'English' | 'বাংলা';

export interface TestResult {
  id: number;
  language: Language;
  wpm: number;
  rawWpm?: number;
  accuracy: number;
  errors: number;
  duration: number;
  date: string;
  passageSnippet?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  keys: string;
  targetAccuracy: number;
  tips: string;
}

export interface GrammarIssue {
  id?: string;
  category: 'Spelling' | 'Grammar' | 'Punctuation' | 'Capitalization' | 'Clarity' | string;
  original: string;
  suggestion: string;
  explanation: string;
}

export interface GrammarCheckResult {
  score: number;
  summary: string;
  issues: GrammarIssue[];
}

export type RewriteTone =
  | 'Professional'
  | 'Simple English'
  | 'Formal'
  | 'Friendly'
  | 'Improve Clarity';
