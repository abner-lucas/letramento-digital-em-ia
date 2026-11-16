'use client';

import { motion } from 'motion/react';
import { useSecaoAtiva } from '@/components/movimento/Navegacao';

/**
 * Sumário da aula que acompanha a leitura: o tópico na tela fica destacado,
 * com um marcador que desliza entre os itens, e a barra mostra o avanço.
 */
export default function SumarioModulo({ secoes }: { secoes: { id: string; title: string }[] }) {
  const ativa = useSecaoAtiva(secoes.map((s) => s.id));
  const indice = Math.max(0, secoes.findIndex((s) => s.id === ativa));
  const progresso = ativa ? ((indice + 1) / secoes.length) * 100 : 0;

  return (
    <nav aria-label="Tópicos desta aula" className="space-y-3">
      <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden>
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          animate={{ width: `${progresso}%` }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>
      <ol className="space-y-1">
        {secoes.map((s) => {
          const atual = s.id === ativa;
          return (
            <li key={s.id} className="relative">
              {atual && (
                <motion.span
                  layoutId="sumario-ativo"
                  className="absolute inset-0 rounded-md bg-emerald-50 border-l-2 border-emerald-600"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                />
              )}
              <a
                href={`#${s.id}`}
                aria-current={atual ? 'location' : undefined}
                className={`relative block min-h-9 text-xs p-2 rounded-md transition-colors leading-snug ${
                  atual ? 'text-emerald-800 font-semibold' : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                {s.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
