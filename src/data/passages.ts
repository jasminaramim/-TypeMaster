import { Lesson } from '../types';

export const ENGLISH_PASSAGES = [
  {
    title: 'Daily Practice',
    difficulty: 'Easy',
    text: 'Practice every day to improve your typing speed and accuracy. Keep your fingers on the home row, stay relaxed, and focus on typing correctly before trying to type faster. Small improvements every day lead to great results.',
  },
  {
    title: 'Technology & Focus',
    difficulty: 'Medium',
    text: 'Fast typing is not just about moving your fingers quickly. It is about rhythm, muscle memory, and the effortless translation of your thoughts onto the digital canvas without friction.',
  },
  {
    title: 'The Art of Writing',
    difficulty: 'Medium',
    text: 'Clear writing stems from clear thinking. When your keyboard becomes an extension of your mind, creativity flows uninterrupted, allowing your words to express nuance, passion, and truth.',
  },
  {
    title: 'Deep Work & Mastery',
    difficulty: 'Advanced',
    text: 'Mastery in any craft demands persistent curiosity and deliberate focus. As keystrokes assemble into intricate ideas, accuracy builds confidence, creating an unbreakable bridge between concept and execution.',
  },
];

export const BANGLA_PASSAGES = [
  {
    title: 'অনুশীলনের মূলমন্ত্র',
    difficulty: 'সহজ',
    text: 'নিয়মিত অনুশীলন করলে টাইপিং স্পিড এবং নির্ভুলতা বাড়ানো সম্ভব। প্রথমে সঠিকভাবে টাইপ করার চেষ্টা করো। ধীরে ধীরে হাতের আঙুলের ব্যবহার শিখো এবং প্রতিদিন কিছু সময় অনুশীলন করো।',
  },
  {
    title: 'ডিজিটাল বাংলাদেশ ও দক্ষতা',
    difficulty: 'মাঝারি',
    text: 'প্রযুক্তির এই যুগে দ্রুত ও নির্ভুলভাবে বাংলা লেখা একটি অত্যন্ত প্রয়োজনীয় দক্ষতা। নিয়মিত অনুশীলন তোমার কাজের গতি বাড়াবে এবং দৈনন্দিন যোগাযোগ সহজতর করবে।',
  },
  {
    title: 'রবীন্দ্রনাথ ঠাকুরের বাণী',
    difficulty: 'মাঝারি',
    text: 'চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির, জ্ঞান যেথা মুক্ত, যেথা গৃহের প্রাচীর আপন প্রাঙ্গণতলে দিবসশর্বরী বসুধারে রাখে নাই খণ্ড ক্ষুদ্র করি— সেই স্বর্গে করো জাগরিত।',
  },
  {
    title: 'ভাষার শক্তি ও সৌন্দর্য',
    difficulty: 'কঠিন',
    text: 'আমাদের মাতৃভাষা বাংলা অনন্য সুর এবং মাধুর্যে সমৃদ্ধ। কিবোর্ডের প্রতিটি বোতামে লুকিয়ে থাকা অক্ষর যখন সুন্দর শব্দে রূপান্তরিত হয়, তখন মনের ভাব নিখুঁত রূপ লাভ করে।',
  },
];

export const TYPING_LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Lesson 01 — Home Row Keys',
    subtitle: 'Build your foundation with the anchor keys.',
    keys: 'asdf jkl; asdf jkl; ff jj dd kk ss ll aa ;;',
    targetAccuracy: 95,
    tips: 'Rest your index fingers on F and J (feel the small bumps). Keep your wrists elevated slightly.',
  },
  {
    id: 'l2',
    title: 'Lesson 02 — Top Row Keys',
    subtitle: 'Reach up smoothly with your fingertips.',
    keys: 'qwer tyui op qwer tyui op er re ty yt ui iu',
    targetAccuracy: 95,
    tips: 'Reach upward with your fingers and immediately return to the home row.',
  },
  {
    id: 'l3',
    title: 'Lesson 03 — Bottom Row Keys',
    subtitle: 'Reach downward with steady finger curves.',
    keys: 'zxcv bnm zxcv bnm cv vc bn nb xz zx mn nm',
    targetAccuracy: 95,
    tips: 'Curl your fingers inward to tap the lower keys without collapsing your hand posture.',
  },
  {
    id: 'l4',
    title: 'Lesson 04 — Numbers & Punctuation',
    subtitle: 'Master numbers and essential punctuation symbols.',
    keys: '12345 67890 . , ; : ! ? - 2026 100% 24/7',
    targetAccuracy: 90,
    tips: 'Practice reaching without looking down. Use pinky finger for shift and enter.',
  },
  {
    id: 'l5',
    title: 'Lesson 05 — বাংলা মৌলিক স্বর ও ব্যঞ্জন',
    subtitle: 'বাংলা বর্ণমালার নিয়মিত ব্যবহার ও টাইপিং ছন্দ।',
    keys: 'ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন',
    targetAccuracy: 90,
    tips: 'অভ্র অথবা ইউনিকোড কিবোর্ডে সঠিক যুক্তবর্ণ ও কারচিহ্নের ক্রম মনে রাখুন।',
  },
];

export const SAMPLE_TEXTS = {
  emailWithErrors: `Dear Mr. Smith,

I am write to you about the project report we discusses yesterday. The datas shows that our sales has increase by 15 persent, which are very good news for our team. However, there is several issue with the delivery timeline that need to be address immediately.

Please let me know when your available for a quick call to resolve this things.

Thank you very much,
John`,

  essayWithErrors: `The artificial intelligence is revolutionizing the modern society in many differnt ways. Many peoples believes that automatisation will replace all jobs, but history show that technology also create new opportunitys. If governments invests properly in education, every citizens will benefit from this advancements.`,

  banglaWithErrors: `আমি গতকালকে আপনার চিঠি পাইছি। প্রকল্পের কাজ খুব ভালো চলিতেছে, কিন্তু কিছু সমস্য রয়ে গেছে। অনুগ্রহ করে যত দূত সম্ভব আমাদের সাথে যোগাযোগ করূন।`,
};
