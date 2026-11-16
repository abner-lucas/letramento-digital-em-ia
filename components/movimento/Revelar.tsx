'use client';

import { motion, type Variants } from 'motion/react';

/** Mesma curva usada no resto do site (cubic-bezier(0.32, 0.72, 0, 1)). */
export const EASE = [0.32, 0.72, 0, 1] as const;

const variantesItem: Variants = {
  oculto: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visivel: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

type Tag = 'div' | 'section' | 'article' | 'header' | 'li' | 'ul' | 'ol' | 'p';

/** Surge subindo e saindo do desfoque quando entra na tela (uma vez). */
export function Revelar({
  children,
  className,
  id,
  atraso = 0,
  como = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  atraso?: number;
  como?: Tag;
}) {
  const Componente = motion[como];
  return (
    <Componente
      id={id}
      className={className}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: '-60px' }}
      variants={variantesItem}
      transition={{ delay: atraso }}
    >
      {children}
    </Componente>
  );
}

/** Contêiner que revela os filhos (`ItemCascata`) um após o outro. */
export function Cascata({
  children,
  className,
  intervalo = 0.08,
  como = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  intervalo?: number;
  como?: Tag;
}) {
  const Componente = motion[como];
  return (
    <Componente
      className={className}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visivel: { transition: { staggerChildren: intervalo } } }}
    >
      {children}
    </Componente>
  );
}

export function ItemCascata({
  children,
  className,
  como = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  como?: Tag;
}) {
  const Componente = motion[como];
  return (
    <Componente className={className} variants={variantesItem}>
      {children}
    </Componente>
  );
}
