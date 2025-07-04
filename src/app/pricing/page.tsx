import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { translations } from '@/lib/translations';

const t = (key: any) => translations.es[key as any] || key;

export default function PricingPage() {
  const freePlanFeatures = [
    t('pricing.free.feature1'),
    t('pricing.free.feature2'),
  ];
  const proPlanFeatures = [
    t('pricing.pro.feature1'),
    t('pricing.pro.feature2'),
    t('pricing.pro.feature3'),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="container py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('pricing.title')}</h1>
            <p className="mt-4 text-xl text-muted-foreground">{t('pricing.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <Card className="flex flex-col shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">{t('pricing.free.title')}</CardTitle>
                <CardDescription className="text-base">{t('pricing.free.description')}</CardDescription>
                <div className="text-5xl font-bold pt-4">{t('pricing.free.price')}</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4 text-lg">
                  {freePlanFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-6 w-6 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" asChild>
                    <Link href="/auth/register">{t('pricing.free.cta')}</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col shadow-lg shadow-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl">{t('pricing.pro.title')}</CardTitle>
                <CardDescription className="text-base">{t('pricing.pro.description')}</CardDescription>
                <div className="text-5xl font-bold pt-4">{t('pricing.pro.price')}</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4 text-lg">
                  {proPlanFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-6 w-6 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" asChild>
                    <Link href="/auth/register">{t('pricing.pro.cta')}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
