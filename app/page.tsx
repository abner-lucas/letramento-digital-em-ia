import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TaglineReveal from '@/components/TaglineReveal';
import ModuleCard from '@/components/ModuleCard';
import PdfDownloadHub from '@/components/PdfDownloadHub';
import Footer from '@/components/Footer';
import PerguntasFrequentes from '@/components/PerguntasFrequentes';
import { Cascata, ItemCascata, Revelar } from '@/components/movimento/Revelar';
import { IndicadorSecoes } from '@/components/movimento/Navegacao';
import { COURSE_INFO, COURSE_MODULES } from '@/data/courseData';
import { ArrowRight, FileText, CheckCircle2, ShieldCheck, Brain, Search, Cpu } from 'lucide-react';
import Link from 'next/link';

const SECOES = [
  { id: 'inicio', rotulo: 'Início' },
  { id: 'beneficios', rotulo: 'Problema e solução' },
  { id: 'metodologia', rotulo: 'Metodologia' },
  { id: 'modulos', rotulo: 'Módulos' },
  { id: 'apostilas', rotulo: 'Apostilas' },
  { id: 'regras', rotulo: 'Regras de ouro' },
  { id: 'faq', rotulo: 'Perguntas' },
  { id: 'sobre', rotulo: 'Sobre' },
];

// Benefícios reescritos a partir do que as apostilas prometem (sem números sem fonte).
const BENEFICIOS = [
  {
    icone: Brain,
    cor: 'emerald',
    titulo: 'Autonomia sem dependência técnica',
    destaque: 'Comandos estruturados com a matriz PACIF',
    texto: 'aprenda a formular instruções claras no celular, sem precisar de programação ou computador potente.',
  },
  {
    icone: ShieldCheck,
    cor: 'blue',
    titulo: 'Menos alucinações, mais conferência',
    destaque: 'A regra do “confia, mas confere”',
    texto: 'entenda como a IA calcula a palavra mais provável e por que números, datas e citações sempre precisam de verificação.',
  },
  {
    icone: Search,
    cor: 'amber',
    titulo: 'Auditoria de vieses regionais',
    destaque: 'Proteção aos saberes amazônicos',
    texto: 'perceba quando a resposta apaga cidades, ciência e saberes tradicionais da Amazônia — e corrija com o seu prompt.',
  },
  {
    icone: Cpu,
    cor: 'purple',
    titulo: 'Construção de assistentes comunitários',
    destaque: 'Árvores de decisão com salvaguarda',
    texto: 'planeje um chatbot que resolve um problema real do bairro e sabe quando encaminhar para ajuda humana.',
  },
] as const;

const COR_ICONE: Record<string, string> = {
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
};

const PASSOS = [
  { n: '01', titulo: 'Desmistificar', cor: 'text-emerald-400', texto: 'Compreenda tokens, probabilidade de palavras e por que a máquina não possui sentimentos nem consciência.' },
  { n: '02', titulo: 'Comandar', cor: 'text-blue-400', texto: 'Aplique a matriz PACIF para estruturar papel, ação, contexto, instruções e formato, com respostas sob medida.' },
  { n: '03', titulo: 'Auditar', cor: 'text-amber-400', texto: 'Questione as respostas, cace vieses e use frases que valorizam os saberes dos povos da floresta.' },
  { n: '04', titulo: 'Construir', cor: 'text-purple-400', texto: 'Planeje persona, árvore de decisão e prompt de sistema, e apresente seu projeto em 5 minutos.' },
];

