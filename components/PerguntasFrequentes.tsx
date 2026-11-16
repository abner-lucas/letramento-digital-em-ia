'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HelpCircle, Plus } from 'lucide-react';
import { Cascata, EASE, ItemCascata } from '@/components/movimento/Revelar';

export interface Pergunta {
  q: string;
  a: string;
}

/** Perguntas em sanfona: uma aberta por vez, altura animada, "+" que gira para "×". */
export default function PerguntasFrequentes({ itens }: { itens: Pergunta[] }) {
  const [aberta, setAberta] = useState<number | null>(0);
  const base = useId();

  return (
    <Cascata className="space-y-4" intervalo={0.06}>
      {itens.map((faq, idx) => {
        const ativa = aberta === idx;
        const idBotao = `${base}-p${idx}`;
        const idPainel = `${base}-r${idx}`;
        return (
          <ItemCascata
            key={faq.q}
            className={`bg-[#1F1F1F] border rounded-2xl transition-colors duration-300 ${ativa ? 'border-emerald-500/30' : 'border-[#313131] hover:border-slate-600'}`}
          >
            <h3>
              <button
                id={idBotao}
                type="button"
                aria-expanded={ativa}
                aria-controls={idPainel}
                onClick={() => setAberta(ativa ? null : idx)}
                className="w-full p-6 text-left text-base font-bold text-white flex items-start gap-2 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span className="flex-1">{faq.q}</span>
                <Plus
                  aria-hidden
                  className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${ativa ? 'rotate-45 text-emerald-400' : ''}`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {ativa && (
                <motion.div
                  id={idPainel}
                  role="region"
                  aria-labelledby={idBotao}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-slate-300 leading-relaxed px-6 pb-6 pl-12 [text-wrap:pretty]">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </ItemCascata>
        );
      })}
    </Cascata>
  );
}
