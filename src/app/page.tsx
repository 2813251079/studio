import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { translations } from "@/lib/translations";
import { ArrowRight, Waves, Wind, Video } from "lucide-react";

const t = (key: any) => translations.es[key as any] || key;

export default function Home() {
  const features = [
    {
      icon: <Waves className="h-8 w-8 text-primary" />,
      title: t('landing.features.frequency_library.title'),
      description: t('landing.features.frequency_library.description'),
    },
    {
      icon: <Wind className="h-8 w-8 text-primary" />,
      title: t('landing.features.workspace_harmonizer.title'),
      description: t('landing.features.workspace_harmonizer.description'),
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: t('landing.features.video_harmonizer.title'),
      description: t('landing.features.video_harmonizer.description'),
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="container py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('landing.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/auth/register">
                  {t('landing.header.get_started')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="container py-20 md:py-24 bg-secondary dark:bg-black rounded-t-3xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('landing.features.title')}</h2>
            <p className="mt-4 text-muted-foreground">{t('landing.features.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background/50 dark:bg-background/80 border-0 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="pt-2">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="container py-20 md:py-24 text-center">
           <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">{t('pricing.title')}</h2>
              <p className="mt-4 text-muted-foreground">{t('pricing.subtitle')}</p>
              <Button size="lg" variant="outline" className="mt-8" asChild>
                  <Link href="/pricing">Ver Planes de Precios</Link>
              </Button>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