const FAQS = [
  {
    q: 'Preciso saber programar ou ter computador para fazer o curso?',
    a: 'Não. O curso foi planejado para o celular, com navegadores comuns e plataformas gratuitas de inteligência artificial. O foco é raciocínio crítico, comandos em língua portuguesa e solução de problemas locais.',
  },
  {
    q: 'O conteúdo e as apostilas são gratuitos?',
    a: 'Sim. O curso é promovido por PRODEPA, Instituto iSACI e IFPA, com apoio do Governo do Pará. As aulas online e as apostilas são de acesso livre e nunca pedem dados bancários.',
  },
  {
    q: 'Como estudar caso eu não tenha internet contínua?',
    a: 'Baixe a apostila oficial em PDF de cada módulo para ler no aparelho ou imprimir em papel A4. Cada módulo também tem uma versão para leitura na tela com botão de impressão.',
  },
  {
    q: 'O que é a metodologia PACIF ensinada no Módulo 2?',
    a: 'A matriz PACIF é um método para criar comandos eficazes: Papel da IA, Ação requisitada, Contexto da situação, Instruções de restrição e Formato da resposta. Ela reduz respostas genéricas e o risco de a IA inventar informações.',
  },
  {
    q: 'Como o curso trata os estereótipos sobre a Amazônia nos modelos de IA?',
    a: 'No Módulo 3, os estudantes aprendem a detectar quando as respostas apagam cientistas, cidades e realidades locais, e usam “frases mágicas” para pedir diversidade e respeito aos saberes tradicionais.',
  },
  {
    q: 'Qual é o projeto prático final desenvolvido?',
    a: 'No Módulo 4, cada estudante planeja um chatbot com árvore de decisão, prompt de sistema e encaminhamento obrigatório para emergências, testa com cinco pessoas e apresenta o projeto em 5 minutos.',
  },
  {
    q: 'Professores podem adotar este material em turmas do estado?',
    a: 'Sim. É material didático de uso educacional: escolas públicas e projetos sociais podem usar as fichas, exercícios e quizzes em sala de aula.',
  },
  {
    q: 'Como funciona a avaliação de aprendizagem?',
    a: 'Cada módulo traz um quiz interativo com resposta comentada e uma missão prática para trazer à turma.',
  },
];

