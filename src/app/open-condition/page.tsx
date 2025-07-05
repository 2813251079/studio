
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Film, ShieldCheck, TrendingUp, Layers, BrainCircuit, Settings } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { translations } from '@/lib/translations';

const t = (key: any) => translations.es[key as any] || key;

export default function OpenConditionPage() {

    const openConditionFeatures = [
        { icon: <Film className="h-6 w-6 text-primary" />, text: t('open_condition.main.feature1') },
        { icon: <ShieldCheck className="h-6 w-6 text-primary" />, text: t('open_condition.main.feature2') },
        { icon: <TrendingUp className="h-6 w-6 text-primary" />, text: t('open_condition.main.feature3') },
    ];
    
    const kidsFeatures = [
        { icon: <Layers className="h-6 w-6 text-accent" />, text: t('open_condition.kids.feature1') },
        { icon: <BrainCircuit className="h-6 w-6 text-accent" />, text: t('open_condition.kids.feature2') },
        { icon: <Settings className="h-6 w-6 text-accent" />, text: t('open_condition.kids.feature3') },
    ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="container py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('open_condition.title')}</h1>
            <p className="mt-4 text-xl text-muted-foreground">{t('open_condition.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="flex flex-col overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                <CardHeader className="p-0">
                    <div className="relative w-full aspect-[3/2]">
                        <Image src="https://placehold.co/600x400.png" alt={t('open_condition.main.image_alt')} fill className="object-cover rounded-t-lg" data-ai-hint="person job interview" />
                    </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                    <h2 className="text-3xl font-bold mb-4">{t('open_condition.main.title')}</h2>
                    <p className="text-muted-foreground mb-6 flex-grow">{t('open_condition.main.description')}</p>
                    <ul className="space-y-4 mb-8">
                       {openConditionFeatures.map((feature, index) => (
                         <li key={index} className="flex items-start gap-4">
                           {feature.icon}
                           <span>{feature.text}</span>
                         </li>
                       ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="flex flex-col overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                <CardHeader className="p-0">
                     <div className="relative w-full aspect-[3/2]">
                        <Image src="https://placehold.co/600x400.png" alt={t('open_condition.kids.image_alt')} fill className="object-cover rounded-t-lg" data-ai-hint="child playing tablet" />
                    </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                    <h2 className="text-3xl font-bold mb-4">{t('open_condition.kids.title')}</h2>
                    <p className="text-muted-foreground mb-6 flex-grow">{t('open_condition.kids.description')}</p>
                    <ul className="space-y-4 mb-8">
                        {kidsFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start gap-4">
                                {feature.icon}
                                <span>{feature.text}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>

          <div className="text-center mt-20">
              <h3 className="text-2xl font-bold">{t('open_condition.download.title')}</h3>
              <p className="text-muted-foreground mt-2 mb-6">{t('open_condition.download.description')}</p>
              <Button size="lg" asChild>
                <Link href="/pricing">
                    <Download className="mr-2 h-5 w-5"/>
                    {t('open_condition.download.cta')}
                </Link>
              </Button>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
