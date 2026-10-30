import React, { useState } from 'react';
import {
  BookOpen,
  Keyboard,
  Target,
  Sparkles,
  Zap,
  Globe2,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
} from 'lucide-react';

export type GuideTopicId =
  | 'what-is-speed'
  | 'how-to-improve'
  | 'bangla-guide'
  | 'english-guide'
  | 'finger-placement'
  | '10-tips'
  | 'conjuncts'
  | 'faq';

interface TypingGuidesSectionProps {
  initialTopic?: GuideTopicId;
}

export const TypingGuidesSection: React.FC<TypingGuidesSectionProps> = ({
  initialTopic = 'what-is-speed',
}) => {
  const [activeTopic, setActiveTopic] = useState<GuideTopicId>(initialTopic);
  const [conjunctQuery, setConjunctQuery] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeFingerKey, setActiveFingerKey] = useState<string | null>(null);

  // Bengali Conjuncts Dataset with Bijoy and Avro typing keys
  const CONJUNCT_LIST = [
    { conjunct: 'ক্ষ', breakdown: 'ক + ্ + ষ', bijoy: 'J + G + Shift+N', avro: 'kSh / kkh', example: 'ক্ষমা, পরীক্ষা, বৃক্ষ' },
    { conjunct: 'জ্ঞ', breakdown: 'জ + ্ + ঞ', bijoy: 'U + G + Shift+I', avro: 'jNg / jG', example: 'জ্ঞান, বিজ্ঞ, অজ্ঞ' },
    { conjunct: 'ষ্ণ', breakdown: 'ষ + ্ + ণ', bijoy: 'Shift+N + G + Shift+B', avro: 'ShN', example: 'উষ্ণ, কৃষ্ণ, তৃষ্ণা' },
    { conjunct: 'ঙ্গ', breakdown: 'ঙ + ্ + গ', bijoy: 'Shift+Q + G + O', avro: 'Ng', example: 'গঙ্গা, অঙ্গ, সঙ্গী' },
    { conjunct: 'ঙ্ক', breakdown: 'ঙ + ্ + ক', bijoy: 'Shift+Q + G + J', avro: 'Nk', example: 'অঙ্ক, শঙ্কা, কলঙ্ক' },
    { conjunct: 'ঞ্চ', breakdown: 'ঞ + ্ + চ', bijoy: 'Shift+I + G + Y', avro: 'nc', example: 'অঞ্চল, মঞ্চ, চঞ্চল' },
    { conjunct: 'ঞ্জ', breakdown: 'ঞ + ্ + জ', bijoy: 'Shift+I + G + U', avro: 'nj', example: 'গুঞ্জন, রঞ্জন, ব্যঞ্জন' },
    { conjunct: 'ত্র', breakdown: 'ত + ্ + র-ফলা', bijoy: 'K + G + Z', avro: 'tr', example: 'ছাত্র, পাত্র, যাত্রা' },
    { conjunct: 'ক্র', breakdown: 'ক + র-ফলা', bijoy: 'J + Z', avro: 'kr', example: 'চক্র, বক্র, বিক্রম' },
    { conjunct: 'গ্র', breakdown: 'গ + র-ফলা', bijoy: 'O + Z', avro: 'gr', example: 'গ্রাম, অগ্র, গ্রহ' },
    { conjunct: 'প্র', breakdown: 'প + র-ফলা', bijoy: 'R + Z', avro: 'pr', example: 'প্রথম, প্রমাণ, প্রচেষ্টা' },
    { conjunct: 'ক্ত', breakdown: 'ক + ্ + ত', bijoy: 'J + G + K', avro: 'kt', example: 'রক্ত, ভক্তি, শক্তি' },
    { conjunct: 'দ্ধ', breakdown: 'দ + ্ + ধ', bijoy: 'L + G + Shift+L', avro: 'ddh', example: 'যুদ্ধ, বুদ্ধি, শুদ্ধ' },
    { conjunct: 'হ্ম', breakdown: 'হ + ্ + ম', bijoy: 'I + G + M', avro: 'hm', example: 'ব্রাহ্মণ, ব্রহ্মাণ্ড' },
    { conjunct: 'হ্ন', breakdown: 'হ + ্ + ন (দন্ত্য)', bijoy: 'I + G + B', avro: 'hn', example: 'চিহ্ন, মধ্যাহ্ন' },
    { conjunct: 'হ্ণ', breakdown: 'হ + ্ + ণ (মূর্ধন্য)', bijoy: 'I + G + Shift+B', avro: 'hN', example: 'অপরাহ্ণ, সায়াহ্ণ' },
    { conjunct: 'প্ত', breakdown: 'প + ্ + ত', bijoy: 'R + G + K', avro: 'pt', example: 'সুপ্ত, ব্যাপ্ত, দীপ্ত' },
    { conjunct: 'ণ্ড', breakdown: 'ণ + ্ + ড', bijoy: 'Shift+B + G + E', avro: 'ND', example: 'কাণ্ড, ভণ্ড, মণ্ডল' },
    { conjunct: 'দ্ভ', breakdown: 'দ + ্ + ভ', bijoy: 'L + G + Shift+H', avro: 'dbh', example: 'উদ্ভিদ, অদ্ভুত, সদ্ভাব' },
    { conjunct: 'স্থ', breakdown: 'স + ্ + থ', bijoy: 'N + G + Shift+K', avro: 'sth', example: 'স্থান, স্বাস্থ্য, অবস্থা' },
  ];

  const filteredConjuncts = CONJUNCT_LIST.filter(
    (item) =>
      item.conjunct.includes(conjunctQuery) ||
      item.breakdown.includes(conjunctQuery) ||
      item.bijoy.toLowerCase().includes(conjunctQuery.toLowerCase()) ||
      item.avro.toLowerCase().includes(conjunctQuery.toLowerCase()) ||
      item.example.includes(conjunctQuery)
  );

  const FAQ_LIST = [
    {
      q: 'টাচ টাইপিং (Touch Typing) পুরোপুরি শিখতে কত দিন সময় লাগে?',
      a: 'প্রতিদিন গড়ে ২০ থেকে ৩০ মিনিট নিয়ম মেনে অনুশীলন করলে সাধারণ একজন শিক্ষার্থী ২ থেকে ৩ সপ্তাহের মধ্যে না তাকিয়ে টাইপ করার বেসিক মাসল মেমোরি তৈরি করে ফেলতে পারেন। ৬০+ WPM গতি অর্জনের জন্য সাধারণত ১ থেকে ২ মাসের ধারাবাহিক অনুশীলনের প্রয়োজন হয়। মূল চাবিকাঠি হলো কখনোই কিবোর্ডের দিকে না তাকানো।',
    },
    {
      q: 'WPM এবং CPM এর মধ্যে পার্থক্য কী? কোনটি বেশি গুরুত্বপূর্ণ?',
      a: 'WPM (Words Per Minute) হলো প্রতি মিনিটে টাইপ করা শব্দের সংখ্যা (প্রতি ৫টি ক্যারেক্টারকে ১টি শব্দ ধরা হয়)। CPM (Characters Per Minute) বা KPH হলো প্রতি মিনিটে টাইপ করা মোট ক্যারেক্টার বা অক্ষরের সংখ্যা। বৈশ্বিক মানদণ্ডে টাইপিং গতির জন্য WPM সর্বাধিক প্রচলিত, তবে সরকারি ডাটা এন্ট্রি ও ব্যাংকিং টেস্টে CPM বা KPH-ও চেক করা হয়। WPM = CPM ÷ 5।',
    },
    {
      q: 'আমার টাইপিং গতি ৫০ WPM-এ আটকে আছে, কীভাবে গতি আরও বাড়াব?',
      a: 'গতি এক জায়গায় স্থির হয়ে যাওয়াকে "Typing Plateau" বলা হয়। এটি ভাঙার ৩টি বৈজ্ঞানিক কৌশল: (১) একাগ্রভাবে কেবল নির্ভুলতায় নজর দিন (৯৮%+ Accuracy লক্ষ্য রাখুন), (২) পড়ার গতি বাড়িয়ে একবারে ৩-৪ শব্দ সামনে পড়ার অভ্যাস করুন (Word Chunking), এবং (৩) আমাদের Arcade Games ও 15-Second Sprint-এর মতো হাই-ইনটেনসিটি বার্স্ট সেশনে অংশ নিন।',
    },
    {
      q: 'বাংলায় দ্রুত টাইপ করার জন্য অভ্র নাকি বিজয় — কোনটি সেরা?',
      a: 'ব্যবহারিক ক্ষেত্রে দুটোই অত্যন্ত মূল্যবান। সাধারণ সামাজিক যোগাযোগ মাধ্যম, ব্লগিং এবং অনলাইন কনটেন্ট রচনার জন্য অভ্র (Avro Phonetic) অত্যন্ত দ্রুত এবং সহজ। তবে বাংলাদেশ সরকারের বিভিন্ন দাপ্তরিক কাজ, মুদ্রণ প্রকাশনা, প্রেস এবং অফিসিয়াল ডাটা এন্ট্রির জন্য বিজয় কিবোর্ড লেআউট জানা বাধ্যতামূলক। টাইপমাস্টারে আপনি দুটি মাধ্যমেই অনুশীলন করার সুবিধা পাবেন।',
    },
    {
      q: 'কীবোর্ডে টাইপ করার সময় কব্জি বা আঙুলে ব্যথা এড়াতে কী করা উচিত?',
      a: 'টাইপিংয়ের সময় কব্জি টেবিলের ওপর চেপে রাখবেন না; কব্জি সবসময় ভাসমান রাখুন যাতে ১০টি আঙুল মুক্তভাবে যেকোনো কিতে পৌঁছাতে পারে। চেয়ারে সোজা হয়ে বসুন এবং প্রতি ৩০ মিনিট পরপর হাত ও আঙুলগুলো প্রসারিত (Stretch) করে ৫ মিনিটের বিরতি নিন। এটি কার্পাল টানেল সিন্ড্রোম (Carpal Tunnel Syndrome) ও পেশির ক্লান্তি দূর করে।',
    },
    {
      q: 'মেকানিক্যাল কিবোর্ড কি সত্যিই টাইপিং স্পিড বাড়ায়?',
      a: 'মেকানিক্যাল কিবোর্ডে প্রতিটি কীতে আলাদা ফিজিক্যাল সুইচ থাকে, যা সুনির্দিষ্ট ট্যাকটাইল ফিডব্যাক প্রদান করে। ফলে কীবোর্ড বাটন পুরোপুরি নিচে চাপার আগেই কি-রেজিস্টার হয়ে যায় (Actuation Point), যা আঙুলের ক্লান্তি কমায় এবং দীর্ঘ মেয়াদে ৫-১৫% গতি বৃদ্ধিতে সহায়তা করে। তবে সঠিক আঙুলের অবস্থান জানা মেকানিক্যাল কিবোর্ডের চেয়েও বেশি গুরুত্বপূর্ণ।',
    },
  ];

  interface KeyConfig {
    label: string;
    finger: string;
    wide?: boolean;
    home?: boolean;
    bump?: boolean;
    spacebar?: boolean;
  }

  // Visual Keyboard Keys with Assigned Fingers and Colors
  const KEYBOARD_ROWS: KeyConfig[][] = [
    [
      { label: '`', finger: 'left-pinky' },
      { label: '1', finger: 'left-pinky' },
      { label: '2', finger: 'left-ring' },
      { label: '3', finger: 'left-middle' },
      { label: '4', finger: 'left-index' },
      { label: '5', finger: 'left-index' },
      { label: '6', finger: 'right-index' },
      { label: '7', finger: 'right-index' },
      { label: '8', finger: 'right-middle' },
      { label: '9', finger: 'right-ring' },
      { label: '0', finger: 'right-pinky' },
      { label: '-', finger: 'right-pinky' },
      { label: '=', finger: 'right-pinky' },
      { label: 'Backspace', finger: 'right-pinky', wide: true },
    ],
    [
      { label: 'Tab', finger: 'left-pinky', wide: true },
      { label: 'Q', finger: 'left-pinky' },
      { label: 'W', finger: 'left-ring' },
      { label: 'E', finger: 'left-middle' },
      { label: 'R', finger: 'left-index' },
      { label: 'T', finger: 'left-index' },
      { label: 'Y', finger: 'right-index' },
      { label: 'U', finger: 'right-index' },
      { label: 'I', finger: 'right-middle' },
      { label: 'O', finger: 'right-ring' },
      { label: 'P', finger: 'right-pinky' },
      { label: '[', finger: 'right-pinky' },
      { label: ']', finger: 'right-pinky' },
      { label: '\\', finger: 'right-pinky' },
    ],
    [
      { label: 'Caps', finger: 'left-pinky', wide: true },
      { label: 'A', finger: 'left-pinky', home: true },
      { label: 'S', finger: 'left-ring', home: true },
      { label: 'D', finger: 'left-middle', home: true },
      { label: 'F', finger: 'left-index', home: true, bump: true },
      { label: 'G', finger: 'left-index' },
      { label: 'H', finger: 'right-index' },
      { label: 'J', finger: 'right-index', home: true, bump: true },
      { label: 'K', finger: 'right-middle', home: true },
      { label: 'L', finger: 'right-ring', home: true },
      { label: ';', finger: 'right-pinky', home: true },
      { label: "'", finger: 'right-pinky' },
      { label: 'Enter', finger: 'right-pinky', wide: true },
    ],
    [
      { label: 'Shift', finger: 'left-pinky', wide: true },
      { label: 'Z', finger: 'left-pinky' },
      { label: 'X', finger: 'left-ring' },
      { label: 'C', finger: 'left-middle' },
      { label: 'V', finger: 'left-index' },
      { label: 'B', finger: 'left-index' },
      { label: 'N', finger: 'right-index' },
      { label: 'M', finger: 'right-index' },
      { label: ',', finger: 'right-middle' },
      { label: '.', finger: 'right-ring' },
      { label: '/', finger: 'right-pinky' },
      { label: 'Shift', finger: 'right-pinky', wide: true },
    ],
    [
      { label: 'Spacebar (উভয় হাতের বৃদ্ধাঙ্গুল / Both Thumbs)', finger: 'thumbs', spacebar: true },
    ],
  ];

  const FINGER_COLOR_MAP: Record<string, { bg: string; text: string; name: string; hand: string }> = {
    'left-pinky': { bg: 'bg-rose-500/20 border-rose-500/60 text-rose-300', text: 'text-rose-400', name: 'বাম হাতের কনিষ্ঠা (Left Pinky)', hand: 'বাম হাত' },
    'left-ring': { bg: 'bg-amber-500/20 border-amber-500/60 text-amber-300', text: 'text-amber-400', name: 'বাম হাতের অনামিকা (Left Ring)', hand: 'বাম হাত' },
    'left-middle': { bg: 'bg-yellow-500/20 border-yellow-500/60 text-yellow-300', text: 'text-yellow-400', name: 'বাম হাতের মধ্যমা (Left Middle)', hand: 'বাম হাত' },
    'left-index': { bg: 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300', text: 'text-emerald-400', name: 'বাম হাতের তর্জনী (Left Index)', hand: 'বাম হাত' },
    'right-index': { bg: 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300', text: 'text-cyan-400', name: 'ডান হাতের তর্জনী (Right Index)', hand: 'ডান হাত' },
    'right-middle': { bg: 'bg-sky-500/20 border-sky-500/60 text-sky-300', text: 'text-sky-400', name: 'ডান হাতের মধ্যমা (Right Middle)', hand: 'ডান হাত' },
    'right-ring': { bg: 'bg-purple-500/20 border-purple-500/60 text-purple-300', text: 'text-purple-400', name: 'ডান হাতের অনামিকা (Right Ring)', hand: 'ডান হাত' },
    'right-pinky': { bg: 'bg-fuchsia-500/20 border-fuchsia-500/60 text-fuchsia-300', text: 'text-fuchsia-400', name: 'ডান হাতের কনিষ্ঠা (Right Pinky)', hand: 'ডান হাত' },
    'thumbs': { bg: 'bg-[#d7ff64]/20 border-[#d7ff64]/60 text-[#d7ff64]', text: 'text-[#d7ff64]', name: 'উভয় হাতের বৃদ্ধাঙ্গুল (Both Thumbs)', hand: 'উভয় হাত' },
  };

  return (
    <section id="typing-knowledge-base" className="space-y-8 py-10 scroll-mt-20">
      {/* Header */}
      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-4 py-1.5 text-xs font-bold tracking-wide text-[#d7ff64]">
          <BookOpen className="h-4 w-4" />
          <span>ORIGINAL MASTERCLASS & TYPING ACADEMY</span>
        </div>
        <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight">
          Comprehensive <span className="text-[#d7ff64]">Typing Knowledge Base</span>
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-[#a4a69d] sm:text-base leading-relaxed">
          টাইপিং গতি বৃদ্ধি, বৈজ্ঞানিক টাচ টাইপিং মেথড, বাংলা ও ইংরেজি কীবোর্ড লেআউট এবং সঠিক আঙুলের পজিশন সম্পর্কিত পূর্ণাঙ্গ ও প্রামাণ্য গাইডলাইন।
        </p>
      </div>

      {/* Topics Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-6">
        {[
          { id: 'what-is-speed', label: '১. What Is Typing Speed?', icon: Target },
          { id: 'how-to-improve', label: '২. How to Improve Speed', icon: TrendingUp },
          { id: 'bangla-guide', label: '৩. Bangla Typing Guide', icon: Globe2 },
          { id: 'english-guide', label: '৪. English Typing Guide', icon: Keyboard },
          { id: 'finger-placement', label: '৫. Finger Placement Guide', icon: Layers },
          { id: '10-tips', label: '৬. 10 Tips to Increase WPM', icon: Zap },
          { id: 'conjuncts', label: '৭. যুক্তবর্ণ ডিকশনারি', icon: Sparkles },
          { id: 'faq', label: '৮. সাধারণ জিজ্ঞাসা (FAQ)', icon: HelpCircle },
        ].map((item) => {
          const Icon = item.icon;
          const active = activeTopic === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTopic(item.id as GuideTopicId)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
                active
                  ? 'border border-[#d7ff64]/60 bg-[#d7ff64] text-[#111310] shadow-[0_0_20px_rgba(215,255,100,0.3)]'
                  : 'border border-white/10 bg-[#161814] text-gray-300 hover:border-white/20 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Guide Content Display */}
      <div className="rounded-3xl border border-white/10 bg-[#161814] p-6 sm:p-10 shadow-2xl relative">
        {/* ========================================================= */}
        {/* TOPIC 1: What Is Typing Speed?                            */}
        {/* ========================================================= */}
        {activeTopic === 'what-is-speed' && (
          <article className="space-y-6 text-gray-300 leading-relaxed">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                LESSON 01 • THE FUNDAMENTALS
              </span>
              <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                What Is Typing Speed? WPM, CPM এবং Accuracy কী?
              </h3>
            </div>

            <p>
              টাইপিং স্পিড বা টাইপিংয়ের গতি হলো নির্দিষ্ট সময়ে একজন মানুষ কিবোর্ডে কতগুলো সঠিক শব্দ বা অক্ষর নিখুঁতভাবে ইনপুট দিতে পারেন তার গাণিতিক পরিমাপ। আধুনিক কম্পিউটার প্রযুক্তিতে কর্মদক্ষতা যাচাইয়ের জন্য টাইপিং স্পিড একটি অপরিহার্য যোগ্যতা।
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5">
                <span className="text-xs font-bold text-[#d7ff64] uppercase tracking-wider">
                  মৌলিক একক ১
                </span>
                <h4 className="mt-1 text-xl font-black text-white">Words Per Minute (WPM)</h4>
                <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                  আন্তর্জাতিক টাইপিং স্ট্যান্ডার্ড অনুসারে যেকোনো <strong>৫টি ক্যারেক্টারকে</strong> (বর্ণ, সংখ্যা, বিরামচিহ্ন এমনকি স্পেস সহ) ১টি আদর্শ "শব্দ" বা Word গণনা করা হয়।
                </p>
                <div className="mt-4 rounded-xl bg-white/5 p-3 text-xs font-mono text-[#d7ff64]">
                  WPM = (Total Characters / 5) ÷ Minutes
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  মৌলিক একক ২
                </span>
                <h4 className="mt-1 text-xl font-black text-white">Characters Per Minute (CPM)</h4>
                <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                  প্রতি এক মিনিটে কিবোর্ডে মোট কতগুলো আলাদা কি বা ক্যারেক্টার প্রেস করা হয়েছে। বিশেষ করে সরকারি ডাটা এন্ট্রি ও এশিয়ান দেশগুলোর ব্যাংকিং পরীক্ষায় CPM বা KPH পরিমাপ করা হয়।
                </p>
                <div className="mt-4 rounded-xl bg-white/5 p-3 text-xs font-mono text-cyan-300">
                  CPM = WPM × 5
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  সবচেয়ে গুরুত্বপূর্ণ
                </span>
                <h4 className="mt-1 text-xl font-black text-white">Accuracy Percentage (%)</h4>
                <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                  টাইপ করা মোট অক্ষরের মধ্যে কত শতাংশ অক্ষর সম্পূর্ণ ভুলমুক্ত ছিল। টাইপিংয়ে গতির চেয়ে নির্ভুলতা সর্বদা বেশি প্রাধান্য পায়।
                </p>
                <div className="mt-4 rounded-xl bg-white/5 p-3 text-xs font-mono text-emerald-300">
                  Accuracy = (Correct ÷ Total) × 100%
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111310] p-6 space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-[#d7ff64]" />
                <span>Gross WPM বনাম Net WPM — চাকরির পরীক্ষায় কোনটি চেক করা হয়?</span>
              </h4>
              <p className="text-sm text-gray-300">
                অধিকাংশ সাধারণ টাইপিং টেস্টে দুটি স্কোর পাওয়া যায়: <strong>Gross WPM</strong> এবং <strong>Net WPM</strong>।
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-400">
                <li>
                  <strong className="text-white">Gross WPM (মোট গতি):</strong> আপনি মোট কতগুলো অক্ষর টাইপ করেছেন তার কাঁচা হিসাব। এতে ভুলের কোনো পেনাল্টি কাটা হয় না।
                </li>
                <li>
                  <strong className="text-white">Net WPM (প্রকৃত নির্ভুল গতি):</strong> প্রতি মিনিটে যতগুলো অসংশোধিত ভুল থেকে যায়, তা গ্রস স্পিড থেকে বিয়োগ করা হয়। ফর্মুলা: <code className="text-[#d7ff64]">Net WPM = Gross WPM - (Errors ÷ Minutes)</code>।
                </li>
              </ul>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-xs text-amber-200">
                💡 <strong>গুরুত্বপূর্ণ তথ্য:</strong> সরকারি চাকরি, ডাটা এন্ট্রি ও প্রফেশনাল পরীক্ষায় কেবল <strong>Net WPM</strong> বিবেচনা করা হয়। তাই ভুল কম করা টাইপিং গতি বাড়ার পূর্বশর্ত।
              </div>
            </div>

            {/* Global Benchmarks Table */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white">বিশ্বমানের টাইপিং দক্ষতার মানদণ্ড (Global Speed Benchmarks)</h4>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111310]">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-white/10 bg-white/5 text-gray-400 uppercase text-[11px]">
                    <tr>
                      <th className="p-3 sm:p-4">দক্ষতার স্তর (Level)</th>
                      <th className="p-3 sm:p-4">গতি (WPM)</th>
                      <th className="p-3 sm:p-4">ব্যবহারিক ক্ষেত্র ও মূল্যায়ন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-gray-400">Beginner (শিক্ষানবিস)</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-rose-400">১৫ – ২৫ WPM</td>
                      <td className="p-3 sm:p-4 text-xs text-gray-400">কিবোর্ডের দিকে তাকিয়ে দুই আঙুলে খোঁজাখুঁজি করে টাইপ করেন (Hunt and Peck method)।</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-amber-300">Intermediate (সাধারণ)</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-amber-300">৩০ – ৪৫ WPM</td>
                      <td className="p-3 sm:p-4 text-xs text-gray-400">অফিসিয়াল সাধারণ কাজ, চ্যাটিং ও ইমেইল লেখার জন্য আদর্শ। বিশ্বব্যাপী মানুষের গড় টাইপিং স্পিড প্রায় ৪০ WPM।</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-cyan-300">Advanced (প্রফেশনাল)</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-cyan-300">৫০ – ৭০ WPM</td>
                      <td className="p-3 sm:p-4 text-xs text-gray-400">কনটেন্ট রাইটার, ডাটা এন্ট্রি এক্সপার্ট, প্রশাসনিক কর্মকর্তা ও সফটওয়্যার ইঞ্জিনিয়ারদের গড় গতি।</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#d7ff64]">Master / Elite (অভিজাত)</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-[#d7ff64]">৮০ – ১০০+ WPM</td>
                      <td className="p-3 sm:p-4 text-xs text-gray-400">বিশ্বের শীর্ষ ৫% দ্রুত টাইপিস্টদের গতি। চিন্তা করার আগেই আঙুল স্বয়ংক্রিয়ভাবে শব্দ টাইপ করে ফেলে।</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-purple-300">World Class (বিশ্বরেকর্ড)</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-purple-300">১২০ – ২১৬ WPM</td>
                      <td className="p-3 sm:p-4 text-xs text-gray-400">প্রতিযোগিতামূলক টাইপিস্ট ও স্টেনোগ্রাফার। গিনেস ওয়ার্ল্ড রেকর্ডধারী আলফ্রেড ব্লেক ২১৬ WPM গতিতে টাইপ করেছিলেন!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================= */}
        {/* TOPIC 2: How to Improve Typing Speed                      */}
        {/* ========================================================= */}
        {activeTopic === 'how-to-improve' && (
          <article className="space-y-6 text-gray-300 leading-relaxed">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                LESSON 02 • SCIENTIFIC METHODS
              </span>
              <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                How to Improve Typing Speed? টাইপিং গতি বাড়ানোর বৈজ্ঞানিক কৌশল
              </h3>
            </div>

            <p>
              টাইপিং গতি বাড়ানো কোনো জাদু নয়; এটি মানব মস্তিষ্কের স্নায়ুতন্ত্র এবং হাতের ১০টি আঙুলের মধ্যে পেশী স্মৃতি বা <strong>Muscle Memory</strong> গঠনের একটি সুসংহত বৈজ্ঞানিক প্রক্রিয়া। নিচে ধাপে ধাপে গতি দ্বিগুণ করার প্রমাণিত উপায়সমূহ তুলে ধরা হলো:
            </p>

            <div className="space-y-4">
              {/* Method 1 */}
              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d7ff64] text-xs font-black text-[#111310]">1</span>
                  <span>মাসল মেমোরি তৈরি করা (Building Muscle Memory)</span>
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-gray-400">
                  আমাদের আঙুলের নিজস্ব কোনো মস্তিষ্ক নেই। যখন আপনি প্রতিদিন একই আঙুল দিয়ে নির্দিষ্ট কি প্রেস করেন, তখন মস্তিষ্কের মোটর কর্টেক্সে স্থায়ী নিউরাল পাথওয়ে বা সিন্যাপস গঠিত হয়। একপর্যায়ে মস্তিষ্ককে চিন্তা করতে হয় না কোন অক্ষর কোথায় আছে; আপনি মনে মনে "Hello" ভাবলেই আঙুলগুলো স্বয়ংক্রিয়ভাবে `H-E-L-L-O` টাইপ করে ফেলবে।
                </p>
              </div>

              {/* Method 2 */}
              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d7ff64] text-xs font-black text-[#111310]">2</span>
                  <span>টাচ টাইপিংয়ের ৩টি ধাপ (Cognitive, Associative, Autonomous)</span>
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <strong className="text-rose-400 block mb-1">১. সংজ্ঞানাত্মক ধাপ (Cognitive)</strong>
                    <p className="text-gray-400">প্রতিটি অক্ষরে আঙুল চালানোর সময় ভাবতে হয়। গতি ধীর (১৫-২০ WPM) থাকে। ধৈর্য হারানো যাবে না।</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <strong className="text-amber-400 block mb-1">২. সহযোগী ধাপ (Associative)</strong>
                    <p className="text-gray-400">ভুল কমতে শুরু করে এবং গতি ৩০-৫০ WPM-এ উন্নীত হয়। আঙুল নিজে থেকেই হোম রোতে ফিরতে শেখে।</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <strong className="text-[#d7ff64] block mb-1">৩. স্বয়ংক্রিয় ধাপ (Autonomous)</strong>
                    <p className="text-gray-400">সম্পূর্ণ চিন্তা ও দৃষ্টিমুক্ত টাইপিং। গতি ৭০ থেকে ১০০+ WPM ছাড়িয়ে যায়।</p>
                  </div>
                </div>
              </div>

              {/* Method 3: Ergonomics */}
              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5 space-y-3">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d7ff64] text-xs font-black text-[#111310]">3</span>
                  <span>শারীরিক ভঙ্গি ও এরগনোমিক্স (Ergonomics of Fast Typing)</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-400">
                  ভুল ভঙ্গিতে টাইপ করলে ক্লান্তি ও কব্জির ব্যথা তৈরি হয় যা আপনার গতিকে ৩০% পর্যন্ত কমিয়ে দেয়:
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-gray-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#d7ff64] shrink-0 mt-0.5" />
                    <span><strong>সোজা হয়ে বসুন:</strong> পিঠ চেয়ারের সাথে ৯০ থেকে ১০০ ডিগ্রি কোণে সোজা রাখুন এবং দুই পা মাটিতে সমান্তরাল রাখুন।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#d7ff64] shrink-0 mt-0.5" />
                    <span><strong>স্ক্রিনের দূরত্ব:</strong> মনিটরের স্ক্রিনের উপরিভাগ চোখের লেভেলে রাখুন, দূরত্ব হতে হবে ২০ থেকে ২৪ ইঞ্চি।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#d7ff64] shrink-0 mt-0.5" />
                    <span><strong>ভাসমান কব্জি:</strong> কব্জি কখনোই টেবিলের ধার বা কীবোর্ডের ওপর চেপে রাখবেন না; কব্জি হালকা বাতাসে ভাসিয়ে রাখুন।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#d7ff64] shrink-0 mt-0.5" />
                    <span><strong>কনুইয়ের কোণ:</strong> কনুই শরীরের দুই পাশে শিথিলভাবে ৯০ ডিগ্রি কোণে ঝুলবে।</span>
                  </div>
                </div>
              </div>

              {/* Method 4: Rhythm & Cadence */}
              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d7ff64] text-xs font-black text-[#111310]">4</span>
                  <span>ছন্দ ও কেইডেন্স (Rhythm & Typing Cadence)</span>
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-gray-400">
                  অনেকে দুটি সহজ অক্ষর খুব দ্রুত টাইপ করে একটি কঠিন অক্ষরে এসে ২ সেকেন্ড থেমে যান—এতে টাইপিংয়ের গড় গতি নষ্ট হয়। প্রফেশনাল টাইপিস্টরা মেট্রোনোমের মতো সমান তালে (টিক-টিক-টিক-টিক) প্রতিটি কিস্ট্রোক দেন। সমান ছন্দে টাইপ করলে আঙুল কখনো ক্লান্ত হয় না এবং গতি স্থিতিশীল থাকে।
                </p>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================= */}
        {/* TOPIC 3: Bangla Typing Practice Guide                     */}
        {/* ========================================================= */}
        {activeTopic === 'bangla-guide' && (
          <article className="space-y-6 text-gray-300 leading-relaxed">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                LESSON 03 • BENGALI KEYBOARD FLUENCY
              </span>
              <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                Bangla Typing Practice Guide: বাংলা টাইপিং পূর্ণাঙ্গ গাইডলাইন
              </h3>
            </div>

            <p>
              বাংলা ভাষায় বিশ্বের প্রায় ৩০ কোটিরও বেশি মানুষ কথা বলে। ডিজিটাল বাংলাদেশে অফিস-আদালত, সাংবাদিকতা, ফ্রিল্যান্সিং এবং একাডেমিক সব ক্ষেত্রে বাংলা টাইপিং জানা অত্যন্ত জরুরি। বাংলায় মূলত দুটি পদ্ধতিতে টাইপ করা হয়: <strong>অভ্র ফোনেটিক (Avro Phonetic)</strong> এবং <strong>বিজয় লেআউট (Bijoy Layout)</strong>।
            </p>

            {/* Comparison of Avro vs Bijoy */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white">অভ্র ফোনেটিক মেথড (Avro Phonetic)</h4>
                  <span className="rounded-full bg-cyan-400/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">সহজ ও দ্রুত</span>
                </div>
                <p className="text-xs text-gray-300">
                  উচ্চারণ অনুযায়ী ইংরেজি অক্ষরে টাইপ করলে স্বয়ংক্রিয়ভাবে বাংলা রূপান্তরিত হয়। এটি সামাজিক যোগাযোগ মাধ্যম ও দ্রুত কনটেন্ট তৈরির জন্য বিশ্বব্যাপী জনপ্রিয়।
                </p>
                <div className="rounded-xl bg-black/40 p-3 text-xs space-y-1 font-mono text-cyan-200">
                  <div>• `ami banglay gan gai` → আমি বাংলায় গান গাই</div>
                  <div>• `dhaka` → ঢাকা, `shadhinota` → স্বাধীনতা</div>
                  <div>• `kkhoma` → ক্ষমা, `bikkheto` → বিখ্যাত</div>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white">বিজয় কীবোর্ড মেথড (Bijoy Layout)</h4>
                  <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">দাপ্তরিক স্ট্যান্ডার্ড</span>
                </div>
                <p className="text-xs text-gray-300">
                  সরকারি দপ্তর, সংবাদপত্র ও প্রকাশনায় ব্যবহৃত প্রথাগত স্ট্যান্ডার্ড। প্রতিটি কীতে সরাসরি বাংলা অক্ষর ও কার-চিহ্ন ম্যাপ করা থাকে।
                </p>
                <div className="rounded-xl bg-black/40 p-3 text-xs space-y-1 font-mono text-amber-200">
                  <div>• `J` = ক, `K` = ত, `L` = দ, `D` = ি-কার, `F` = া-কার</div>
                  <div>• `G` = হসন্ত (্) — যুক্তবর্ণ তৈরির মূল চাবিকাঠি</div>
                  <div>• শিফট চাপলে মহাপ্রাণ বর্ণ (যেমন Shift+J = খ, Shift+K = থ)</div>
                </div>
              </div>
            </div>

            {/* Bijoy Key Layout Map */}
            <div className="rounded-2xl border border-white/10 bg-[#111310] p-6 space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe2 className="h-5 w-5 text-[#d7ff64]" />
                <span>বিজয় কিবোর্ডের ৩টি রো মুখস্থ রাখার সহজ ফর্মুলা</span>
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <span className="font-bold text-[#d7ff64] uppercase block mb-1">টপ রো (Top Row)</span>
                  <p className="text-gray-300 leading-relaxed font-mono">
                    Q=ঙ/ঁ, W=য/য়, E=ড/ঢ, R=প/ফ, T=ট/ঠ, Y=চ/ছ, U=জ/ঝ, I=হ/ঞ, O=গ/ঘ, P=ড়/ঢ়
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <span className="font-bold text-cyan-400 uppercase block mb-1">হোম রো (Home Row)</span>
                  <p className="text-gray-300 leading-relaxed font-mono">
                    A=ৃ, S=ু/ূ, D=ি/ী, F=া/অ, G=্(হসন্ত), H=ব/ভ, J=ক/খ, K=ত/থ, L=দ/ধ, ;=চ/ছ
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <span className="font-bold text-purple-400 uppercase block mb-1">বটম রো (Bottom Row)</span>
                  <p className="text-gray-300 leading-relaxed font-mono">
                    Z=্র(র-ফলা), X=ও/ৌ, C=ে/ৈ, V=র/ল, B=ন/ণ, N=স/ষ, M=ম/শ
                  </p>
                </div>
              </div>
            </div>

            {/* Conjunct Rules */}
            <div className="rounded-2xl border border-[#d7ff64]/20 bg-[#d7ff64]/5 p-6 space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#d7ff64]" />
                <span>বাংলা যুক্তবর্ণ টাইপিংয়ের গোল্ডেন রুল (Golden Rule of Conjuncts)</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-300">
                বাংলায় দুটি বা তিনটি ব্যঞ্জনবর্ণ একসাথে যুক্ত করতে মাঝখানে সবসময় <strong>হসন্ত বা লিংক কি (বিজয়-এ `G` এবং ইউনিকোডে হসন্ত `্`)</strong> চাপতে হয়:
              </p>
              <div className="rounded-xl bg-[#111310] p-4 font-mono text-xs sm:text-sm text-[#d7ff64] space-y-1">
                <div>[১ম বর্ণ] + [হসন্ত `G`] + [২য় বর্ণ] = যুক্তবর্ণ</div>
                <div className="text-gray-400 text-xs mt-1">
                  উদাহরণ: ক (J) + হসন্ত (G) + ত (K) = <strong className="text-white">ক্ত</strong> (রক্ত, শক্তি)
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================= */}
        {/* TOPIC 4: English Typing Practice Guide                    */}
        {/* ========================================================= */}
        {activeTopic === 'english-guide' && (
          <article className="space-y-6 text-gray-300 leading-relaxed">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                LESSON 04 • TOUCH TYPING MASTERY
              </span>
              <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                English Typing Practice Guide: ইংরেজি টাচ টাইপিং ও QWERTY কীবোর্ড
              </h3>
            </div>

            <p>
              টাচ টাইপিং (Touch Typing) হলো কীবোর্ডের দিকে না তাকিয়ে শুধুমাত্র অনুভূতির সাহায্যে কি চেপে প্রতি মিনিটে ৬০ থেকে ১০০+ শব্দ টাইপ করার বিদ্যা। এটি শিখলে আপনার কাজের সময় অর্ধেকে নেমে আসবে।
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Keyboard className="h-5 w-5 text-[#d7ff64]" />
                  <span>হোম রো নীতি (The Home Row - Base Station)</span>
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-gray-400">
                  হোম রো হলো আপনার হাতের স্থায়ী ঘাঁটি। যেকোনো কি টাইপ করতে আঙুল উপরে বা নিচে যেখানেই যাক না কেন, কি প্রেস করা সম্পন্ন হওয়া মাত্রই আঙুলটি স্বয়ংক্রিয়ভাবে হোম রোতে ফিরে আসবে।
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 font-mono text-sm">
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-rose-300">
                    বাম হাত: <strong>A - S - D - F</strong>
                  </div>
                  <div className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-cyan-300">
                    ডান হাত: <strong>J - K - L - ;</strong>
                  </div>
                  <div className="rounded-xl border border-[#d7ff64]/40 bg-[#d7ff64]/10 px-3 py-1.5 text-[#d7ff64]">
                    উভয় থাম্বস: <strong>Spacebar</strong>
                  </div>
                </div>
              </div>

              {/* Opposite Shift Rule */}
              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5 space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  <span>বিপরীত শিফট পদ্ধতি (The Opposite Shift Rule)</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-400">
                  অধিকাংশ মানুষ ক্যাপিটাল লেটার টাইপ করতে কেবল বাম হাতের শিফট ব্যবহার করেন—এটি একটি মারাত্মক ভুল কৌশল। সঠিক নিয়ম হলো:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <strong className="text-cyan-300 block mb-1">ডান হাতের অক্ষরের জন্য:</strong>
                    <span>ডান হাতের অক্ষর (যেমন Y, U, I, O, P, H, J, K, L, N, M) বড় হাতের করতে <strong>বাম হাতের কনিষ্ঠা</strong> দিয়ে বাম শিফট চাপুন।</span>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <strong className="text-rose-300 block mb-1">বাম হাতের অক্ষরের জন্য:</strong>
                    <span>বাম হাতের অক্ষর (যেমন Q, W, E, R, T, A, S, D, F, G, Z, X, C, V, B) বড় হাতের করতে <strong>ডান হাতের কনিষ্ঠা</strong> দিয়ে ডান শিফট চাপুন।</span>
                  </div>
                </div>
              </div>

              {/* Punctuation & Special Symbols */}
              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5 space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-400" />
                  <span>বিরামচিহ্ন ও সংখ্যা রো (Mastering Punctuations & Numbers)</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-400">
                  কমা (,), ফুলস্টপ (.), সেমিকোলন (;), অ্যাপোস্ট্রফি (') এবং প্রশ্নবোধক চিহ্ন (?) ইংরেজি টেক্সটের অবিচ্ছেদ্য অংশ। এগুলোর জন্য কিবোর্ডের দিকে না তাকিয়ে ডান হাতের মধ্যমা, অনামিকা ও কনিষ্ঠার নিয়ন্ত্রণ বাড়াতে হবে।
                </p>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================= */}
        {/* TOPIC 5: Keyboard Finger Placement Guide                  */}
        {/* ========================================================= */}
        {activeTopic === 'finger-placement' && (
          <article className="space-y-6 text-gray-300 leading-relaxed">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                LESSON 05 • ERGONOMIC POSITIONING
              </span>
              <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                Keyboard Finger Placement Guide: কীবোর্ডে আঙুল বসানোর পূর্ণাঙ্গ ও ভিজ্যুয়াল গাইড
              </h3>
            </div>

            <p>
              কীবোর্ডের প্রতিটি বাটনের জন্য সুনির্দিষ্ট আঙুল নির্ধারিত থাকে। আপনি যদি ভুল আঙুল দিয়ে কি প্রেস করেন, তবে গতি কখনোই ৬০ WPM ছাড়াতে পারবে না। নিচে ইন্টারঅ্যাক্টিভ কালার-কোডেড কীবোর্ড চার্ট দেওয়া হলো:
            </p>

            {/* F and J Tactile Bumps Explanation */}
            <div className="rounded-2xl border border-[#d7ff64]/30 bg-[#d7ff64]/10 p-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d7ff64] text-xl font-black text-[#111310]">
                F / J
              </div>
              <div className="text-xs sm:text-sm">
                <strong className="text-white text-base block mb-0.5">F এবং J কী-এর ট্যাকটাইল বাম্প (Tactile Bumps):</strong>
                কীবোর্ডের দিকে না তাকিয়ে হাত রাখার সময় বাম হাতের তর্জনী দিয়ে <strong>F</strong> এবং ডান হাতের তর্জনী দিয়ে <strong>J</strong> কী-এর ওপরের ছোট খাঁজ বা উঁচু ডটটি স্পর্শ করুন। এটিই আপনার হাতের সেন্টার বা নোঙর (Anchor Point)।
              </div>
            </div>

            {/* Interactive Visual Keyboard Map */}
            <div className="rounded-2xl border border-white/10 bg-[#111310] p-4 sm:p-6 overflow-x-auto select-none">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  ইন্টারঅ্যাক্টিভ কীবোর্ড চার্ট (যেকোনো কী স্পর্শ করুন)
                </span>
                {activeFingerKey && (
                  <span className="text-xs font-mono font-bold text-[#d7ff64]">
                    নির্বাচিত কী: {activeFingerKey}
                  </span>
                )}
              </div>

              <div className="min-w-[680px] space-y-1.5 font-mono text-xs">
                {KEYBOARD_ROWS.map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-1.5 justify-center">
                    {row.map((k, kIdx) => {
                      const fingerConfig = FINGER_COLOR_MAP[k.finger];
                      const isHovered = activeFingerKey === k.label;
                      return (
                        <div
                          key={kIdx}
                          onMouseEnter={() => setActiveFingerKey(`${k.label} → ${fingerConfig.name}`)}
                          onMouseLeave={() => setActiveFingerKey(null)}
                          className={`relative flex items-center justify-center rounded-lg border font-bold transition-all cursor-pointer ${
                            k.spacebar
                              ? 'w-full py-2.5 max-w-md'
                              : k.wide
                              ? 'px-3 py-2 min-w-[50px]'
                              : 'h-9 w-9 sm:h-10 sm:w-10'
                          } ${fingerConfig.bg} ${isHovered ? 'scale-110 shadow-lg z-20 brightness-125' : ''}`}
                        >
                          <span>{k.label}</span>
                          {k.bump && (
                            <span className="absolute bottom-1 h-0.5 w-3 rounded-full bg-white opacity-80" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* 10 Fingers Matrix Table */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white">১০ আঙুলের দায়িত্ব বণ্টন ছক (Finger Distribution Matrix)</h4>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
                {Object.entries(FINGER_COLOR_MAP).map(([key, config]) => (
                  <div key={key} className={`rounded-xl border p-3 ${config.bg}`}>
                    <div className="flex items-center justify-between">
                      <strong className={`font-bold ${config.text}`}>{config.name}</strong>
                      <span className="text-[10px] text-gray-400 uppercase">{config.hand}</span>
                    </div>
                    <p className="mt-1 text-gray-300 font-mono text-[11px]">
                      {key === 'left-pinky' && '` , 1, Q, A, Z, Left Shift, CapsLock, Tab, Ctrl'}
                      {key === 'left-ring' && '2, W, S, X'}
                      {key === 'left-middle' && '3, E, D, C'}
                      {key === 'left-index' && '4, 5, R, T, F, G, V, B'}
                      {key === 'right-index' && '6, 7, Y, U, H, J, N, M'}
                      {key === 'right-middle' && '8, I, K, , (কমা)'}
                      {key === 'right-ring' && '9, O, L, . (ফুলস্টপ)'}
                      {key === 'right-pinky' && '0, -, =, P, [, ], ;, \', /, Enter, Right Shift, Backspace'}
                      {key === 'thumbs' && 'Spacebar (স্পেসবার বাটন)'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}

        {/* ========================================================= */}
        {/* TOPIC 6: 10 Tips to Increase WPM                          */}
        {/* ========================================================= */}
        {activeTopic === '10-tips' && (
          <article className="space-y-6 text-gray-300 leading-relaxed">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                LESSON 06 • PRO SECRETS
              </span>
              <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                10 Tips to Increase WPM: টাইপিং গতি দ্রুত বাড়ানোর ১০টি প্রমাণিত টিপস
              </h3>
            </div>

            <p>
              টাইপিং গতি বাড়ানোর জন্য কঠোর পরিশ্রমের চেয়ে স্মার্ট স্ট্র্যাটেজি অনেক বেশি কার্যকর। নিচে ১০টি ব্যবহারিক টিপস দেওয়া হলো যা আপনার গতিকে নতুন উচ্চতায় নিয়ে যাবে:
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  no: '০১',
                  title: 'গতির আগে নির্ভুলতায় প্রথম নজর দিন (Accuracy Over Speed)',
                  desc: 'একটি ভুলের কারণে ব্যাকস্পেস চাপতে এবং ঠিক করতে ৪টি অক্ষরের সময় নষ্ট হয়। নির্ভুলতা ৯৮%+ রাখলে গতি নিজে থেকেই বাড়বে।',
                },
                {
                  no: '০২',
                  title: 'কীবোর্ডের দিকে তাকানো পুরোপুরি নিষিদ্ধ করুন (Zero-Glance Rule)',
                  desc: 'কীবোর্ডের দিকে একবার তাকালে ব্রেইনের রিদম নষ্ট হয়। ভুল হলেও স্ক্রিনের দিকে তাকিয়ে থাকার কঠোর অভ্যাস গড়ে তুলুন।',
                },
                {
                  no: '০৩',
                  title: 'ব্যাকস্পেস রিফ্লেক্স নিয়ন্ত্রণ করুন (Tame the Backspace Reflex)',
                  desc: 'প্রতিটি ছোটখাটো ভুলে বারবার ব্যাকস্পেস চাপার অবচেতন মানসিক চাপ দূর করুন। একটানা বাক্য শেষ করার মানসিকতা তৈরি করুন।',
                },
                {
                  no: '০৪',
                  title: '৩ থেকে ৫ শব্দ এগিয়ে পড়ার অভ্যাস (Read Ahead / Word Chunking)',
                  desc: 'চোখ থাকবে আপনি বর্তমানে যে শব্দ টাইপ করছেন তার ৩-৫ শব্দ সামনে। এতে ব্রেইন আগেই মোটর কম্যান্ড প্রস্তুত রাখতে পারে।',
                },
                {
                  no: '০৫',
                  title: 'দৈনিক ১৫-২০ মিনিটের রেগুলার ড্রিল (Consistency Beats Marathons)',
                  desc: 'সপ্তাহে একদিন ৩ ঘণ্টা টাইপ করার চেয়ে প্রতিদিন মাত্র ১৫ মিনিট টাইপ করলে মাসল মেমোরি ৩ গুণ দ্রুত ও শক্তিশালী হয়।',
                },
                {
                  no: '০৬',
                  title: 'দুর্বল কিগুলো চিহ্নিত করে আলাদা ড্রিল (Weak-Key Targeted Practice)',
                  desc: 'কনিষ্ঠা ও অনামিকার আওতাধীন জটিল কিগুলো (P, Q, Z, X, B ও বিরামচিহ্ন) আলাদা অনুশীলন করে হাতের ব্যালান্স ঠিক রাখুন।',
                },
                {
                  no: '০৭',
                  title: 'টাইপিং গেম ও স্প্রিন্ট খেলা (Gamified Reflex Training)',
                  desc: 'আমাদের Zombie Rush বা Nitro Racer আর্কেড গেমগুলো খেললে অবচেতন মনে রিফ্লেক্স ও আঙুলের চপলতা দ্রুত বৃদ্ধি পায়।',
                },
                {
                  no: '০৮',
                  title: 'আঙুল শিথিল রাখুন, জোরে আঘাত করবেন না (Light Touch Principle)',
                  desc: 'কীবোর্ডে হাতুড়ি পেটার মতো জোরে কি প্রেস করবেন না; কেবল অ্যাকচুয়েশন পয়েন্ট পর্যন্ত হালকা স্পর্শে টাইপ করুন।',
                },
                {
                  no: '০৯',
                  title: 'সঠিক মেকানিক্যাল বা লো-ট্রাভেল কীবোর্ড নির্বাচন করুন',
                  desc: 'শক্ত বা স্টিফ কিবোর্ড আঙুল ক্লান্ত করে দেয়। পরিষ্কার ট্যাকটাইল রেসপন্সযুক্ত মানসম্পন্ন কিবোর্ড ব্যবহারে গতি বাড়ে।',
                },
                {
                  no: '১০',
                  title: 'বাস্তবধর্মী মাইক্রো-গোল সেট করুন (Set Weekly Micro-Goals)',
                  desc: 'একদিনেই ১০০ WPM-এর আশা করবেন না। প্রতি সপ্তাহে ৩ থেকে ৫ WPM বাড়ানোর লক্ষ্য রাখুন এবং History ট্র্যাকার দিয়ে পরিমাপ করুন।',
                },
              ].map((tip) => (
                <div key={tip.no} className="rounded-2xl border border-white/10 bg-[#111310] p-5 space-y-2 hover:border-[#d7ff64]/40 transition">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d7ff64]/15 font-mono text-xs font-black text-[#d7ff64]">
                      {tip.no}
                    </span>
                    <h4 className="text-sm font-bold text-white">{tip.title}</h4>
                  </div>
                  <p className="text-xs text-gray-400 pl-9 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </article>
        )}

        {/* ========================================================= */}
        {/* TOPIC 7: Bangla Conjuncts Dictionary                      */}
        {/* ========================================================= */}
        {activeTopic === 'conjuncts' && (
          <article className="space-y-6 text-gray-300 leading-relaxed">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                LESSON 07 • BENGALI CHEAT SHEET
              </span>
              <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                জরুরি বাংলা যুক্তবর্ণ ও টাইপিং কোড ডিকশনারি (Bijoy & Avro)
              </h3>
            </div>

            <p>
              বাংলায় টাইপিং গতি ধীর হওয়ার প্রধান কারণ হলো যুক্তবর্ণে এসে আটকে যাওয়া। নিচে বহুল ব্যবহৃত জটিল যুক্তবর্ণগুলোর সহজ টাইপিং কোড ও উদাহরণ দেওয়া হলো:
            </p>

            {/* Search Input for Conjuncts */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={conjunctQuery}
                onChange={(e) => setConjunctQuery(e.target.value)}
                placeholder="যুক্তবর্ণ বা উদাহরণ দিয়ে খুঁজুন (যেমন: ক্ষ, জ্ঞ, রক্ত, bijoy, avro)..."
                className="w-full rounded-2xl border border-white/10 bg-[#111310] pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#d7ff64]"
              />
            </div>

            {/* Conjuncts Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111310]">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-white/10 bg-white/5 text-gray-400 uppercase text-[11px]">
                  <tr>
                    <th className="p-3 sm:p-4">যুক্তবর্ণ</th>
                    <th className="p-3 sm:p-4">গঠন</th>
                    <th className="p-3 sm:p-4 text-amber-300">বিজয় টাইপিং কোড</th>
                    <th className="p-3 sm:p-4 text-cyan-300">অভ্র টাইপিং কোড</th>
                    <th className="p-3 sm:p-4">শব্দের উদাহরণ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {filteredConjuncts.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition">
                      <td className="p-3 sm:p-4 font-bold text-xl text-[#d7ff64] font-serif">
                        {item.conjunct}
                      </td>
                      <td className="p-3 sm:p-4 text-gray-300">{item.breakdown}</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-amber-300">
                        {item.bijoy}
                      </td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-cyan-300">
                        {item.avro}
                      </td>
                      <td className="p-3 sm:p-4 text-xs text-gray-400">{item.example}</td>
                    </tr>
                  ))}
                  {filteredConjuncts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        কোনো যুক্তবর্ণের ফলাফল পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>
        )}

        {/* ========================================================= */}
        {/* TOPIC 8: FAQ (Frequently Asked Questions)                 */}
        {/* ========================================================= */}
        {activeTopic === 'faq' && (
          <article className="space-y-6 text-gray-300 leading-relaxed">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7ff64]">
                LESSON 08 • ANSWERS & EXPERT ADVICE
              </span>
              <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                সাধারণ জিজ্ঞাসা ও টাইপিং প্রশ্নোত্তর (FAQ)
              </h3>
            </div>

            <div className="space-y-3">
              {FAQ_LIST.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#111310] overflow-hidden transition"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-white text-sm sm:text-base hover:text-[#d7ff64] transition"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-[#d7ff64] shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-gray-400 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-gray-400 border-t border-white/5 pt-3 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        )}
      </div>
    </section>
  );
};
