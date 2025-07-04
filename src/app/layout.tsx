import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { translations } from '@/lib/translations';
import BackgroundAudio from '@/components/background-audio';

const t = (key: any) => translations.es[key as any] || key;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: t('app.title'),
  description: t('app.description'),
  authors: [{ name: 'Elo Diaz Allende' }],
  creator: 'Elo Diaz Allende',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} dark`} style={{colorScheme: 'dark'}}>
      <body className="font-body antialiased font-medium">
        <BackgroundAudio />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
