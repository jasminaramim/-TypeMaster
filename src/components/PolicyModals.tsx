import React from 'react';
import { X, ShieldCheck, FileText, Mail, Info, ExternalLink, Lock } from 'lucide-react';

export type PolicyModalType = 'privacy' | 'terms' | 'about' | 'contact' | null;

interface PolicyModalsProps {
  activeModal: PolicyModalType;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200 google-anno-skip"
      data-google-ad-unit="none"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/10 bg-[#161814] shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#111310]">
          <div className="flex items-center gap-2.5">
            {activeModal === 'privacy' && <ShieldCheck className="h-5 w-5 text-[#d7ff64]" />}
            {activeModal === 'terms' && <FileText className="h-5 w-5 text-cyan-400" />}
            {activeModal === 'about' && <Info className="h-5 w-5 text-purple-400" />}
            {activeModal === 'contact' && <Mail className="h-5 w-5 text-amber-400" />}
            <h3 className="text-base sm:text-lg font-black text-white">
              {activeModal === 'privacy' && 'Privacy Policy (গোপনীয়তা নীতিমালা)'}
              {activeModal === 'terms' && 'Terms of Service (ব্যবহারের শর্তাবলী)'}
              {activeModal === 'about' && 'About TypeMaster (আমাদের সম্পর্কে)'}
              {activeModal === 'contact' && 'Contact Us (যোগাযোগ)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs sm:text-sm text-gray-300 space-y-5 leading-relaxed font-sans">
          {/* ========================================================= */}
          {/* PRIVACY POLICY (GOOGLE ADSENSE COMPLIANT)                 */}
          {/* ========================================================= */}
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#d7ff64]/20 bg-[#d7ff64]/5 p-4 text-xs">
                <span className="font-bold text-[#d7ff64] block mb-1">Last Updated: October 2026</span>
                This Privacy Policy outlines how TypeMaster (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;platform&rdquo;) collects, uses, and safeguards your information in compliance with Google Publisher Policies, GDPR, and CCPA standards.
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">1. Information Collection & Typing Tests</h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  TypeMaster is designed to prioritize user privacy. Typing practice sessions, WPM telemetry, and keystroke tests are processed locally in your browser. We do not store or transmit your sensitive keystrokes to external servers. Your local test history is saved exclusively in your browser&apos;s localStorage for your personal progress tracking.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">2. Google AdSense & Third-Party Advertising</h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  We use Google AdSense and third-party advertising partners to serve ads when you visit our website. These companies may use cookies, web beacons, and other tracking technologies to collect non-personally identifiable information (such as your browser type, time of visit, and IP address) to display advertisements tailored to your interests.
                </p>
                <div className="mt-2.5 rounded-xl border border-white/5 bg-[#111310] p-3 text-xs space-y-1.5">
                  <div className="text-white font-semibold">Google&apos;s Use of Advertising Cookies:</div>
                  <ul className="list-disc pl-4 space-y-1 text-gray-400">
                    <li>Google uses cookies to serve ads on TypeMaster based on a user&apos;s prior visits to our website or other websites on the internet.</li>
                    <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.</li>
                    <li>
                      Users may opt out of personalized advertising by visiting{' '}
                      <a
                        href="https://www.google.com/settings/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d7ff64] underline inline-flex items-center gap-0.5"
                      >
                        Google Ads Settings <ExternalLink className="h-3 w-3 inline" />
                      </a>
                      , or opt out of a third-party vendor&apos;s use of cookies by visiting{' '}
                      <a
                        href="https://www.aboutads.info/choices/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d7ff64] underline inline-flex items-center gap-0.5"
                      >
                        www.aboutads.info <ExternalLink className="h-3 w-3 inline" />
                      </a>.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">3. Google Partner Privacy Disclosure</h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  To learn more about how Google processes information when you use partner sites, please visit:{' '}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d7ff64] underline font-medium inline-flex items-center gap-1"
                  >
                    <span>How Google uses information from sites or apps that use our services</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">4. Log Files & Analytics</h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Like most website operators, TypeMaster logs standard diagnostic data, including internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, platform type, date/time stamps, and click metrics to analyze trends and administer the site. This data is not linked to any personally identifiable information.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">5. Children&apos;s Privacy (COPPA Compliance)</h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  TypeMaster does not knowingly collect personally identifiable information from children under the age of 13. If you believe your child has provided personal information on our website, please contact us immediately, and we will promptly remove such information from our records.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TERMS OF SERVICE                                          */}
          {/* ========================================================= */}
          {activeModal === 'terms' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-xs">
                <span className="font-bold text-cyan-300 block mb-1">Effective Date: October 2026</span>
                By accessing or using TypeMaster, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">1. Educational & Non-Commercial Practice Use</h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  TypeMaster provides touch typing exercises, WPM speed testing, Bangla and English instructional content, and arcade keyboard games free of charge for personal educational improvement.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">2. Intellectual Property & Content Rights</h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  All software code, lesson structures, custom finger placement diagrams, text articles, visual illustrations, and branding belong exclusively to TypeMaster or are used under open-source licenses. You may not scrape, replicate, or commercially distribute this material without written consent.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">3. Automated Tools & Fair Use</h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Users agree not to deploy automated typing bots, scripts, or auto-clickers to artificially inflate leaderboard scores or manipulate telemetry metrics.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">4. Disclaimer of Warranties</h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  TypeMaster is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind. We do not guarantee uninterrupted uptime or that telemetry scores will guarantee employment examination results.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABOUT US                                                  */}
          {/* ========================================================= */}
          {activeModal === 'about' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-4 text-xs">
                <span className="font-bold text-purple-300 block mb-1">Our Mission</span>
                TypeMaster is built to bridge the digital divide by offering a state-of-the-art dual-language (Bangla & English) touch typing trainer, making fast and accurate keyboarding accessible to students, freelancers, and professionals worldwide.
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">What Makes TypeMaster Unique?</h4>
                <ul className="list-disc pl-4 space-y-2 text-xs sm:text-sm text-gray-300">
                  <li>
                    <strong className="text-white">Dual Language Mastery:</strong> Comprehensive support for standard English QWERTY touch typing as well as Bangla (both Bijoy layout & Avro phonetic typing).
                  </li>
                  <li>
                    <strong className="text-white">Scientific Muscle Memory:</strong> Row-by-row muscle memory lessons, color-coded finger distribution maps, and tactile bump guides.
                  </li>
                  <li>
                    <strong className="text-white">Zero Bloat & Complete Privacy:</strong> Runs smoothly directly inside your browser with client-side telemetry and no invasive tracking.
                  </li>
                  <li>
                    <strong className="text-white">Gamified Reflex Training:</strong> Exciting arcade games like Zombie Rush and Nitro Racer that build rapid finger response through fun challenges.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* CONTACT US                                                */}
          {/* ========================================================= */}
          {activeModal === 'contact' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 text-xs">
                <span className="font-bold text-amber-300 block mb-1">Get In Touch</span>
                Have feedback, questions about our typing curriculum, or partnership inquiries? We would love to hear from you.
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111310] p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d7ff64]/15 text-[#d7ff64]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Official Support & Publisher Email:</span>
                    <a
                      href="mailto:support@typemaster.app"
                      className="text-sm sm:text-base font-bold text-white hover:text-[#d7ff64] transition"
                    >
                      support@typemaster.app
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-400">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Platform Hours & Response Time:</span>
                    <span className="text-xs font-semibold text-gray-300">
                      Sunday – Friday, 9:00 AM – 6:00 PM (GMT+6) • We typically respond within 24 hours.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-white/10 px-6 py-3.5 bg-[#111310] flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 px-5 py-2 text-xs font-bold text-white transition hover:bg-white/20"
          >
            বন্ধ করুন (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
