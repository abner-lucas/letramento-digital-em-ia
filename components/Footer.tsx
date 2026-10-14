import Link from 'next/link';
import { COURSE_INFO } from '@/data/courseData';
import { MapPin, GraduationCap, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#131209] text-slate-400 text-xs border-t border-[#272727]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Course Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="w-6 h-6 rounded-md bg-emerald-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                IA
              </span>
              <span>{COURSE_INFO.shortTitle}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md [text-wrap:pretty]">
              Iniciativa educacional voltada ao letramento digital crítico, ético e cidadão em inteligência artificial para a juventude e as comunidades da Amazônia.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>{COURSE_INFO.locations}</span>
            </div>
          </div>

          {/* Col 2: Modules Nav */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Módulos curriculares
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/modulo/1" className="hover:text-emerald-400 transition-colors">
                  Módulo 1: Fundamentos da IA
                </Link>
              </li>
              <li>
                <Link href="/modulo/2" className="hover:text-emerald-400 transition-colors">
                  Módulo 2: Engenharia de prompts
                </Link>
              </li>
              <li>
                <Link href="/modulo/3" className="hover:text-emerald-400 transition-colors">
                  Módulo 3: Identificação de vieses
                </Link>
              </li>
              <li>
                <Link href="/modulo/4" className="hover:text-emerald-400 transition-colors">
                  Módulo 4: Construindo seu assistente
                </Link>
              </li>
              <li>
                <a href="#apostilas" className="hover:text-emerald-400 transition-colors">
                  Apostilas para impressão
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Promoters & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Instituições parceiras
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 mb-4">
              {COURSE_INFO.promoters.map((p, idx) => (
                <li key={idx}>
                  <strong className="text-slate-200">{p.name}</strong>
                  <span className="block text-slate-500">{p.role}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-[#272727] flex flex-col gap-1 text-slate-500">
              <a href="#sobre" className="hover:text-slate-300 transition-colors">Termos de uso educacional</a>
              <a href="#sobre" className="hover:text-slate-300 transition-colors">Política de privacidade e dados</a>
            </div>
          </div>
        </div>

        {/* Bottom Credits Strip */}
        <div className="pt-8 border-t border-[#272727] flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            <span>Material didático de uso educacional livre · Belém, Pará · 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Coordenação pedagógica: {COURSE_INFO.author} ({COURSE_INFO.institution})</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
