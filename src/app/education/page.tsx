import Header from "@/components/header";
import Footer from "@/components/footer";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Combine, Layers, Waves, HeartHand, Accessibility, Star } from "lucide-react";

const t = (key: any) => translations.es[key as any] || key;

export default function EducationPage() {
  const concepts = [
    {
      title: t('landing.sound_universe.solfeggio.title'),
      description: t('landing.sound_universe.solfeggio.description'),
      icon: <Waves className="h-8 w-8 text-primary" />
    },
    {
      title: t('landing.sound_universe.binaural.title'),
      description: t('landing.sound_universe.binaural.description'),
      icon: <BrainCircuit className="h-8 w-8 text-primary" />
    },
    {
      title: t('landing.sound_universe.synesthesia.title'),
      description: t('landing.sound_universe.synesthesia.description'),
      icon: <Combine className="h-8 w-8 text-primary" />
    },
    {
      title: t('landing.sound_universe.consciousness.title'),
      description: <div dangerouslySetInnerHTML={{ __html: t('landing.sound_universe.consciousness.description') }} />,
      icon: <Layers className="h-8 w-8 text-primary" />
    }
  ];

  const benefits = [
    {
      title: t('education.benefits.healing.title'),
      description: t('education.benefits.healing.description'),
      icon: <HeartHand className="h-8 w-8 text-accent" />
    },
    {
      title: t('education.benefits.regulatory.title'),
      description: t('education.benefits.regulatory.description'),
      icon: <Star className="h-8 w-8 text-accent" />
    },
    {
      title: t('education.benefits.inclusive.title'),
      description: t('education.benefits.inclusive.description'),
      icon: <Accessibility className="h-8 w-8 text-accent" />
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {t('education.title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-16">
            {t('education.subtitle')}
          </p>
        </div>

        <section id="concepts" className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('education.concepts.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {concepts.map((concept, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="flex-shrink-0">{concept.icon}</div>
                  <CardTitle>{concept.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 text-muted-foreground text-lg">
                  {concept.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="benefits">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('education.benefits.title')}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
             {benefits.map((benefit, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                   <div className="flex-shrink-0">{benefit.icon}</div>
                   <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 text-muted-foreground text-lg">
                  {benefit.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
