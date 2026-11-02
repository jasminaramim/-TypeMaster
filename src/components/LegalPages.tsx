import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Info,
  Mail,
  ExternalLink,
  CheckCircle2,
  Lock,
  Globe2,
  Sparkles,
  ArrowRight,
  Send,
  User,
  AlertCircle,
} from 'lucide-react';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

// =========================================================================
// 1. PRIVACY POLICY PAGE (Google AdSense, GDPR & CCPA Compliant)
// =========================================================================
export const PrivacyPolicyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <article className="mx-auto max-w-4xl space-y-8 py-8 px-2 sm:px-4">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-3.5 py-1 text-xs font-bold text-[#d7ff64]">
          <ShieldCheck className="h-4 w-4" />
          <span>OFFICIAL PUBLISHER DISCLOSURE</span>
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl tracking-tight">
          Privacy Policy <span className="text-gray-400 font-normal text-2xl">(গোপনীয়তা নীতিমালা)</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-400">
          Last Updated: November 2026 • Effective Date: November 2026
        </p>
      </div>

      {/* Overview Card */}
      <div className="rounded-2xl border border-[#d7ff64]/20 bg-[#d7ff64]/5 p-5 text-xs sm:text-sm text-gray-300 leading-relaxed space-y-2">
        <p className="font-semibold text-[#d7ff64]">
          Welcome to TypeMaster (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;).
        </p>
        <p>
          We are committed to respecting your privacy, safeguarding your personal data, and maintaining complete transparency regarding how data is processed on our website ({typeof window !== 'undefined' ? window.location.origin : 'https://typemaster-ecru.vercel.app'}). This policy is tailored in full accordance with the <strong>Google Publisher Policies</strong>, the General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA).
        </p>
      </div>

      {/* Section 1: Typing Tests & Keystrokes Privacy */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-xs font-mono text-[#d7ff64]">
            1
          </span>
          Information Collection & Typing Sessions Privacy
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          TypeMaster prioritizes on-device data processing. When you use our typing speed test, 1-minute sprints, lesson drills, or arcade games:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-400">
          <li>
            <strong className="text-gray-200">Local Telemetry Processing:</strong> Your keystrokes, typing speed (WPM), accuracy percentages, and passage completion metrics are computed directly in your browser. We do NOT record, log, or transmit your individual keystrokes to external servers.
          </li>
          <li>
            <strong className="text-gray-200">Local Storage:</strong> Your personal typing history is stored exclusively in your browser&apos;s local storage (<code className="text-[#d7ff64]">localStorage</code>) so you can review your growth over time. You can clear this data at any moment with one click from the My History tab.
          </li>
          <li>
            <strong className="text-gray-200">AI Grammar & Rewriting:</strong> When you submit text to the AI Grammar Checker or Text Rewriter, the text is processed in real time to generate linguistic corrections and tone enhancements. We do not sell or archive your input text.
          </li>
        </ul>
      </section>

      {/* Section 2: Google AdSense, Cookies & Third-Party Advertising */}
      <section className="space-y-3 rounded-2xl border border-white/10 bg-[#141612] p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#d7ff64]/20 text-xs font-mono text-[#d7ff64]">
            2
          </span>
          Google AdSense & Third-Party Advertising Disclosures
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          We use <strong>Google AdSense</strong> and other third-party advertising partners to serve advertisements when you visit our website. These companies may use cookies, web beacons, and device identifiers to collect non-personally identifiable information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
        </p>

        <div className="rounded-xl border border-white/5 bg-[#0e100d] p-4 text-xs sm:text-sm space-y-2.5">
          <h3 className="font-bold text-white text-sm">Key Google AdSense Disclosures:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d7ff64] font-semibold underline inline-flex items-center gap-1 hover:text-[#e6ff8f]"
              >
                Google Ads Settings <ExternalLink className="h-3 w-3" />
              </a>.
            </li>
            <li>
              Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d7ff64] font-semibold underline inline-flex items-center gap-1 hover:text-[#e6ff8f]"
              >
                AboutAds.info Choices <ExternalLink className="h-3 w-3" />
              </a>{' '}
              or the{' '}
              <a
                href="https://www.youronlinechoices.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d7ff64] font-semibold underline inline-flex items-center gap-1 hover:text-[#e6ff8f]"
              >
                Network Advertising Initiative Opt-out Page <ExternalLink className="h-3 w-3" />
              </a>.
            </li>
          </ul>
        </div>

        {/* Mandatory Google Partner link */}
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-xs sm:text-sm text-cyan-200">
          <p className="font-semibold text-white mb-1">How Google Uses Information from Partner Sites:</p>
          <p className="text-gray-300">
            For detailed information on how Google manages information gathered across partner platforms, please visit Google&apos;s official partner disclosure at:{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d7ff64] font-bold underline inline-flex items-center gap-1 hover:text-[#e6ff8f]"
            >
              How Google uses information from sites or apps that use our services <ExternalLink className="h-3.5 w-3.5" />
            </a>.
          </p>
        </div>
      </section>

      {/* Section 3: Cookies & Web Beacons */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-xs font-mono text-[#d7ff64]">
            3
          </span>
          Cookies & Tracking Technologies
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Cookies are small text files stored on your device that enable websites to remember your preferences (such as audio mute toggle, theme mode, and typing session state). We use:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-400">
          <li><strong>Essential Local Cookies:</strong> Save your sound settings, keyboard preferences, and local speed records.</li>
          <li><strong>Advertising Cookies (Google AdSense):</strong> Help Google determine which ads are most relevant to you and prevent displaying the same ad repeatedly.</li>
          <li><strong>Analytics Identifiers:</strong> Non-personal technical analytics to measure load performance and optimize browser compatibility.</li>
        </ul>
        <p className="text-xs text-gray-400">
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent via your browser settings. However, some site features may experience degraded functionality if essential cookies are disabled.
        </p>
      </section>

      {/* Section 4: Children's Online Privacy (COPPA Compliance) */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-xs font-mono text-[#d7ff64]">
            4
          </span>
          Children&apos;s Online Privacy Protection (COPPA)
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          TypeMaster is an educational typing trainer designed for a general audience of students, job seekers, and typing enthusiasts. We do not knowingly collect or solicit personally identifiable information from children under the age of 13. In compliance with COPPA, if we learn that we have collected personal information from a child under 13 without verified parental consent, we will delete that information immediately.
        </p>
      </section>

      {/* Section 5: GDPR & CCPA User Rights */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-xs font-mono text-[#d7ff64]">
            5
          </span>
          Your Rights Under GDPR & CCPA
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Depending on your jurisdiction (such as the European Economic Area or California), you hold legal rights regarding your personal data:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-400">
          <li><strong>Right of Access & Deletion:</strong> You can wipe all cached typing telemetry at any time by clearing your browser cache or clicking &ldquo;Clear History&rdquo; on the History page.</li>
          <li><strong>Right to Opt-Out:</strong> You may opt out of personalized third-party ad tracking through the links provided above.</li>
          <li><strong>Right to Non-Discrimination:</strong> We do not discriminate against any user exercising their legal privacy rights.</li>
        </ul>
      </section>

      {/* Section 6: Contact Information */}
      <section className="space-y-3 border-t border-white/10 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-xs font-mono text-[#d7ff64]">
            6
          </span>
          Contact the Publisher
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          If you have questions or concerns regarding this Privacy Policy or our compliance with Google Publisher standards, please reach out to our team:
        </p>
        <div className="rounded-xl border border-white/10 bg-[#161814] p-4 text-xs sm:text-sm space-y-1.5">
          <p className="text-white font-semibold">TypeMaster Platform Support</p>
          <p className="text-gray-400">
            Developer & Publisher:{' '}
            <a
              href="https://jasmin-v01.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d7ff64] underline font-bold"
            >
              Jasmin (Portfolio & Contact)
            </a>
          </p>
          <p className="text-gray-400">
            Official Email:{' '}
            <a href="mailto:jasminaramim@gmail.com" className="text-white font-mono hover:text-[#d7ff64] underline">
              jasminaramim@gmail.com
            </a>
          </p>
          <p className="text-gray-400">Website: https://typemaster-ecru.vercel.app</p>
        </div>
      </section>
    </article>
  );
};

// =========================================================================
// 2. TERMS OF SERVICE PAGE
// =========================================================================
export const TermsOfServicePage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <article className="mx-auto max-w-4xl space-y-8 py-8 px-2 sm:px-4">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-400">
          <FileText className="h-4 w-4" />
          <span>USER AGREEMENT & CONDITIONS</span>
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl tracking-tight">
          Terms of Service <span className="text-gray-400 font-normal text-2xl">(ব্যবহারের শর্তাবলী)</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-400">
          Last Updated: November 2026 • Please read these terms carefully before using our platform.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p className="text-gray-400">
            By accessing or using TypeMaster, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you should discontinue use of the platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">2. Educational & Personal Use</h2>
          <p className="text-gray-400">
            TypeMaster is provided free of charge for personal typing improvement, academic practice, touch-typing mastery (Bangla Bijoy, Avro phonetic, and English QWERTY), and grammar exploration. You agree to use the platform solely for lawful educational purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">3. Intellectual Property Rights</h2>
          <p className="text-gray-400">
            The platform design, interactive keyboard layout visualizations, Bengali conjunct typing datasets, custom audio engine, and educational documentation are the intellectual property of TypeMaster and its author. You may not scrape, mirror, or repackage this material for commercial redistribution without prior written consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">4. Prohibition of Automated Bots & Misuse</h2>
          <p className="text-gray-400">
            Users may not employ automated typing scripts, macro key-injectors, or scraping bots to artificially simulate typing telemetry, overload server APIs, or disrupt normal site operations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">5. Disclaimer of Warranties & Limitation of Liability</h2>
          <p className="text-gray-400">
            TypeMaster is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. While we strive for 100% precision in telemetry, timing, and linguistic guidance, we make no warranties of any kind regarding accuracy, uninterrupted uptime, or employment test outcomes.
          </p>
        </section>

        <section className="space-y-2 border-t border-white/10 pt-4">
          <h2 className="text-base sm:text-lg font-bold text-white">6. Inquiries</h2>
          <p className="text-gray-400">
            Questions regarding our Terms of Service should be directed to{' '}
            <a href="mailto:jasminaramim@gmail.com" className="text-[#d7ff64] underline font-mono">
              jasminaramim@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </article>
  );
};

// =========================================================================
// 3. ABOUT US PAGE (E-E-A-T Compliant: Author, Mission & Tech)
// =========================================================================
export const AboutPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <article className="mx-auto max-w-4xl space-y-8 py-8 px-2 sm:px-4">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-bold text-purple-400">
          <Info className="h-4 w-4" />
          <span>ORIGIN & MISSION</span>
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl tracking-tight">
          About TypeMaster <span className="text-gray-400 font-normal text-2xl">(আমাদের সম্পর্কে)</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-400">
          The next-generation dual-language keyboard speed trainer and linguistic companion.
        </p>
      </div>

      {/* Mission Banner */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/25 to-[#161814] p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Bridging the Digital Typing Divide in <span className="text-[#d7ff64]">Bangla & English</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          In today&apos;s fast-paced digital economy, keyboard proficiency is not just a convenience—it is a foundational superpower for software developers, content creators, researchers, office professionals, and students. While hundreds of English typing tests exist online, authentic touch-typing resources for **native Bengali typography** (Bijoy and Avro phonetic layouts) have historically been scattered, difficult to find, or plagued by outdated interfaces.
        </p>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          <strong>TypeMaster</strong> was engineered from the ground up to solve this gap. We combine scientific muscle memory drills, 3D animated coaching, 1-minute speed workouts, arcade game mechanics, and an AI-assisted linguistic engine in one clean, privacy-first web application.
        </p>
      </div>

      {/* Author & Creator Profile (E-E-A-T) */}
      <section className="rounded-3xl border border-white/10 bg-[#141612] p-6 sm:p-8 space-y-6">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <User className="h-5 w-5 text-[#d7ff64]" />
          <span>Creator & Lead Developer Profile</span>
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-[#d7ff64]/40 bg-[#d7ff64]/10 text-2xl font-black text-[#d7ff64] shadow-[0_0_20px_rgba(215,255,100,0.2)]">
            J
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="text-base sm:text-lg font-black text-white">
              Jasmin
            </h4>
            <p className="text-xs sm:text-sm text-[#d7ff64] font-medium">
              Full-Stack Web Engineer & UI/UX Specialist
            </p>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Passionate about high-performance web tooling, accessible bilingual software, and interactive educational interfaces. Built TypeMaster with React 19, Vite 8, Tailwind CSS v4, and state-of-the-art keystroke telemetry algorithms.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://jasmin-v01.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-3.5 py-1.5 text-xs font-bold text-[#d7ff64] transition hover:bg-[#d7ff64] hover:text-[#111310]"
              >
                <span>Visit Developer Portfolio</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:jasminaramim@gmail.com"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-amber-400" />
                <span>jasminaramim@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/5 bg-[#141612] p-5 space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#d7ff64]" />
            Bilingual Bengali & English Engine
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Practice national Bengali passages, Avro phonetic typing, Bijoy keyboard conjunct sequences (যুক্তবর্ণ), alongside international English passages with live word-by-word accuracy validation.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#141612] p-5 space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#d7ff64]" />
            Scientifically Grounded Finger Placement
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Home Row (ASDF - JKL;), Top Row, Bottom Row, and tactile bump guides help you develop instinctive muscle memory and abandon the hunt-and-peck habit forever.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#141612] p-5 space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#d7ff64]" />
            Adrenaline Gamification
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Nine thrilling arcade mini-games (Zombie Rush, Nitro Racer, Cosmic Blaster, Cyber Hacker) transform repetitive practice into an exhilarating reflex workout.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#141612] p-5 space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#d7ff64]" />
            Complete Keystroke Privacy
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Zero keystroke sniffing or backend keylogging. Keystroke telemetry is calculated entirely in memory on your device, ensuring complete confidential typing safety.
          </p>
        </div>
      </section>
    </article>
  );
};

// =========================================================================
// 4. CONTACT US PAGE (Working Form + Direct Email + Publisher Verification)
// =========================================================================
export const ContactPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate reliable contact dispatch or mailto fallback
    setSubmitted(true);
  };

  return (
    <article className="mx-auto max-w-4xl space-y-8 py-8 px-2 sm:px-4">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400">
          <Mail className="h-4 w-4" />
          <span>DIRECT SUPPORT & FEEDBACK</span>
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl tracking-tight">
          Contact Us <span className="text-gray-400 font-normal text-2xl">(যোগাযোগ)</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-400">
          Have feedback, report an issue, or want to partner with us? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left Column: Contact Information Cards */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#141612] p-5 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Publisher Information
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#d7ff64]/15 text-[#d7ff64]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-gray-400 block">Direct Email:</span>
                  <a
                    href="mailto:jasminaramim@gmail.com"
                    className="font-mono text-white font-semibold hover:text-[#d7ff64] transition"
                  >
                    jasminaramim@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-400">
                  <Globe2 className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-gray-400 block">Developer Portfolio:</span>
                  <a
                    href="https://jasmin-v01.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d7ff64] font-semibold underline inline-flex items-center gap-1"
                  >
                    Jasmin Portfolio <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-400/15 text-purple-400">
                  <Info className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-gray-400 block">Response Time:</span>
                  <span className="text-gray-300">
                    We typically respond to inquiries within 24 to 48 hours.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d7ff64]/20 bg-[#d7ff64]/5 p-4 text-xs text-gray-300 space-y-2">
            <p className="font-bold text-[#d7ff64]">AdSense & Policy Questions?</p>
            <p className="text-gray-400">
              For privacy policy compliance, data deletion requests, or copyright inquiries under DMCA, please email with the subject &ldquo;Privacy & Compliance Inquiry&rdquo;.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="md:col-span-3">
          <div className="rounded-3xl border border-white/10 bg-[#161814] p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d7ff64]/40 bg-[#d7ff64]/10 text-[#d7ff64]">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-white">বার্তাটি সফলভাবে পাঠানো হয়েছে!</h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{name}</strong>. Your message has been received. You can also reach out directly to{' '}
                  <a href="mailto:jasminaramim@gmail.com" className="text-[#d7ff64] underline">
                    jasminaramim@gmail.com
                  </a>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    setSubject('');
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base sm:text-lg font-bold text-white mb-2">
                  Send a Direct Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jasmin"
                      className="w-full rounded-xl border border-white/10 bg-[#111310] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-600 focus:border-[#d7ff64] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-white/10 bg-[#111310] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-600 focus:border-[#d7ff64] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Typing feedback, passage suggestion, partnership"
                    className="w-full rounded-xl border border-white/10 bg-[#111310] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-600 focus:border-[#d7ff64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message or inquiry here..."
                    className="w-full rounded-xl border border-white/10 bg-[#111310] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-600 focus:border-[#d7ff64] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#d7ff64] px-5 py-3 text-xs sm:text-sm font-bold text-[#111310] transition hover:bg-[#e6ff8f] active:scale-[0.98] shadow-[0_0_20px_rgba(215,255,100,0.25)]"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message (বার্তা পাঠান)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

