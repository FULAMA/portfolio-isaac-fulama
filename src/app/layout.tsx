import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Ir. Isaac FULAMA MATONDO — Architecte Logiciel & Ingénieur Informaticien',
  description: "Portfolio professionnel d'Ir. Isaac FULAMA MATONDO, Architecte Logiciel et Ingénieur Informaticien. Spécialiste Clean Architecture & SaaS B2B.",
  keywords: ['Architecture Logicielle', 'Clean Architecture', 'DDD', 'FastAPI', 'Flutter', 'SaaS B2B', 'Kinshasa', 'RDC'],
  authors: [{ name: 'Ir. Isaac FULAMA MATONDO' }],
  openGraph: {
    title: 'Ir. Isaac FULAMA MATONDO | Architecte Logiciel & Full-Stack',
    description: "Je conçois des architectures logiciels robustes et adaptées aux contraintes du terrain.",
    url: 'https://github.com/FULAMA/portfolio-isaac-fulama',
    siteName: 'Portfolio Ir. Isaac FULAMA MATONDO',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07080c] text-[#f3f4f6] font-sans antialiased selection:bg-[#10b981]/30 selection:text-[#ffffff]">
        <Header />
        {children}
      </body>
    </html>
  );
}
