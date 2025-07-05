import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { translations } from "@/lib/translations";
import { ArrowRight, BrainCircuit, Waves, Wind, Video, Puzzle, SlidersHorizontal, Star } from "lucide-react";

const t = (key: any) => translations.es[key as any] || key;

export default function Home() {
    const features = [
    {
      href: '/dashboard/frequencies',
      title: t('dashboard.sidebar.frequencies'),
      description: t('frequencies.subtitle'),
      icon: <Waves className="h-8 w-8 text-primary" />,
    },
    {
      href: '/dashboard/audio-enhancer',
      title: t('dashboard.sidebar.workspace_harmonizer'),
      description: t('workspace_harmonizer.subtitle'),
      icon: <Wind className="h-8 w-8 text-accent" />,
    },
    {
      href: '/dashboard/video-harmonizer',
      title: t('dashboard.sidebar.video_harmonizer'),
      description: t('video_harmonizer.subtitle'),
      icon: <Video className="h-8 w-8 text-primary" />,
    },
    {
      href: '/dashboard/inclusive-games',
      title: t('dashboard.sidebar.inclusive_games'),
      description: t('inclusive_games.subtitle'),
      icon: <Puzzle className="h-8 w-8 text-accent" />,
    },
    {
      href: '/dashboard/production',
      title: t('dashboard.sidebar.music_production'),
      description: t('music_production.subtitle'),
      icon: <SlidersHorizontal className="h-8 w-8 text-primary" />,
    },
    {
      href: '/education',
      title: t('landing.info_section.title'),
      description: t('healing_frequencies.subtitle'),
      icon: <BrainCircuit className="h-8 w-8 text-accent" />,
    },
    {
      href: '/pricing',
      title: t('dashboard.sidebar.coming_soon'),
      description: t('coming_soon.description'),
      icon: <Star className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="container flex items-center text-left min-h-[calc(100vh-6rem)] py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('landing.hero.title_new')}
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-muted-foreground">
              {t('landing.hero.subtitle_new')}
            </p>
            <div className="flex justify-start gap-4 pt-6">
              <Button size="lg" asChild>
                <Link href="/auth/register">
                  {t('landing.header.get_started')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="container py-20 md:py-32">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('landing.tools.title')}</h2>
                <p className="mt-4 text-lg text-muted-foreground">{t('landing.tools.subtitle')}</p>
            </div>
             <div className="flex flex-wrap items-center justify-end gap-12">
                {features.filter(f => f.href !== '/pricing').map((feature) => (
                    <Link key={feature.href} href={feature.href} className="group">
                        <div className="flex h-72 w-72 flex-col items-center justify-center rounded-full bg-secondary p-6 text-center transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-card group-hover:shadow-2xl group-hover:shadow-primary/10">
                           <div className="mb-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-background p-4 transition-colors group-hover:bg-secondary">
                             {feature.icon}
                           </div>
                           <h3 className="mb-2 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{feature.title}</h3>
                           <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
        
        <section className="container py-20 md:py-32 text-center">
           <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('pricing.title')}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t('pricing.subtitle')}</p>
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
