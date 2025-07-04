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
        <section className="container py-20 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t('pricing.title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{t('pricing.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>{t('pricing.free.title')}</CardTitle>
                <CardDescription>{t('pricing.free.description')}</CardDescription>
                <div className="text-4xl font-bold pt-4">{t('pricing.free.price')}</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {freePlanFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                    <Link href="/auth/register">{t('pricing.free.cta')}</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col border-primary shadow-lg shadow-primary/20">
              <CardHeader>
                <CardTitle>{t('pricing.pro.title')}</CardTitle>
                <CardDescription>{t('pricing.pro.description')}</CardDescription>
                <div className="text-4xl font-bold pt-4">{t('pricing.pro.price')}</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {proPlanFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
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
