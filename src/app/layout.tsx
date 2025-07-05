import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { translations } from '@/lib/translations';
import { AuthProvider } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

const t = (key: any) => translations.es[key as any] || key;

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
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
