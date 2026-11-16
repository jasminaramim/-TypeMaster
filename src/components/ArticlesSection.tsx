import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Calendar,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Keyboard,
  Target,
  Zap,
  ShieldCheck,
} from 'lucide-react';

export interface ArticleData {
  slug: string;
  title: string;
  banglaTitle?: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  content: React.ReactNode;
}

export const ARTICLES_LIST: ArticleData[] = [
  {
    slug: 'increase-typing-speed',
    title: 'How to Increase Typing Speed from 30 WPM to 100+ WPM: The Complete Scientific Blueprint',
    banglaTitle: '৩০ থেকে ১০০+ WPM গতি অর্জনের বৈজ্ঞানিক কৌশল',
    category: 'Speed Optimization',
    readTime: '6 min read',
    date: 'November 2026',
    author: 'Jasmin (Web & Telemetry Engineer)',
    summary:
      'Discover the cognitive psychology and motor muscle memory principles that professional typists use to shatter the typing plateau and consistently achieve 80–100+ Words Per Minute.',
    content: (
      <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
        <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed">
          Typing speed is not an innate genetic talent—it is a finely calibrated motor skill governed by neuromuscular muscle memory. Whether your current benchmark is 25 Words Per Minute (WPM) or 50 WPM, reaching 80 to 100+ WPM requires shifting from conscious visual hunting to subconscious tactile execution. This masterclass outlines the evidence-based framework to systematically elevate your keyboard velocity.
        </p>

        <div className="rounded-2xl border border-[#d7ff64]/20 bg-[#d7ff64]/5 p-5 text-sm space-y-2">
          <strong className="text-[#d7ff64] block font-bold text-base">Key Takeaway Principle:</strong>
          <p className="text-gray-300">
            Speed is a natural byproduct of accuracy. When you train for speed alone, error rates spike, causing cognitive interruptions and frequent Backspace corrections that destroy average WPM. Train for 98%+ accuracy first, and raw speed will compound automatically.
          </p>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          1. The Anatomy of Touch Typing & The 8 Anchor Fingers
        </h3>
        <p>
          The bedrock of high-speed keyboarding is the <strong>Home Row</strong> (<code className="text-[#d7ff64] font-mono">ASDF - JKL;</code>). Notice the small tactile bumps molded onto the <strong>F</strong> and <strong>J</strong> keys on almost every standard computer keyboard. These physical anchor points exist so your index fingers can locate home position without your eyes ever leaving the screen:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li><strong>Left Hand:</strong> Pinky on <code className="text-[#d7ff64]">A</code>, Ring on <code className="text-[#d7ff64]">S</code>, Middle on <code className="text-[#d7ff64]">D</code>, Index on <code className="text-[#d7ff64]">F</code>.</li>
          <li><strong>Right Hand:</strong> Index on <code className="text-[#d7ff64]">J</code>, Middle on <code className="text-[#d7ff64]">K</code>, Ring on <code className="text-[#d7ff64]">L</code>, Pinky on <code className="text-[#d7ff64]">;</code>.</li>
          <li><strong>Both Thumbs:</strong> Rest lightly above the Spacebar. Use whichever thumb feels most natural (typically the dominant hand).</li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          2. Shattering the "Typing Plateau"
        </h3>
        <p>
          Most self-taught typists plateau between 40 and 55 WPM because they rely on hybrid "hunt-and-peck" methods (using only 3 or 4 fingers while looking back and forth between the keyboard and the monitor). Moving past this barrier requires three mental shifts:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300">
          <li>
            <strong>The Zero-Glance Rule:</strong> Under no circumstance should you look down at your fingers during practice. Even if you miss a character, let your finger hunt tactilely until muscle memory registers the correct spatial distance.
          </li>
          <li>
            <strong>Word Chunking:</strong> Beginners process text letter-by-letter (<code className="text-cyan-300 font-mono">t - h - e</code>). Elite typists process entire multisyllabic words as single motor gestures (<code className="text-[#d7ff64] font-mono">the</code>, <code className="text-[#d7ff64] font-mono">tion</code>, <code className="text-[#d7ff64] font-mono">ing</code>). Train your eyes to read one to two words ahead of the word you are actively striking.
          </li>
          <li>
            <strong>Burst vs. Endurance Training:</strong> Alternate between 15-second high-intensity sprints (pushing maximum velocity) and 3-to-5-minute continuous endurance tests (focusing exclusively on zero errors).
          </li>
        </ol>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          3. The 15-Minute Daily Deliberate Practice Regimen
        </h3>
        <p>
          Cramming two hours once a week is far less effective than 15 minutes of structured, daily deliberate practice:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-white/10 bg-[#161814] p-4 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Minutes 0–5</span>
            <h4 className="font-bold text-white text-sm">Key Row Warmup</h4>
            <p className="text-xs text-gray-400">Drill Home Row and Top Row key combinations to prime finger tendons and awaken muscle memory.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#161814] p-4 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Minutes 5–10</span>
            <h4 className="font-bold text-white text-sm">1-Minute Speed Challenge</h4>
            <p className="text-xs text-gray-400">Perform three 60-second sprints on TypeMaster targeting 98%+ accuracy. Restart if errors exceed 2.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#161814] p-4 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d7ff64]">Minutes 10–15</span>
            <h4 className="font-bold text-white text-sm">Arcade Reflex Drills</h4>
            <p className="text-xs text-gray-400">Play a session of Zombie Rush or Nitro Racer to train high-pressure reaction speed and peripheral vision.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#141612] p-5 space-y-2 mt-6">
          <h4 className="font-bold text-white text-base">Summary Checklist for Rapid Growth:</h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#d7ff64]" /> Keep wrists slightly elevated (never collapse them flat against the table).</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#d7ff64]" /> Return fingers to home row anchors after reaching for numerical or symbol keys.</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#d7ff64]" /> Use our mechanical audio feedback to cultivate a consistent, metronomic typing rhythm.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    slug: 'bijoy-vs-avro-guide',
    title: 'Bijoy Keyboard vs Avro Phonetic: Comprehensive Bangla Typing Guide & Layout Comparison',
    banglaTitle: 'বিজয় বনাম অভ্র: বাংলা টাইপিংয়ের পরিপূর্ণ গাইড ও তুলনামূলক বিশ্লেষণ',
    category: 'Bangla Typing',
    readTime: '7 min read',
    date: 'November 2026',
    author: 'Jasmin (Web & Telemetry Engineer)',
    summary:
      'An in-depth historical and practical comparison of Bijoy layout and Avro phonetic typing, complete with conjunct (যুক্তবর্ণ) keystroke charts, government exam standards, and speed techniques.',
    content: (
      <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
        <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed">
          বাংলা টাইপিংয়ে দ্রুততা ও নির্ভুলতা অর্জন করা আধুনিক দাপ্তরিক কাজ, শিক্ষা, ব্লগিং এবং ফ্রিল্যান্সিংয়ের জন্য অন্যতম প্রধান যোগ্যতা। তবে নতুন শিক্ষার্থীদের মনে প্রায়শই একটি বড় প্রশ্ন তৈরি হয়: <strong>বিজয় কীবোর্ড নাকি অভ্র ফোনেটিক—কোনটি শেখা বেশি জরুরি?</strong> এই আর্টিকেলে আমরা দুটি মাধ্যমেরই গঠন, প্রয়োজনীয়তা এবং ব্যবহারিক নিয়ম বিস্তারিত তুলে ধরেছি।
        </p>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-2">
          ১. বিজয় কীবোর্ড (Bijoy Layout): ইতিহাস ও প্রাসঙ্গিকতা
        </h3>
        <p>
          মোস্তফা জব্বার কর্তৃক প্রবর্তিত বিজয় কীবোর্ড লেআউট ১৯৮৮ সালে যাত্রা শুরু করে এবং এটি বাংলাদেশের প্রাচীনতম ও সর্বাধিক প্রচলিত বাংলা টাইপিং লেআউট। এটি মূলত কীবোর্ডের প্রতিটি ফিজিক্যাল বাটনে নির্দিষ্ট বাংলা বর্ণমালা অ্যাসাইন করে কাজ করে:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-gray-300">
          <li><strong>স্বতন্ত্র কি-ম্যাপিং:</strong> উদাহরণস্বরূপ, <code className="text-[#d7ff64] font-mono">J</code> চাপলে &lsquo;ক&rsquo;, <code className="text-[#d7ff64] font-mono">D</code> চাপলে &lsquo;ি-কার&rsquo; এবং <code className="text-[#d7ff64] font-mono">F</code> চাপলে &lsquo;া-কার&rsquo; আসে।</li>
          <li><strong>যুক্তবর্ণের জন্য &lsquo;G&rsquo; (হসন্ত বা লিঙ্ক কী):</strong> যেকোনো যুক্তবর্ণ লেখার সময় প্রথম বর্ণের পর <code className="text-[#d7ff64] font-mono">G</code> এবং তারপর দ্বিতীয় বর্ণটি চাপতে হয় (যেমন: ক + G + ষ = ক্ষ)।</li>
          <li><strong>সরকারি পরীক্ষার বাধ্যবাধকতা:</strong> বাংলাদেশ সরকারের সরকারি মন্ত্রণালয়, প্রেস, মুদ্রণ প্রকাশনা এবং জাতীয় রাজস্ব বোর্ডসহ অধিকাংশ চাকরির টাইপিং টেস্টে বিজয় লেআউটকে স্ট্যান্ডার্ড ধরা হয়।</li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          ২. অভ্র ফোনেটিক (Avro Phonetic): আধুনিকতার বিপ্লব
        </h3>
        <p>
          ২০০৩ সালে ডা. মেহদী হাসান খান উদ্ভাবন করেন অভ্র ফোনেটিক কিবোর্ড। &ldquo;আমাদের পরিচয় আমাদের ভাষায়&rdquo; স্লোগান নিয়ে গড়ে ওঠা এই সফটওয়্যার বাংলা টাইপিংকে সর্বস্তরের মানুষের জন্য উন্মুক্ত করে দেয়:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-gray-300">
          <li><strong>রোমান উচ্চারণভিত্তিক (Transliteration):</strong> ইংরেজিতে যেভাবে উচ্চারণ করা হয় সেভাবে টাইপ করলে স্বয়ংক্রিয়ভাবে বাংলা তৈরি হয় (যেমন: <code className="text-cyan-400 font-mono">ami</code> ➔ আমি, <code className="text-cyan-400 font-mono">bangla</code> ➔ বাংলা)।</li>
          <li><strong>দ্রুত শেখার সুবিধা:</strong> নতুন কোনো লেআউট মুখস্থ করার প্রয়োজন নেই; কিবোর্ডে ইংরেজি জানা যে কেউ ১ম দিন থেকেই ৩০+ WPM গতিতে বাংলায় লিখতে পারেন।</li>
          <li><strong>ওয়েব ও সোশ্যাল মিডিয়া:</strong> সোশ্যাল মিডিয়া চ্যাটিং, ব্লগিং, সফটওয়্যার ডেভেলপমেন্ট এবং অনলাইন সার্চে অভ্র ফোনেটিক অপ্রতিরোধ্য।</li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          ৩. গুরুত্বপূর্ণ যুক্তবর্ণের টাইপিং নিয়ম (Bijoy vs Avro Cheat Sheet)
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#161814]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#111310] text-[#d7ff64] font-bold border-b border-white/10">
              <tr>
                <th className="p-3">যুক্তবর্ণ</th>
                <th className="p-3">বর্ণ বিভাজন</th>
                <th className="p-3">বিজয় কিবোর্ড কি (Bijoy)</th>
                <th className="p-3">অভ্র ফোনেটিক কি (Avro)</th>
                <th className="p-3">উদাহরণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-gray-300">
              <tr>
                <td className="p-3 font-bold text-white text-base">ক্ষ</td>
                <td className="p-3">ক + ্ + ষ</td>
                <td className="p-3 text-[#d7ff64]">J + G + Shift+N</td>
                <td className="p-3 text-cyan-300">kSh / kkh</td>
                <td className="p-3">ক্ষমা, পরীক্ষা</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white text-base">জ্ঞ</td>
                <td className="p-3">জ + ্ + ঞ</td>
                <td className="p-3 text-[#d7ff64]">U + G + Shift+I</td>
                <td className="p-3 text-cyan-300">jNg / jG</td>
                <td className="p-3">জ্ঞান, বিজ্ঞান</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white text-base">ষ্ণ</td>
                <td className="p-3">ষ + ্ + ণ</td>
                <td className="p-3 text-[#d7ff64]">Shift+N + G + Shift+B</td>
                <td className="p-3 text-cyan-300">ShN</td>
                <td className="p-3">উষ্ণ, তৃষ্ণা</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white text-base">হ্ম</td>
                <td className="p-3">হ + ্ + ম</td>
                <td className="p-3 text-[#d7ff64]">I + G + M</td>
                <td className="p-3 text-cyan-300">hm</td>
                <td className="p-3">ব্রাহ্মণ, ব্রহ্মাণ্ড</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white text-base">ত্র</td>
                <td className="p-3">ত + র-ফলা</td>
                <td className="p-3 text-[#d7ff64]">K + G + Z</td>
                <td className="p-3 text-cyan-300">tr</td>
                <td className="p-3">ছাত্র, পাত্র</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#141612] p-5 space-y-2">
          <h4 className="font-bold text-white text-base">আমাদের বিশেষজ্ঞ পরামর্শ:</h4>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            আপনি যদি কোনো সরকারি চাকরি, ব্যাংক পরীক্ষা বা প্রেস মিডিয়াতে ক্যারিয়ার গড়তে চান, তবে <strong>বিজয় লেআউট</strong> ভালো করে আয়ত্ত করুন। আর যদি আপনি ব্যক্তিগত নোট, সোশ্যাল মিডিয়া, কনটেন্ট ক্রিয়েশন বা দ্রুত যোগাযোগের জন্য বাংলায় লিখতে চান, তবে <strong>অভ্র ফোনেটিক</strong> আপনার সময় অনেক বাঁচিয়ে দেবে। টাইপমাস্টারে আপনি দুটি পদ্ধতিতেই অনুশীলন করতে পারবেন।
          </p>
        </div>
      </div>
    ),
  },
  {
    slug: 'typing-ergonomics-posture',
    title: 'Touch Typing Ergonomics: How to Prevent Wrist Strain, Fatigue & Carpal Tunnel Syndrome',
    banglaTitle: 'টাইপিং এরগোনোমিক্স: কব্জি ব্যথা ও পেশির ক্লান্তি প্রতিরোধের বিজ্ঞান',
    category: 'Ergonomics & Health',
    readTime: '5 min read',
    date: 'November 2026',
    author: 'Jasmin (Web & Telemetry Engineer)',
    summary:
      'Long typing sessions can cause chronic tendon inflammation and Carpal Tunnel Syndrome. Learn proper workstation setup, neutral wrist positioning, and vital finger stretch exercises.',
    content: (
      <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
        <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed">
          Repetitive Strain Injury (RSI) and Carpal Tunnel Syndrome (CTS) are two of the most prevalent occupational hazards affecting programmers, typists, and digital workers today. Spending hours pressing hundreds of keys per minute with improper posture puts immense compression stress on the median nerve running through the carpal tunnel in your wrist.
        </p>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-2">
          1. The 90-Degree Elbow & "Floating Wrist" Principle
        </h3>
        <p>
          The most catastrophic ergonomic mistake typists make is resting their wrists heavily on the edge of the desk or laptop palm-rest while typing. This pins the tendons and compresses the nerve canal:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li><strong>The Floating Wrist:</strong> When actively typing, your wrists should hover slightly above the keyboard, forming a straight line from your knuckles down your forearm. Imagine playing a classical piano—your hands should be light and fluid.</li>
          <li><strong>Elbow Alignment:</strong> Adjust your chair height so your elbows bend at a relaxed 90 to 100-degree angle with your shoulders completely relaxed (not shrugged upward).</li>
          <li><strong>Feet Flat on the Floor:</strong> Both feet should firmly contact the floor or a footrest to support proper lumbar spine curvature.</li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          2. Screen Position & The 20-20-20 Vision Rule
        </h3>
        <p>
          Neck strain directly causes shoulder tightness, which cascades down your forearms into your finger flexor muscles:
        </p>
        <div className="rounded-xl border border-white/10 bg-[#161814] p-4 text-xs sm:text-sm space-y-2">
          <p><strong className="text-white">Eye Level Rule:</strong> The top third of your computer display should align precisely with your horizontal eye level, situated 20 to 28 inches (arm&apos;s length) away from your face.</p>
          <p><strong className="text-white">The 20-20-20 Rule:</strong> Every 20 minutes, pause for 20 seconds and focus your eyes on an object at least 20 feet away to alleviate ciliary muscle spasm in the eyes.</p>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          3. Three Essential Stretches for Typists (Perform Every 45 Minutes)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/15 p-4 space-y-2">
            <h4 className="font-bold text-cyan-300 text-sm">Prayer Stretch</h4>
            <p className="text-xs text-gray-300">Place palms together in front of your chest and slowly lower your wrists downward until you feel a gentle stretch across your forearms. Hold for 15 seconds.</p>
          </div>
          <div className="rounded-2xl border border-[#d7ff64]/20 bg-[#d7ff64]/10 p-4 space-y-2">
            <h4 className="font-bold text-[#d7ff64] text-sm">Finger Web Fan</h4>
            <p className="text-xs text-gray-300">Spread all ten fingers as wide as possible like a fan for 5 seconds, then clench into a gentle fist. Repeat 5 times to stimulate synovial tendon lubrication.</p>
          </div>
          <div className="rounded-2xl border border-purple-500/20 bg-purple-950/15 p-4 space-y-2">
            <h4 className="font-bold text-purple-300 text-sm">Wrist Flexor Roll</h4>
            <p className="text-xs text-gray-300">Extend your arm forward with palm facing up. Use your other hand to gently pull your fingers downward toward your body. Hold for 15 seconds per hand.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: 'wpm-calculation-standards',
    title: 'The Mathematics of Typing: How Raw WPM, Net WPM, Accuracy, and CPM Are Calculated',
    banglaTitle: 'টাইপিং গতির বৈজ্ঞানিক পরিমাপ: WPM, CPM এবং Accuracy হিসাবের আন্তর্জাতিক সূত্র',
    category: 'Benchmarks & Standards',
    readTime: '5 min read',
    date: 'November 2026',
    author: 'Jasmin (Web & Telemetry Engineer)',
    summary:
      'Understand the international standard 5-character word formula, the difference between Gross WPM and Net WPM, error penalties, and global typing velocity percentiles.',
    content: (
      <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
        <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed">
          When comparing typing speeds, people often throw around numbers like &ldquo;75 WPM&rdquo; or &ldquo;350 CPM&rdquo;. But how is typing speed standardized internationally? Since words vary in length—a sentence with &ldquo;a&rdquo; and &ldquo;to&rdquo; is vastly different from &ldquo;incomprehensibility&rdquo;—standardized typing engines use precise mathematical formulas.
        </p>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-2">
          1. The Universal 5-Character Standard
        </h3>
        <p>
          In standardized international telemetry (including TypeMaster and global typing certification boards), <strong>one &ldquo;word&rdquo; is mathematically defined as exactly 5 keystrokes</strong>, including spaces, punctuation marks, and capitalization.
        </p>
        <div className="rounded-xl border border-white/10 bg-[#161814] p-4 text-xs sm:text-sm font-mono space-y-1">
          <p className="text-[#d7ff64] font-bold">Standard Formula:</p>
          <p className="text-white">Gross WPM = (Total Keystrokes Striking Correct or Incorrect ÷ 5) ÷ Elapsed Minutes</p>
          <p className="text-cyan-300 font-bold pt-2">Net WPM (Real Certified Velocity):</p>
          <p className="text-white">Net WPM = Gross WPM - (Uncorrected Errors ÷ Elapsed Minutes)</p>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          2. WPM vs CPM (Characters Per Minute)
        </h3>
        <p>
          While Western software predominantly quotes WPM, Asian banking exams, data entry tests in Japan and South Korea, and various South Asian government civil service examinations measure speed in <strong>CPM</strong> (Characters Per Minute) or <strong>KPH</strong> (Keystrokes Per Hour):
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-gray-300">
          <li><strong>CPM to WPM conversion:</strong> <code className="text-[#d7ff64] font-mono">WPM = CPM ÷ 5</code></li>
          <li><strong>Example:</strong> If your CPM telemetry is 300 characters in 1 minute, your standardized speed is exactly <code className="text-[#d7ff64] font-mono">60 WPM</code>.</li>
          <li><strong>KPH to WPM conversion:</strong> <code className="text-[#d7ff64] font-mono">WPM = KPH ÷ 300</code></li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          3. Global Typing Speed Percentiles (Where Do You Rank?)
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#161814]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#111310] text-[#d7ff64] font-bold border-b border-white/10">
              <tr>
                <th className="p-3">Skill Tier</th>
                <th className="p-3">WPM Range</th>
                <th className="p-3">CPM Equivalent</th>
                <th className="p-3">Global Population %</th>
                <th className="p-3">Typical Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-gray-300">
              <tr>
                <td className="p-3 text-gray-400">Beginner</td>
                <td className="p-3 font-bold text-white">10 – 30 WPM</td>
                <td className="p-3">50 – 150 CPM</td>
                <td className="p-3">Bottom 30%</td>
                <td className="p-3">Casual browsing, hunt & peck</td>
              </tr>
              <tr>
                <td className="p-3 text-cyan-400">Average Typist</td>
                <td className="p-3 font-bold text-white">35 – 45 WPM</td>
                <td className="p-3">175 – 225 CPM</td>
                <td className="p-3">Middle 40%</td>
                <td className="p-3">Standard office emails, essays</td>
              </tr>
              <tr>
                <td className="p-3 text-emerald-400">Fast Professional</td>
                <td className="p-3 font-bold text-white">55 – 75 WPM</td>
                <td className="p-3">275 – 375 CPM</td>
                <td className="p-3">Top 20%</td>
                <td className="p-3">Developers, journalists, executive assistants</td>
              </tr>
              <tr>
                <td className="p-3 text-purple-400">High Velocity Elite</td>
                <td className="p-3 font-bold text-white">80 – 100 WPM</td>
                <td className="p-3">400 – 500 CPM</td>
                <td className="p-3">Top 8%</td>
                <td className="p-3">Competitive typists, court reporters</td>
              </tr>
              <tr>
                <td className="p-3 text-amber-300">Grandmaster</td>
                <td className="p-3 font-bold text-amber-300">110+ WPM</td>
                <td className="p-3">550+ CPM</td>
                <td className="p-3">Top 1%</td>
                <td className="p-3">World-record tier, stenographers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    slug: 'mechanical-keyboards-guide',
    title: 'Mechanical vs Membrane Keyboards: How Switch Types, Actuation Force, and Travel Distance Impact WPM',
    banglaTitle: 'মেকানিক্যাল বনাম মেমব্রেন কিবোর্ড: সুইচ এবং অ্যাকচুয়েশন পয়েন্ট কি গতি বাড়ায়?',
    category: 'Hardware & Gear',
    readTime: '6 min read',
    date: 'November 2026',
    author: 'Jasmin (Web & Telemetry Engineer)',
    summary:
      'Can a mechanical keyboard really increase your typing speed? Explore actuation points, switch profiles (Red, Brown, Blue), tactile feedback, and empirical typing speed benchmarks.',
    content: (
      <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
        <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed">
          One of the most persistent debates in the typing and enthusiast community is whether buying an expensive custom mechanical keyboard actually improves WPM. Does a \$150 mechanical board with Lubed Gateron Yellows make you faster than a standard \$15 office membrane keyboard, or is it pure placebo? Let&apos;s evaluate the engineering mechanics.
        </p>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-2">
          1. Actuation Point: The Secret Advantage of Mechanical Switches
        </h3>
        <p>
          On a standard membrane rubber-dome keyboard (found on most cheap office computers and standard laptops), each key must be pressed completely down until the rubber dome collapses against the electrical trace printed on the membrane sheet below (known as &ldquo;bottoming out&rdquo;).
        </p>
        <p>
          In contrast, mechanical switches feature individual metal leaf contacts. The keystroke registers at the <strong>Actuation Point</strong>—typically halfway down the keystroke (around 1.5mm to 2.0mm of travel):
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-gray-300">
          <li>You do not need to bottom out to register the character.</li>
          <li>Finger muscles expend significantly less impact energy per keystroke.</li>
          <li>Reset points occur quicker, enabling faster double-taps and rapid letter sequencing.</li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          2. The Three Classic Switch Profiles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-2">
            <h4 className="font-bold text-rose-300 text-base">Linear (Red Switches)</h4>
            <p className="text-xs text-gray-300">Smooth, uninterrupted travel from top to bottom with no tactile bump. Extremely fast and quiet; popular among competitive typists who prefer effortless, feather-light strokes.</p>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-2">
            <h4 className="font-bold text-amber-300 text-base">Tactile (Brown Switches)</h4>
            <p className="text-xs text-gray-300">Features a subtle physical resistance bump at the exact actuation point, letting your fingertips instinctively know when the character fired without bottoming out.</p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4 space-y-2">
            <h4 className="font-bold text-cyan-300 text-base">Clicky (Blue Switches)</h4>
            <p className="text-xs text-gray-300">Produces an audible, sharp acoustic click at the actuation point. Highly satisfying tactile feedback reminiscent of vintage typewriters, though louder in quiet office environments.</p>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          3. Empirical Speed Data: Does Hardware Really Make You Faster?
        </h3>
        <p>
          Aggregated typing benchmarks across thousands of trials show that moving from a mushy membrane keyboard to a tuned mechanical keyboard yields an average <strong>5% to 15% increase in Net WPM</strong>, primarily through a dramatic reduction in missed keystrokes and finger fatigue during tests longer than 2 minutes. However, a mechanical keyboard cannot fix bad finger placement—mastering touch typing technique remains 85% of the equation!
        </p>
      </div>
    ),
  },
  {
    slug: 'data-entry-exam-prep',
    title: 'Preparing for Government & Data Entry Typing Exams in Bangladesh and Worldwide',
    banglaTitle: 'সরকারি ও বাণিজ্যিক ডাটা এন্ট্রি পরীক্ষার টাইপিং প্রস্তুতির পূর্ণাঙ্গ গাইডলাইন',
    category: 'Career & Examinations',
    readTime: '6 min read',
    date: 'November 2026',
    author: 'Jasmin (Web & Telemetry Engineer)',
    summary:
      'Detailed exam requirements for administrative, banking, and data entry positions. Learn how examination centers penalize errors, 5-minute continuous test formats, and a 30-day preparation roadmap.',
    content: (
      <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
        <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed">
          বাংলাদেশ সরকারের বিভিন্ন মন্ত্রণালয়, সরকারি অধিদপ্তর, স্বায়ত্তশাসিত সংস্থা, তফসিলি ব্যাংক এবং আন্তর্জাতিক ডাটা এন্ট্রি আউটসোর্সিং চাকরির ক্ষেত্রে টাইপিং টেস্ট একটি বাধ্যতামূলক পরীক্ষা। লিখিত পরীক্ষায় ভালো নম্বর পেয়েও কেবল টাইপিং টেস্টে গতি বা নির্ভুলতার ঘাটতির কারণে প্রতি বছর শত শত পরীক্ষার্থী বাতিল হয়ে যান।
        </p>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-2">
          ১. পরীক্ষার স্ট্যান্ডার্ড স্পিড বেঞ্চমার্ক
        </h3>
        <p>
          বাংলাদেশ সিভিল সার্ভিস ও সরকারি নিয়োগ বিজ্ঞপ্তির স্ট্যান্ডার্ড অনুযায়ী সাধারণত দুটি ভাষায় পরীক্ষা নেওয়া হয়:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="rounded-2xl border border-[#d7ff64]/20 bg-[#d7ff64]/5 p-4 space-y-2">
            <h4 className="font-bold text-[#d7ff64] text-base">বাংলা টাইপিং বেঞ্চমার্ক</h4>
            <ul className="text-xs sm:text-sm text-gray-300 space-y-1 list-disc pl-4">
              <li>সাধারণ ডাটা এন্ট্রি অপারেটর: <strong>২০ WPM</strong> (১০০ CPM)</li>
              <li>অফিস সহকারী কাম-কম্পিউটার মুদ্রাক্ষরিক: <strong>২৫ WPM</strong></li>
              <li>উচ্চমান সহকারী ও ব্যক্তিগত সহকারী: <strong>৩০+ WPM</strong></li>
              <li>লেআউট: সাধারণত <strong>বিজয় কীবোর্ড (Bijoy Layout)</strong> বাধ্যতামূলক।</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 space-y-2">
            <h4 className="font-bold text-cyan-300 text-base">ইংরেজি টাইপিং বেঞ্চমার্ক</h4>
            <ul className="text-xs sm:text-sm text-gray-300 space-y-1 list-disc pl-4">
              <li>সাধারণ ডাটা এন্ট্রি অপারেটর: <strong>২৮ – ৩০ WPM</strong></li>
              <li>অফিস সহকারী কাম-কম্পিউটার অপারেটর: <strong>৩৫ WPM</strong></li>
              <li>আন্তর্জাতিক রিমোট ডাটা প্রসেসিং: <strong>৪০ – ৫০ WPM</strong></li>
              <li>লেআউট: স্ট্যান্ডার্ড <strong>QWERTY</strong>।</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          ২. পরীক্ষার হলে যে ভুলগুলোর কারণে পরীক্ষার্থীরা ডিসকোয়ালিফাই হন
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li><strong>ব্যাকস্পেস সীমাবদ্ধতা:</strong> অনেক সরকারি সফটওয়্যারে ব্যাকস্পেস বাটন নিষ্ক্রিয় (Disabled) করা থাকে অথবা অতিরিক্ত ব্যাকস্পেস চাপলে পেনাল্টি কাটা হয়। ভুল ছাড়াই টাইপ করার অভ্যাস না থাকলে পরীক্ষার্থীরা প্যানিক করেন।</li>
          <li><strong>নির্ভুলতার পেনাল্টি অনুপাত:</strong> সাধারণত ৯৫% এর নিচে নির্ভুলতা নামলে স্বয়ংক্রিয়ভাবে অকৃতকার্য ঘোষণা করা হয়। উদাহরণস্বরূপ, প্রতি একটি ভুল শব্দের জন্য ৫টি সঠিক শব্দ বিয়োগ করার মতো কঠোর নিয়ম অনেক পরীক্ষায় থাকে।</li>
          <li><strong>প্রিন্টেড শিট দেখে টাইপ করার অনভ্যাস:</strong> কম্পিউটার মনিটরে না দেখে পাশে রাখা হার্ডকপি কাগজ দেখে টাইপ করতে হয়। মনিটর ছাড়া টাইপ করার অভ্যাস না থাকলে স্পিড অর্ধেক কমে যায়।</li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
          ৩. পরীক্ষার জন্য ৩০ দিনের রুটিন প্ল্যান
        </h3>
        <p>
          পরীক্ষার তারিখ ঘোষণার পর শেষ মুহূর্তে গতি বাড়ানো যায় না। নিচে দেওয়া ৩০ দিনের রুটিন মেনে টাইপমাস্টারে অনুশীলন করুন:
        </p>
        <div className="rounded-2xl border border-white/10 bg-[#141612] p-5 space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d7ff64]/20 text-xs font-bold text-[#d7ff64] flex-shrink-0">১</span>
            <div>
              <strong className="text-white text-sm">১ম থেকে ১০ম দিন (নির্ভুলতা তৈরি):</strong>
              <p className="text-xs text-gray-400">প্রতিদিন ৩০ মিনিট কেবল হোম রো ও যুক্তবর্ণের তালিকার ওপর অনুশীলন করুন। ১০০% একিউরেসি নিশ্চিত না করে স্পিড বাড়ানোর চেষ্টা করবেন না।</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-400 flex-shrink-0">২</span>
            <div>
              <strong className="text-white text-sm">১১তম থেকে ২০তম দিন (৫-মিনিট প্যাসেজ টেস্ট):</strong>
              <p className="text-xs text-gray-400">টাইপমাস্টারের Guided Passage সেকশনে গিয়ে টানা ৫ মিনিট করে বড় বড় অনুচ্ছেদ টাইপ করুন। ব্যাকস্পেস যথাসম্ভব কম চাপুন।</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-400/20 text-xs font-bold text-purple-400 flex-shrink-0">৩</span>
            <div>
              <strong className="text-white text-sm">২১তম থেকে ৩০তম দিন (মক টেস্ট ও চাপ নিয়ন্ত্রণ):</strong>
              <p className="text-xs text-gray-400">টাইমার চালু করে প্রতিদিন অন্তত ৩টি ফুল মক টেস্ট দিন। আপনার প্রগ্রেস হিস্ট্রি গ্রাফ চেক করে দুর্বল বাটনগুলো চিহ্নিত করুন।</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

interface ArticlesSectionProps {
  initialSlug?: string;
  onNavigate: (path: string) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  initialSlug,
  onNavigate,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);

  // If a slug is selected, find the article
  const activeArticle = selectedSlug
    ? ARTICLES_LIST.find((a) => a.slug === selectedSlug)
    : null;

  // View: Single In-depth Article
  if (activeArticle) {
    return (
      <article className="mx-auto max-w-4xl space-y-8 py-8 px-2 sm:px-4 animate-in fade-in duration-200">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-400" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="hover:text-[#d7ff64] transition"
          >
            Home
          </a>
          <ChevronRight className="h-3 w-3 text-gray-600" />
          <a
            href="/articles"
            onClick={(e) => {
              e.preventDefault();
              setSelectedSlug(null);
              onNavigate('/articles');
            }}
            className="hover:text-[#d7ff64] transition"
          >
            Typing Academy Articles
          </a>
          <ChevronRight className="h-3 w-3 text-gray-600" />
          <span className="text-gray-300 font-medium truncate max-w-[200px] sm:max-w-none">
            {activeArticle.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="border-b border-white/10 pb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-3 py-1 text-xs font-bold text-[#d7ff64]">
              {activeArticle.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{activeArticle.readTime}</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>{activeArticle.date}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {activeArticle.title}
          </h1>

          {activeArticle.banglaTitle && (
            <p className="text-base sm:text-lg text-[#d7ff64] font-medium">
              {activeArticle.banglaTitle}
            </p>
          )}

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2 text-xs text-gray-300">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d7ff64]/20 text-[#d7ff64] font-black font-mono">
              J
            </div>
            <div>
              <p className="font-bold text-white">{activeArticle.author}</p>
              <p className="text-[11px] text-gray-500">
                Verified Publisher & Keyboarding Curriculum Contributor
              </p>
            </div>
          </div>
        </header>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none">{activeArticle.content}</div>

        {/* Bottom Navigation & Share */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => {
              setSelectedSlug(null);
              onNavigate('/articles');
            }}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            <span>← ব্যাক টু আর্টিকেলস (All Articles)</span>
          </button>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="flex items-center gap-2 rounded-xl bg-[#d7ff64] px-5 py-2 text-xs font-bold text-[#111310] hover:bg-[#e6ff8f] transition shadow-[0_0_15px_rgba(215,255,100,0.3)]"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>এখনই টাইপিং টেস্ট দিন 🚀</span>
          </a>
        </div>
      </article>
    );
  }

  // View: Articles Hub Directory
  return (
    <section className="mx-auto max-w-6xl space-y-8 py-8 px-2 sm:px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-4 py-1.5 text-xs font-bold tracking-wide text-[#d7ff64]">
          <BookOpen className="h-4 w-4" />
          <span>ORIGINAL TYPING KNOWLEDGE & EDUCATIONAL ACADEMY</span>
        </div>
        <h1 className="text-3xl font-black text-white sm:text-5xl tracking-tight">
          Comprehensive <span className="text-[#d7ff64]">Typing Guides</span> & Articles
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          Explore in-depth educational resources covering touch typing mechanics, Bengali keyboard layouts, ergonomics, speed mathematics, and career data entry preparation.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {ARTICLES_LIST.map((art, idx) => (
          <article
            key={art.slug}
            className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#161814] p-6 shadow-xl transition-all duration-200 hover:border-[#d7ff64]/40 hover:bg-[#1a1c17] hover:shadow-[0_10px_30px_rgba(215,255,100,0.1)]"
          >
            <div className="space-y-3">
              {/* Category & Read Time */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 font-bold text-[#d7ff64] text-[11px] border border-white/5">
                  {art.category}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="h-3 w-3" />
                  <span>{art.readTime}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-white group-hover:text-[#d7ff64] transition line-clamp-2">
                <a
                  href={`/articles/${art.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSlug(art.slug);
                    onNavigate(`/articles/${art.slug}`);
                  }}
                >
                  {art.title}
                </a>
              </h2>

              {art.banglaTitle && (
                <p className="text-xs text-[#d7ff64] font-medium line-clamp-1">
                  {art.banglaTitle}
                </p>
              )}

              {/* Excerpt */}
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                {art.summary}
              </p>
            </div>

            {/* Read Article Action */}
            <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-mono">By Jasmin</span>
              <a
                href={`/articles/${art.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSlug(art.slug);
                  onNavigate(`/articles/${art.slug}`);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d7ff64] hover:text-[#e6ff8f] transition"
              >
                <span>Read Guide</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* AdSense Publisher Value Quality Assurance Banner */}
      <div className="rounded-2xl border border-white/10 bg-[#141612] p-5 sm:p-6 text-center space-y-2">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#d7ff64]/10 text-[#d7ff64]">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <h3 className="font-bold text-white text-base">Authentic, Original Curriculum</h3>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
          All articles and guides on TypeMaster are written and reviewed based on official international typing speed formulas and verified Bengali keyboard standards.
        </p>
      </div>
    </section>
  );
};
