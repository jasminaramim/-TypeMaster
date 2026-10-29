import { GrammarCheckResult, GrammarIssue, RewriteTone } from '../types';

interface Rule {
  regex: RegExp;
  category: 'Grammar' | 'Spelling' | 'Punctuation' | 'Capitalization' | 'Clarity';
  replacement: string | ((match: string, ...groups: any[]) => string);
  explanation: string;
}

const RULES: Rule[] = [
  // Subject-Verb Agreement & Plurals
  {
    regex: /\b(data|datas)\s+(shows|showes)\b/gi,
    category: 'Grammar',
    replacement: 'data show',
    explanation: '"Data" is traditionally plural in technical contexts; use "data show" or "data indicates".',
  },
  {
    regex: /\b(sales)\s+(has)\b/gi,
    category: 'Grammar',
    replacement: 'sales have',
    explanation: 'Plural subject "sales" requires the plural auxiliary verb "have".',
  },
  {
    regex: /\b(there)\s+(is)\s+(several|many|multiple|few)\b/gi,
    category: 'Grammar',
    replacement: 'there are $3',
    explanation: 'Use plural "there are" with plural counts like "several" or "many".',
  },
  {
    regex: /\b(several|many|these|those)\s+(issue)\b/gi,
    category: 'Grammar',
    replacement: '$1 issues',
    explanation: 'Plural determiners require the plural noun "issues".',
  },
  {
    regex: /\b(need|needs)\s+to\s+be\s+(address)\b/gi,
    category: 'Grammar',
    replacement: 'needs to be addressed',
    explanation: 'Passive construction "to be" requires the past participle "addressed".',
  },
  {
    regex: /\b(resolve)\s+(this)\s+(things|issues)\b/gi,
    category: 'Grammar',
    replacement: 'resolve these $3',
    explanation: 'Demonstrative pronoun should agree in number: "these things" instead of "this things".',
  },
  {
    regex: /\b(i\s+am)\s+(write)\s+to\s+you\b/gi,
    category: 'Grammar',
    replacement: 'I am writing to you',
    explanation: 'Continuous present tense requires the gerund form "writing".',
  },
  {
    regex: /\b(we)\s+(discusses)\b/gi,
    category: 'Grammar',
    replacement: 'we discussed',
    explanation: 'First-person plural "we" in the past tense should be "discussed".',
  },
  {
    regex: /\b(which)\s+(are)\s+(very\s+good\s+news)\b/gi,
    category: 'Grammar',
    replacement: 'which is very good news',
    explanation: '"News" is an uncountable singular noun; use "which is".',
  },
  {
    regex: /\b(she|he|it)\s+(do\s+not)\b/gi,
    category: 'Grammar',
    replacement: '$1 does not',
    explanation: 'Third-person singular subjects require "does not" instead of "do not".',
  },
  {
    regex: /\b(she|he|it)\s+(likes?\s+to\s+eat\s+apple)\b/gi,
    category: 'Grammar',
    replacement: '$1 likes to eat apples',
    explanation: 'Singular countable noun "apple" requires an article or pluralization ("apples" or "an apple").',
  },
  {
    regex: /\b(history)\s+(show)\b/gi,
    category: 'Grammar',
    replacement: 'history shows',
    explanation: 'Singular subject "history" requires the third-person verb "shows".',
  },
  {
    regex: /\b(technology)\s+(also)\s+(create)\b/gi,
    category: 'Grammar',
    replacement: 'technology also creates',
    explanation: 'Singular subject "technology" requires the verb "creates".',
  },
  {
    regex: /\b(governments?)\s+(invests?)\b/gi,
    category: 'Grammar',
    replacement: (m) => m.toLowerCase().startsWith('governments') ? 'governments invest' : 'government invests',
    explanation: 'Ensure verb number agrees with plural "governments" or singular "government".',
  },
  {
    regex: /\b(every)\s+(citizens)\b/gi,
    category: 'Grammar',
    replacement: 'every citizen',
    explanation: '"Every" must be followed by a singular countable noun ("every citizen").',
  },
  {
    regex: /\b(this)\s+(advancements)\b/gi,
    category: 'Grammar',
    replacement: 'these advancements',
    explanation: 'Plural noun "advancements" requires plural demonstrative "these".',
  },
  {
    regex: /\b(many)\s+(peoples)\s+(believes?)\b/gi,
    category: 'Grammar',
    replacement: 'many people believe',
    explanation: '"People" is already plural, and takes the plural verb "believe".',
  },
  {
    regex: /\b(could|should|would)\s+(of)\b/gi,
    category: 'Grammar',
    replacement: '$1 have',
    explanation: 'Use auxiliary verb "have" (e.g. "could have"), not preposition "of".',
  },

  // Spelling & Common Typos
  {
    regex: /\b(persent)\b/gi,
    category: 'Spelling',
    replacement: 'percent',
    explanation: 'Misspelling. The correct word is "percent" or "per cent".',
  },
  {
    regex: /\b(differnt)\b/gi,
    category: 'Spelling',
    replacement: 'different',
    explanation: 'Misspelling. Correct spelling is "different".',
  },
  {
    regex: /\b(automatisation)\b/gi,
    category: 'Spelling',
    replacement: 'automation',
    explanation: 'Word choice: "automation" is standard in modern English.',
  },
  {
    regex: /\b(opportunitys)\b/gi,
    category: 'Spelling',
    replacement: 'opportunities',
    explanation: 'Irregular plural of "opportunity" ends in "-ies" ("opportunities").',
  },
  {
    regex: /\b(when)\s+(your)\s+(available)\b/gi,
    category: 'Grammar',
    replacement: 'when you\'re available',
    explanation: 'Contraction "you\'re" (you are) is needed here, not possessive "your".',
  },
  {
    regex: /\b(your)\s+(welcome)\b/gi,
    category: 'Grammar',
    replacement: "you're welcome",
    explanation: 'Use contraction "you\'re" (you are welcome).',
  },
  {
    regex: /\b(definately)\b/gi,
    category: 'Spelling',
    replacement: 'definitely',
    explanation: 'Misspelling. Correct word is "definitely".',
  },
  {
    regex: /\b(seperate)\b/gi,
    category: 'Spelling',
    replacement: 'separate',
    explanation: 'Misspelling. Remember: there is "a rat" in "sep-a-rate".',
  },
  {
    regex: /\b(recieve)\b/gi,
    category: 'Spelling',
    replacement: 'receive',
    explanation: 'Spelling rule: "i before e except after c" ("receive").',
  },
  {
    regex: /\b(untill)\b/gi,
    category: 'Spelling',
    replacement: 'until',
    explanation: 'Correct spelling is "until" with a single "l".',
  },
  {
    regex: /\b(accomodate)\b/gi,
    category: 'Spelling',
    replacement: 'accommodate',
    explanation: 'Correct spelling has double c and double m ("accommodate").',
  },
  {
    regex: /\b(goverment)\b/gi,
    category: 'Spelling',
    replacement: 'government',
    explanation: 'Include the letter "n" from govern: "government".',
  },
  {
    regex: /\b(thier)\b/gi,
    category: 'Spelling',
    replacement: 'their',
    explanation: 'Correct spelling is "their".',
  },
  {
    regex: /\b(tommorow)\b/gi,
    category: 'Spelling',
    replacement: 'tomorrow',
    explanation: 'Correct spelling is "tomorrow" (one m, two r\'s).',
  },
  {
    regex: /\b(alot)\b/gi,
    category: 'Spelling',
    replacement: 'a lot',
    explanation: '"A lot" is always written as two separate words.',
  },

  // Punctuation & Capitalization
  {
    regex: /(^|[.!?।]\s+)([a-z])/g,
    category: 'Capitalization',
    replacement: (_m, p1, p2) => p1 + p2.toUpperCase(),
    explanation: 'Sentences must begin with a capital letter.',
  },
  {
    regex: /\b(however|therefore|moreover|furthermore)\s+([a-zA-Z])/gi,
    category: 'Punctuation',
    replacement: (_m, word, nextChar) => {
      const capWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      return `${capWord}, ${nextChar}`;
    },
    explanation: 'Introductory transitional adverbs should be followed by a comma.',
  },
  {
    regex: /\s+([,.:;?!])/g,
    category: 'Punctuation',
    replacement: '$1',
    explanation: 'Avoid spaces before punctuation marks.',
  },

  // Bengali Grammar & Spelling Rules (বাংলা ব্যাকরণ ও বানানরীতি)
  {
    regex: /পাইছি/g,
    category: 'Grammar',
    replacement: 'পেয়েছি',
    explanation: 'সাধু/আঞ্চলিক রূপ "পাইছি"-এর পরিবর্তে প্রমিত চলিত রূপ "পেয়েছি" ব্যবহার করুন।',
  },
  {
    regex: /চলিতেছে/g,
    category: 'Grammar',
    replacement: 'চলছে',
    explanation: 'চলিত গদ্যে সাধুরীতির "চলিতেছে"-এর জায়গায় "চলছে" লিখুন (সাধু ও চলিতের মিশ্রণ পরিহার)।',
  },
  {
    regex: /সমস্য/g,
    category: 'Spelling',
    replacement: 'সমস্যা',
    explanation: 'বানান ভুল: সঠিক প্রমিত বানান হলো "সমস্যা" (আ-কার যুক্ত)।',
  },
  {
    regex: /দূত/g,
    category: 'Spelling',
    replacement: 'দ্রুত',
    explanation: 'অর্থের বিভ্রান্তি: তাড়াতাড়ি বা শীঘ্র বোঝাতে "দ্রুত" (র-ফলা সহ) ব্যবহৃত হয়। "দূত" অর্থ বার্তাবাহক।',
  },
  {
    regex: /করূন/g,
    category: 'Spelling',
    replacement: 'করুন',
    explanation: 'বাংলা বানানের নিয়ম অনুযায়ী ক্রিয়াপদে দীর্ঘ-ঊকার হয় না; সঠিক রূপ "করুন"।',
  },
  {
    regex: /গতকালকে/g,
    category: 'Clarity',
    replacement: 'গতকাল',
    explanation: '"গতকাল"-এর সাথে অতিরিক্ত "কে" বিভক্তি নিষ্প্রয়োজন; "গতকাল" বলাই অধিক সংগত।',
  },
  {
    regex: /পরিস্কার/g,
    category: 'Spelling',
    replacement: 'পরিষ্কার',
    explanation: 'ণ-ত্ব ও ষ-ত্ব বিধান অনুযায়ী ই-কারান্ত উপসর্গের পর মূর্ধন্য-ষ ("পরিষ্কার") হবে।',
  },
  {
    regex: /পুরষ্কার/g,
    category: 'Spelling',
    replacement: 'পুরস্কার',
    explanation: 'সন্ধি ও বানানের নিয়মানুযায়ী "পুরস্কার"-এ দন্ত্য-স ব্যবহৃত হয়।',
  },
  {
    regex: /শ্রদ্ধাঞ্জলী/g,
    category: 'Spelling',
    replacement: 'শ্রদ্ধাঞ্জলি',
    explanation: '"অঞ্জলি" যুক্ত শব্দসমূহে সর্বদা হ্রস্ব-ইকার ("শ্রদ্ধাঞ্জলি") হয়।',
  },
];

