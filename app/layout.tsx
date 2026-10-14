import type { Metadata } from 'next';
import { Manrope, Geist_Mono } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Letramento digital em inteligência artificial | Amazônia e comunidade',
  description: 'Formação crítica e prática em inteligência artificial para estudantes e moradores de Belém do Pará. Parceria PRODEPA, iSACI, IFPA e UFPA.',
  openGraph: {
    title: 'Letramento digital em inteligência artificial | Amazônia e comunidade',
    description: 'Aprenda a entender, comandar, auditar e construir inteligência artificial com foco comunitário na Amazônia.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Letramento digital em inteligência artificial | Amazônia e comunidade',
    description: 'Curso completo gratuito em inteligência artificial para a juventude de Belém do Pará.',
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-400 focus:text-slate-950 focus:font-semibold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
        >
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
