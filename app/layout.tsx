import type { Metadata } from 'next';
import { Manrope, Geist_Mono } from 'next/font/google';
import { BarraProgresso, ProvedorMovimento, VoltarAoTopo } from '@/components/movimento/Navegacao';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const titulo = 'Letramento digital em inteligência artificial | Amazônia e comunidade';

export const metadata: Metadata = {
  title: { default: titulo, template: '%s | Letramento Digital em IA' },
  description:
    'Formação crítica e prática em inteligência artificial para estudantes e moradores de Belém do Pará. Curso promovido por PRODEPA, iSACI e IFPA, com apoio do Governo do Pará.',
  openGraph: {
    title: titulo,
    description: 'Aprenda a entender, comandar, auditar e construir inteligência artificial com foco comunitário na Amazônia.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: titulo,
    description: 'Curso gratuito de letramento digital em inteligência artificial para a juventude de Belém do Pará.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${geistMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#181818] text-slate-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-300 font-sans [text-wrap:pretty]" suppressHydrationWarning>
        {/* Skip to main content for accessibility */}
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2 focus:bg-emerald-400 focus:text-slate-950 focus:font-semibold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
        >
          Pular para o conteúdo principal
        </a>
        <ProvedorMovimento>
          <BarraProgresso />
          {children}
          <VoltarAoTopo />
        </ProvedorMovimento>
      </body>
    </html>
  );
}
