'use client';

import { useState } from 'react';
import { ExternalLink, Check, AlertTriangle, Sparkles, Filter, ChevronRight, Table } from 'lucide-react';
import { AI_TOOLS_DATA, AITool } from '@/data/courseData';

const FILTER_OPTIONS = [
  { id: 'all', label: 'Todas as 6 IAs' },
  { id: 'sources', label: 'Citação de Fontes Reais', toolId: 'perplexity' },
  { id: 'unlimited', label: 'Muitas Perguntas sem Limite', toolId: 'deepseek' },
  { id: 'writing', label: 'Escrita Longa e Refinada', toolId: 'claude' },
  { id: 'google', label: 'Integrado ao Google Docs', toolId: 'gemini' },
  { id: 'daily', label: 'Geração de Imagens & Diário', toolId: 'chatgpt' }
];

export default function AiTabuleiro() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTool, setSelectedTool] = useState<AITool>(AI_TOOLS_DATA[0]);
  const [showFullTable, setShowFullTable] = useState(false);

  const displayedTools = activeFilter === 'all'
    ? AI_TOOLS_DATA
    : AI_TOOLS_DATA.filter(tool => {
        const option = FILTER_OPTIONS.find(o => o.id === activeFilter);
        return option ? tool.id === option.toolId : true;
      });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-900 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              A Regra de Ouro das Ferramentas
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              O Tabuleiro das Ferramentas Gratuitas
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Nenhuma IA é a melhor para tudo. Cada plataforma foi ajustada para um propósito. Conheça as cotas gratuitas e escolha a ferramenta certa sem gastar nada.
            </p>
          </div>

          <button
            onClick={() => setShowFullTable(!showFullTable)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Table className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showFullTable ? 'Ver em Cartões' : 'Ver Tabela Comparativa Geral'}</span>
          </button>
        </div>

        {/* Filter Bar adhering to Anti-Slop (functional buttons with click handlers) */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-slate-800/80 rounded-lg border border-slate-700/60">
          <span className="text-xs text-slate-400 px-2 py-1 flex items-center gap-1 font-medium">
            <Filter className="w-3 h-3 text-emerald-400" />
            <span>Filtro por Necessidade:</span>
          </span>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeFilter === opt.id
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content View: Cards vs Table */}
      {showFullTable ? (
        /* Full Comparison Table */
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Ferramenta</th>
                <th className="py-3 px-4">Modelo Gratuito</th>
                <th className="py-3 px-4">Limite no Gratuito</th>
                <th className="py-3 px-4">Ponto Forte</th>
                <th className="py-3 px-4">Melhor Para</th>
                <th className="py-3 px-4">Acesso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AI_TOOLS_DATA.map((tool) => (
                <tr key={tool.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                    <div>{tool.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{tool.nickname}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{tool.modelFree}</td>
                  <td className="py-3 px-4 text-emerald-700 font-medium">{tool.freeLimit}</td>
                  <td className="py-3 px-4">{tool.strongPoint}</td>
                  <td className="py-3 px-4 text-slate-600">{tool.bestFor}</td>
                  <td className="py-3 px-4">
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-900 font-medium inline-flex items-center gap-1"
                    >
                      <span>Abrir</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* 2-Zone Cards Grid & Detail Viewer */
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* Tools Grid (Left) */}
          <div className="lg:col-span-7 p-6 bg-slate-50/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayedTools.map((tool) => {
                const isSelected = selectedTool.id === tool.id;
                return (
                  <div
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/10 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-slate-900 font-display">
                        {tool.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {tool.company}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-emerald-700 mb-2">
                      {tool.nickname}
                    </div>

                    <div className="text-xs text-slate-600 line-clamp-2 mb-3">
                      {tool.bestFor}
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-mono tabular-nums">
                        {tool.freeLimit}
                      </span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                        Ver detalhes <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector (Right) */}
          <div className="lg:col-span-5 p-6 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Ficha Técnica da Ferramenta
                  </span>
                  <h4 className="text-2xl font-bold font-display text-slate-900 mt-0.5">
                    {selectedTool.name}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-700">
                    {selectedTool.nickname} · {selectedTool.company}
                  </p>
                </div>

                <a
                  href={selectedTool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Acessar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Amazonian Metaphor from the PDF */}
              <div className="mt-4 p-3.5 bg-emerald-50/70 rounded-lg border border-emerald-100">
                <span className="text-xs font-bold text-emerald-900 block mb-1">
                  Analogia Amazônica (Prof. Bruno Duarte):
                </span>
                <p className="text-xs text-emerald-950 leading-relaxed italic">
                  &ldquo;{selectedTool.amazonMetaphor}&rdquo;
                </p>
              </div>

              {/* Free Limit details */}
              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    Regra do Modo Gratuito:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedTool.freeLimitDetails}
                  </p>
                </div>

                {/* Pros */}
                <div>
                  <span className="font-semibold text-slate-900 block mb-1">
                    Pontos Fortes no Gratuito:
                  </span>
                  <ul className="space-y-1 text-slate-600">
                    {selectedTool.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Main limitation */}
                <div className="pt-2">
                  <span className="font-semibold text-amber-900 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Limitação Principal:</span>
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedTool.limitation}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Modelo Grátis: {selectedTool.modelFree}</span>
              <span className="text-emerald-700 font-medium">Recomendado no Curso</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
