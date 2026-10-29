import { GrammarCheckResult, GrammarIssue, RewriteTone } from '../types';

interface Rule {
  regex: RegExp;
  category: 'Grammar' | 'Spelling' | 'Punctuation' | 'Capitalization' | 'Clarity';
  replacement: string | ((match: string, ...groups: any[]) => string);
  explanation: string;
}

const RULES: Rule[] = [
  // ==========================================
  // 1. SUBJECT-VERB AGREEMENT & TENSE RULES
  // ==========================================
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
    regex: /\b(she|he|it|everyone|someone|everybody|nobody|each)\s+(don't|dont)\b/gi,
    category: 'Grammar',
    replacement: "$1 doesn't",
    explanation: 'Third-person singular subjects require "doesn\'t" instead of "don\'t".',
  },
  {
    regex: /\b(she|he|it)\s+(do\s+not)\b/gi,
    category: 'Grammar',
    replacement: '$1 does not',
    explanation: 'Third-person singular subjects require "does not" instead of "do not".',
  },
  {
    regex: /\b(she|he|it)\s+(dont\s+knows?|don't\s+knows?)\b/gi,
    category: 'Grammar',
    replacement: "$1 doesn't know",
    explanation: 'Use "$1 doesn\'t know" for third-person singular subjects.',
  },
  {
    regex: /\b(don't|dont|doesn't|doesnt|didnt|didn't)\s+(knows)\b/gi,
    category: 'Grammar',
    replacement: "$1 know",
    explanation: 'Auxiliary "do/does/did" must be followed by base form "know".',
  },
  {
    regex: /\b(i|we|you|they)\s+(has)\b/gi,
    category: 'Grammar',
    replacement: '$1 have',
    explanation: 'Use auxiliary verb "have" with subjects I, we, you, and they.',
  },
  {
    regex: /\b(they|we|you)\s+(was)\b/gi,
    category: 'Grammar',
    replacement: '$1 were',
    explanation: 'Plural subjects and "you" take the past tense verb "were".',
  },
  {
    regex: /\b(he|she|it)\s+(were)\b/gi,
    category: 'Grammar',
    replacement: '$1 was',
    explanation: 'Singular third-person subject takes the past tense verb "was".',
  },
  {
    regex: /\b(i\s+am|we\s+are|he\s+is|she\s+is|they\s+are)\s+(agree)\b/gi,
    category: 'Grammar',
    replacement: (_m, subj) => {
      const s = subj.toLowerCase();
      if (s.includes('he') || s.includes('she')) return `${subj.split(' ')[0]} agrees`;
      return `${subj.split(' ')[0]} agree`;
    },
    explanation: 'Say "I agree" or "he agrees" instead of "am/is/are agree".',
  },
  {
    regex: /\b(he|she|it)\s+(go)\s+(to)\b/gi,
    category: 'Grammar',
    replacement: '$1 goes to',
    explanation: 'Third-person singular present takes "goes".',
  },
  {
    regex: /\b(he|she|it)\s+(want)\s+(to)\b/gi,
    category: 'Grammar',
    replacement: '$1 wants to',
    explanation: 'Third-person singular present takes "wants to".',
  },
  {
    regex: /\b(he|she|it)\s+(like)\s+(apples?|to|playing|reading|music)\b/gi,
    category: 'Grammar',
    replacement: '$1 likes $2',
    explanation: 'Third-person singular takes "likes".',
  },
  {
    regex: /\b(did|didn't|didnt)\s+(went)\b/gi,
    category: 'Grammar',
    replacement: '$1 go',
    explanation: 'Auxiliary "did" takes the base verb "go", not past tense "went".',
  },
  {
    regex: /\b(did|didn't|didnt)\s+(saw)\b/gi,
    category: 'Grammar',
    replacement: '$1 see',
    explanation: 'Auxiliary "did" takes the base verb "see", not past tense "saw".',
  },
  {
    regex: /\b(did|didn't|didnt)\s+(came)\b/gi,
    category: 'Grammar',
    replacement: '$1 come',
    explanation: 'Auxiliary "did" takes the base verb "come".',
  },
  {
    regex: /\b(did|didn't|didnt)\s+(knew)\b/gi,
    category: 'Grammar',
    replacement: '$1 know',
    explanation: 'Auxiliary "did" takes the base verb "know".',
  },
  {
    regex: /\b(did|didn't|didnt)\s+(ate)\b/gi,
    category: 'Grammar',
    replacement: '$1 eat',
    explanation: 'Auxiliary "did" takes the base verb "eat".',
  },
  {
    regex: /\b(did|didn't|didnt)\s+(wrote)\b/gi,
    category: 'Grammar',
    replacement: '$1 write',
    explanation: 'Auxiliary "did" takes the base verb "write".',
  },
  {
    regex: /\b(could|should|would|must|might)\s+(of)\b/gi,
    category: 'Grammar',
    replacement: '$1 have',
    explanation: 'Use auxiliary verb "have" (e.g. "could have"), not preposition "of".',
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

  // ==========================================
  // 2. DOUBLE NEGATIVES & COMPARATIVES
  // ==========================================
  {
    regex: /\b(don't|dont|doesn't|doesnt|didn't|didnt|can't|cant)\s+(know|have|see|do|hear|say|need)\s+(nothing)\b/gi,
    category: 'Grammar',
    replacement: '$1 $2 anything',
    explanation: 'Avoid double negatives: use "anything" instead of "nothing" with negative auxiliaries.',
  },
  {
    regex: /\b(don't|dont|doesn't|doesnt|didn't|didnt|can't|cant)\s+(know|have|see|meet)\s+(nobody|no\s+one)\b/gi,
    category: 'Grammar',
    replacement: '$1 $2 anybody',
    explanation: 'Avoid double negatives: use "anybody" instead of "nobody" with negative auxiliaries.',
  },
  {
    regex: /\bmore\s+(better)\b/gi,
    category: 'Grammar',
    replacement: 'better',
    explanation: '"Better" is already comparative; "more better" is a double comparative.',
  },
  {
    regex: /\bmore\s+(easier)\b/gi,
    category: 'Grammar',
    replacement: 'easier',
    explanation: '"Easier" is already comparative; omit "more".',
  },
  {
    regex: /\bmore\s+(faster)\b/gi,
    category: 'Grammar',
    replacement: 'faster',
    explanation: '"Faster" is already comparative; omit "more".',
  },
  {
    regex: /\bmore\s+(cheaper)\b/gi,
    category: 'Grammar',
    replacement: 'cheaper',
    explanation: '"Cheaper" is already comparative; omit "more".',
  },
  {
    regex: /\bmost\s+(best)\b/gi,
    category: 'Grammar',
    replacement: 'best',
    explanation: '"Best" is already superlative; omit "most".',
  },

  // ==========================================
  // 3. HOMOPHONES & CONFUSED WORDS
  // ==========================================
  {
    regex: /\btheir\s+(is|are|was|were|will|can|could|should)\b/gi,
    category: 'Grammar',
    replacement: 'there $1',
    explanation: 'Use existential "there" (e.g. "there is", "there are") instead of possessive "their".',
  },
  {
    regex: /\b(when|if)\s+(your)\s+(available|ready|free|done)\b/gi,
    category: 'Grammar',
    replacement: "$1 you're $3",
    explanation: 'Contraction "you\'re" (you are) is needed here, not possessive "your".',
  },
  {
    regex: /\byour\s+(welcome|right|wrong|invited|beautiful|the\s+best)\b/gi,
    category: 'Grammar',
    replacement: "you're $1",
    explanation: 'Use contraction "you\'re" (you are) rather than possessive "your".',
  },
  {
    regex: /\b(better|worse|more|less|faster|slower|bigger|smaller|higher|lower|older|younger|earlier|later|rather)\s+(then)\b/gi,
    category: 'Grammar',
    replacement: '$1 than',
    explanation: 'Use comparison conjunction "than", not temporal adverb "then".',
  },
  {
    regex: /\bto\s+(much|many|late|early|fast|slow|expensive|difficult|hard|tired|busy|far)\b/gi,
    category: 'Grammar',
    replacement: 'too $1',
    explanation: 'Use adverb "too" (excessively), not preposition "to".',
  },
  {
    regex: /\b(me)\s+(to)\b/gi,
    category: 'Grammar',
    replacement: 'me too',
    explanation: 'Use "too" meaning "also": "me too".',
  },
  {
    regex: /\b(loose)\s+(weight|money|time|my|your|his|her|their|our|hope)\b/gi,
    category: 'Spelling',
    replacement: 'lose $2',
    explanation: 'Use "lose" (misplace/diminish); "loose" means not tight.',
  },
  {
    regex: /\b(going\s+to|gonna|will)\s+(loose)\b/gi,
    category: 'Spelling',
    replacement: '$1 lose',
    explanation: 'Use verb "lose", not adjective "loose".',
  },
  {
    regex: /\b(side)\s+(affects)\b/gi,
    category: 'Spelling',
    replacement: 'side effects',
    explanation: 'The noun form is "effect"; use "side effects".',
  },

  // ==========================================
  // 4. MISSING APOSTROPHES IN CONTRACTIONS
  // ==========================================
  {
    regex: /\bdont\b/gi,
    category: 'Punctuation',
    replacement: "don't",
    explanation: 'Missing apostrophe in contraction "don\'t".',
  },
  {
    regex: /\bdoesnt\b/gi,
    category: 'Punctuation',
    replacement: "doesn't",
    explanation: 'Missing apostrophe in contraction "doesn\'t".',
  },
  {
    regex: /\bdidnt\b/gi,
    category: 'Punctuation',
    replacement: "didn't",
    explanation: 'Missing apostrophe in contraction "didn\'t".',
  },
  {
    regex: /\bcant\b/gi,
    category: 'Punctuation',
    replacement: "can't",
    explanation: 'Missing apostrophe in contraction "can\'t".',
  },
  {
    regex: /\bwont\b/gi,
    category: 'Punctuation',
    replacement: "won't",
    explanation: 'Missing apostrophe in contraction "won\'t".',
  },
  {
    regex: /\bisnt\b/gi,
    category: 'Punctuation',
    replacement: "isn't",
    explanation: 'Missing apostrophe in contraction "isn\'t".',
  },
  {
    regex: /\barent\b/gi,
    category: 'Punctuation',
    replacement: "aren't",
    explanation: 'Missing apostrophe in contraction "aren\'t".',
  },
  {
    regex: /\bwasnt\b/gi,
    category: 'Punctuation',
    replacement: "wasn't",
    explanation: 'Missing apostrophe in contraction "wasn\'t".',
  },
  {
    regex: /\bwerent\b/gi,
    category: 'Punctuation',
    replacement: "weren't",
    explanation: 'Missing apostrophe in contraction "weren\'t".',
  },
  {
    regex: /\bhavent\b/gi,
    category: 'Punctuation',
    replacement: "haven't",
    explanation: 'Missing apostrophe in contraction "haven\'t".',
  },
  {
    regex: /\bhasnt\b/gi,
    category: 'Punctuation',
    replacement: "hasn't",
    explanation: 'Missing apostrophe in contraction "hasn\'t".',
  },
  {
    regex: /\bhadnt\b/gi,
    category: 'Punctuation',
    replacement: "hadn't",
    explanation: 'Missing apostrophe in contraction "hadn\'t".',
  },
  {
    regex: /\bcouldnt\b/gi,
    category: 'Punctuation',
    replacement: "couldn't",
    explanation: 'Missing apostrophe in contraction "couldn\'t".',
  },
  {
    regex: /\bshouldnt\b/gi,
    category: 'Punctuation',
    replacement: "shouldn't",
    explanation: 'Missing apostrophe in contraction "shouldn\'t".',
  },
  {
    regex: /\bwouldnt\b/gi,
    category: 'Punctuation',
    replacement: "wouldn't",
    explanation: 'Missing apostrophe in contraction "wouldn\'t".',
  },
  {
    regex: /\bthats\b/gi,
    category: 'Punctuation',
    replacement: "that's",
    explanation: 'Missing apostrophe in contraction "that\'s".',
  },
  {
    regex: /\bwhats\b/gi,
    category: 'Punctuation',
    replacement: "what's",
    explanation: 'Missing apostrophe in contraction "what\'s".',
  },
  {
    regex: /\btheres\b/gi,
    category: 'Punctuation',
    replacement: "there's",
    explanation: 'Missing apostrophe in contraction "there\'s".',
  },
  {
    regex: /\bheres\b/gi,
    category: 'Punctuation',
    replacement: "here's",
    explanation: 'Missing apostrophe in contraction "here\'s".',
  },
  {
    regex: /\byoure\b/gi,
    category: 'Punctuation',
    replacement: "you're",
    explanation: 'Missing apostrophe in contraction "you\'re".',
  },
  {
    regex: /\btheyre\b/gi,
    category: 'Punctuation',
    replacement: "they're",
    explanation: 'Missing apostrophe in contraction "they\'re".',
  },
  {
    regex: /\bweve\b/gi,
    category: 'Punctuation',
    replacement: "we've",
    explanation: 'Missing apostrophe in contraction "we\'ve".',
  },
  {
    regex: /\btheyve\b/gi,
    category: 'Punctuation',
    replacement: "they've",
    explanation: 'Missing apostrophe in contraction "they\'ve".',
  },
  {
    regex: /\byouve\b/gi,
    category: 'Punctuation',
    replacement: "you've",
    explanation: 'Missing apostrophe in contraction "you\'ve".',
  },
  {
    regex: /\b(im|Im)\b/g,
    category: 'Punctuation',
    replacement: "I'm",
    explanation: 'Missing apostrophe and capitalization in "I\'m".',
  },
  {
    regex: /\b(ive|Ive)\b/g,
    category: 'Punctuation',
    replacement: "I've",
    explanation: 'Missing apostrophe and capitalization in "I\'ve".',
  },
  {
    regex: /\bits\s+(a|an|the|very|good|great|bad|time|important|raining|clear|easy|hard|nice|my|your|our)\b/gi,
    category: 'Punctuation',
    replacement: "it's $1",
    explanation: 'Contraction "it\'s" (it is) requires an apostrophe.',
  },
  {
    regex: /\blets\s+(go|do|see|try|make|start|meet|talk|check|practice|play)\b/gi,
    category: 'Punctuation',
    replacement: "let's $1",
    explanation: 'Contraction "let\'s" (let us) requires an apostrophe.',
  },

  // ==========================================
  // 5. ARTICLES (A vs AN)
  // ==========================================
  {
    regex: /\ba\s+(apple|orange|egg|elephant|idea|hour|honest|opportunity|advancement|issue|item|error|email|accident|incident|option|overview|article|application)\b/gi,
    category: 'Grammar',
    replacement: 'an $1',
    explanation: 'Use the indefinite article "an" before vowel sounds.',
  },
  {
    regex: /\ban\s+(car|dog|cat|house|person|book|phone|table|chair|computer|user|university|uniform|unique|useful)\b/gi,
    category: 'Grammar',
    replacement: 'a $1',
    explanation: 'Use the indefinite article "a" before consonant sounds.',
  },

  // ==========================================
  // 6. COMMON SPELLING MISTAKES & TYPOS
  // ==========================================
  {
    regex: /\bgrammer\b/gi,
    category: 'Spelling',
    replacement: 'grammar',
    explanation: 'Misspelling: correct spelling is "grammar" with an "a".',
  },
  {
    regex: /\bpersent\b/gi,
    category: 'Spelling',
    replacement: 'percent',
    explanation: 'Misspelling: correct word is "percent" or "per cent".',
  },
  {
    regex: /\bdiffernt\b/gi,
    category: 'Spelling',
    replacement: 'different',
    explanation: 'Misspelling: correct spelling is "different".',
  },
  {
    regex: /\bautomatisation\b/gi,
    category: 'Spelling',
    replacement: 'automation',
    explanation: 'Word choice: "automation" is standard in modern English.',
  },
  {
    regex: /\bopportunitys\b/gi,
    category: 'Spelling',
    replacement: 'opportunities',
    explanation: 'Plural of "opportunity" ends in "-ies" ("opportunities").',
  },
  {
    regex: /\bdefinately\b/gi,
    category: 'Spelling',
    replacement: 'definitely',
    explanation: 'Misspelling: correct word is "definitely".',
  },
  {
    regex: /\bseperate\b/gi,
    category: 'Spelling',
    replacement: 'separate',
    explanation: 'Misspelling: correct spelling is "separate" (with an "a").',
  },
  {
    regex: /\brecieve\b/gi,
    category: 'Spelling',
    replacement: 'receive',
    explanation: 'Spelling rule: "i before e except after c" ("receive").',
  },
  {
    regex: /\buntill\b/gi,
    category: 'Spelling',
    replacement: 'until',
    explanation: 'Correct spelling is "until" with a single "l".',
  },
  {
    regex: /\baccomodate\b/gi,
    category: 'Spelling',
    replacement: 'accommodate',
    explanation: 'Correct spelling has double c and double m ("accommodate").',
  },
  {
    regex: /\bgoverment\b/gi,
    category: 'Spelling',
    replacement: 'government',
    explanation: 'Include the letter "n" from govern: "government".',
  },
  {
    regex: /\bthier\b/gi,
    category: 'Spelling',
    replacement: 'their',
    explanation: 'Correct spelling is "their".',
  },
  {
    regex: /\b(tommorow|tomorow)\b/gi,
    category: 'Spelling',
    replacement: 'tomorrow',
    explanation: 'Correct spelling is "tomorrow" (one m, two r\'s).',
  },
  {
    regex: /\balot\b/gi,
    category: 'Spelling',
    replacement: 'a lot',
    explanation: '"A lot" is always written as two separate words.',
  },
  {
    regex: /\boccured\b/gi,
    category: 'Spelling',
    replacement: 'occurred',
    explanation: 'Correct spelling has double r ("occurred").',
  },
  {
    regex: /\btruely\b/gi,
    category: 'Spelling',
    replacement: 'truly',
    explanation: 'Correct spelling drops the e: "truly".',
  },
  {
    regex: /\bwierd\b/gi,
    category: 'Spelling',
    replacement: 'weird',
    explanation: 'Exception to rule: spelled "weird" (e before i).',
  },
  {
    regex: /\benviroment\b/gi,
    category: 'Spelling',
    replacement: 'environment',
    explanation: 'Correct spelling includes the "n": "environment".',
  },
  {
    regex: /\bwich\b/gi,
    category: 'Spelling',
    replacement: 'which',
    explanation: 'Correct spelling is "which".',
  },
  {
    regex: /\b(neccessary|necesary)\b/gi,
    category: 'Spelling',
    replacement: 'necessary',
    explanation: 'Correct spelling: one c, double s ("necessary").',
  },
  {
    regex: /\bembarass\b/gi,
    category: 'Spelling',
    replacement: 'embarrass',
    explanation: 'Double r and double s: "embarrass".',
  },
  {
    regex: /\bmispell\b/gi,
    category: 'Spelling',
    replacement: 'misspell',
    explanation: 'Double s: "misspell".',
  },
  {
    regex: /\bcollegue\b/gi,
    category: 'Spelling',
    replacement: 'colleague',
    explanation: 'Correct spelling is "colleague".',
  },
  {
    regex: /\bsuprise\b/gi,
    category: 'Spelling',
    replacement: 'surprise',
    explanation: 'Include the first "r": "surprise".',
  },
  {
    regex: /\bbelive\b/gi,
    category: 'Spelling',
    replacement: 'believe',
    explanation: 'Correct spelling is "believe" (i before e).',
  },
  {
    regex: /\bacheive\b/gi,
    category: 'Spelling',
    replacement: 'achieve',
    explanation: 'Correct spelling is "achieve" (i before e).',
  },
  {
    regex: /\bcalender\b/gi,
    category: 'Spelling',
    replacement: 'calendar',
    explanation: 'Correct spelling ends in "-ar" ("calendar").',
  },
  {
    regex: /\b(recomended|recommand)\b/gi,
    category: 'Spelling',
    replacement: 'recommended',
    explanation: 'Single c, double m: "recommended".',
  },
  {
    regex: /\bsuccesful\b/gi,
    category: 'Spelling',
    replacement: 'successful',
    explanation: 'Double c and double s: "successful".',
  },
  {
    regex: /\bexperiance\b/gi,
    category: 'Spelling',
    replacement: 'experience',
    explanation: 'Correct spelling ends in "-ence": "experience".',
  },
  {
    regex: /\bknowlege\b/gi,
    category: 'Spelling',
    replacement: 'knowledge',
    explanation: 'Include the letter "d": "knowledge".',
  },

  // ==========================================
  // 7. CAPITALIZATION & PUNCTUATION SPACING
  // ==========================================
  {
    regex: /\b(i)\b/g,
    category: 'Capitalization',
    replacement: 'I',
    explanation: 'The pronoun "I" must always be capitalized.',
  },
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
    regex: /\s+([,.:;?!।])/g,
    category: 'Punctuation',
    replacement: '$1',
    explanation: 'Avoid spaces before punctuation marks.',
  },
  {
    regex: /([,.:;?!।])([a-zA-Z])/g,
    category: 'Punctuation',
    replacement: '$1 $2',
    explanation: 'Add a space after punctuation marks.',
  },

  // ==========================================
  // 8. BENGALI GRAMMAR & SPELLING (বাংলা ব্যাকরণ)
  // ==========================================
  {
    regex: /পাইছি/g,
    category: 'Grammar',
    replacement: 'পেয়েছি',
    explanation: 'সাধু/আঞ্চলিক রূপ "পাইছি"-এর পরিবর্তে প্রমিত চলিত রূপ "পেয়েছি" ব্যবহার করুন।',
  },
  {
    regex: /(খাইছি|খাইসি)/g,
    category: 'Grammar',
    replacement: 'খেয়েছি',
    explanation: 'আঞ্চলিক রূপের পরিবর্তে প্রমিত চলিত রূপ "খেয়েছি" লিখুন।',
  },
  {
    regex: /(যাইসি|গেসি|গেছি)/g,
    category: 'Grammar',
    replacement: 'গিয়েছি',
    explanation: 'প্রমিত চলিত রূপ হলো "গিয়েছি"।',
  },
  {
    regex: /চলিতেছে/g,
    category: 'Grammar',
    replacement: 'চলছে',
    explanation: 'চলিত গদ্যে সাধুরীতির "চলিতেছে"-এর জায়গায় "চলছে" লিখুন (সাধু ও চলিতের মিশ্রণ পরিহার)।',
  },
  {
    regex: /আসিতেছে/g,
    category: 'Grammar',
    replacement: 'আসছে',
    explanation: 'সাধু রূপ "আসিতেছে"-এর পরিবর্তে চলিত রূপ "আসছে" লিখুন।',
  },
  {
    regex: /(যাইতেছে|যাইতাছে)/g,
    category: 'Grammar',
    replacement: 'যাচ্ছে',
    explanation: 'প্রমিত চলিত রূপ হলো "যাচ্ছে"।',
  },
  {
    regex: /(যাইতেছি|যাইতাছি)/g,
    category: 'Grammar',
    replacement: 'যাচ্ছি',
    explanation: 'প্রমিত চলিত রূপ হলো "যাচ্ছি"।',
  },
  {
    regex: /বলিতেছে/g,
    category: 'Grammar',
    replacement: 'বলছে',
    explanation: 'সাধু রূপ "বলিতেছে"-এর পরিবর্তে চলিত "বলছে" ব্যবহার করুন।',
  },
  {
    regex: /দেখিতে/g,
    category: 'Grammar',
    replacement: 'দেখতে',
    explanation: 'চলিত গদ্যে "দেখিতে"-এর স্থলে "দেখতে" লিখুন।',
  },
  {
    regex: /করিতে/g,
    category: 'Grammar',
    replacement: 'করতে',
    explanation: 'চলিত গদ্যে "করিতে"-এর স্থলে "করতে" লিখুন।',
  },
  {
    regex: /সমস্য\b/g,
    category: 'Spelling',
    replacement: 'সমস্যা',
    explanation: 'বানান ভুল: সঠিক প্রমিত বানান হলো "সমস্যা" (আ-কার যুক্ত)।',
  },
  {
    regex: /দূত\s+সম্ভব/g,
    category: 'Spelling',
    replacement: 'দ্রুত সম্ভব',
    explanation: 'শীঘ্র বোঝাতে "দ্রুত" (র-ফলা সহ) ব্যবহৃত হয়। "দূত" অর্থ বার্তাবাহক।',
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
  {
    regex: /মূহুর্ত/g,
    category: 'Spelling',
    replacement: 'মুহূর্ত',
    explanation: 'সঠিক বানান হ্রস্ব-উ ও দীর্ঘ-ঊকারযুক্ত: "মুহূর্ত"।',
  },
  {
    regex: /আইনজীবি/g,
    category: 'Spelling',
    replacement: 'আইনজীবী',
    explanation: 'পেশাজীবী প্রত্যয়ে দীর্ঘ-ঈকার ব্যবহৃত হয়: "আইনজীবী"।',
  },
  {
    regex: /দারিদ্রতা/g,
    category: 'Grammar',
    replacement: 'দারিদ্র্য',
    explanation: 'ব্যাকরণগতভাবে "দারিদ্র্য" অথবা "দরিদ্রতা" শুদ্ধ, "দারিদ্রতা" অশুদ্ধ।',
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
        score -= 6;
      }
    }
  }

  score = Math.max(35, Math.min(100, score));
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

  // Clean double spaces
  corrected = corrected.replace(/[ \t]{2,}/g, ' ');

  // Sentence capitalization check
  corrected = corrected.replace(/(^|[.!?।]\s+)([a-z])/g, (_m, p1, p2) => p1 + p2.toUpperCase());

  // Capitalize isolated 'i'
  corrected = corrected.replace(/\b(i)\b/g, 'I');

  // Deduplicate improvements
  const uniqueImprovements = Array.from(new Set(improvements)).slice(0, 6);
  if (uniqueImprovements.length === 0) {
    uniqueImprovements.push('Checked sentence structure, agreement, and spelling. Text is in great shape.');
  }

  return {
    correctedText: corrected,
    improvements: uniqueImprovements,
  };
}

export function runLocalRewrite(text: string, tone: RewriteTone): { rewrittenText: string; highlights: string[] } {
  const { correctedText } = runLocalGrammarCorrect(text);
  let rewritten = correctedText;
  const highlights: string[] = [];

  switch (tone) {
    case 'Professional':
      rewritten = rewritten
        .replace(/\b(I am write to you|I am writing to you)\b/gi, 'I am writing to formally update you')
        .replace(/\b(very good news)\b/gi, 'a promising milestone')
        .replace(/\b(let me know)\b/gi, 'kindly inform me')
        .replace(/\b(resolve this things|resolve these things|resolve these issues)\b/gi, 'address these priority items')
        .replace(/\b(quick call)\b/gi, 'brief discussion')
        .replace(/\b(thanks|thank you)\b/gi, 'Thank you for your consideration');
      highlights.push('Applied executive corporate phrasing and active sentence structure.');
      highlights.push('Elevated vocabulary while keeping message concise.');
      break;

    case 'Simple English':
      rewritten = rewritten
        .replace(/\b(revolutionizing the modern society)\b/gi, 'changing our world')
        .replace(/\b(automatisation|automation)\b/gi, 'machines and computers')
        .replace(/\b(opportunitys|opportunities)\b/gi, 'new jobs')
        .replace(/\b(immediately)\b/gi, 'soon')
        .replace(/\b(furthermore|moreover)\b/gi, 'also')
        .replace(/\b(utilize|utilises?)\b/gi, 'use')
        .replace(/\b(subsequently)\b/gi, 'later');
      highlights.push('Simplified complex terminology into straightforward everyday words.');
      highlights.push('Shortened phrasing for effortless readability.');
      break;

    case 'Formal':
      rewritten = rewritten
        .replace(/\b(quick call)\b/gi, 'teleconference')
        .replace(/\b(can't)\b/gi, 'cannot')
        .replace(/\b(won't)\b/gi, 'will not')
        .replace(/\b(don't)\b/gi, 'do not')
        .replace(/\b(doesn't)\b/gi, 'does not')
        .replace(/\b(very)\b/gi, 'exceedingly')
        .replace(/\b(Thanks|Thank you very much)\b/gi, 'With sincere regards');
      highlights.push('Removed colloquialisms and expanded contractions.');
      highlights.push('Applied formal academic register and courteous closing.');
      break;

    case 'Friendly':
      rewritten = rewritten
        .replace(/\b(Dear Mr\. Smith|Dear Sir|Dear Madam)\b/gi, 'Hi there,')
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