export function runLocalGrammarCheck(text: string): GrammarCheckResult {
  const issues: GrammarIssue[] = [];
  let score = 100;

  for (const rule of RULES) {
    const matches = Array.from(text.matchAll(new RegExp(rule.regex)));
    for (const match of matches) {
      const original = match[0];
      let suggestion = '';
      if (typeof rule.replacement === 'function') {
        suggestion = (rule.replacement as any)(...match);
      } else {
        suggestion = original.replace(rule.regex, rule.replacement);
      }

      if (original !== suggestion && !issues.some((i) => i.original === original)) {
        issues.push({
          id: `iss-${issues.length + 1}`,
          category: rule.category,
          original,
          suggestion,
          explanation: rule.explanation,
        });
        score -= 7;
      }
    }
  }

  score = Math.max(30, Math.min(100, score));
  const summary =
    issues.length === 0
      ? 'Flawless text! No grammatical, spelling, or punctuation errors detected.'
      : `Found ${issues.length} potential improvements in grammar, spelling, and phrasing.`;

  return {
    score,
    summary,
    issues,
  };
}

export function runLocalGrammarCorrect(text: string): { correctedText: string; improvements: string[] } {
  let corrected = text;
  const improvements: string[] = [];

  for (const rule of RULES) {
    const regex = new RegExp(rule.regex);
    if (regex.test(corrected)) {
      if (typeof rule.replacement === 'function') {
        corrected = corrected.replace(regex, rule.replacement as any);
      } else {
        corrected = corrected.replace(regex, rule.replacement);
      }
      improvements.push(rule.explanation);
    }
  }

  // Deduplicate improvements
  const uniqueImprovements = Array.from(new Set(improvements)).slice(0, 5);
  if (uniqueImprovements.length === 0) {
    uniqueImprovements.push('Checked sentence structure, punctuation, and wording. Text is already clean.');
  }

  return {
    correctedText: corrected,
    improvements: uniqueImprovements,
  };
}

