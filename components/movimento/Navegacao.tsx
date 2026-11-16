'use client';

import { useEffect, useState } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

/** Respeita "reduzir movimento" do sistema em todas as animações do Motion. */
export function ProvedorMovimento({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Barra fina no topo que acompanha a leitura da página. */
export function BarraProgresso() {
  const { scrollYProgress } = useScroll();
  const escala = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: escala }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 print:hidden"
    />
  );
}

/** Botão "voltar ao topo" que aparece depois de rolar uma tela. */
export function VoltarAoTopo() {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <motion.button
      type="button"
      aria-label="Voltar ao topo da página"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={false}
      animate={{ opacity: visivel ? 1 : 0, y: visivel ? 0 : 16, pointerEvents: visivel ? 'auto' : 'none' }}
      transition={{ duration: 0.3 }}
      tabIndex={visivel ? 0 : -1}
      className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-[#313131] bg-[#1F1F1F]/90 text-emerald-400 shadow-2xl backdrop-blur-xl transition-colors hover:bg-[#272727] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 print:hidden"
    >
      <ArrowUp className="h-4 w-4" />
    </motion.button>
  );
}

/** Devolve o `id` da seção que cruza a linha a 40% da altura da tela. */
export function useSecaoAtiva(ids: string[]) {
  const [ativa, setAtiva] = useState<string | null>(null);
  const chave = ids.join('|');

  useEffect(() => {
    if (!chave) return;
    const elementos = chave
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtiva(e.target.id);
      },
      { rootMargin: '-40% 0px -59% 0px' },
    );
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [chave]);

  return ativa;
}

/** Trilho lateral com um ponto por seção (telas grandes): mostra onde o leitor está. */
export function IndicadorSecoes({ secoes }: { secoes: { id: string; rotulo: string }[] }) {
  const ativa = useSecaoAtiva(secoes.map((s) => s.id));

  return (
    <nav aria-label="Seções desta página" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block print:hidden">
      <ol className="flex flex-col items-end gap-3">
        {secoes.map((s, i) => {
          const atual = s.id === ativa;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={atual ? 'true' : undefined} className="group flex items-center gap-3 focus-visible:outline-none">
                <span className="pointer-events-none translate-x-2 rounded-full border border-[#313131] bg-[#1F1F1F]/95 px-2.5 py-1 font-mono text-[11px] text-slate-200 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  {String(i + 1).padStart(2, '0')} · {s.rotulo}
                </span>
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    atual ? 'h-6 w-1.5 bg-emerald-400' : 'h-1.5 w-1.5 bg-slate-500 group-hover:bg-slate-300'
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
