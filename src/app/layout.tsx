import type {Metadata} from 'next';
import { PT_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { translations } from '@/lib/translations';
import { AuthProvider } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

const t = (key: any) => translations.es[key as any] || key;

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
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
    <html lang="es" className="dark" style={{colorScheme: 'dark'}}>
      <body className={cn("antialiased font-medium font-sans", ptSans.variable)}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
