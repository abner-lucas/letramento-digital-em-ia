'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { BookOpen, FileText } from 'lucide-react';
import { useSecaoAtiva } from '@/components/movimento/Navegacao';

const EASE = [0.32, 0.72, 0, 1] as const;

const navLinks = [
  { label: 'Início', href: '/', id: 'inicio' },
  { label: 'Módulos', href: '/#modulos', id: 'modulos' },
  { label: 'Metodologia', href: '/#metodologia', id: 'metodologia' },
  { label: 'Apostilas', href: '/#apostilas', id: 'apostilas' },
  { label: 'Perguntas frequentes', href: '/#faq', id: 'faq' },
  { label: 'Sobre', href: '/#sobre', id: 'sobre' },
];

export default function Navbar() {
  const pathname = usePathname();
  const naInicial = pathname === '/';
  const [isOpen, setIsOpen] = useState(false);
  const [oculto, setOculto] = useState(false);
  const ativa = useSecaoAtiva(naInicial ? navLinks.map((l) => l.id) : []);
  const { scrollY } = useScroll();

  // Some ao descer a página e volta ao subir: mais espaço para ler.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setOculto(y > anterior && y > 480 && !isOpen);
  });

  // Menu aberto: trava a rolagem e fecha com Esc.
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [isOpen]);

  // Fora da página inicial o item "Módulos" representa a página atual.
  const estaAtivo = (id: string) => (naInicial ? ativa === id || (id === 'inicio' && !ativa) : id === 'modulos' && pathname.startsWith('/modulo'));

  return (
    <>
      {/* Floating Island Navbar */}
      <motion.header
        animate={{ y: oculto ? '-140%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-40 px-4 pointer-events-none print:hidden"
      >
        <nav
          aria-label="Navegação principal"
          className="mt-6 mx-auto w-max max-w-[calc(100vw-32px)] bg-[#1F1F1F]/90 backdrop-blur-xl border border-[#313131] rounded-full px-4 py-2 flex items-center justify-between gap-4 sm:gap-6 shadow-2xl pointer-events-auto"
        >
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-sm hover:text-emerald-400 transition-colors duration-300"
          >
            <span className="w-7 h-7 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold text-xs">
              IA
            </span>
            <span className="hidden sm:inline whitespace-nowrap">Letramento Digital</span>
          </Link>

          {/* Desktop Links: a pílula desliza até a seção que está na tela */}
          <ul className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const atual = estaAtivo(link.id);
              return (
                <li key={link.href} className="relative">
                  {atual && (
                    <motion.span
                      layoutId="nav-ativa"
                      className="absolute inset-0 rounded-full bg-[#272727] border border-[#313131]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Link
                    href={link.href}
                    aria-current={atual ? (naInicial ? 'true' : 'page') : undefined}
                    className={`relative block whitespace-nowrap px-3 py-1.5 rounded-full transition-colors duration-200 hover:text-white ${
                      atual ? 'text-emerald-400 font-semibold' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action CTAs & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/#apostilas"
              className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-200 bg-[#272727] hover:bg-[#313131] rounded-full border border-[#313131] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Apostilas</span>
            </Link>

            <Link
              href="/modulo/1"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Começar</span>
            </Link>

            {/* Hamburger Button with Morphing Animation */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isOpen}
              aria-controls="menu-movel"
              className="lg:hidden relative w-10 h-10 rounded-full bg-[#272727] border border-[#313131] flex items-center justify-center text-slate-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none cursor-pointer"
            >
              <div className="relative w-4 h-3 flex flex-col justify-between items-center">
                <span className={`block w-4 h-0.5 bg-current rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'absolute top-1 rotate-45' : ''}`} />
                <span className={`block w-4 h-0.5 bg-current rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`block w-4 h-0.5 bg-current rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'absolute top-1 -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menu do celular: só existe no DOM quando aberto (nada focável escondido) */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="menu-movel"
            aria-label="Menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-30 backdrop-blur-3xl bg-black/85 flex flex-col justify-center items-center p-6 lg:hidden"
          >
            <ul className="flex flex-col items-center gap-6 text-center max-w-sm w-full">
              {navLinks.map((link, idx) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + idx * 0.06, duration: 0.6, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={estaAtivo(link.id) ? 'true' : undefined}
                    className={`text-2xl font-bold transition-colors hover:text-emerald-400 ${estaAtivo(link.id) ? 'text-emerald-400' : 'text-white'}`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                className="w-full pt-6 border-t border-[#313131]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              >
                <Link
                  href="/modulo/1"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 px-3 text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-full text-center transition-all duration-300"
                >
                  Começar o curso agora
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
