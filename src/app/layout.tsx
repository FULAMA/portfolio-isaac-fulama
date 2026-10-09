import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Ir. Isaac FULAMA MATONDO | Architecte Logiciel & Ingénieur Informaticien',
  description: "Portfolio de référence de Ir. Isaac FULAMA MATONDO, Architecte Logiciel et Ingénieur Informaticien. Spécialiste Clean Architecture & SaaS B2B.",
  keywords: ['Architecture Logicielle', 'Clean Architecture', 'DDD', 'FastAPI', 'Flutter', 'SaaS B2B', 'Kinshasa', 'RDC'],
  authors: [{ name: 'Ir. Isaac FULAMA MATONDO' }],
  openGraph: {
    title: 'Ir. Isaac FULAMA MATONDO | Architecte Logiciel & Full-Stack',
    description: "Je conçois des architectures logiciels robustes et adaptées aux contraintes du terrain.",
    url: 'https://isaacfulama.dev',
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0b0c10] text-[#f4f1ea] antialiased selection:bg-[#c5a059]/30 selection:text-[#ffffff]">
        <Header />
        {children}
      </body>
    </html>
  );
}
