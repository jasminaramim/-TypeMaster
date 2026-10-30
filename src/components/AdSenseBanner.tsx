import React, { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotId,
  format = 'auto',
  className = '',
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only push if adsbygoogle is loaded and not already executed
    try {
      if (typeof window !== 'undefined' && !initialized.current) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      }
    } catch (e) {
      // Ignore adsbygoogle push errors in dev or adblock environments
    }
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 mx-auto w-full max-w-4xl text-center overflow-hidden ${className}`}
    >
      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
        ADVERTISEMENT
      </div>
      <div className="min-h-[90px] rounded-2xl border border-white/5 bg-[#141612]/60 p-2 flex items-center justify-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '90px', width: '100%' }}
          data-ad-client="ca-pub-6064612688052081"
          data-ad-slot={slotId || '1234567890'}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
};
