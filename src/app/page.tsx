import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { translations } from "@/lib/translations";
import { ArrowRight, Waves, Wind, Video, Music4, BrainCircuit, Combine } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const t = (key: any) => translations.es[key as any] || key;

export default function Home() {
  const features = [
    {
      icon: <Waves className="h-12 w-12 text-white" />,
      title: t('landing.features.frequency_library.title'),
      description: t('landing.features.frequency_library.description'),
      href: "/dashboard/frequencies"
    },
    {
      icon: <Wind className="h-12 w-12 text-white" />,
      title: t('landing.features.workspace_harmonizer.title'),
      description: t('landing.features.workspace_harmonizer.description'),
      href: "/dashboard/audio-enhancer"
    },
    {
      icon: <Video className="h-12 w-12 text-white" />,
      title: t('landing.features.video_harmonizer.title'),
      description: t('landing.features.video_harmonizer.description'),
      href: "/dashboard/video-harmonizer"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="container py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent">
              {t('landing.hero.title_new')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {t('landing.hero.subtitle_new')}
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

        <section id="what-is" className="container py-20 md:py-24 bg-secondary dark:bg-black rounded-t-3xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent">{t('landing.what_is.title')}</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>{t('landing.what_is.p1')}</p>
              <p>{t('landing.what_is.p2')}</p>
            </div>
          </div>
        </section>

        <section id="sound-universe" className="container py-20 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent">{t('landing.sound_universe.title')}</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl hover:no-underline">
                  <div className="flex items-center gap-4">
                    <Music4 className="h-6 w-6 text-primary" />
                    <span>{t('landing.sound_universe.solfeggio.title')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {t('landing.sound_universe.solfeggio.description')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl hover:no-underline">
                  <div className="flex items-center gap-4">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                    <span>{t('landing.sound_universe.binaural.title')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {t('landing.sound_universe.binaural.description')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl hover:no-underline">
                  <div className="flex items-center gap-4">
                    <Combine className="h-6 w-6 text-primary" />
                    <span>{t('landing.sound_universe.synesthesia.title')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {t('landing.sound_universe.synesthesia.description')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="features" className="container py-20 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent">{t('landing.tools.title')}</h2>
            <p className="mt-4 text-muted-foreground">{t('landing.tools.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <Link href="/auth/register">
                  <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/20 cursor-pointer overflow-hidden">
                    {/* Vinyl record-like grooves */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="80" cy="80" r="78" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="74" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="66" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="62" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="58" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="54" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="50" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="46" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="42" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="38" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="80" cy="80" r="34" stroke="white" strokeWidth="0.5" fill="none" />
                    </svg>
                    {/* Center label */}
                    <div className="absolute w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm"></div>
                    {/* Icon */}
                    <div className="relative z-10">
                        {feature.icon}
                    </div>
                  </div>
                </Link>
                <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="container py-20 md:py-24 text-center bg-secondary dark:bg-black rounded-3xl">
           <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent">{t('pricing.title')}</h2>
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
