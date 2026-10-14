'use client';

import { useState } from 'react';
import { ShieldAlert, Check, Copy, Sparkles, HelpCircle, Eye, ArrowRight } from 'lucide-react';
import { MAGIC_PHRASES } from '@/data/courseData';

const BIAS_CASES = [
  {
    id: 1,
    title: 'Caso 1: O "Salvador de Fora" da Floresta',
    category: 'Viés Regional e Cultural',
    rawPrompt: 'Escreva uma história sobre uma pessoa que salvou a floresta amazônica.',
    biasedOutput: '"John, um renomado cientista vindo da Europa com equipamentos via satélite de alta precisão, desembarcou na selva inexplorada e descobriu uma fórmula química capaz de regenerar as árvores que as populações ribeirinhas locais não sabiam cuidar..."',
    detectedBiases: [
      'Apaga a ciência e as universidades locais da Amazônia (UFPA, IFPA, MPEG).',
      'Retrata os ribeirinhos como incapazes ou passivos.',
      'Reforça o clichê do salvador estrangeiro iluminado.'
    ],
    correctedPrompt: 'Escreva uma história de preservação da floresta amazônica onde a protagonista seja Dona Raimunda, líder extrativista paraense, em parceria com pesquisadores locais do IFPA e UFPA, valorizando a ciência comunitária das sementes nativas.',
    expectedImprovement: 'Dá autonomia, dignidade e protagonismo aos povos e cientistas que mantêm a floresta em pé há séculos.'
  },
  {
    id: 2,
    title: 'Caso 2: O Especialista em Plantas Medicinais',
    category: 'Viés de Conhecimento e Saber Tradicional',
    rawPrompt: 'Descreva um especialista em plantas e remédios naturais.',
    biasedOutput: '"O Dr. Richard, botânico formado em Harvard, desenvolveu um catálogo moderno de laboratório para transformar crendices populares da mata em princípios ativos químicos patenteados..."',
    detectedBiases: [
      'Trata conhecimento ancestral de séculos como simples "crendice".',
      'Desvaloriza o papel dos povos indígenas e benzedeiras amazônicas.',
      'Centraliza a autoridade médica em títulos do exterior.'
    ],
    correctedPrompt: 'Descreva um mestre pajé ou benzedeira da Amazônia, reconhecendo o conhecimento tradicional sobre plantas medicinais como ciência ancestral legítima e valiosa.',
    expectedImprovement: 'Equipara o saber tradicional ao saber acadêmico com respeito antropológico e rigor histórico.'
  },
  {
    id: 3,
    title: 'Caso 3: O Cientista de Sucesso no Brasil',
    category: 'Viés de Gênero e Região',
    rawPrompt: 'Descreva um cientista brilhante trabalhando em seu laboratório no Brasil.',
    biasedOutput: '"Um físico renomado de São Paulo, vestido de jaleco branco, coordena testes com laser em um prédio moderno da capital paulista..."',
    detectedBiases: [
      'Assume que cientista é sempre homem.',
      'Assume que qualquer pesquisa de ponta no Brasil acontece unicamente no Sudeste.',
      'Invisibiliza os laboratórios e a biodiversidade da Amazônia.'
    ],
    correctedPrompt: 'Descreva uma cientista mulher negra paraense pesquisando biotecnologia e modelagem computacional na Universidade Federal do Pará em Belém.',
    expectedImprovement: 'Rompe com o padrão eurocêntrico e sulista, inspirando jovens mulheres da nossa região.'
  }
];

export default function BiasHunter() {
  const [selectedCase, setSelectedCase] = useState(BIAS_CASES[0]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyPhrase = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-900 text-white">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>Laboratório do Módulo 3</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
          Caçador de Vieses & Frases Mágicas da Amazônia
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          A IA foi treinada com mais de 90% de dados em inglês e do Hemisfério Norte. Aprenda a enxergar as injustiças invisíveis e a usar comandos que valorizam nossa gente.
        </p>

        {/* Case Selector Tabs */}
        <div className="mt-5 flex flex-wrap gap-2">
          {BIAS_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(c)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCase.id === c.id
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Case Inspector */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-50/50">
        {/* Left: The Biased Output */}
        <div className="p-5 bg-white rounded-xl border border-red-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Resposta Enviesada sem Filtro</span>
              </span>
              <span className="text-[11px] text-slate-400">Prompt Vago Original</span>
            </div>

            <div className="p-2.5 bg-slate-100 rounded text-xs text-slate-600 font-mono mb-3">
              &ldquo;{selectedCase.rawPrompt}&rdquo;
            </div>

            <div className="p-3.5 bg-red-50/60 rounded-lg border border-red-100 text-xs text-slate-800 leading-relaxed italic mb-4">
              {selectedCase.biasedOutput}
            </div>

            <div>
              <span className="text-xs font-bold text-slate-900 block mb-1.5">
                Vieses Identificados pelo Roteiro de Caça:
              </span>
              <ul className="space-y-1.5 text-xs text-red-900">
                {selectedCase.detectedBiases.map((bias, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                    <span>{bias}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: The Corrected Prompt with Local Agency */}
        <div className="p-5 bg-white rounded-xl border border-emerald-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Comando Reparador & Justo</span>
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold">Valorização Amazônica</span>
            </div>

            <div className="p-3.5 bg-emerald-50/70 rounded-lg border border-emerald-100 text-xs text-emerald-950 leading-relaxed font-mono whitespace-pre-wrap mb-4">
              {selectedCase.correctedPrompt}
            </div>

            <div>
              <span className="text-xs font-bold text-slate-900 block mb-1">
                Efeito na Resposta da IA:
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedCase.expectedImprovement}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => handleCopyPhrase(selectedCase.correctedPrompt, 99)}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center justify-center gap-1.5"
            >
              {copiedIndex === 99 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 99 ? 'Copiado para a Área de Transferência!' : 'Copiar este Comando Corrigido'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Magic Phrases Strip */}
      <div className="p-6 bg-white border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-display">
              Banco de &ldquo;Frases Mágicas&rdquo; da Amazônia e Diversidade
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Cole qualquer uma destas frases nos seus prompts para guiar a máquina em direção à justiça cultural:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MAGIC_PHRASES.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 block mb-1">
                  {item.category}
                </span>
                <p className="text-xs text-slate-800 italic leading-relaxed">
                  &ldquo;{item.phrase}&rdquo;
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {item.utility}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex justify-end">
                <button
                  onClick={() => handleCopyPhrase(item.phrase, idx)}
                  className="px-2.5 py-1 text-[11px] font-medium text-emerald-700 hover:text-emerald-900 bg-white hover:bg-emerald-50 border border-slate-200 rounded transition-colors flex items-center gap-1"
                >
                  {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedIndex === idx ? 'Copiado!' : 'Copiar Frase'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
