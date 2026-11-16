import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import QRCode from '@/components/plano/QRCode';
import { ClassificadorRisco, Ficha, GeradorSelo, MapaEmbeddings, PipelineAnimado } from '@/components/plano/Atividades';
import { Revelar } from '@/components/movimento/Revelar';
import { IndicadorSecoes } from '@/components/movimento/Navegacao';
import { ENCONTROS, QUIZ_CASOS, QUIZ_ENCONTRO_1, QUIZ_FINAL, type Recurso } from '@/data/planoModulo1';

export const metadata: Metadata = {
  title: 'Módulo 1 — Atividades da turma',
  description: 'Atividades no celular dos dois encontros do Módulo 1: tokens, embeddings, pipeline, alucinações e regras de ouro.',
};

const recursos = ENCONTROS.flatMap((e) => e.blocos.flatMap((b) => b.recursos ?? []));
const recurso = (nome: string) => recursos.find((r) => r.nome.startsWith(nome));
/** Link do formulário externo, se o professor já tiver criado (senão, só a ficha do site). */
const linkFicha = (nome: string) => recurso(nome)?.url;

function Bloco({ id, minutos, titulo, texto, children }: { id: string; minutos: string; titulo: string; texto?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-28">
      <Revelar>
        <span className="font-mono text-xs font-semibold text-emerald-400">{minutos}</span>
        <h3 id={`${id}-titulo`} className="mt-1 text-xl sm:text-2xl font-bold text-white">{titulo}</h3>
        {texto && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">{texto}</p>}
      </Revelar>
      <Revelar atraso={0.08} className="mt-5">{children}</Revelar>
    </section>
  );
}

function Externos({ itens }: { itens: Recurso[] }) {
  return (
    <div className="flex flex-wrap items-start gap-6 rounded-2xl border border-[#313131] bg-[#1F1F1F] p-5">
      {itens.map((r) => (
        <div key={r.nome} className="flex flex-col items-center gap-3">
          <QRCode url={r.url!} rotulo={r.nome} />
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-emerald-400 px-4 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-300 active:scale-[0.98]"
          >
            Abrir <ExternalLink className="h-3.5 w-3.5" />
            <span className="sr-only"> {r.nome} (abre em nova aba)</span>
          </a>
        </div>
      ))}
    </div>
  );
}

const SECOES = [
  { id: 'encontro-1', rotulo: 'Encontro 1' },
  { id: 'abertura-1', rotulo: 'Abertura' },
  { id: 'ficha-tokens', rotulo: 'Tokens' },
  { id: 'embeddings', rotulo: 'Embeddings' },
  { id: 'pipeline', rotulo: 'Pipeline' },
  { id: 'quiz-1', rotulo: 'Quiz 1' },
  { id: 'encontro-2', rotulo: 'Encontro 2' },
  { id: 'ficha-alucinacoes', rotulo: 'Alucinações' },
  { id: 'arriscado-seguro', rotulo: 'Arriscado x seguro' },
  { id: 'quiz-2', rotulo: 'Casos do dia a dia' },
  { id: 'selo-2', rotulo: 'Selo final' },
];

export default function TurmaModulo1() {
  const tok = recursos.filter((r) => r.nome === 'Tiktokenizer' || r.nome === 'OpenAI Tokenizer');
  const ias = recursos.filter((r) => ['ChatGPT', 'Gemini', 'Claude', 'DeepSeek'].includes(r.nome));
  const padletRisco = recurso('Padlet "Arriscado');

  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-slate-100">
      <Navbar />
      <IndicadorSecoes secoes={SECOES} />

      <main id="conteudo-principal" className="flex-1">
        <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#272727]">
          <Revelar className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#272727] text-xs font-semibold text-emerald-400">
              Módulo 1 · Como a Inteligência Artificial Pensa?
            </span>
            <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9B9B9B] [text-wrap:balance]">
              Atividades da turma
            </h1>
            <p className="mt-4 text-base text-slate-300">
              Tudo o que vamos usar nos dois encontros, direto no celular. Siga o professor e role até a atividade da vez.
            </p>
            <nav aria-label="Encontros" className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="#encontro-1" className="min-h-10 inline-flex items-center rounded-lg border border-[#313131] bg-[#272727] px-4 text-sm font-semibold text-slate-200 hover:bg-[#313131]">Encontro 1 · Tokens</a>
              <a href="#encontro-2" className="min-h-10 inline-flex items-center rounded-lg border border-[#313131] bg-[#272727] px-4 text-sm font-semibold text-slate-200 hover:bg-[#313131]">Encontro 2 · Uso crítico</a>
            </nav>
          </Revelar>
        </section>

        {/* Encontro 1 */}
        <div id="encontro-1" className="scroll-mt-24 px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-4xl mx-auto space-y-16">
            <Revelar>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Encontro 1</span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-white">Por Dentro da Máquina: Tokens e o Caminho da Resposta</h2>
            </Revelar>

            <Bloco id="abertura-1" minutos="0–30 min" titulo="Qual IA você já usou hoje? + Tipos de IA" texto="Responda no Mentimeter e depois poste no Padlet, na coluna certa, 2 apps de IA que você usa no dia a dia.">
              <Externos itens={[recurso('Mentimeter — "Qual app')!, recurso('Padlet "Tipos de IA"')!]} />
            </Bloco>

            <Bloco id="ficha-tokens" minutos="30–70 min" titulo="Oficina dos tokens" texto="Em dupla, abra um tokenizador e teste 3 palavras regionais e 3 comuns. Anote quantos tokens cada uma virou.">
              <div className="space-y-4">
                <Externos itens={tok} />
                <Ficha
                  chave="ficha-tokens"
                  titulo="Ficha Encontro 1 — Oficina de tokens"
                  linkFormulario={linkFicha('Ficha Encontro 1')}
                  campos={[
                    { id: 'dupla', rotulo: 'Nomes da dupla', dica: 'Ex.: Ana e João' },
                    { id: 'acai', rotulo: 'açaí — nº de tokens', tipo: 'numero' },
                    { id: 'igarape', rotulo: 'igarapé — nº de tokens', tipo: 'numero' },
                    { id: 'regional3', rotulo: 'Guamá ou cupuaçu — nº de tokens', tipo: 'numero' },
                    { id: 'computador', rotulo: 'computador — nº de tokens', tipo: 'numero' },
                    { id: 'felicidade', rotulo: 'felicidade — nº de tokens', tipo: 'numero' },
                    { id: 'inteligencia', rotulo: 'inteligência — nº de tokens', tipo: 'numero' },
                    { id: 'quebrou', rotulo: 'Alguma palavra regional "quebrou" em mais pedaços que o esperado? Qual e por quê?', tipo: 'longo' },
                  ]}
                />
              </div>
            </Bloco>

            <Bloco id="embeddings" minutos="70–90 min" titulo="Embeddings: o mapa das palavras" texto="Em grupo, junte as 12 palavras que têm a ver umas com as outras. Depois o professor revela como a IA organiza esse mapa.">
              <MapaEmbeddings />
            </Bloco>

            <Bloco id="pipeline" minutos="90–120 min" titulo="O caminho completo: do seu texto à resposta" texto="Acompanhe os 5 passos que a IA percorre com a frase do material.">
              <PipelineAnimado />
            </Bloco>

            <Bloco id="quiz-1" minutos="120–145 min" titulo="Quiz do Encontro 1">
              <InteractiveQuiz questions={QUIZ_ENCONTRO_1} moduleTitle="Encontro 1 — Tokens e o caminho da resposta" />
            </Bloco>

            <Bloco id="selo-1" minutos="145–150 min" titulo="Seu selo: Explorador de Tokens — Nível 1">
              <GeradorSelo titulo="Explorador de Tokens" nivel="Nível 1" cor="#34d399" />
            </Bloco>
          </div>
        </div>

        {/* Encontro 2 */}
        <div id="encontro-2" className="scroll-mt-24 px-4 sm:px-6 lg:px-8 py-14 bg-[#1F1F1F] border-t border-[#272727]">
          <div className="max-w-4xl mx-auto space-y-16">
            <Revelar>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Encontro 2</span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-white">Limites, Pensamento Crítico e Uso Ético</h2>
            </Revelar>

            <Bloco id="retomada-2" minutos="0–10 min" titulo="Retomada: o que é um token?">
              <Externos itens={[recurso('Mentimeter — "Em uma palavra')!]} />
            </Bloco>

            <Bloco
              id="ficha-alucinacoes"
              minutos="10–40 min"
              titulo="Caça às alucinações"
              texto="Em dupla, teste uma pergunta arriscada, a versão segura e uma pergunta bem local sobre o seu bairro. Depois confira com uma busca rápida."
            >
              <div className="space-y-4">
                <Externos itens={ias} />
                <Ficha
                  chave="ficha-alucinacoes"
                  titulo="Ficha Encontro 2 — Caça às alucinações"
                  linkFormulario={linkFicha('Ficha da oficina')}
                  campos={[
                    { id: 'dupla', rotulo: 'Nomes da dupla' },
                    { id: 'ia', rotulo: 'IA usada', dica: 'ChatGPT, Gemini, Claude ou DeepSeek' },
                    { id: 'arriscada', rotulo: 'Pergunta arriscada e o que a IA respondeu', tipo: 'longo' },
                    { id: 'conferiu', rotulo: 'Era verdade? Onde você conferiu?', tipo: 'longo' },
                    { id: 'segura', rotulo: 'Versão segura da pergunta e a resposta', tipo: 'longo' },
                    { id: 'local', rotulo: 'Pergunta hiperlocal: a IA alucinou? Como você descobriu?', tipo: 'longo' },
                  ]}
                />
              </div>
            </Bloco>

            <Bloco id="arriscado-seguro" minutos="40–55 min" titulo="Quando desconfiar mais: arriscado × seguro">
              <div className="space-y-4">
                {padletRisco?.url && <Externos itens={[padletRisco]} />}
                <ClassificadorRisco />
              </div>
            </Bloco>

            <Bloco
              id="nao-pensa"
              minutos="55–70 min"
              titulo="A IA não pensa como gente"
              texto="Se a IA repete os padrões da internet — que tem tanto conteúdo bom quanto ruim — o que pode aparecer nas respostas dela?"
            >
              <blockquote className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-lg font-semibold leading-relaxed text-white sm:text-xl">
                “A IA não é mais inteligente que você. Ela é mais rápida. A inteligência crítica continua sendo sua.”
              </blockquote>
            </Bloco>

            <Bloco id="quiz-2" minutos="70–100 min" titulo="Regras de ouro: casos do dia a dia" texto="Confira sempre · Assuma a autoria · Proteja seus dados · Respeite as pessoas. Agora decida: cada caso é uso responsável?">
              <InteractiveQuiz questions={QUIZ_CASOS} moduleTitle="Casos do dia a dia" />
            </Bloco>

            <Bloco id="quiz-final" minutos="125–145 min" titulo="Desafio final do Módulo 1">
              <InteractiveQuiz questions={QUIZ_FINAL} moduleTitle="Teste seu conhecimento — Módulo 1" />
            </Bloco>

            <Bloco id="selo-2" minutos="145–150 min" titulo="Seu selo: Pensador Crítico de IA — Nível 2">
              <GeradorSelo titulo="Pensador Crítico de IA" nivel="Nível 2" cor="#a78bfa" />
            </Bloco>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
