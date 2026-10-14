'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, FileText } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Módulos', href: '/#modulos' },
    { label: 'Metodologia', href: '/#metodologia' },
    { label: 'Apostilas', href: '/#apostilas' },
    { label: 'Perguntas frequentes', href: '/#faq' },
    { label: 'Sobre', href: '/#sobre' },
  ];

  return (
    <>
      {/* Floating Island Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 pointer-events-none">
        <nav
          aria-label="Navegação principal"
          className="mt-6 mx-auto w-max max-w-[calc(100vw-32px)] bg-[#1F1F1F]/90 backdrop-blur-xl border border-[#313131] rounded-full px-4 py-2 flex items-center justify-between gap-4 sm:gap-6 shadow-2xl pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
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

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 hover:text-white ${
                  pathname === link.href ? 'text-emerald-400 font-semibold' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/#apostilas"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-200 bg-[#272727] hover:bg-[#313131] rounded-full border border-[#313131] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Apostilas</span>
            </a>

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
              className="lg:hidden relative w-9 h-9 rounded-full bg-[#272727] border border-[#313131] flex items-center justify-center text-slate-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none cursor-pointer"
            >
              <div className="relative w-4 h-3 flex flex-col justify-between items-center">
                <span
                  className={`block w-4 h-0.5 bg-current rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isOpen ? 'absolute top-1 rotate-45' : ''
                  }`}
                />
                <span
                  className={`block w-4 h-0.5 bg-current rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isOpen ? 'opacity-0 scale-0' : ''
                  }`}
                />
                <span
                  className={`block w-4 h-0.5 bg-current rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isOpen ? 'absolute top-1 -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Screen-Filling Modal Expansion with Heavy Glass Effect */}
      <div
        className={`fixed inset-0 z-30 backdrop-blur-3xl bg-black/80 flex flex-col justify-center items-center p-6 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col items-center gap-6 text-center max-w-sm w-full">
          {navLinks.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${(idx + 1) * 60}ms` }}
              className={`text-2xl font-bold text-white hover:text-emerald-400 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
            >
              {link.label}
            </a>
          ))}

          <div
            style={{ transitionDelay: '420ms' }}
            className={`w-full pt-6 border-t border-[#313131] flex flex-col gap-3 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <Link
              href="/modulo/1"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 px-3 text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-full text-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              Começar o curso agora
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