export function runLocalRewrite(text: string, tone: RewriteTone): { rewrittenText: string; highlights: string[] } {
  // First correct any obvious mistakes
  const { correctedText } = runLocalGrammarCorrect(text);
  let rewritten = correctedText;
  const highlights: string[] = [];

  switch (tone) {
    case 'Professional':
      rewritten = rewritten
        .replace(/\b(I am write to you|I am writing to you)\b/gi, 'I am writing to formally update you')
        .replace(/\b(very good news)\b/gi, 'a promising milestone')
        .replace(/\b(let me know)\b/gi, 'kindly inform me')
        .replace(/\b(resolve this things|resolve these things)\b/gi, 'address these priority items');
      highlights.push('Applied executive corporate phrasing and active sentence structure.');
      highlights.push('Elevated vocabulary while keeping message concise.');
      break;

    case 'Simple English':
      rewritten = rewritten
        .replace(/\b(revolutionizing the modern society)\b/gi, 'changing our world')
        .replace(/\b(automatisation)\b/gi, 'machines and computers')
        .replace(/\b(opportunitys|opportunities)\b/gi, 'new jobs')
        .replace(/\b(immediately)\b/gi, 'soon')
        .replace(/\b(furthermore|moreover)\b/gi, 'also');
      highlights.push('Simplified complex terminology into straightforward everyday words.');
      highlights.push('Shortened phrasing for effortless readability.');
      break;

    case 'Formal':
      rewritten = rewritten
        .replace(/\b(quick call)\b/gi, 'teleconference')
        .replace(/\b(can't)\b/gi, 'cannot')
        .replace(/\b(won't)\b/gi, 'will not')
        .replace(/\b(very)\b/gi, 'exceedingly')
        .replace(/\b(Thanks|Thank you very much)\b/gi, 'With sincere regards');
      highlights.push('Removed colloquialisms and expanded contractions.');
      highlights.push('Applied formal academic register and courteous closing.');
      break;

    case 'Friendly':
      rewritten = rewritten
        .replace(/\b(Dear Mr\. Smith|Dear Sir)\b/gi, 'Hi there,')
        .replace(/\b(I am writing to you about)\b/gi, 'Just wanted to reach out regarding')
        .replace(/\b(Thank you very much)\b/gi, 'Thanks a bunch and talk soon!');
      highlights.push('Adopted a warm, engaging, and collaborative conversational tone.');
      highlights.push('Enhanced approachability without losing the core message.');
      break;

    case 'Improve Clarity':
      rewritten = rewritten
        .replace(/\b(due to the fact that)\b/gi, 'because')
        .replace(/\b(in order to)\b/gi, 'to')
        .replace(/\b(at the present moment in time)\b/gi, 'now')
        .replace(/\b(there is several issue|there are several issues)\b/gi, 'several key issues exist');
      highlights.push('Eliminated conversational filler and tightened sentence rhythm.');
      highlights.push('Sharpened main points for immediate clarity.');
      break;
  }

  return {
    rewrittenText: rewritten,
    highlights,
  };
}
