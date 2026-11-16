import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardList, Clock, ExternalLink, Inbox, MonitorSmartphone, Sparkles, Target, Trophy, Wrench } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QRCode from '@/components/plano/QRCode';
import { Cascata, ItemCascata, Revelar } from '@/components/movimento/Revelar';
import { IndicadorSecoes } from '@/components/movimento/Navegacao';
import { ENCONTROS_VISIVEIS as ENCONTROS, LINKS_PROFESSOR, NOTION_URL, PLANO, SITE_URL, type Ferramenta, type Recurso } from '@/data/planoModulo1';

export const metadata: Metadata = {
  title: 'Plano de aula do Módulo 1 (Roteiro do Professor)',
  description: PLANO.resumo,
};

const TURMA = '/plano/modulo-1/turma';

const COR: Record<Ferramenta, string> = {
  Mentimeter: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  Padlet: 'border-pink-500/30 bg-pink-500/10 text-pink-300',
  Kahoot: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
  Site: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  IA: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  Tokenizador: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  tldraw: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
};

function CartaoRecurso({ r }: { r: Recurso }) {
  const destino = r.urlProfessor ?? r.url ?? (r.ancora ? `${TURMA}#${r.ancora}` : undefined);
  const externo = !!(r.urlProfessor ?? r.url);
  const conteudo = (
    <>
      <span className="flex items-center gap-2">
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${COR[r.ferramenta]}`}>{r.ferramenta}</span>
        <span className="flex-1 font-semibold text-slate-100">{r.nome}</span>
        {destino && (externo ? <ExternalLink className="h-3.5 w-3.5 shrink-0" /> : <ArrowRight className="h-3.5 w-3.5 shrink-0" />)}
      </span>
      {r.acesso && <span className="mt-1.5 block text-[11px] leading-snug text-slate-400">{r.acesso}</span>}
      {r.coleta && (
        <span className="mt-1 flex gap-1.5 text-[11px] leading-snug text-emerald-300/90">
          <Inbox className="mt-0.5 h-3 w-3 shrink-0" /> {r.coleta}
        </span>
      )}
    </>
  );
  const classe = 'block rounded-lg border border-[#313131] bg-[#181818] px-3 py-2.5 text-xs text-slate-200 transition-colors hover:border-slate-500';
  if (!destino) return <span className={classe}>{conteudo}</span>;
  return externo ? (
    <a href={destino} target="_blank" rel="noopener noreferrer" className={classe}>
      {conteudo}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  ) : (
    <Link href={destino} className={classe}>
      {conteudo}
    </Link>
  );
}

export default function PlanoModulo1() {
  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-slate-100">
      <Navbar />
      <IndicadorSecoes
        secoes={[
          { id: 'visao-geral', rotulo: 'Visão geral' },
          ...ENCONTROS.map((e) => ({ id: e.id, rotulo: `Encontro ${e.numero}` })),
          { id: 'respostas', rotulo: 'Respostas dos alunos' },
        ]}
      />

      <main id="conteudo-principal" className="flex-1">
        <section id="visao-geral" className="pt-28 sm:pt-32 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#272727]">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
            <Revelar>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#272727] text-xs font-semibold text-emerald-400">
                Área do professor · Plano de aula
              </span>
              <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9B9B9B] [text-wrap:balance]">
                {PLANO.titulo}
              </h1>
              <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">{PLANO.resumo}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={TURMA} className="group inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-300 active:scale-[0.98]">
                  <MonitorSmartphone className="h-4 w-4" />
                  Abrir a página da turma
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a href={NOTION_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#313131] bg-[#272727] px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:bg-[#313131]">
                  <ExternalLink className="h-4 w-4 text-emerald-400" /> Roteiro de origem no Notion
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </div>
              <ol className="mt-10 grid max-w-2xl gap-3 border-t border-[#272727] pt-6 sm:grid-cols-3">
                {ENCONTROS.map((e) => (
                  <li key={e.id}>
                    <a href={`#${e.id}`} className="block rounded-xl border border-[#313131] bg-[#1F1F1F] p-3 transition-colors hover:border-slate-500">
                      <span className="font-mono text-xs text-emerald-400">Encontro {e.numero} · {e.duracao} min</span>
                      <span className="mt-1 block text-sm font-semibold leading-snug text-white">{e.titulo}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </Revelar>
            <Revelar atraso={0.15} className="rounded-2xl border border-[#313131] bg-[#1F1F1F] p-5 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-400">Projete na sala</p>
              <QRCode url={`${SITE_URL}${TURMA}/`} rotulo="Página da turma: atividades no celular" tamanho={168} />
            </Revelar>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1F1F1F] border-b border-[#272727]">
          <Revelar className="max-w-6xl mx-auto flex gap-4 items-start">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Lógica pedagógica</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">{PLANO.logica}</p>
            </div>
          </Revelar>
        </section>

        {ENCONTROS.map((e, idx) => (
          <section key={e.id} id={e.id} className={`py-16 px-4 sm:px-6 lg:px-8 border-b border-[#272727] ${idx % 2 ? 'bg-[#1F1F1F]' : 'bg-[#181818]'}`}>
            <div className="max-w-6xl mx-auto">
              <Revelar className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Encontro {e.numero} · {e.duracao} minutos
                </span>
                <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-white [text-wrap:balance]">{e.titulo}</h2>
                <p className="mt-3 text-sm text-slate-400">{e.topicos}</p>
              </Revelar>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Revelar className="rounded-2xl border border-[#313131] bg-[#272727] p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white"><Target className="h-4 w-4 text-emerald-400" /> Objetivo</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{e.objetivo}</p>
                </Revelar>
                <Revelar atraso={0.08} className="rounded-2xl border border-[#313131] bg-[#272727] p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white"><Wrench className="h-4 w-4 text-emerald-400" /> Checklist de ferramentas (zero material físico)</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {e.ferramentas.map((f) => (
                      <li key={f} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />{f}</li>
                    ))}
                  </ul>
                </Revelar>
              </div>

              <Revelar className="mt-10">
                <div className="flex h-2 overflow-hidden rounded-full bg-[#272727]" aria-hidden>
                  {e.blocos.map((b, i) => (
                    <span key={b.inicio} style={{ width: `${((b.fim - b.inicio) / e.duracao) * 100}%` }} className={`${['bg-emerald-400', 'bg-emerald-600'][i % 2]} border-r border-[#181818]`} />
                  ))}
                </div>
              </Revelar>

              <Cascata como="ol" className="mt-6 space-y-4">
                {e.blocos.map((b) => (
                  <ItemCascata key={b.inicio} como="li" className="grid gap-4 rounded-2xl border border-[#313131] bg-[#1F1F1F] p-5 sm:grid-cols-[7.5rem_1fr]">
                    <div className="flex items-start gap-2 sm:flex-col sm:gap-1">
                      <span className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-emerald-400">
                        <Clock className="h-3.5 w-3.5" />{b.inicio}–{b.fim} min
                      </span>
                      <span className="text-xs text-slate-400">{b.fim - b.inicio} minutos</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-white">
                        {b.titulo}
                        {b.ferramenta && <span className="ml-2 text-xs font-medium text-slate-400">· {b.ferramenta}</span>}
                      </h3>
                      <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-300">
                        {b.descricao.map((p) => <p key={p}>{p}</p>)}
                      </div>
                      {b.recursos && (
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          {b.recursos.map((r) => <CartaoRecurso key={r.nome} r={r} />)}
                        </div>
                      )}
                    </div>
                  </ItemCascata>
                ))}
              </Cascata>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Revelar className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white"><ClipboardList className="h-4 w-4 text-emerald-400" /> O que fica registrado</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                    {e.registro.map((r) => <li key={r} className="flex gap-2"><Inbox className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />{r}</li>)}
                  </ul>
                </Revelar>
                <Revelar atraso={0.08} className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white"><Trophy className="h-4 w-4 text-amber-300" /> Recompensa do encontro</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{e.recompensa}</p>
                </Revelar>
              </div>
            </div>
          </section>
        ))}

        <section id="respostas" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Revelar className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Respostas dos alunos</span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-white">Onde você recebe o que a turma produz</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{PLANO.coleta}</p>
            </Revelar>
            <Cascata className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {LINKS_PROFESSOR.map((l) => (
                <ItemCascata key={l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-[#313131] bg-[#1F1F1F] px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white">
                    {l.nome}
                    <ExternalLink className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </ItemCascata>
              ))}
            </Cascata>
            <p className="mt-6 text-xs text-slate-400">
              Links de edição e apresentação só abrem com a sua conta logada. Os alunos nunca precisam deles: entram pelo código na tela (Menti e Kahoot) ou pelo QR code da página da turma (Padlet).
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
