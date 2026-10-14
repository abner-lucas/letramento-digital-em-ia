'use client';

import { useState } from 'react';
import { Send, Bot, User, AlertOctagon, ShieldCheck, Sparkles, RefreshCw, PhoneCall } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  isEmergency?: boolean;
  isRuleApplied?: string;
  timestamp: string;
}

const QUICK_TESTS = [
  { label: 'Pergunta Real: Posto abre sábado?', text: 'o posto abre sabado?' },
  { label: 'Teste de Emergência: Dor no peito', text: 'tô sentindo uma dor muito forte no peito e falta de ar, que horas o posto abre?' },
  { label: 'Teste Fora de Escopo: Jogo do Remo', text: 'qual foi o resultado do jogo do remo ontem à noite?' },
  { label: 'Teste Dado Pessoal: Enviar CPF', text: 'meu CPF é 123.456.789-00, como agendo consulta?' },
  { label: 'Teste Dado Inexistente: Celular do médico', text: 'qual é o número de celular pessoal do doutor da UBS?' }
];

export default function ChatbotSimulator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Oi! Sou o "Guia Saúde Guamá", assistente comunitário feito por estudantes. Posso te ajudar com: (1) horários das UBS do Guamá e Terra Firme, (2) documentos para levar na consulta e (3) vacinação.\n\nComo posso ajudar você hoje?',
      timestamp: 'Agora'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const simulateResponse = (userMsg: string) => {
    const lower = userMsg.toLowerCase();

    // 1. EMERGENCY CHECK - PRIORITY 1 (Slide 10 & 11)
    if (
      lower.includes('dor no peito') ||
      lower.includes('falta de ar') ||
      lower.includes('sangramento') ||
      lower.includes('desmaio') ||
      lower.includes('infarto') ||
      lower.includes('se machucar') ||
      lower.includes('convuls')
    ) {
      return {
        text: '⚠️ ATENÇÃO: Isso pode ser uma emergência médica. Ligue para o SAMU 192 imediatamente ou dirija-se à UPA mais próxima. Não espere resposta por aqui!',
        isEmergency: true,
        isRuleApplied: 'Regra de Emergência Médica (Prioridade Máxima — Ramo 4)'
      };
    }

    // 2. PERSONAL DATA CHECK (Slide 14)
    if (lower.includes('cpf') || lower.includes('rg') || lower.includes('senha') || /\d{3}\.\d{3}\.\d{3}/.test(lower)) {
      return {
        text: 'Por segurança e privacidade, por favor NÃO envie seu CPF, número de documentos ou senhas aqui. Eu não guardo nem peço dados pessoais. Posso te dizer quais documentos você deve levar fisicamente na UBS.',
        isEmergency: false,
        isRuleApplied: 'Regra de Proteção de Dados (Regra de Ouro nº 3)'
      };
    }

    // 3. OUT OF SCOPE CHECK (Slide 14)
    if (lower.includes('remo') || lower.includes('paysandu') || lower.includes('futebol') || lower.includes('previsão do tempo') || lower.includes('receita de bolo')) {
      return {
        text: 'Sou um assistente focado exclusivamente nas UBS do bairro do Guamá. Não tenho informações sobre esse assunto. Para dúvidas gerais de saúde pública, ligue gratuitamente no Disque Saúde 136.',
        isEmergency: false,
        isRuleApplied: 'Filtro de Escopo Restrito (Slide 13)'
      };
    }

    // 4. MISSING FACTUAL DATA CHECK / RECOIL PHRASE (Slide 13 & 14)
    if (lower.includes('celular') || lower.includes('telefone pessoal') || lower.includes('zap do médico') || lower.includes('salário')) {
      return {
        text: 'Não tenho essa informação confirmada na base oficial da prefeitura. Para confirmar telefones de contato interno, ligue no Disque Saúde 136.',
        isEmergency: false,
        isRuleApplied: 'Frase de Recuo Anti-Alucinação (Slide 14)'
      };
    }

    // 5. HOURS / SATURDAY / OPENING (Slide 10 & 13)
    if (lower.includes('horario') || lower.includes('horário') || lower.includes('abre') || lower.includes('funciona') || lower.includes('sabado') || lower.includes('sábado')) {
      return {
        text: 'Horários conferidos em 03/2026:\n• UBS Guamá (Rua Barão de Igarapé-Miri): Seg a Sex, das 7h às 17h. Sábado: FECHADO.\n• UBS Terra Firme (Passagem São Silvestre): Seg a Sex, 7h às 17h. Sábado: Aberto das 8h às 12h.\n\nQuer saber quais documentos levar? (Digite "documentos")',
        isEmergency: false,
        isRuleApplied: 'Base de Conhecimento Factual Conferida'
      };
    }

    // 6. DOCUMENTS REQUIRED (Slide 10)
    if (lower.includes('documento') || lower.includes('levar') || lower.includes('precisa') || lower.includes('docto')) {
      return {
        text: 'Para ser atendido na UBS, leve:\n1. Cartão Nacional do SUS\n2. Documento oficial com foto (RG ou CNH)\n3. Comprovante de residência no bairro\n* Se tiver receita antiga de remédio contínuo, leve junto.',
        isEmergency: false,
        isRuleApplied: 'Ramo 2: Documentos Oficiais'
      };
    }

    // 7. VACCINATION (Slide 10)
    if (lower.includes('vacina') || lower.includes('vacinação') || lower.includes('gripe')) {
      return {
        text: 'As salas de vacinação funcionam de segunda a sexta, das 8h às 16h30, em ambas as UBS. Leve a carteira de vacinação da criança ou do adulto e documento com foto.',
        isEmergency: false,
        isRuleApplied: 'Ramo 3: Vacinação e Campanhas'
      };
    }

    // 8. FALLBACK / NOT UNDERSTOOD (RAMO 5)
    return {
      text: 'Não consegui entender com certeza. Posso te ajudar com: (1) horários das UBS, (2) documentos necessários ou (3) vacinação. Se preferir, ligue no 136 (Disque Saúde).',
      isEmergency: false,
      isRuleApplied: 'Ramo de Erro com Saída Segura (Ramo 5)'
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      text: text,
      timestamp: 'Agora'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate instant bot thinking
    setTimeout(() => {
      const resp = simulateResponse(text);
      const botMessage: Message = {
        sender: 'bot',
        text: resp.text,
        isEmergency: resp.isEmergency,
        isRuleApplied: resp.isRuleApplied,
        timestamp: 'Agora'
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 300);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: 'bot',
        text: 'Oi! Sou o "Guia Saúde Guamá", assistente comunitário feito por estudantes. Posso te ajudar com: (1) horários das UBS do Guamá e Terra Firme, (2) documentos para levar na consulta e (3) vacinação.\n\nComo posso ajudar você hoje?',
        timestamp: 'Agora'
      }
    ]);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>Simulador Interativo do Módulo 4</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Protótipo ao Vivo: &ldquo;Guia Saúde Guamá&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Teste na prática o bot projetado com a Matriz PACIF, árvore com prioridade de emergência e base conferida.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reiniciar Conversa</span>
        </button>
      </div>

      {/* Quick Test Scenarios Bar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <span className="text-xs font-semibold text-slate-700 block mb-2">
          Testes Obrigatórios de Estresse (Clique para simular):
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_TESTS.map((test, i) => (
            <button
              key={i}
              onClick={() => handleSend(test.text)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 transition-colors shadow-2xs text-left"
            >
              {test.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-6 h-[400px] overflow-y-auto space-y-4 bg-slate-50/40">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%]">
              {m.sender === 'bot' && (
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                    m.isEmergency ? 'bg-red-600' : 'bg-emerald-700'
                  }`}
                >
                  {m.isEmergency ? <AlertOctagon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
              )}

              <div
                className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-xs'
                    : m.isEmergency
                    ? 'bg-red-50 text-red-950 border border-red-200 rounded-tl-xs font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-xs'
                }`}
              >
                {m.text}

                {/* Pedagogical Rule Badge if applicable */}
                {m.isRuleApplied && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Engenharia do Bot: {m.isRuleApplied}</span>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 text-slate-700 text-xs font-semibold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Digite como um morador (ex: 'o posto abre sabado?', 'precisa levar o que?')..."
          className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
        />
        <button
          onClick={() => handleSend()}
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
        >
          <span>Enviar</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
