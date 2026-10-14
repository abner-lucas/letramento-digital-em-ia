'use client';

import { useState } from 'react';
import { Layers, Sparkles, Hash, Info } from 'lucide-react';

const SAMPLE_PHRASES = [
  "Eu amo o açaí com farinha de tapioca no Guamá",
  "O rio Guamá banha Belém com marés fortes",
  "A maniçoba ferve durante sete dias na panela",
  "Inteligência Artificial prevê a próxima palavra provável"
];

// Simple syllable/morpheme token simulation matching the pedagogical explanation in the slides
function simulateTokens(text: string): string[] {
  if (!text.trim()) return [];
  const words = text.trim().split(/\s+/);
  const tokens: string[] = [];

  words.forEach((w) => {
    // If word contains special regional terms, split like tokenizer
    const lower = w.toLowerCase().replace(/[.,!?;:]/g, '');
    if (lower === 'açaí') {
      tokens.push('aça');
      tokens.push('í');
    } else if (lower === 'açaízeiro') {
      tokens.push('açaí');
      tokens.push('zeiro');
    } else if (lower === 'mandioca') {
      tokens.push('mandi');
      tokens.push('oca');
    } else if (lower.length > 7) {
      tokens.push(w.slice(0, Math.ceil(w.length / 2)));
      tokens.push(w.slice(Math.ceil(w.length / 2)));
    } else {
      tokens.push(w);
    }
  });

  return tokens;
}

export default function TokenVisualizer() {
  const [inputText, setInputText] = useState(SAMPLE_PHRASES[0]);

  const tokens = simulateTokens(inputText);
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const tokenCount = tokens.length;
  const ratio = wordCount > 0 ? (tokenCount / wordCount).toFixed(2) : '0';

  const tokenColors = [
    'bg-emerald-100 text-emerald-900 border-emerald-300',
    'bg-blue-100 text-blue-900 border-blue-300',
    'bg-amber-100 text-amber-900 border-amber-300',
    'bg-purple-100 text-purple-900 border-purple-300',
    'bg-teal-100 text-teal-900 border-teal-300',
    'bg-indigo-100 text-indigo-900 border-indigo-300'
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-slate-900 text-white">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>Experimento Interativo do Módulo 1</span>
        </div>
        <h4 className="text-lg sm:text-xl font-bold font-display text-white">
          Simulador de Tokenização: A Mandioca Ralada em Pedacinhos
        </h4>
        <p className="text-xs text-slate-300 mt-0.5">
          Veja como a rede neural &lsquo;rala&rsquo; o texto humano em tokens para transformá-los em números.
        </p>

        {/* Quick Sample Selector */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 mr-1">Exemplos paraenses:</span>
          {SAMPLE_PHRASES.map((phrase, i) => (
            <button
              key={i}
              onClick={() => setInputText(phrase)}
              className="px-2.5 py-1 text-[11px] rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors truncate max-w-[220px]"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            Digite sua própria frase para ver a quebra de tokens:
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
            placeholder="Digite algo sobre o seu bairro ou a Amazônia..."
          />
        </div>

        {/* Tokens Display */}
        <div className="p-4 bg-slate-50/70 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-slate-900">
              Tokens Gerados ({tokenCount} pedacinhos):
            </span>
            <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
              <span>Palavras: <strong>{wordCount}</strong></span>
              <span>·</span>
              <span>Tokens: <strong>{tokenCount}</strong></span>
              <span>·</span>
              <span>Taxa: <strong>{ratio} tokens/palavra</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[50px] items-center">
            {tokens.length === 0 ? (
              <span className="text-xs text-slate-400 italic">Digite algo acima para visualizar os tokens...</span>
            ) : (
              tokens.map((token, idx) => {
                const colorClass = tokenColors[idx % tokenColors.length];
                return (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md border shadow-2xs transition-transform hover:scale-105 ${colorClass}`}
                  >
                    {token}
                  </span>
                );
              })
            )}
          </div>
        </div>

        {/* Lesson Fact */}
        <div className="flex items-start gap-2.5 p-3 bg-emerald-50/70 border border-emerald-100 rounded-lg text-xs text-emerald-950">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Você sabia?</strong> Em média, 75 palavras em português viram cerca de 100 tokens. Palavras regionais desconhecidas ou compridas viram 2 ou 3 pedaços. A máquina calcula o próximo pedaço probabilístico com base nessa sequência!
          </p>
        </div>
      </div>
    </div>
  );
}
