'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles, Shield, RotateCcw, HelpCircle } from 'lucide-react';
import { PACIF_EXPLAINED } from '@/data/courseData';

const PRESETS = [
  {
    name: "Desafio da Cabanagem (História do Pará)",
    papel: "Você é um professor paraense de história apaixonado pelas lutas sociais da Amazônia.",
    acao: "Explique as causas, o desenrolar e o significado histórico da Revolta da Cabanagem de 1835.",
    contexto: "Para estudantes do 1º ano do ensino médio público de Belém que estão preparando um seminário escolar.",
    instrucoes: "Destaque o protagonismo dos ribeirinhos, indígenas e negros escravizados. Não use termos acadêmicos difíceis sem explicar. Jamais trate os revoltosos como arruaceiros.",
    formato: "Em 3 partes numeradas: (1) O que provocou a revolta, (2) Quem lutou e (3) Por que essa memória importa para o nosso povo hoje. Máximo de 20 linhas."
  },
  {
    name: "Guia Saúde Guamá (Acesso a UBS)",
    papel: "Você é o 'Guia Saúde Guamá', assistente informativo comunitário criado por estudantes para a comunidade.",
    acao: "Informe os horários de funcionamento, endereços e documentos obrigatórios para atendimento na Unidade Básica de Saúde.",
    contexto: "Para moradores que trabalham cedo e precisam saber se o posto abre no sábado antes de gastar passagens de ônibus.",
    instrucoes: "NUNCA invente horários. Se houver menção a dor no peito, falta de ar ou desmaio, ignore a pergunta de horário e acione imediatamente o SAMU 192 ou UPA mais próxima.",
    formato: "Resposta em até 4 linhas diretas, com a data da conferência dos dados. Termine oferecendo opções 1, 2 e 3."
  },
  {
    name: "Professor de Matemática do IFPA (Equações)",
    papel: "Você é um professor de matemática paciente e didático do IFPA.",
    acao: "Explique como resolver uma equação de 1º grau passo a passo.",
    contexto: "Para um estudante do bairro da Terra Firme que tem bloqueio com matemática e vai prestar o processo seletivo.",
    instrucoes: "Use a metáfora de uma balança de dois pratos da feira do Ver-o-Peso para explicar o isolamento do 'x'. Não pule nenhuma etapa do cálculo.",
    formato: "Exemplo prático resolvido em 3 passos numerados, com linguagem encorajadora e sem fórmulas complicadas."
  },
  {
    name: "Chef da Culinária Paraense (Sabores Tradicionais)",
    papel: "Você é um mestre cuca paraense com 30 anos de experiência nos mercados de Belém.",
    acao: "Explique o processo de fermentação e cozimento da maniva até virar maniçoba.",
    contexto: "Para uma pessoa que nunca visitou o Pará e tem curiosidade sobre a segurança e os segredos desse prato ancestral.",
    instrucoes: "Destaque os 7 dias de fervura obrigatórios para eliminar o ácido cianídrico. Trate o processo como ciência milenar indígena e não apenas folclore.",
    formato: "Linha do tempo dos 7 dias em tópicos breves, seguida de 2 dicas de tempero autêntico."
  }
];

