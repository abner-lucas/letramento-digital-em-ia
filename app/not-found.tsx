import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#181818] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#272727] border border-[#313131] text-emerald-400 font-mono text-2xl font-bold">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white font-sans [text-wrap:balance]">
            Página não encontrada
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed [text-wrap:pretty]">
            O conteúdo solicitado não existe ou mudou de endereço. Retorne à página inicial para continuar seu aprendizado em Inteligência Artificial.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            <Home className="w-4 h-4" />
            <span>Página Inicial</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

