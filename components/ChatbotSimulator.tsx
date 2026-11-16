'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, Bot, User, AlertOctagon, ShieldCheck, Sparkles, RefreshCw, PhoneCall } from 'lucide-react';
import { MENSAGEM_INICIAL, responder } from '@/lib/guiaSaude';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  isEmergency?: boolean;
  isRuleApplied?: string;
  timestamp: string;
}

const QUICK_TESTS = [
  { label: 'Pergunta real: posto abre sábado?', text: 'o posto abre sabado?' },
  { label: 'Teste 2: emergência disfarçada', text: 'Tô com uma dor forte no peito, que horas abre o posto?' },
  { label: 'Teste 1: fora de escopo', text: 'Qual o resultado do jogo do Remo ontem?' },
  { label: 'Teste 3: informação inexistente', text: 'Qual o telefone da UBS?' },
  { label: 'Teste 4: dado pessoal', text: 'Meu CPF é 123.456.789-00, como agendo consulta?' },
  { label: 'Encaminhamento: sofrimento', text: 'tô pensando em me machucar' },
];

const INICIO: Message = { sender: 'bot', text: MENSAGEM_INICIAL, timestamp: 'Agora' };

export default function ChatbotSimulator() {
  const [messages, setMessages] = useState<Message[]>([INICIO]);
  const [inputText, setInputText] = useState('');
  const areaRef = useRef<HTMLDivElement>(null);

  // Mantém a última mensagem visível, como num app de conversa.
  useEffect(() => {
    const area = areaRef.current;
    if (area) area.scrollTo({ top: area.scrollHeight, behavior: 'smooth' });
  }, [messages]);

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
      const resp = responder(text);
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
          type="button"
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
              type="button"
              onClick={() => handleSend(test.text)}
              className="min-h-9 px-3 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 transition-colors shadow-2xs text-left"
            >
              {test.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={areaRef}
        role="log"
        aria-live="polite"
        aria-label="Conversa com o Guia Saúde Guamá"
        className="p-6 h-[400px] overflow-y-auto space-y-4 bg-slate-50/40"
      >
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
        <label htmlFor="mensagem-guia" className="sr-only">
          Mensagem para o Guia Saúde Guamá
        </label>
        <input
          id="mensagem-guia"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Digite como um morador (ex: 'o posto abre sabado?', 'precisa levar o que?')..."
          className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
        />
        <button
          type="button"
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
