import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, ExternalLink, X } from 'lucide-react';

interface CookieConsentProps {
  onNavigatePolicy: (path: string) => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigatePolicy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('typemaster-cookie-consent');
      if (!consent) {
        // Slight delay so it doesn't jarringly pop immediately
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In private browsing mode or storage disabled
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('typemaster-cookie-consent', 'accepted');
    } catch {}
    setVisible(false);
  };

  const handleNecessaryOnly = () => {
    try {
      localStorage.setItem('typemaster-cookie-consent', 'necessary_only');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent Banner"
      className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-4xl animate-in slide-in-from-bottom duration-300 google-anno-skip"
      data-google-ad-unit="none"
    >
      <div className="rounded-2xl border border-white/15 bg-[#141612]/95 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#d7ff64]/15 text-[#d7ff64]">
              <Cookie className="h-5 w-5" />
            </div>
            <div className="space-y-1 text-xs text-gray-300 leading-relaxed">
              <p className="font-semibold text-white">
                We respect your privacy and value data transparency
              </p>
              <p className="text-gray-400">
                TypeMaster uses cookies and local storage to save your typing telemetry, audio preferences, and to deliver non-invasive advertisements via Google AdSense. Learn more in our{' '}
                <a
                  href="/privacy-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePolicy('/privacy-policy');
                  }}
                  className="text-[#d7ff64] underline font-medium hover:text-[#e6ff8f]"
                >
                  Privacy Policy
                </a>{' '}
                and review{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 underline font-medium hover:text-cyan-200 inline-flex items-center gap-0.5"
                >
                  how Google uses data <ExternalLink className="h-2.5 w-2.5 inline" />
                </a>.
              </p>
            </div>
          </div>

          <div className="flex w-full sm:w-auto items-center justify-end gap-2.5 flex-shrink-0">
            <button
              onClick={handleNecessaryOnly}
              className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="rounded-xl bg-[#d7ff64] px-4 py-2 text-xs font-bold text-[#111310] transition hover:bg-[#e6ff8f] shadow-[0_0_15px_rgba(215,255,100,0.3)]"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

