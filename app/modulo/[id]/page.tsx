import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import TokenVisualizer from '@/components/TokenVisualizer';
import PacifBuilder from '@/components/PacifBuilder';
import AiTabuleiro from '@/components/AiTabuleiro';
import BiasHunter from '@/components/BiasHunter';
import ChatbotSimulator from '@/components/ChatbotSimulator';
import DecisionTreeViewer from '@/components/DecisionTreeViewer';
import { COURSE_MODULES, CourseModule } from '@/data/courseData';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Lightbulb, 
  Compass, 
  Layers, 
  FileText,
  Sparkles,
  Share2,
  Download
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

export default async function ModulePage({ params }: Props) {
  const { id } = await params;
  const moduleId = parseInt(id, 10);
  const currentModule = COURSE_MODULES.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const prevModule = COURSE_MODULES.find((m) => m.id === moduleId - 1);
  const nextModule = COURSE_MODULES.find((m) => m.id === moduleId + 1);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Module Hero Banner */}
      <section className={`bg-gradient-to-r ${currentModule.color.primary} text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800`}>
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-white/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Página Inicial
            </Link>
            <span aria-hidden="true">/</span>
            <span>Módulos</span>
            <span aria-hidden="true">/</span>
            <span className="text-white font-semibold">Módulo {currentModule.id}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-widest font-bold text-white/90 bg-black/20 px-3 py-1 rounded-md">
                {currentModule.badge}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-3 [text-wrap:balance]">
                {currentModule.title}: {currentModule.subtitle}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
                {currentModule.shortDescription}
              </p>
            </div>

            <div className="bg-black/25 backdrop-blur-xs p-5 rounded-xl border border-white/10 shrink-0 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-300" />
                <span>Carga Horária: <strong>{currentModule.hours} horas</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-300" />
                <span>Capítulos: <strong>{currentModule.sections.length} seções</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Avaliação: <strong>Quiz formativo incluído</strong></span>
              </div>
              <div className="pt-2">
                <Link
                  href={`/apostila/${currentModule.id}`}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Apostila Oficial (Ler / Imprimir)</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Module Switcher Bar */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap gap-2">
            <span className="text-xs text-white/70 py-1.5 mr-1 font-medium">Navegar pelos Módulos:</span>
            {COURSE_MODULES.map((m) => (
              <Link
                key={m.id}
                href={`/modulo/${m.id}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  m.id === currentModule.id
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'bg-black/20 hover:bg-black/35 text-white'
                }`}
              >
                Módulo {m.id}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Lesson Body */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Column */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* Render each pedagogical section */}
            {currentModule.sections.map((section, idx) => (
              <article
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs scroll-mt-24 space-y-6"
              >
                {/* Section Header */}
                <div>
                  {section.tag && (
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      {section.tag}
                    </span>
                  )}
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      {section.subtitle}
                    </p>
                  )}
                </div>

                {/* Section Paragraphs */}
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Pedagogical Analogy Box (Signature feature from the slides) */}
                {section.analogy && (
                  <div className="p-4 sm:p-5 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 font-bold text-emerald-950 mb-1.5">
                      <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{section.analogy.title}</span>
                    </div>
                    <p className="text-emerald-900 leading-relaxed">
                      {section.analogy.description}
                    </p>
                  </div>
                )}

                {/* Highlight Callout */}
                {section.highlight && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                    {section.highlight}
                  </div>
                )}

                {/* Comparison or Code / Prompt Box */}
                {section.codeOrPrompt && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      {section.codeOrPrompt.title}
                    </h4>

                    {section.codeOrPrompt.badExample && (
                      <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-lg text-xs">
                        <span className="font-bold text-red-900 block mb-1">
                          ✕ Antes do Refino (Comando Fraco / Alucinação Provável):
                        </span>
                        <p className="text-red-950 font-mono whitespace-pre-wrap leading-relaxed">
                          {section.codeOrPrompt.badExample}
                        </p>
                      </div>
                    )}

                    {section.codeOrPrompt.goodExample && (
                      <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs">
                        <span className="font-bold text-emerald-900 block mb-1">
                          ✓ Depois do Refino (Comando Blindado):
                        </span>
                        <p className="text-emerald-950 font-mono whitespace-pre-wrap leading-relaxed">
                          {section.codeOrPrompt.goodExample}
                        </p>
                      </div>
                    )}

                    {section.codeOrPrompt.raw && (
                      <div className="p-4 bg-slate-900 text-slate-100 rounded-lg border border-slate-800 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                        {section.codeOrPrompt.raw}
                      </div>
                    )}

                    {section.codeOrPrompt.explanation && (
                      <p className="text-xs text-slate-500 italic">
                        {section.codeOrPrompt.explanation}
                      </p>
                    )}
                  </div>
                )}

                {/* Data Table */}
                {section.table && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                      <thead className="bg-slate-100 text-slate-900 font-semibold uppercase text-[11px] border-b border-slate-200">
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-2.5 px-3.5">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/70">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`py-2.5 px-3.5 ${
                                  cIdx === 0 ? 'font-semibold text-slate-900 whitespace-nowrap' : 'text-slate-600'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tips bullet list */}
                {section.tips && (
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">
                      Diretrizes Práticas:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {section.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}

            {/* Embedded Specialized Interactive Tool by Module */}
            <div className="pt-4">
              <h3 className="text-lg font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Ferramenta Interativa Prática do Módulo {currentModule.id}</span>
              </h3>

              {currentModule.id === 1 && <TokenVisualizer />}
              {currentModule.id === 2 && (
                <div className="space-y-8">
                  <PacifBuilder />
                  <AiTabuleiro />
                </div>
              )}
              {currentModule.id === 3 && <BiasHunter />}
              {currentModule.id === 4 && (
                <div className="space-y-8">
                  <DecisionTreeViewer />
                  <ChatbotSimulator />
                </div>
              )}
            </div>

            {/* Formative Quiz */}
            <div className="pt-4">
              <InteractiveQuiz 
                questions={currentModule.quiz} 
                moduleTitle={currentModule.title} 
              />
            </div>

            {/* Official Glossary */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                  Vocabulário Técnico
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                  Glossário Rápido do Módulo {currentModule.id}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentModule.glossary.map((item, gIdx) => (
                  <div key={gIdx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <dt className="text-xs font-bold text-slate-900 mb-1">
                      {item.term}
                    </dt>
                    <dd className="text-xs text-slate-600 leading-relaxed">
                      {item.definition}
                    </dd>
                  </div>
                ))}
              </div>
            </div>

            {/* Homework Mission */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                  Atividade de Fixação
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  {currentModule.practicalMission.title}
                </h3>
              </div>

              <ol className="space-y-2 text-xs sm:text-sm text-slate-200 pl-4 list-decimal">
                {currentModule.practicalMission.steps.map((step, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>

              <blockquote className="pt-4 border-t border-white/10 text-xs sm:text-sm italic text-emerald-200">
                &ldquo;{currentModule.practicalMission.quote}&rdquo;
              </blockquote>
            </div>

            {/* Bottom Module Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
              {prevModule ? (
                <Link
                  href={`/modulo/${prevModule.id}`}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Módulo {prevModule.id}: {prevModule.subtitle}</span>
                </Link>
              ) : (
                <div />
              )}

              {nextModule ? (
                <Link
                  href={`/modulo/${nextModule.id}`}
                  className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <span>Avançar para o Módulo {nextModule.id}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <span>Concluir Curso & Voltar ao Início</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </Link>
              )}
            </div>

          </main>

          {/* Sticky Sidebar Navigation (Right Column) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            {/* Table of contents card */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nesta Aula</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {currentModule.sections.length} Tópicos
                </span>
              </div>

              <nav className="space-y-1">
                {currentModule.sections.map((s, idx) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-xs text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 p-2 rounded-md transition-colors leading-snug"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Belém · 2026</span>
                <Link href="/" className="text-emerald-700 hover:underline font-medium">
                  Voltar ao Início
                </Link>
              </div>
            </div>

            {/* Author note */}
            <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100 text-xs text-slate-700 space-y-2">
              <span className="font-bold text-emerald-950 block">
                Coordenação Pedagógica
              </span>
              <p className="leading-relaxed">
                Prof. Dr. Bruno Duarte Gomes · iSACI / SIMBIC – CCAD – UFPA. Material desenvolvido para as turmas públicas do Guamá, Terra Firme e região metropolitana.
              </p>
            </div>
          </aside>

        </div>
      </div>

      <Footer />
    </div>
  );
}
