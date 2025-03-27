import './globals.css';
import type { Metadata } from 'next'; 
import { Geist, Geist_Mono } from 'next/font/google';
import Navigation from '../components/Navigation';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'Recommandateur de Collections de Mode',
  description: 'Un système de recommandation de tenues de mode en temps réel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}