'use client';

import { useState } from 'react';
import { Layers, ShieldCheck, Eye, Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroConsole() {
  const [activeTab, setActiveTab] = useState<'tokens' | 'pacif' | 'bias' | 'bot'>('tokens');

  // Interactive states for each tab
  const [pacifShielded, setPacifShielded] = useState(true);
  const [biasCorrected, setBiasCorrected] = useState(true);
  const [botPrompt, setBotPrompt] = useState<'normal' | 'emergency'>('emergency');

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 rounded-2xl bg-[#1F1F1F] border border-[#313131] shadow-2xl overflow-hidden text-left transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
      {/* Console Top Window Bar */}
      <div className="px-4 py-3 bg-[#181818] border-b border-[#313131] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 text-xs font-mono text-slate-400">
            terminal.letramento.ia · Belém, Pará
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-[#272727] p-1 rounded-lg border border-[#313131]">
          <button
            type="button"
            onClick={() => setActiveTab('tokens')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-1.5 ${
              activeTab === 'tokens'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>01 Tokens</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pacif')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-1.5 ${
              activeTab === 'pacif'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>02 PACIF</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bias')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-1.5 ${
              activeTab === 'bias'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>03 Vieses</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bot')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-1.5 ${
              activeTab === 'bot'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>04 Chatbot</span>
          </button>
        </div>
      </div>

      {/* Console Interactive Stage */}
      <div className="p-6 min-h-[220px] flex flex-col justify-between">
        {/* TAB 1: TOKENS */}
        {activeTab === 'tokens' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Módulo 1 · Como a IA processa o texto
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  Processamento em Morfemas e Tokens
                </h4>
              </div>
              <span className="text-xs font-mono text-emerald-300 bg-[#272727] border border-[#313131] px-2 py-0.5 rounded">
                75 palavras ≈ 100 tokens
              </span>
            </div>

            <div className="p-3.5 bg-[#181818] rounded-xl border border-[#313131]">
              <span className="text-xs text-slate-500 block mb-2 font-mono">
                Entrada humana: &ldquo;O açaízeiro floresce às margens do rio Guamá&rdquo;
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  [O]
                </span>
                <span className="px-2 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  [ açaí]
                </span>
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  [zeiro]
                </span>
                <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  [ floresce]
                </span>
                <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  [ às]
                </span>
                <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  [ margens]
                </span>
                <span className="px-2 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  [ do]
                </span>
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  [ rio]
                </span>
                <span className="px-2 py-1 rounded bg-emerald-400/25 text-emerald-200 border border-emerald-400/40 font-bold">
                  [ Guamá]
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#313131]">
              <span>A IA divide o texto em fatias e calcula probabilidades de associação.</span>
              <Link href="/modulo/1" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                <span>Ver Módulo 1</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: PACIF */}
        {activeTab === 'pacif' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Módulo 2 · Engenharia de Comandos
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  Blindagem Estrutural com Matriz PACIF
                </h4>
              </div>

              {/* State toggle */}
              <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#313131] text-xs">
                <button
                  type="button"
                  onClick={() => setPacifShielded(false)}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    !pacifShielded ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'text-slate-400'
                  }`}
                >
                  Sem PACIF
                </button>
                <button
                  type="button"
                  onClick={() => setPacifShielded(true)}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    pacifShielded ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold' : 'text-slate-400'
                  }`}
                >
                  Blindado com PACIF
                </button>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border text-xs font-mono leading-relaxed transition-all ${
              pacifShielded
                ? 'bg-blue-950/30 border-blue-800/60 text-blue-100'
                : 'bg-red-950/30 border-red-800/50 text-red-200'
            }`}>
              {pacifShielded ? (
                <>
                  <span className="text-emerald-400 font-bold">[P]</span> Papel: Professor especialista · <span className="text-blue-400 font-bold">[A]</span> Ação: Sintetize o tema · <span className="text-indigo-400 font-bold">[C]</span> Contexto: Ensino Médio de Belém · <span className="text-amber-400 font-bold">[I]</span> Instruções: Fatos conferidos, sem jargão · <span className="text-purple-400 font-bold">[F]</span> Formato: 3 tópicos diretos.
                </>
              ) : (
                <>
                  Comando Vago: &ldquo;Me fale sobre a Amazônia.&rdquo; → <span className="text-red-400">Risco crítico de alucinação e superficialidade estatística.</span>
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#313131]">
              <span>{pacifShielded ? 'Comando blindado: probabilidade direcionada à verdade local.' : 'Comando vago gera alucinação.'}</span>
              <Link href="/modulo/2" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                <span>Ver Módulo 2</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 3: BIAS */}
        {activeTab === 'bias' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Módulo 3 · Identificação de Vieses
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  Auditoria Ética e Realidade Amazônica
                </h4>
              </div>

              <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#313131] text-xs">
                <button
                  type="button"
                  onClick={() => setBiasCorrected(false)}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    !biasCorrected ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'text-slate-400'
                  }`}
                >
                  Resposta com Viés
                </button>
                <button
                  type="button"
                  onClick={() => setBiasCorrected(true)}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    biasCorrected ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold' : 'text-slate-400'
                  }`}
                >
                  Filtro Regional e Local
                </button>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-all ${
              biasCorrected
                ? 'bg-amber-950/30 border-amber-800/60 text-amber-100'
                : 'bg-red-950/30 border-red-800/50 text-red-200'
            }`}>
              {biasCorrected ? (
                <div className="space-y-1">
                  <div className="text-emerald-400 font-semibold font-mono">✓ Protagonismo e Saberes Locais:</div>
                  <p>&ldquo;Cientistas paraenses e lideranças tradicionais da floresta lideram a conservação sustentável com conhecimento ancestral e biotecnologia local.&rdquo;</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-red-400 font-semibold font-mono">✕ Estereótipo Detectado:</div>
                  <p>&ldquo;Pesquisador estrangeiro salva a selva intocada que os povos locais não sabiam preservar.&rdquo; (Narrativa do herói externo).</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#313131]">
              <span>Mais de 90% dos dados da IA vêm do Norte global. O prompt correto equilibra os fatos.</span>
              <Link href="/modulo/3" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1">
                <span>Ver Módulo 3</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: CHATBOT */}
        {activeTab === 'bot' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  Módulo 4 · Projeto Final
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  Árvore de Decisão com Salvaguarda SAMU 192
                </h4>
              </div>

              <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#313131] text-xs">
                <button
                  type="button"
                  onClick={() => setBotPrompt('normal')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    botPrompt === 'normal' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400'
                  }`}
                >
                  Dúvida de Horário
                </button>
                <button
                  type="button"
                  onClick={() => setBotPrompt('emergency')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    botPrompt === 'emergency' ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-semibold' : 'text-slate-400'
                  }`}
                >
                  Gatilho de Emergência
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-[#181818] rounded-xl border border-[#313131] text-xs font-mono space-y-2">
              <div className="text-slate-400">
                Usuário: {botPrompt === 'emergency' ? '"Tô com dor aguda no peito, o posto abre que horas?"' : '"A UBS abre no sábado de manhã?"'}
              </div>
              <div className={botPrompt === 'emergency' ? 'text-red-400 font-semibold' : 'text-emerald-400'}>
                {botPrompt === 'emergency'
                  ? '↳ BOT [PRIORIDADE MÁXIMA]: "Isso pode ser uma emergência médica. Ligue agora para o SAMU 192 ou vá à UPA mais próxima. Não espere resposta por aqui!"'
                  : '↳ BOT [BASE CONFERIDA]: "UBS Guamá: Segunda a Sexta 7h às 17h. Sábado fechado. UBS Terra Firme: Sábado 8h às 12h."'}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#313131]">
              <span>Segurança primeiro: a regra de emergência suspende qualquer outra resposta.</span>
              <Link href="/modulo/4" className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1">
                <span>Ver Módulo 4</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
