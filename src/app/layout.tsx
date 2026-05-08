import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  variable: '--font-sans',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Nexus Kids Academy',
    template: '%s | Nexus Kids Academy',
  },
  description:
    'Plataforma educacional gamificada para crianças. Aprendizado BNCC com jogos, trilhas e MENTOR IA pedagógica.',
  applicationName: 'Nexus Kids Academy',
  authors: [{ name: 'Nexus' }],
  keywords: ['educação infantil', 'BNCC', 'jogos educativos', 'aprendizagem adaptativa'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-foreground">{children}</body>
    </html>
  );
}
