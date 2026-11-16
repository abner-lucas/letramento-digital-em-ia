'use client';

import { motion } from 'motion/react';

/**
 * Transição entre páginas: o `template` é remontado a cada navegação e o
 * conteúdo novo aparece num fade curto. Só opacidade, sem `transform`, para
 * não quebrar elementos `position: fixed` (cabeçalho, botões flutuantes).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}
