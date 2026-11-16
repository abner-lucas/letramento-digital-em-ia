'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ClipboardCopy, Download, ExternalLink, RotateCcw, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';
import { CATEGORIAS_RISCO, GRUPOS_REFERENCIA, PALAVRAS_EMBEDDING, PERGUNTAS_RISCO, PIPELINE } from '@/data/planoModulo1';

const EASE = [0.32, 0.72, 0, 1] as const;
const cartao = 'rounded-2xl border border-[#313131] bg-[#1F1F1F] p-5 sm:p-6';
const campo =
  'w-full rounded-lg border border-[#313131] bg-[#181818] px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500';
const botao =
  'inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-semibold transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400';
const botaoPrimario = `${botao} bg-emerald-400 text-slate-950 hover:bg-emerald-300`;
const botaoSecundario = `${botao} border border-[#313131] bg-[#272727] text-slate-200 hover:bg-[#313131]`;

/*
 * Rascunho guardado no navegador do aluno (some se ele limpar os dados).
 * useSyncExternalStore evita diferença entre o HTML estático e o navegador:
 * no servidor vale o valor inicial; no cliente, o que estiver salvo.
 */
const ouvintes = new Set<() => void>();
const cache = new Map<string, string | null>();

function lerSalvo(chave: string) {
  if (!cache.has(chave)) {
    try {
      cache.set(chave, localStorage.getItem(chave));
    } catch {
      cache.set(chave, null);
    }
  }
  return cache.get(chave) ?? null;
}

