'use client';

import { useEffect, useRef, useState } from 'react';

const TAGLINE_WORDS = [
  'A', 'inteligência', 'artificial', 'não', 'deve', 'ser', 'uma', 'caixa', 'preta', 'importada.',
  'Construímos', 'autonomia', 'crítica,', 'comando', 'preciso', 'e', 'soluções', 'reais', 'com', 'a', 'comunidade', 'da', 'Amazônia.'
];

export default function TaglineReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!container) return;
          const rect = container.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Progress calculation: starts when top enters 85% of viewport, finishes when it reaches 30%
          const start = windowHeight * 0.85;
          const end = windowHeight * 0.3;
          const current = rect.top;

          let progress = (start - current) / (start - end);
          progress = Math.max(0, Math.min(1, progress));

          const wordsToActivate = Math.floor(progress * TAGLINE_WORDS.length);
          setActiveCount(wordsToActivate);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 px-4 max-w-[680px] mx-auto text-center"
      aria-label="Manifesto pedagógico"
    >
      <div className="inline-block px-3 py-1 rounded-full bg-[#272727] border border-[#313131] text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-6">
        Manifesto de autonomia
      </div>

      <p className="text-3xl sm:text-5xl font-bold leading-tight font-sans tracking-tight [text-wrap:balance]">
        {TAGLINE_WORDS.map((word, index) => {
          const isActive = index <= activeCount;
          return (
            <span
              key={index}
              className={`inline-block mr-2.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isActive
                  ? 'text-white opacity-100'
                  : 'text-slate-600 opacity-30'
              }`}
            >
              {word}
            </span>
          );
        })}
      </p>

      <div className="mt-8 text-sm text-slate-400 max-w-lg mx-auto [text-wrap:pretty]">
        Formação prática e cidadã desenvolvida por pesquisadores e educadores do Pará para democratizar a tecnologia.
      </div>
    </section>
  );
}

