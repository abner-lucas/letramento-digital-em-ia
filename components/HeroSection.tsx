'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, FileText } from 'lucide-react';
import { AI_TOOLS_DATA, COURSE_MODULES } from '@/data/courseData';
import { EASE } from '@/components/movimento/Revelar';
import HeroConsole from './HeroConsole';

// Números calculados dos dados do curso (as apostilas somam 4 + 6 + 4 + 6 horas).
const totalHoras = COURSE_MODULES.reduce((soma, m) => soma + m.hours, 0);

const entrada = (atraso: number) => ({
  initial: { opacity: 0, y: 28, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease: EASE, delay: atraso },
});

export default function HeroSection() {
  return (
    <section id="inicio" aria-label="Apresentação do curso" className="relative bg-[#181818] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#272727] overflow-hidden">
      {/* Brilho suave no tom verde do site, sem mudar a paleta */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Realização conforme as apostilas */}
        <motion.div
          {...entrada(0)}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#272727] text-xs font-semibold text-emerald-400 tracking-wide mb-6"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping motion-reduce:hidden" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          <span>Governo do Pará · PRODEPA · iSACI · IFPA</span>
        </motion.div>

        {/* Hero Title: Left to right text gradient #FFFFFF to #9B9B9B, max-w 680px */}
        <motion.h1
          {...entrada(0.1)}
          className="text-4xl sm:text-6xl font-bold tracking-tight font-sans max-w-[680px] mx-auto [text-wrap:balance] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9B9B9B]"
        >
          O futuro da inteligência artificial<br />começa na Amazônia
        </motion.h1>

        <motion.p
          {...entrada(0.25)}
          className="mt-6 text-base sm:text-lg text-slate-300 max-w-[680px] mx-auto leading-relaxed [text-wrap:pretty]"
        >
          Abra a caixa-preta dos modelos de linguagem, comande com a matriz PACIF, audite vieses e construa assistentes
          para resolver problemas reais dos bairros de Belém.
        </motion.p>

        <motion.div {...entrada(0.4)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/modulo/1"
            className="group py-2 px-3 text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] flex items-center gap-2 shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            <span>Começar o curso agora</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#apostilas"
            className="py-2 px-3 text-base font-semibold text-slate-200 bg-[#272727] hover:bg-[#313131] rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] border border-[#313131] flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:outline-none"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Baixar apostilas oficiais</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
          className="mt-12"
        >
          <HeroConsole />
        </motion.div>

        {/* Números conferidos nas apostilas */}
        <motion.dl
          initial="oculto"
          whileInView="visivel"
          viewport={{ once: true }}
          variants={{ visivel: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          className="mt-12 pt-8 border-t border-[#272727] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-center"
        >
          {[
            { valor: `${COURSE_MODULES.length} módulos`, rotulo: `${totalHoras} horas de formação prática`, cor: 'text-white' },
            { valor: '100% gratuito', rotulo: 'Acesso direto pelo smartphone', cor: 'text-emerald-400' },
            { valor: 'Matriz PACIF', rotulo: 'Papel, Ação, Contexto, Instruções e Formato', cor: 'text-white' },
            { valor: `${AI_TOOLS_DATA.length} IAs gratuitas`, rotulo: 'Comparadas no Módulo 2', cor: 'text-emerald-400' },
          ].map((m) => (
            <motion.div
              key={m.valor}
              className="flex flex-col"
              variants={{ oculto: { opacity: 0, y: 16 }, visivel: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
            >
              <dt className="order-2 text-xs text-slate-400 mt-1">{m.rotulo}</dt>
              <dd className={`order-1 text-2xl font-bold font-mono tabular-nums ${m.cor}`}>{m.valor}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