function useRascunho<T>(chave: string, inicial: T) {
  const bruto = useSyncExternalStore(
    (avisar) => {
      ouvintes.add(avisar);
      return () => ouvintes.delete(avisar);
    },
    () => lerSalvo(chave),
    () => null,
  );
  const valor = useMemo<T>(() => {
    if (!bruto) return inicial;
    try {
      return JSON.parse(bruto) as T;
    } catch {
      return inicial;
    }
    // `inicial` é sempre um literal novo; só o texto salvo importa aqui.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bruto]);
  const definir = useCallback(
    (novo: T) => {
      const texto = JSON.stringify(novo);
      cache.set(chave, texto);
      try {
        localStorage.setItem(chave, texto);
      } catch {
        /* sem armazenamento: vale só nesta visita */
      }
      ouvintes.forEach((o) => o());
    },
    [chave],
  );
  return [valor, definir] as const;
}

/* ------------------------------------------------------------------ */
/* Ficha de oficina (substitui o Google Forms enquanto ele não existe) */
/* ------------------------------------------------------------------ */

export interface CampoFicha {
  id: string;
  rotulo: string;
  tipo?: 'texto' | 'longo' | 'numero';
  dica?: string;
}

export function Ficha({
  chave,
  titulo,
  campos,
  linkFormulario,
}: {
  chave: string;
  titulo: string;
  campos: CampoFicha[];
  linkFormulario?: string;
}) {
  const base = useId();
  const [respostas, setRespostas] = useRascunho<Record<string, string>>(`plano-m1:${chave}`, {});
  const [copiado, setCopiado] = useState(false);

  const texto = [titulo, '', ...campos.map((c) => `${c.rotulo}: ${respostas[c.id]?.trim() || '—'}`)].join('\n');
  const preenchidos = campos.filter((c) => respostas[c.id]?.trim()).length;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      /* navegador sem permissão: o aluno pode selecionar o texto da prévia */
    }
  };

  return (
    <div className={cartao}>
      <div className="grid gap-4 sm:grid-cols-2">
        {campos.map((c) => (
          <div key={c.id} className={c.tipo === 'longo' ? 'sm:col-span-2' : ''}>
            <label htmlFor={`${base}-${c.id}`} className="mb-1.5 block text-xs font-semibold text-slate-300">
              {c.rotulo}
            </label>
            {c.tipo === 'longo' ? (
              <textarea
                id={`${base}-${c.id}`}
                rows={3}
                value={respostas[c.id] ?? ''}
                placeholder={c.dica}
                onChange={(e) => setRespostas({ ...respostas, [c.id]: e.target.value })}
                className={campo}
              />
            ) : (
              <input
                id={`${base}-${c.id}`}
                type={c.tipo === 'numero' ? 'number' : 'text'}
                inputMode={c.tipo === 'numero' ? 'numeric' : undefined}
                min={c.tipo === 'numero' ? 0 : undefined}
                value={respostas[c.id] ?? ''}
                placeholder={c.dica}
                onChange={(e) => setRespostas({ ...respostas, [c.id]: e.target.value })}
                className={campo}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#313131] pt-4">
        <span className="mr-auto text-xs text-slate-400" aria-live="polite">
          {preenchidos} de {campos.length} campos preenchidos · rascunho salvo neste aparelho
        </span>
        <button type="button" onClick={() => setRespostas({})} className={botaoSecundario}>
          <RotateCcw className="h-4 w-4" /> Limpar
        </button>
        <button type="button" onClick={copiar} className={botaoPrimario}>
          {copiado ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
          {copiado ? 'Copiado!' : 'Copiar respostas'}
        </button>
        {linkFormulario && (
          <a href={linkFormulario} target="_blank" rel="noopener noreferrer" className={botaoSecundario}>
            <ExternalLink className="h-4 w-4" /> Enviar no formulário
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Copie as respostas e envie para o professor pelo canal da turma{linkFormulario ? ' ou cole no formulário' : ''}.
        Nada é enviado automaticamente.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mapa de embeddings (Encontro 1, 70–90 min)                          */
/* ------------------------------------------------------------------ */

const CORES_GRUPO = [
  'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  'border-blue-500/40 bg-blue-500/10 text-blue-300',
  'border-amber-500/40 bg-amber-500/10 text-amber-300',
  'border-purple-500/40 bg-purple-500/10 text-purple-300',
];

export function MapaEmbeddings() {
  const [grupos, setGrupos] = useRascunho<Record<string, number>>('plano-m1:embeddings', {});
  const [revelado, setRevelado] = useState(false);
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const soltas = PALAVRAS_EMBEDDING.filter((p) => grupos[p] === undefined);

  // Quantas palavras de cada grupo de referência o aluno juntou no mesmo grupo.
  const acertos = Object.values(GRUPOS_REFERENCIA).reduce((total, palavras) => {
    const contagem: Record<number, number> = {};
    palavras.forEach((p) => grupos[p] !== undefined && (contagem[grupos[p]] = (contagem[grupos[p]] ?? 0) + 1));
    return total + Math.max(0, ...Object.values(contagem));
  }, 0);

  const colocar = (g: number) => {
    if (!selecionada) return;
    setGrupos({ ...grupos, [selecionada]: g });
    setSelecionada(null);
  };

  return (
    <div className={cartao}>
      <p className="text-sm text-slate-300">
        1. Toque numa palavra. 2. Toque no grupo onde ela “mora”. Junte as palavras que têm a ver umas com as outras — antes de
        qualquer explicação técnica.
      </p>

      <div className="mt-4 flex min-h-12 flex-wrap gap-2" aria-label="Palavras soltas">
        {soltas.length === 0 && <span className="text-xs text-slate-400">Todas as palavras foram agrupadas.</span>}
        {soltas.map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={selecionada === p}
            onClick={() => setSelecionada(selecionada === p ? null : p)}
            className={`min-h-10 rounded-lg border px-3 font-mono text-sm transition-all ${
              selecionada === p ? 'border-emerald-400 bg-emerald-400 text-slate-950' : 'border-[#313131] bg-[#272727] text-slate-200 hover:border-slate-500'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[0, 1, 2, 3].map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => colocar(g)}
            disabled={!selecionada}
            aria-label={`Grupo ${g + 1}${selecionada ? `: colocar "${selecionada}" aqui` : ''}`}
            className={`min-h-24 rounded-xl border-2 border-dashed p-3 text-left transition-colors disabled:cursor-default ${CORES_GRUPO[g]} ${
              selecionada ? 'hover:border-solid' : ''
            }`}
          >
            <span className="block text-xs font-bold uppercase tracking-wider">Grupo {g + 1}</span>
            <span className="mt-2 flex flex-wrap gap-1.5">
              {PALAVRAS_EMBEDDING.filter((p) => grupos[p] === g).map((p) => (
                <motion.span layout key={p} className="rounded-md bg-[#181818] px-2 py-1 font-mono text-xs text-slate-100">
                  {p}
                </motion.span>
              ))}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#313131] pt-4">
        <button type="button" onClick={() => { setGrupos({}); setRevelado(false); }} className={botaoSecundario}>
          <RotateCcw className="h-4 w-4" /> Recomeçar
        </button>
        <button type="button" onClick={() => setRevelado(true)} className={botaoPrimario} disabled={soltas.length > 0}>
          <Sparkles className="h-4 w-4" /> Revelar o mapa da IA
        </button>
        {soltas.length > 0 && <span className="text-xs text-slate-400">Agrupe todas as palavras para revelar.</span>}
      </div>

      <AnimatePresence>
        {revelado && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
            aria-live="polite"
          >
            <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="text-sm font-semibold text-emerald-300">
                O mapa de coordenadas da floresta: {acertos} de {PALAVRAS_EMBEDDING.length} palavras na mesma vizinhança que a IA usaria.
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(GRUPOS_REFERENCIA).map(([nome, palavras], i) => (
                  <div key={nome} className={`rounded-lg border p-3 ${CORES_GRUPO[i]}`}>
                    <span className="text-xs font-bold uppercase tracking-wider">{nome}</span>
                    <p className="mt-1 font-mono text-xs text-slate-200">{palavras.join(' · ')}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Cada palavra tem um “endereço” em números (o embedding). Palavras de significado parecido ficam perto umas das outras —
                é assim que a IA “sabe” que rio e igarapé têm a ver, mesmo sem entender o que é água.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pipeline em 5 passos (Encontro 1, 90–120 min)                       */
/* ------------------------------------------------------------------ */

const FRASE = 'Escreva um poema sobre o rio Guamá';
const TOKENS = ['Escre', 'va', ' um', ' poema', ' sobre', ' o', ' rio', ' Gu', 'amá'];
const RESPOSTA = ['Nas', ' águas', ' do', ' Guamá', ',', ' a', ' cidade', ' acorda', '…'];

export function PipelineAnimado() {
  const [passo, setPasso] = useState(0);

  return (
    <div className={cartao}>
      <p className="font-mono text-sm text-slate-300">
        Frase: <span className="text-emerald-300">“{FRASE}”</span>
      </p>

      <ol className="mt-5 grid gap-3 lg:grid-cols-5">
        {PIPELINE.map((p, i) => {
          const ativo = i < passo;
          return (
            <motion.li
              key={p.titulo}
              animate={{ opacity: ativo ? 1 : 0.4, y: ativo ? 0 : 6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={`relative rounded-xl border p-3 ${ativo ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-[#313131] bg-[#181818]'}`}
            >
              <span className={`font-mono text-xs font-bold ${ativo ? 'text-emerald-400' : 'text-slate-500'}`}>0{i + 1}</span>
              <p className="mt-1 text-sm font-bold text-white">{p.titulo}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{p.texto}</p>
            </motion.li>
          );
        })}
      </ol>

      <div className="mt-5 min-h-24 rounded-xl border border-[#313131] bg-[#181818] p-4 font-mono text-xs" aria-live="polite">
        {passo === 0 && <span className="text-slate-400">Toque em “Próximo passo” para acompanhar a frase dentro da IA.</span>}
        {passo === 1 && (
          <span className="flex flex-wrap gap-1.5">
            {TOKENS.map((t, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }} className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-emerald-300">
                [{t}]
              </motion.span>
            ))}
          </span>
        )}
        {passo === 2 && (
          <span className="flex flex-wrap gap-1.5">
            {TOKENS.map((t, i) => (
              <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="rounded border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-blue-300">
                [{t.trim()}] → [{(0.11 * (i + 2)).toFixed(2)}, {(-0.07 * (i + 1)).toFixed(2)}, …]
              </motion.span>
            ))}
          </span>
        )}
        {passo === 3 && (
          <span className="block space-y-1 text-slate-300">
            Próximo token depois de “… rio Guamá”:
            <span className="block text-emerald-300">“Nas” → muito provável</span>
            <span className="block text-slate-400">“Era” → provável</span>
            <span className="block text-slate-500">“Xadrez” → muito improvável</span>
          </span>
        )}
        {passo === 4 && (
          <span className="flex flex-wrap gap-1">
            {RESPOSTA.map((t, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.18 }} className="text-amber-300">
                [{t}]
              </motion.span>
            ))}
          </span>
        )}
        {passo === 5 && <span className="text-sm text-white">Nas águas do Guamá, a cidade acorda…</span>}
      </div>
      <p className="mt-2 text-[11px] text-slate-500">Ilustrativo: a divisão em tokens e os números variam de modelo para modelo.</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => setPasso(0)} className={botaoSecundario} disabled={passo === 0}>
          <RotateCcw className="h-4 w-4" /> Recomeçar
        </button>
        <button type="button" onClick={() => setPasso((p) => Math.min(5, p + 1))} className={botaoPrimario} disabled={passo === 5}>
          Próximo passo ({Math.min(passo + 1, 5)}/5)
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Arriscado x Seguro (Encontro 2, 40–55 min)                          */
/* ------------------------------------------------------------------ */

export function ClassificadorRisco() {
  const [respostas, setRespostas] = useState<Record<number, boolean>>({});
  const total = Object.keys(respostas).length;
  const acertos = PERGUNTAS_RISCO.filter((p, i) => respostas[i] === p.arriscada).length;

  return (
    <div className={cartao}>
      <p className="text-sm text-slate-300">
        Para cada pergunta, decida: é <strong className="text-red-300">arriscada</strong> (a IA pode inventar) ou{' '}
        <strong className="text-emerald-300">segura</strong>? Categorias do material para desconfiar mais:{' '}
        <span className="text-slate-200">{CATEGORIAS_RISCO.join(' · ')}</span>.
      </p>
      <ul className="mt-4 space-y-3">
        {PERGUNTAS_RISCO.map((p, i) => {
          const resposta = respostas[i];
          const respondeu = resposta !== undefined;
          const certo = resposta === p.arriscada;
          return (
            <li key={p.texto} className="rounded-xl border border-[#313131] bg-[#181818] p-4">
              <p className="text-sm text-slate-100">“{p.texto}”</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[true, false].map((opcao) => (
                  <button
                    key={String(opcao)}
                    type="button"
                    disabled={respondeu}
                    aria-pressed={resposta === opcao}
                    onClick={() => setRespostas({ ...respostas, [i]: opcao })}
                    className={`${botao} border ${
                      resposta === opcao
                        ? opcao
                          ? 'border-red-500/50 bg-red-500/15 text-red-200'
                          : 'border-emerald-500/50 bg-emerald-500/15 text-emerald-200'
                        : 'border-[#313131] bg-[#272727] text-slate-300 hover:bg-[#313131]'
                    } disabled:cursor-default`}
                  >
                    {opcao ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                    {opcao ? 'Arriscada' : 'Segura'}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {respondeu && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-2 text-xs ${certo ? 'text-emerald-300' : 'text-amber-300'}`}
                    aria-live="polite"
                  >
                    {certo ? 'Isso! ' : `Quase: é ${p.arriscada ? 'arriscada' : 'segura'}. `}
                    {p.porque}
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#313131] pt-4">
        <span className="mr-auto text-sm text-slate-300" aria-live="polite">
          {total} de {PERGUNTAS_RISCO.length} respondidas · {acertos} acertos
        </span>
        <button type="button" onClick={() => setRespostas({})} className={botaoSecundario}>
          <RotateCcw className="h-4 w-4" /> Recomeçar
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Selo digital (substitui o emblema do Canva)                          */
/* ------------------------------------------------------------------ */

export function GeradorSelo({ titulo, nivel, cor }: { titulo: string; nivel: string; cor: string }) {
  const id = useId();
  const [nome, setNome] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Desenha o selo em canvas (1080×1080) para baixar como imagem PNG.
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const L = 1080;
    ctx.clearRect(0, 0, L, L);
    ctx.fillStyle = '#181818';
    ctx.fillRect(0, 0, L, L);
    // medalha
    ctx.beginPath();
    ctx.arc(L / 2, 470, 300, 0, Math.PI * 2);
    ctx.fillStyle = '#1F1F1F';
    ctx.fill();
    ctx.lineWidth = 18;
    ctx.strokeStyle = cor;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(L / 2, 470, 255, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 14]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.textAlign = 'center';
    ctx.fillStyle = cor;
    ctx.font = '700 150px Manrope, Arial, sans-serif';
    ctx.fillText('IA', L / 2, 470);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 40px Manrope, Arial, sans-serif';
    ctx.fillText(nivel.toUpperCase(), L / 2, 560);
    // faixa
    ctx.fillStyle = cor;
    ctx.fillRect(140, 800, L - 280, 6);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 58px Manrope, Arial, sans-serif';
    ctx.fillText(titulo, L / 2, 880, L - 120);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '500 44px Manrope, Arial, sans-serif';
    ctx.fillText(nome.trim() || 'Seu nome aqui', L / 2, 950, L - 160);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 28px Manrope, Arial, sans-serif';
    ctx.fillText('Letramento Digital em IA · Módulo 1 · PRODEPA · iSACI · IFPA', L / 2, 1020, L - 120);
  }, [nome, titulo, nivel, cor]);

  const baixar = () => {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = `selo-${titulo.toLowerCase().normalize('NFD').replace(/[^\w]+/g, '-')}.png`;
    a.click();
  };

  return (
    <div className={`${cartao} grid items-center gap-6 sm:grid-cols-[minmax(0,240px)_1fr]`}>
      <canvas ref={canvasRef} width={1080} height={1080} className="w-full max-w-60 rounded-2xl border border-[#313131]" role="img" aria-label={`Prévia do selo ${titulo}${nome ? ` de ${nome}` : ''}`} />
      <div>
        <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-slate-300">
          Seu nome no selo
        </label>
        <input id={id} value={nome} maxLength={40} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Maria do Guamá" className={campo} />
        <p className="mt-2 text-xs text-slate-400">O nome só aparece na imagem; nada é enviado para a internet.</p>
        <button type="button" onClick={baixar} className={`${botaoPrimario} mt-4`}>
          <Download className="h-4 w-4" /> Baixar selo (PNG)
        </button>
      </div>
    </div>
  );
}
