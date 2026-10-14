'use client';

import Link from 'next/link';
import { FileText, CheckCircle, ExternalLink, Printer } from 'lucide-react';

const APOSTILAS = [
  {
    id: 1,
    title: 'Apostila 01 · Fundamentos',
    subtitle: 'Como a inteligência artificial pensa?',
    pages: '13 páginas',
    hours: '4 horas',
    highlights: 'Tokens, farinha de mandioca, embeddings, alucinações, 4 regras de ouro e testes práticos.',
  },
  {
    id: 2,
    title: 'Apostila 02 · Engenharia de prompts e tabuleiro',
    subtitle: 'A arte de comandar e ferramentas gratuitas',
    pages: '14 páginas',
    hours: '6 horas',
    highlights: 'Matriz PACIF, exemplos no prompt com casos do Ver o Peso, encadeamento e comparação de 6 IAs.',
  },
  {
    id: 3,
    title: 'Apostila 03 · Identificação de vieses',
    subtitle: 'A IA também reproduz preconceitos?',
    pages: '10 páginas',
    hours: '4 horas',
    highlights: 'Metáfora da rede de pesca, dados do Norte global, 4 tipos de viés e frases de blindagem.',
  },
  {
    id: 4,
    title: 'Apostila 04 · Projeto final comunitário',
    subtitle: 'Construindo seu próprio assistente',
    pages: '24 páginas',
    hours: '6 horas',
    highlights: 'Jornada da persona, árvore de decisão, salvaguarda de emergência, checklist e apresentação.',
  },
];

export default function PdfDownloadHub() {
  return (
    <section className="bg-[#1F1F1F] border border-[#313131] rounded-2xl p-6 sm:p-8 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#313131]">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
            Material didático completo do curso
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-white [text-wrap:balance]">
            Apostilas oficiais para leitura e impressão
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl [text-wrap:pretty]">
            Estudos de caso, tabelas comparativas e exercícios práticos formatados em páginas A4 prontas para estudar na tela ou imprimir.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-emerald-300 bg-[#272727] border border-[#313131] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Acesso livre educacional</span>
          </span>
        </div>
      </div>

      {/* Grid of 4 download cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {APOSTILAS.map((doc) => (
          <div
            key={doc.id}
            className="p-5 bg-[#272727] rounded-xl border border-[#313131] hover:border-slate-600 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono">{doc.pages}</span>
                <span className="font-mono text-emerald-400 font-semibold">{doc.hours}</span>
              </div>

              <div className="flex items-center gap-2 text-white font-bold text-sm mb-1 group-hover:text-emerald-300 transition-colors">
                <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Módulo {doc.id}</span>
              </div>

              <h4 className="text-xs font-semibold text-slate-200 mb-2 line-clamp-1">
                {doc.subtitle}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4 [text-wrap:pretty]">
                {doc.highlights}
              </p>
            </div>

            <div className="pt-3 border-t border-[#313131]">
              <Link
                href={`/apostila/${doc.id}`}
                className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Ler e imprimir</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