export default function PacifBuilder() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [papel, setPapel] = useState(PRESETS[0].papel);
  const [acao, setAcao] = useState(PRESETS[0].acao);
  const [contexto, setContexto] = useState(PRESETS[0].contexto);
  const [instrucoes, setInstrucoes] = useState(PRESETS[0].instrucoes);
  const [formato, setFormato] = useState(PRESETS[0].formato);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setPapel(PRESETS[index].papel);
    setAcao(PRESETS[index].acao);
    setContexto(PRESETS[index].contexto);
    setInstrucoes(PRESETS[index].instrucoes);
    setFormato(PRESETS[index].formato);
  };

  const handleReset = () => {
    handleSelectPreset(0);
  };

  const generatedPrompt = `[PAPEL]
${papel}

[AÇÃO]
${acao}

[CONTEXTO]
${contexto}

[INSTRUÇÕES]
${instrucoes}

[FORMATO]
${formato}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-900 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>Metodologia Oficial do Curso</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Laboratório Interativo da Matriz PACIF
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Monte comandos inquebráveis combinando os 5 blocos: Papel, Ação, Contexto, Instruções e Formato.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5"
            title="Restaurar padrão"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        {/* Preset Selector */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 mr-2 font-medium">Modelos Prontos do Curso:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                selectedPresetIndex === idx
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {p.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Zone Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Side: 5 Blocks Configuration */}
        <div className="lg:col-span-7 p-6 space-y-5 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-900 uppercase tracking-wide">
              Configuração dos Elementos PACIF
            </span>
            <span>Edite os campos para calibrar a saída</span>
          </div>

          {/* [P] Papel */}
          <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-xs">P</span>
                <span>[P] Papel — Quem a IA deve ser?</span>
              </label>
              <span className="text-[11px] text-slate-400">Atribuição de persona / profissão</span>
            </div>
            <textarea
              value={papel}
              onChange={(e) => setPapel(e.target.value)}
              rows={2}
              className="w-full text-xs text-slate-800 bg-slate-50/50 border border-slate-200 rounded p-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Ex: Você é um professor paraense..."
            />
          </div>

          {/* [A] Ação */}
          <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-blue-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-blue-100 text-blue-800 flex items-center justify-center font-mono text-xs">A</span>
                <span>[A] Ação — O que ela deve fazer?</span>
              </label>
              <span className="text-[11px] text-slate-400">Verbo central e tarefa</span>
            </div>
            <textarea
              value={acao}
              onChange={(e) => setAcao(e.target.value)}
              rows={2}
              className="w-full text-xs text-slate-800 bg-slate-50/50 border border-slate-200 rounded p-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ex: Explique as causas da revolta..."
            />
          </div>

          {/* [C] Contexto */}
          <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-800 flex items-center justify-center font-mono text-xs">C</span>
                <span>[C] Contexto — Qual o cenário e o público?</span>
              </label>
              <span className="text-[11px] text-slate-400">Público-alvo e localização</span>
            </div>
            <textarea
              value={contexto}
              onChange={(e) => setContexto(e.target.value)}
              rows={2}
              className="w-full text-xs text-slate-800 bg-slate-50/50 border border-slate-200 rounded p-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Ex: Para alunos do ensino médio de Belém..."
            />
          </div>

          {/* [I] Instruções */}
          <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-amber-100 text-amber-800 flex items-center justify-center font-mono text-xs">I</span>
                <span>[I] Instruções — Regras restritivas e limites</span>
              </label>
              <span className="text-[11px] text-slate-400">O que é proibido / obrigatório</span>
            </div>
            <textarea
              value={instrucoes}
              onChange={(e) => setInstrucoes(e.target.value)}
              rows={2}
              className="w-full text-xs text-slate-800 bg-slate-50/50 border border-slate-200 rounded p-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Ex: Não use termos acadêmicos sem explicar..."
            />
          </div>

          {/* [F] Formato */}
          <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-purple-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-purple-100 text-purple-800 flex items-center justify-center font-mono text-xs">F</span>
                <span>[F] Formato — A embalagem visual da resposta</span>
              </label>
              <span className="text-[11px] text-slate-400">Tópicos, linhas, tabela</span>
            </div>
            <textarea
              value={formato}
              onChange={(e) => setFormato(e.target.value)}
              rows={2}
              className="w-full text-xs text-slate-800 bg-slate-50/50 border border-slate-200 rounded p-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Ex: Em 3 partes numeradas..."
            />
          </div>
        </div>

        {/* Right Side: Generated Blinded Super-Prompt */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Super-Prompt Blindado Gerado</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Comando'}</span>
              </button>
            </div>

            {/* Prompt preview container */}
            <div className="p-4 bg-slate-900 text-slate-100 rounded-lg border border-slate-800 font-mono text-xs leading-relaxed whitespace-pre-wrap max-h-[380px] overflow-y-auto">
              {generatedPrompt}
            </div>

            {/* Pedagogical Note from Slide 14 */}
            <div className="mt-4 p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-lg text-xs text-emerald-950">
              <span className="font-semibold block mb-0.5">Por que este comando é blindado?</span>
              A blindagem estrutural da Matriz PACIF fecha as brechas estatísticas do modelo de linguagem. Ao preencher os 5 blocos, você reduz o risco de respostas vagas e alucinações a quase zero.
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Pronto para colar em qualquer IA gratuita</span>
            <span className="font-mono tabular-nums">5 de 5 Blocos Ativos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
