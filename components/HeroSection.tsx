import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import HeroConsole from './HeroConsole';

export default function HeroSection() {
  return (
    <section className="relative bg-[#181818] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#272727]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Institutional Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#272727] text-xs font-semibold text-emerald-400 tracking-wide mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>PRODEPA · iSACI · IFPA · SIMBIC UFPA · Governo do Pará</span>
        </div>

        {/* Hero Title: Left to right text gradient #FFFFFF to #9B9B9B, max-w 680px */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight font-sans max-w-[680px] mx-auto [text-wrap:balance] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9B9B9B]">
          O futuro da inteligência artificial<br />começa na Amazônia
        </h1>

        {/* Subtitle: max-w 680px, no hyphens, text-wrap pretty */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-[680px] mx-auto leading-relaxed [text-wrap:pretty]">
          Abra a caixa preta dos modelos de linguagem, comande com a metodologia PACIF, audite vieses algorítmicos e construa assistentes reais para os bairros de Belém.
        </p>

        {/* Primary CTA and Secondary Link */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/modulo/1"
            className="py-2 px-3 text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] flex items-center gap-2 shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            <span>Começar o curso agora</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#apostilas"
            className="py-2 px-3 text-base font-semibold text-slate-200 bg-[#272727] hover:bg-[#313131] rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] border border-[#313131] flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:outline-none"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Baixar apostilas oficiais</span>
          </a>
        </div>

        {/* Central Interactive Console */}
        <div className="mt-12">
          <HeroConsole />
        </div>

        {/* Micro-metrics strip with organic data */}
        <div className="mt-12 pt-8 border-t border-[#272727] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">4 módulos</div>
            <div className="text-xs text-slate-400 mt-1">16 horas de formação prática</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">100% gratuito</div>
            <div className="text-xs text-slate-400 mt-1">Acesso direto pelo smartphone</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">Matriz PACIF</div>
            <div className="text-xs text-slate-400 mt-1">Método validado em sala de aula</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">Guamá e RMB</div>
            <div className="text-xs text-slate-400 mt-1">Foco prioritário comunitário</div>
          </div>
        </div>
      </div>
    </section>
  );
}
