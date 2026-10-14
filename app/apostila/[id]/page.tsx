import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COURSE_MODULES, COURSE_INFO } from '@/data/courseData';
import { ArrowLeft, Printer } from 'lucide-react';

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ApostilaPage({ params }: Props) {
  const { id } = await params;
  const moduleId = parseInt(id, 10);
  const currentModule = COURSE_MODULES.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 print:bg-white print:text-black">
      {/* Top action bar - Hidden when printing */}
      <div className="sticky top-0 z-50 bg-slate-900 text-white px-4 py-3 border-b border-slate-800 shadow-md print:hidden flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/modulo/${currentModule.id}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Módulo</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs text-slate-400">
            Apostila Oficial · Módulo {currentModule.id}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={undefined}
            className="print-trigger-btn px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir ou Salvar PDF</span>
          </button>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              var btn = document.querySelector('.print-trigger-btn');
              if (btn) {
                btn.addEventListener('click', function() {
                  window.print();
                });
              }
            });
          `,
        }}
      />

      {/* Main Printable Document Layout */}
      <main className="max-w-4xl mx-auto p-6 sm:p-12 my-6 bg-white shadow-lg rounded-xl print:shadow-none print:m-0 print:p-0 print:max-w-none print:rounded-none">
        {/* Institutional Header */}
        <header className="border-b-2 border-emerald-600 pb-4 mb-6">
          <div className="text-xs font-bold text-emerald-700 tracking-wider uppercase mb-1">
            Governo do Pará · PRODEPA · iSACI · IFPA · UFPA/SIMBIC
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            {currentModule.title}: {currentModule.subtitle}
          </h1>
          <p className="text-sm text-slate-600 mb-3">
            Curso de Letramento Digital em Inteligência Artificial · Belém, Pará · 2026
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 leading-relaxed">
            <p><strong>Autor e Coordenação Pedagógica:</strong> {COURSE_INFO.author} ({COURSE_INFO.institution})</p>
            <p><strong>Carga Horária:</strong> {currentModule.hours} horas | <strong>Comunidade:</strong> {COURSE_INFO.locations}</p>
          </div>
        </header>

        {/* Overview */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-emerald-800 border-b border-slate-200 pb-1 mb-2">
            Visão Geral do Módulo
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {currentModule.shortDescription}
          </p>
        </section>

        {/* Sections */}
        <section className="mb-8 space-y-6">
          <h2 className="text-lg font-bold text-emerald-800 border-b border-slate-200 pb-1">
            Conteúdo Programático Completo
          </h2>
          {currentModule.sections.map((section, idx) => (
            <article key={idx} className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-slate-900">
                {section.title}
              </h3>
              {section.subtitle && (
                <p className="text-xs font-semibold text-slate-500">
                  {section.subtitle}
                </p>
              )}
              {section.content.map((p, pIdx) => (
                <p key={pIdx} className="text-sm text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}

              {section.analogy && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 my-2 text-xs text-emerald-950">
                  <div className="font-bold text-emerald-800 mb-1">
                    Metáfora Didática: {section.analogy.title}
                  </div>
                  <p>{section.analogy.description}</p>
                </div>
              )}

              {section.table && (
                <div className="overflow-x-auto my-3">
                  <table className="w-full text-left text-xs border border-slate-300">
                    <thead className="bg-slate-100 border-b border-slate-300">
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-2 border-r border-slate-300 font-semibold text-slate-800">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="border-b border-slate-200">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2 border-r border-slate-300 text-slate-700">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ))}
        </section>

        {/* Practical Mission */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-emerald-800 border-b border-slate-200 pb-1 mb-2">
            Missão Prática de Campo
          </h2>
          <h3 className="text-sm font-bold text-slate-900 mb-2">
            {currentModule.practicalMission.title}
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
            {currentModule.practicalMission.steps.map((step, sIdx) => (
              <li key={sIdx}>{step}</li>
            ))}
          </ul>
        </section>

        {/* Formative Quiz */}
        <section className="mb-8 space-y-4">
          <h2 className="text-lg font-bold text-emerald-800 border-b border-slate-200 pb-1">
            Avaliação Formativa e Gabarito Pedagógico
          </h2>
          {currentModule.quiz.map((q, qIdx) => (
            <div key={q.id || qIdx} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-2">
              <p className="font-semibold text-slate-900">
                Questão {qIdx + 1}: {q.question}
              </p>
              <div className="space-y-1 pl-2">
                {q.options.map((opt) => (
                  <div key={opt.label} className="text-slate-700">
                    ({opt.label}) {opt.text}
                  </div>
                ))}
              </div>
              <div className="text-emerald-700 font-semibold pt-1 border-t border-slate-200">
                Gabarito Oficial: Alternativa {q.correctAnswer}
              </div>
              <p className="text-slate-600 italic">
                Justificativa didática: {q.explanation}
              </p>
            </div>
          ))}
        </section>

        {/* Printable Footer */}
        <footer className="pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
          <p>Curso de Letramento Digital em IA · Belém, Pará · 2026</p>
          <p>Material didático oficial para uso educacional e comunitário livre.</p>
        </footer>
      </main>
    </div>
  );
}

