import type { Metadata } from 'next';
import { ExternalLink, KeyRound } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QRCode from '@/components/plano/QRCode';
import { ClassificadorRisco, GeradorSelo, MapaEmbeddings, PipelineAnimado } from '@/components/plano/Atividades';
import { Revelar } from '@/components/movimento/Revelar';
import { IndicadorSecoes } from '@/components/movimento/Navegacao';
import { ENCONTROS, type Recurso } from '@/data/planoModulo1';

export const metadata: Metadata = {
  title: 'Módulo 1 — Atividades da turma',
  description: 'Atividades no celular dos três encontros do Módulo 1: tipos de IA, tokens, embeddings, caminho da resposta, alucinações e regras de ouro.',
};

const recursos = ENCONTROS.flatMap((e) => e.blocos.flatMap((b) => b.recursos ?? []));
const porNome = (inicio: string) => recursos.find((r) => r.nome.startsWith(inicio))!;
const porFerramenta = (f: Recurso['ferramenta']) => recursos.filter((r) => r.ferramenta === f);

function Bloco({ id, minutos, titulo, texto, children }: { id: string; minutos: string; titulo: string; texto?: string; children?: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-28">
      <Revelar>
        <span className="font-mono text-xs font-semibold text-emerald-400">{minutos}</span>
        <h3 id={`${id}-titulo`} className="mt-1 text-xl sm:text-2xl font-bold text-white">{titulo}</h3>
        {texto && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">{texto}</p>}
      </Revelar>
      {children && <Revelar atraso={0.08} className="mt-5">{children}</Revelar>}
    </section>
  );
}

/** Links que o aluno abre no celular (QR + botão). Nada é respondido no site. */
function Abrir({ itens }: { itens: Recurso[] }) {
  return (
    <div className="flex flex-wrap items-start gap-6 rounded-2xl border border-[#313131] bg-[#1F1F1F] p-5">
      {itens.map((r) => (
        <div key={r.nome + r.url} className="flex flex-col items-center gap-3">
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

/** Instrução para ferramentas que o professor projeta (Menti, Kahoot): o aluno entra com o código da tela. */
function CodigoNaTela({ ferramenta, site }: { ferramenta: string; site: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#313131] bg-[#1F1F1F] p-5">
      <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
      <p className="text-sm leading-relaxed text-slate-300">
        Abra <a href={`https://${site}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-300 underline underline-offset-2">{site}</a> no celular e digite o código que o professor mostra na tela do {ferramenta}.
      </p>
    </div>
  );
}

function Cabecalho({ id, numero, titulo }: { id: string; numero: number; titulo: string }) {
  return (
    <Revelar>
      <span id={id} className="scroll-mt-28 text-xs font-semibold uppercase tracking-wider text-emerald-400">Encontro {numero}</span>
      <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-white">{titulo}</h2>
    </Revelar>
  );
}

const SECOES = [
  { id: 'encontro-1', rotulo: 'Encontro 1' },
  { id: 'tipos-ia', rotulo: 'Tipos de IA' },
  { id: 'tokens', rotulo: 'Tokens' },
  { id: 'encontro-2', rotulo: 'Encontro 2' },
  { id: 'embeddings', rotulo: 'Embeddings' },
  { id: 'pipeline', rotulo: 'Caminho' },
  { id: 'encontro-3', rotulo: 'Encontro 3' },
  { id: 'alucinacoes', rotulo: 'Alucinações' },
  { id: 'arriscado-seguro', rotulo: 'Arriscado x seguro' },
  { id: 'crie-seu-caso', rotulo: 'Crie seu caso' },
];

export default function TurmaModulo1() {
  const padletE1 = porNome('Padlet "Tipos de IA');
  const padletE23 = { ...porNome('Padlet — colunas "E2'), nome: 'Murais dos Encontros 2 e 3' };
  const tokenizadores = porFerramenta('Tokenizador');
  const ias = porFerramenta('IA');
  const [e1, e2, e3] = ENCONTROS;

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
              Tudo o que vamos usar nos três encontros, direto no celular. Siga o professor e role até a atividade da vez. Suas respostas vão para o
              Padlet, o Mentimeter e o Kahoot — este site não guarda nada.
            </p>
            <nav aria-label="Encontros" className="mt-6 flex flex-wrap justify-center gap-3">
              {ENCONTROS.map((e) => (
                <a key={e.id} href={`#${e.id}`} className="min-h-10 inline-flex items-center rounded-lg border border-[#313131] bg-[#272727] px-4 text-sm font-semibold text-slate-200 hover:bg-[#313131]">
                  Encontro {e.numero}
                </a>
              ))}
            </nav>
          </Revelar>
        </section>

        {/* Encontro 1 */}
        <div className="px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-4xl mx-auto space-y-16">
            <Cabecalho id="encontro-1" numero={1} titulo={e1.titulo} />
            <Bloco id="abertura-1" minutos="0–10 min" titulo="Qual app de IA você usou nas últimas 24h?">
              <CodigoNaTela ferramenta="Mentimeter" site="menti.com" />
            </Bloco>
            <Bloco id="tipos-ia" minutos="10–35 min" titulo="Os diferentes tipos de IA" texto="Em grupo, poste no Padlet 2 apps de IA que você usa no dia a dia, na coluna certa.">
              <Abrir itens={[padletE1]} />
            </Bloco>
            <Bloco
              id="tokens"
              minutos="35–80 min"
              titulo="Oficina dos tokens"
              texto="Em dupla, abra um tokenizador e teste açaí, igarapé, Guamá (ou cupuaçu), computador, felicidade e inteligência. Depois poste a ficha da dupla no Padlet, na coluna “Ficha · Oficina dos tokens”, copiando o modelo fixado lá."
            >
              <Abrir itens={[...tokenizadores, { ...padletE1, nome: 'Padlet: postar a ficha' }]} />
            </Bloco>
            <Bloco id="quiz-1" minutos="100–130 min" titulo="Quiz do Encontro 1">
              <CodigoNaTela ferramenta="Kahoot" site="kahoot.it" />
            </Bloco>
            <Bloco id="selo-1" minutos="145–150 min" titulo={`Seu selo: ${e1.selo}`}>
              <GeradorSelo titulo="Explorador de Tokens" nivel="Nível 1" cor={e1.corSelo} />
            </Bloco>
          </div>
        </div>

        {/* Encontro 2 */}
        <div className="px-4 sm:px-6 lg:px-8 py-14 bg-[#1F1F1F] border-t border-[#272727]">
          <div className="max-w-4xl mx-auto space-y-16">
            <Cabecalho id="encontro-2" numero={2} titulo={e2.titulo} />
            <Bloco id="retomada-2" minutos="0–10 min" titulo="Em uma palavra: o que é um token?">
              <CodigoNaTela ferramenta="Mentimeter" site="menti.com" />
            </Bloco>
            <Bloco id="embeddings" minutos="10–40 min" titulo="Embeddings: o mapa das palavras" texto="Em grupo, junte as 12 palavras que têm a ver umas com as outras. Depois o professor revela como a IA organiza esse mapa.">
              <MapaEmbeddings />
            </Bloco>
            <Bloco
              id="pipeline"
              minutos="55–95 min"
              titulo="O caminho completo: do seu texto à resposta"
              texto="Acompanhe os 5 passos com a frase do material. Depois seu grupo explica, no Padlet, o passo que recebeu do professor (colunas “E2 · 1 a 5”)."
            >
              <div className="space-y-4">
                <PipelineAnimado />
                <Abrir itens={[padletE23]} />
              </div>
            </Bloco>
            <Bloco id="quiz-2" minutos="95–125 min" titulo="Quiz do Encontro 2">
              <CodigoNaTela ferramenta="Kahoot" site="kahoot.it" />
            </Bloco>
            <Bloco id="selo-2" minutos="145–150 min" titulo={`Seu selo: ${e2.selo}`}>
              <GeradorSelo titulo="Navegador do Pipeline" nivel="Nível 2" cor={e2.corSelo} />
            </Bloco>
          </div>
        </div>

        {/* Encontro 3 */}
        <div className="px-4 sm:px-6 lg:px-8 py-14 border-t border-[#272727]">
          <div className="max-w-4xl mx-auto space-y-16">
            <Cabecalho id="encontro-3" numero={3} titulo={e3.titulo} />
            <Bloco id="retomada-3" minutos="0–10 min" titulo="Retomada: o caminho da IA">
              <CodigoNaTela ferramenta="Mentimeter" site="menti.com" />
            </Bloco>
            <Bloco
              id="alucinacoes"
              minutos="10–40 min"
              titulo="Caça às alucinações"
              texto="Em dupla, teste na IA uma pergunta arriscada, a versão segura e uma pergunta bem local sobre o seu bairro. Confira com uma busca rápida e poste a ficha no Padlet, na coluna “E3 · Ficha: caça às alucinações”."
            >
              <Abrir itens={[...ias, { ...padletE23, nome: 'Padlet: postar a ficha' }]} />
            </Bloco>
            <Bloco
              id="arriscado-seguro"
              minutos="40–55 min"
              titulo="Quando desconfiar mais: arriscado × seguro"
              texto="Treine aqui e depois poste 1 exemplo novo em cada coluna do Padlet (“E3 · Pergunta arriscada” e “E3 · Pergunta segura”)."
            >
              <div className="space-y-4">
                <ClassificadorRisco />
                <Abrir itens={[padletE23]} />
              </div>
            </Bloco>
            <Bloco id="nao-pensa" minutos="55–70 min" titulo="A IA não pensa como gente">
              <blockquote className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-lg font-semibold leading-relaxed text-white sm:text-xl">
                “A IA não é mais inteligente que você. Ela é mais rápida. A inteligência crítica continua sendo sua.”
              </blockquote>
            </Bloco>
            <Bloco id="casos" minutos="70–100 min" titulo="Regras de ouro: casos do dia a dia" texto="Confira sempre · Assuma a autoria · Proteja seus dados · Respeite as pessoas.">
              <CodigoNaTela ferramenta="Kahoot" site="kahoot.it" />
            </Bloco>
            <Bloco
              id="crie-seu-caso"
              minutos="100–130 min"
              titulo="Crie seu próprio caso"
              texto="Sua dupla posta no Padlet (coluna “E3 · Crie seu caso”) uma situação nova de uso da IA, sem revelar a resposta. Depois comenta o caso de outra dupla: certo ou errado, e qual regra de ouro se aplica."
            >
              <Abrir itens={[padletE23]} />
            </Bloco>
            <Bloco id="quiz-final" minutos="130–145 min" titulo="Quiz final do Módulo 1">
              <CodigoNaTela ferramenta="Kahoot" site="kahoot.it" />
            </Bloco>
            <Bloco id="selo-3" minutos="145–150 min" titulo={`Seu selo: ${e3.selo}`}>
              <GeradorSelo titulo="Pensador Crítico de IA" nivel="Nível 3" cor={e3.corSelo} />
            </Bloco>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
