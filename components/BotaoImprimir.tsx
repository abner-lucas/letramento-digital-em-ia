'use client';

import { Printer } from 'lucide-react';

/**
 * Abre a janela de impressão do navegador (também salva como PDF).
 * Componente cliente: funciona tanto no primeiro acesso quanto depois de
 * navegar a partir de outra página, ao contrário de um script inline.
 */
export default function BotaoImprimir() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="min-h-10 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <Printer className="w-3.5 h-3.5" />
      <span>Imprimir ou salvar PDF</span>
    </button>
  );
}
