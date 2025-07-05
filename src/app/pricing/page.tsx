import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { translations } from '@/lib/translations';

const t = (key: any) => translations.es[key as any] || key;

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="container py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('downloads.title')}</h1>
            <p className="mt-4 text-xl text-muted-foreground">{t('downloads.subtitle')}</p>
          </div>
          
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <div className="grid md:grid-cols-2 md:items-center">
                <div className="p-8 md:p-12 text-center md:text-left order-2 md:order-1">
                    <h2 className="text-3xl font-bold mb-4">{t('downloads.get_app.title')}</h2>
                    <p className="text-muted-foreground mb-8">{t('downloads.get_app.description')}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Button size="lg" asChild className="w-full sm:w-auto">
                            <Link href="#">
                                <Download />
                                {t('downloads.cta_ios')}
                            </Link>
                        </Button>
                        <Button size="lg" asChild className="w-full sm:w-auto">
                            <Link href="#">
                                <Download />
                                {t('downloads.cta_android')}
                            </Link>
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-8">{t('downloads.free_with_in_app')}</p>
                </div>
                <div className="relative h-64 w-full order-1 md:order-2 md:h-auto md:aspect-square">
                    <Image src="https://placehold.co/600x600.png" alt="App en una tableta" fill className="object-cover" data-ai-hint="tablet app" />
                </div>
            </div>
          </Card>

        </section>
      </main>
      <Footer />
    </div>
  );
}
