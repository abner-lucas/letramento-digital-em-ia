import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TaglineReveal from '@/components/TaglineReveal';
import ModuleCard from '@/components/ModuleCard';
import PdfDownloadHub from '@/components/PdfDownloadHub';
import Footer from '@/components/Footer';
import { COURSE_INFO, COURSE_MODULES } from '@/data/courseData';
import { 
  ArrowRight, 
  FileText,
  CheckCircle2,
  ShieldCheck,
  Brain,
  Search,
  Cpu,
  HelpCircle,
  Users,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const testimonials = [
    {
      name: 'Maria de Nazaré Pinheiro',
      role: 'Professora da rede pública',
      location: 'Bairro do Guamá, Belém',
      content: 'Consegui levar os conceitos de tokens e probabilidade para meus alunos sem depender de computadores caros. As metáforas regionais tornaram tudo compreensível no celular.',
    },
    {
      name: 'Carlos Eduardo Miranda',
      role: 'Estudante de ensino médio',
      location: 'Terra Firme, Belém',
      content: 'A matriz PACIF mudou a forma como eu pesquiso para o vestibular. Antes eu recebia respostas vagas, agora sei comandar exatamente o que preciso sem alucinações da máquina.',
    },
    {
      name: 'Rayssa Souza',
      role: 'Empreendedora comunitária',
      location: 'Distrito de Icoaraci',
      content: 'Construí uma árvore de decisão para organizar os horários e avisos de entregas na minha comunidade. A salvaguarda de emergência dá segurança para quem usa.',
    },
  ];

  const faqs = [
    {
      q: 'Preciso saber programar ou ter computador para fazer o curso?',
      a: 'Não. O curso foi planejado para ser executado integralmente pelo celular, utilizando navegadores comuns e plataformas gratuitas de inteligência artificial. O foco é raciocínio crítico, formulação de comandos em língua portuguesa e solução de problemas locais.',
    },
    {
      q: 'O conteúdo e as apostilas são realmente gratuitos?',
      a: 'Sim. Esta é uma iniciativa pública interinstitucional entre PRODEPA, Instituto iSACI, IFPA e UFPA. O acesso a todas as aulas online e apostilas para impressão é livre e nunca cobrará dados bancários.',
    },
    {
      q: 'Como estudar caso eu não tenha internet contínua?',
      a: 'Você pode abrir as apostilas de cada módulo e utilizar o botão de impressão para salvar o PDF completo no aparelho ou imprimir em papel A4. Todo o material didático foi diagramado para leitura offline.',
    },
    {
      q: 'O que é a metodologia PACIF ensinada no Módulo 2?',
      a: 'A matriz PACIF é um método estruturado para criar comandos eficazes: Papel da IA, Ação requisitada, Contexto da situação, Instruções de restrição e Formato da resposta. Isso elimina respostas genéricas ou inventadas.',
    },
    {
      q: 'Como o curso combate estereótipos sobre a Amazônia nos modelos de IA?',
      a: 'No Módulo 3, os estudantes aprendem a detectar quando os dados do Norte global apagam cientistas e realidades locais. Ensinamos frases de proteção para forçar a IA a contextualizar fatos amazônicos.',
    },
    {
      q: 'Qual é o projeto prático final desenvolvido?',
      a: 'No Módulo 4, cada estudante elabora um assistente conversacional com árvore de decisão e salvaguarda para serviços comunitários, culminando em uma apresentação de banca com critérios de utilidade pública.',
    },
    {
      q: 'Professores podem adotar este material em turmas do estado?',
      a: 'Sim. O material pedagógico tem licença de uso educacional livre. Educadores de escolas públicas e projetos sociais podem utilizar as fichas, exercícios e quizzes em suas salas de aula.',
    },
    {
      q: 'Como funciona a avaliação de aprendizagem?',
      a: 'Cada módulo traz um quiz interativo com gabarito pedagógico e explicações ponto a ponto. As apostilas impressas contêm também fichas de campo e checklists de auditoria.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />

      <main id="conteudo-principal" className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Mandatory Tagline Reveal (B11) */}
        <TaglineReveal />

        {/* Section 3: Problem to Solution & Core Benefits */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#1F1F1F]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="max-w-[680px]">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                Problema e solução
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-sans text-white [text-wrap:balance]">
                Da caixa preta passiva ao domínio prático da ferramenta
              </h2>
              <p className="mt-4 text-base text-slate-300 leading-relaxed [text-wrap:pretty]">
                A maioria das pessoas usa inteligência artificial recebendo respostas genéricas ou acreditando em fatos inventados. Nosso método transforma curiosidade em competência analítica.
              </p>
            </div>

            {/* 4 Outcome-Driven Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#272727] border border-[#313131] rounded-2xl flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    Autonomia sem dependência técnica
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                    <strong>Comandos estruturados em 15 minutos</strong> — aprenda a formular instruções claras no celular sem precisar de conhecimento em programação ou computadores potentes.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#272727] border border-[#313131] rounded-2xl flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    Imunidade contra alucinações
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                    <strong>4 regras de ouro para verificação</strong> — entenda o cálculo estatístico de tokens e impeça que a máquina invente referências bibliográficas e dados históricos.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#272727] border border-[#313131] rounded-2xl flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    Auditoria de vieses regionais
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                    <strong>Proteção aos saberes amazônicos</strong> — detecte quando bases de dados estrangeiras desvalorizam o conhecimento, a medicina tradicional e a geografia paraense.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#272727] border border-[#313131] rounded-2xl flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    Construção de assistentes comunitários
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                    <strong>Árvores de decisão com salvaguarda</strong> — crie chatbots funcionais para orientar sua comunidade em saúde básica, comércio local ou educação popular.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: How It Works (4 Steps) */}
        <section id="metodologia" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#181818]">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="max-w-[680px]">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                Passo a passo formativo
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-sans text-white [text-wrap:balance]">
                Quatro passos para dominar a inteligência artificial
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 [text-wrap:pretty]">
                Uma trilha pedagógica em espiral desenhada para turmas do ensino público:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#1F1F1F] border border-[#313131] flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#272727] text-emerald-400 border border-[#313131] flex items-center justify-center font-mono font-bold text-xs mb-4">
                    01
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Desmistificar</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                    Compreenda o funcionamento de tokens, probabilidade de palavras e o motivo pelo qual a máquina não possui sentimentos nem consciência.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#313131] text-xs font-mono text-emerald-400">
                  Módulo 1 · 4 horas
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#1F1F1F] border border-[#313131] flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#272727] text-blue-400 border border-[#313131] flex items-center justify-center font-mono font-bold text-xs mb-4">
                    02
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Comandar</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                    Aplique a matriz PACIF para estruturar papel, ação, contexto, instruções e formato, garantindo saídas sob medida sem ambiguidades.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#313131] text-xs font-mono text-blue-400">
                  Módulo 2 · 6 horas
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#1F1F1F] border border-[#313131] flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#272727] text-amber-400 border border-[#313131] flex items-center justify-center font-mono font-bold text-xs mb-4">
                    03
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Auditar</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                    Questione as respostas, cace vieses socioculturais e utilize frases de blindagem para valorizar os saberes dos povos da floresta.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#313131] text-xs font-mono text-amber-400">
                  Módulo 3 · 4 horas
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#1F1F1F] border border-[#313131] flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#272727] text-purple-400 border border-[#313131] flex items-center justify-center font-mono font-bold text-xs mb-4">
                    04
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Construir</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                    Modele personas e fluxos de atendimento com regras seguras, defendendo seu projeto em uma banca comunitária de utilidade pública.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#313131] text-xs font-mono text-purple-400">
                  Módulo 4 · 6 horas
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: The 4 Curriculum Modules */}
        <section id="modulos" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#1F1F1F]">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-[680px]">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                  Estrutura curricular
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-sans text-white [text-wrap:balance]">
                  Os quatro módulos de aprendizado
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-300 [text-wrap:pretty]">
                  Cada etapa combina laboratório interativo direto no navegador com material completo em apostila para estudo individual.
                </p>
              </div>

              <a
                href="#apostilas"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 shrink-0"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Ver apostilas para impressão</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSE_MODULES.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Official Apostilas Hub */}
        <section id="apostilas" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#181818]">
          <div className="max-w-6xl mx-auto">
            <PdfDownloadHub />
          </div>
        </section>

        {/* Section 7: Social Proof and Community Voices */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#1F1F1F]">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="max-w-[680px]">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                Impacto no território
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-sans text-white [text-wrap:balance]">
                O que dizem educadores e estudantes da região metropolitana
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 [text-wrap:pretty]">
                Histórias reais de aplicação no Guamá, Terra Firme e Icoaraci:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#272727] border border-[#313131] rounded-2xl flex flex-col justify-between"
                >
                  <p className="text-sm text-slate-200 leading-relaxed mb-6 [text-wrap:pretty]">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-[#313131]">
                    <div className="font-bold text-sm text-white">{t.name}</div>
                    <div className="text-xs text-emerald-400 font-medium">{t.role}</div>
                    <div className="text-xs text-slate-400">{t.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: FAQ (Objection Handling) */}
        <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#181818]">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center max-w-[680px] mx-auto">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                Tire suas dúvidas
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-sans text-white [text-wrap:balance]">
                Perguntas frequentes
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 [text-wrap:pretty]">
                Tudo o que você precisa saber para começar a estudar hoje mesmo:
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#1F1F1F] border border-[#313131] rounded-2xl space-y-2"
                >
                  <h3 className="text-base font-bold text-white flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed pl-6 [text-wrap:pretty]">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: Risk Reversal & Institutional Trust */}
        <section id="sobre" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#272727] bg-[#1F1F1F]">
          <div className="max-w-6xl mx-auto p-8 bg-[#272727] border border-[#313131] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#313131] text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Garantia de acesso 100% público e gratuito</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-sans text-white [text-wrap:balance]">
                Sem custos, sem cartão de crédito e sem pegadinhas
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                Material pedagógico elaborado sob a coordenação do Prof. Dr. Bruno Duarte Gomes (iSACI / SIMBIC UFPA) em parceria com a PRODEPA, IFPA e Governo do Estado do Pará.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                href="/modulo/1"
                className="w-full sm:w-auto py-2 px-3 text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg text-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                <span>Começar o curso agora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
