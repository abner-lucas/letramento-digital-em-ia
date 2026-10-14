import Link from 'next/link';
import { ArrowRight, FileText, Layers, ShieldCheck, Eye, Bot } from 'lucide-react';
import { CourseModule } from '@/data/courseData';

interface ModuleCardProps {
  module: CourseModule;
}

const MODULE_ICONS = {
  1: Layers,
  2: ShieldCheck,
  3: Eye,
  4: Bot,
};

export default function ModuleCard({ module }: ModuleCardProps) {
  const IconComponent = MODULE_ICONS[module.id as keyof typeof MODULE_ICONS] || Layers;

  return (
    <article className="group relative bg-[#1F1F1F] hover:bg-[#272727] border border-[#313131] hover:border-slate-600 rounded-2xl p-6 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col justify-between shadow-lg">
      <div>
        {/* Top bar with module number and badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#272727] text-emerald-400 border border-[#313131] flex items-center justify-center font-mono font-bold text-xs">
              0{module.id}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Carga {module.hours}h
            </span>
          </div>

          <span className="text-xs font-semibold text-emerald-300 bg-[#272727] border border-[#313131] px-2.5 py-0.5 rounded-full">
            {module.badge}
          </span>
        </div>

        {/* Title and subtitle */}
        <h3 className="text-xl font-bold font-sans text-white group-hover:text-emerald-300 transition-colors duration-200 [text-wrap:balance]">
          {module.subtitle}
        </h3>

        <p className="mt-2 text-sm text-slate-400 leading-relaxed [text-wrap:pretty]">
          {module.shortDescription}
        </p>

        {/* Key Competencies chips */}
        <div className="mt-4 pt-4 border-t border-[#313131] flex flex-wrap gap-2">
          {module.keyTopics.slice(0, 3).map((topic, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded-md bg-[#272727] text-slate-300 text-xs border border-[#313131]"
            >
              {topic.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 pt-4 border-t border-[#313131] flex items-center justify-between gap-3">
        <Link
          href={`/modulo/${module.id}`}
          className="flex-1 py-2 px-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
        >
          <span>Acessar módulo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          href={`/apostila/${module.id}`}
          title="Ver apostila completa deste módulo para leitura e impressão"
          className="py-2 px-3 text-sm font-semibold text-slate-200 hover:text-white bg-[#272727] hover:bg-[#313131] border border-[#313131] rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:outline-none"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Apostila</span>
        </Link>
      </div>
    </article>
  );
}