/** Cabeçalho de seção no estilo já usado no site. */
function Cabecalho({ rotulo, titulo, texto, centro = false }: { rotulo: string; titulo: string; texto?: string; centro?: boolean }) {
  return (
    <Revelar className={centro ? 'text-center max-w-[680px] mx-auto' : 'max-w-[680px]'}>
      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">{rotulo}</span>
      <h2 className="text-2xl sm:text-4xl font-bold font-sans text-white [text-wrap:balance]">{titulo}</h2>
      {texto && <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed [text-wrap:pretty]">{texto}</p>}
    </Revelar>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />
      <IndicadorSecoes secoes={SECOES} />

      <main id="conteudo-principal" className="flex-1">
        <HeroSection />

        <TaglineReveal />

        {/* Problema e solução */}
        <section id="beneficios" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#1F1F1F]">
          <div className="max-w-6xl mx-auto space-y-12">
            <Cabecalho
              rotulo="Problema e solução"
              titulo="Da caixa preta passiva ao domínio prático da ferramenta"
              texto="Muita gente usa inteligência artificial recebendo respostas genéricas ou acreditando em fatos inventados. Nosso método transforma curiosidade em competência analítica."
            />
            <Cascata className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BENEFICIOS.map((b) => {
                const Icone = b.icone;
                return (
                  <ItemCascata
                    key={b.titulo}
                    className="group p-6 bg-[#272727] border border-[#313131] hover:border-slate-600 rounded-2xl flex gap-4 items-start transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1"
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-6 ${COR_ICONE[b.cor]}`}>
                      <Icone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white">{b.titulo}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        <strong>{b.destaque}</strong> — {b.texto}
                      </p>
                    </div>
                  </ItemCascata>
                );
              })}
            </Cascata>
          </div>
        </section>

        {/* Metodologia em 4 passos */}
        <section id="metodologia" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#181818]">
          <div className="max-w-6xl mx-auto space-y-10">
            <Cabecalho
              rotulo="Passo a passo formativo"
              titulo="Quatro passos para dominar a inteligência artificial"
              texto="Entender, comandar, questionar e criar: o caminho de quem produz tecnologia em vez de apenas consumi-la."
            />
            <Cascata className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COURSE_MODULES.map((m, i) => {
                const p = PASSOS[i];
                return (
                  <ItemCascata
                    key={m.id}
                    className="p-5 rounded-2xl bg-[#1F1F1F] border border-[#313131] hover:border-slate-600 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1"
                  >
                    <div>
                      <div className={`w-8 h-8 rounded-lg bg-[#272727] border border-[#313131] flex items-center justify-center font-mono font-bold text-xs mb-4 ${p.cor}`}>
                        {p.n}
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{p.titulo}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">{p.texto}</p>
                    </div>
                    <Link href={`/modulo/${m.id}`} className={`group mt-6 pt-3 border-t border-[#313131] text-xs font-mono flex items-center justify-between ${p.cor}`}>
                      <span>Módulo {m.id} · {m.hours} horas</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </ItemCascata>
                );
              })}
            </Cascata>
          </div>
        </section>

        {/* Os 4 módulos */}
        <section id="modulos" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#1F1F1F]">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <Cabecalho
                rotulo="Estrutura curricular"
                titulo="Os quatro módulos de aprendizado"
                texto="Cada etapa combina laboratório interativo no navegador com a apostila oficial para estudo individual."
              />
              <Revelar className="shrink-0">
                <Link href="/#apostilas" className="min-h-10 text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Ver apostilas oficiais</span>
                </Link>
              </Revelar>
            </div>
            <Cascata className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSE_MODULES.map((module) => (
                <ItemCascata key={module.id} className="h-full">
                  <ModuleCard module={module} />
                </ItemCascata>
              ))}
            </Cascata>
          </div>
        </section>

        {/* Apostilas */}
        <section id="apostilas" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#181818]">
          <Revelar className="max-w-6xl mx-auto">
            <PdfDownloadHub />
          </Revelar>
        </section>

        {/* Regras de ouro — conteúdo das apostilas no lugar de depoimentos */}
        <section id="regras" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#1F1F1F]">
          <div className="max-w-6xl mx-auto space-y-10">
            <Cabecalho
              rotulo="Uso ético e responsável"
              titulo="As 4 regras de ouro repetidas em todas as aulas"
              texto="Uma ferramenta poderosa exige responsabilidade. Um facão bem afiado ajuda muito na roça, mas precisa ser usado com cuidado."
            />
            <Cascata como="ol" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSE_INFO.goldenRules.map((r) => (
                <ItemCascata
                  key={r.num}
                  como="li"
                  className="group p-6 bg-[#272727] border border-[#313131] hover:border-slate-600 rounded-2xl flex gap-4 items-start transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1"
                >
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-transform duration-500 group-hover:scale-110">
                    {String(r.num).padStart(2, '0')}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">{r.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">{r.desc}</p>
                  </div>
                </ItemCascata>
              ))}
            </Cascata>
          </div>
        </section>

        {/* Perguntas frequentes */}
        <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#181818]">
          <div className="max-w-4xl mx-auto space-y-10">
            <Cabecalho centro rotulo="Tire suas dúvidas" titulo="Perguntas frequentes" texto="Tudo o que você precisa saber para começar a estudar hoje mesmo." />
            <PerguntasFrequentes itens={FAQS} />
          </div>
        </section>

        {/* Garantia de acesso e realização */}
        <section id="sobre" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#1F1F1F]">
          <Revelar className="max-w-6xl mx-auto p-8 bg-[#272727] border border-[#313131] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#313131] text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Acesso público e gratuito</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-white [text-wrap:balance]">
                Sem custos, sem cartão de crédito e sem pegadinhas
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                Curso promovido por PRODEPA, iSACI e IFPA, com apoio do Governo do Pará. Material didático de autoria do{' '}
                {COURSE_INFO.author} ({COURSE_INFO.institution}), tutor do curso.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                href="/modulo/1"
                className="group w-full sm:w-auto py-2 px-3 text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg text-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                <span>Começar o curso agora</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Revelar>
        </section>
      </main>

      <Footer />
    </div>
  );
}
