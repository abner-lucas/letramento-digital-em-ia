'use client';

import { useState } from 'react';
import { GitBranch, AlertOctagon, CheckSquare, Square, Shield, ArrowRight, CornerDownRight } from 'lucide-react';

const CHECKLIST_ITEMS = [
  "O bot se identifica como automático logo na primeira mensagem de boas-vindas.",
  "Toda informação factual tem fonte conferida e data de conferência explícita (ex: 03/2026).",
  "Existe uma frase de recuo pronta para quando o bot não souber o dado solicitado.",
  "O bot nunca pede dados pessoais (CPF, senhas, prontuários) e alerta se o usuário enviar.",
  "Os temas de emergência médica (SAMU 192, UPA) têm prioridade absoluta sobre qualquer outra resposta.",
  "As respostas foram checadas com o roteiro de caça a vieses culturais e regionais.",
  "O bot não promete o que não pode cumprir (ex: não promete agendar consultas se não tem sistema integrado).",
  "Há sempre uma saída ou contato humano indicado (Disque Saúde 136) para evitar becos sem saída."
];

export default function DecisionTreeViewer() {
  const [activeBranch, setActiveBranch] = useState<'all' | '1' | '2' | '3' | '4' | '5'>('all');
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    4: true
  });

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedChecks = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Visual Tree */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <GitBranch className="w-4 h-4" />
              <span>O Igarapé e seus Furos</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold font-display text-white">
              Árvore de Decisão Lógica: &ldquo;Guia Saúde Guamá&rdquo;
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Cada pergunta do usuário é uma bifurcação. O objetivo é garantir que nenhum ramo termine em terra seca.
            </p>
          </div>

          {/* Filter branches */}
          <div className="flex flex-wrap gap-1 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveBranch('all')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                activeBranch === 'all' ? 'bg-emerald-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Todos os Ramos
            </button>
            <button
              onClick={() => setActiveBranch('4')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                activeBranch === '4' ? 'bg-red-500 text-white font-semibold' : 'text-red-300 hover:text-white'
              }`}
            >
              Ramo 4 (Emergência)
            </button>
            <button
              onClick={() => setActiveBranch('1')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                activeBranch === '1' ? 'bg-blue-500 text-white font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Ramo 1 (Horários)
            </button>
          </div>
        </div>

        {/* Tree Visual Flow */}
        <div className="p-6 bg-slate-50/50 space-y-4">
          {/* Root Node */}
          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase mb-1">
              <span>[NÓ RAIZ — CHEGADA DO MORADOR]</span>
            </div>
            <p className="text-xs font-mono text-slate-200">
              &ldquo;Oi! Sou o Guia Saúde Guamá. Posso ajudar com: horários das UBS, documentos para consulta e vacinação.&rdquo;
            </p>
          </div>

          {/* Emergency Branch (Priority 1) */}
          {(activeBranch === 'all' || activeBranch === '4') && (
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-700 flex items-center gap-1.5 uppercase tracking-wide">
                  <AlertOctagon className="w-4 h-4 text-red-600" />
                  <span>RAMO 4: EMERGÊNCIA MÉDICA (VERIFICADO PRIMEIRO!)</span>
                </span>
                <span className="text-[11px] text-red-600 font-semibold">Prioridade Máxima</span>
              </div>
              <p className="text-xs text-red-950 mb-2">
                <strong>Gatilhos:</strong> &ldquo;dor no peito&rdquo;, &ldquo;falta de ar&rdquo;, &ldquo;sangramento&rdquo;, &ldquo;desmaio&rdquo;, &ldquo;infarto&rdquo;, &ldquo;machucar&rdquo;
              </p>
              <div className="p-3 bg-white rounded-lg border border-red-200 text-xs text-red-900 font-mono">
                ↳ <strong>FOLHA CRÍTICA:</strong> &ldquo;Isso pode ser urgente. Ligue 192 (SAMU) agora ou vá à UPA mais próxima. Não espere resposta por aqui!&rdquo;
              </div>
            </div>
          )}

          {/* Branch 1: Horários */}
          {(activeBranch === 'all' || activeBranch === '1') && (
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                  RAMO 1: &ldquo;horário / abre / funciona / sábado&rdquo;
                </span>
                <span className="text-[11px] text-slate-500">Nó de Decisão: Escolha da UBS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs">
                  <strong className="text-blue-900 block mb-1">↳ Opção 1: UBS Guamá</strong>
                  <p className="text-slate-700 font-mono text-[11px]">
                    Rua Barão de Igarapé-Miri · Seg-Sex 7h-17h · Sábado fechado [Conferido 03/2026]
                  </p>
                </div>
                <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs">
                  <strong className="text-blue-900 block mb-1">↳ Opção 2: UBS Terra Firme</strong>
                  <p className="text-slate-700 font-mono text-[11px]">
                    Passagem São Silvestre · Seg-Sex 7h-17h · Sáb 8h-12h [Conferido 03/2026]
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Branch 2: Documentos */}
          {activeBranch === 'all' && (
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wide block mb-2">
                RAMO 2: &ldquo;documento / o que levar / precisa&rdquo;
              </span>
              <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100 text-xs text-indigo-950 font-mono">
                ↳ <strong>FOLHA DE DOCUMENTOS:</strong> Cartão SUS + Documento com foto + Comprovante de residência no bairro.
              </div>
            </div>
          )}

          {/* Branch 3: Vacinação */}
          {activeBranch === 'all' && (
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block mb-2">
                RAMO 3: &ldquo;vacina / vacinação infantil / campanhas&rdquo;
              </span>
              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 text-xs text-emerald-950 font-mono">
                ↳ <strong>FOLHA DE VACINAS:</strong> Salas abertas das 8h às 16h30. Levar caderneta de vacinação e RG/certidão.
              </div>
            </div>
          )}

          {/* Branch 5: Não Entendi / Saída Segura */}
          {activeBranch === 'all' && (
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-2">
                RAMO 5: NÃO ENTENDI (SAÍDA SEGURA SEM BECO SEM SAÍDA)
              </span>
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 font-mono">
                ↳ <strong>FOLHA DE RECUPERAÇÃO:</strong> &ldquo;Não peguei essa. Posso ajudar com: (1) horários, (2) documentos ou (3) vacinação. Se preferir, ligue no 136 (Disque Saúde).&rdquo;
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive 8-Item Responsibility Checklist */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-0.5">
              <Shield className="w-4 h-4" />
              <span>Auditoria de Projeto</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 font-display">
              Checklist Final de Responsabilidade Ética (8 Itens)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Marque cada item antes de apresentar para a banca ou comunidade escolar:
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-emerald-700">
              {completedChecks} de {CHECKLIST_ITEMS.length} verificados
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CHECKLIST_ITEMS.map((item, idx) => {
            const isChecked = !!checkedItems[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <span className="leading-relaxed">{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
