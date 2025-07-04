
import Header from "@/components/header";
import Footer from "@/components/footer";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Combine, Layers, Waves, HeartHandshake, Accessibility, Star, Activity, BarChart, Zap, GitCommitHorizontal } from "lucide-react";

const t = (key: any) => translations.es[key as any] || key;

export default function EducationPage() {
  const concepts = [
    {
      title: t('landing.sound_universe.solfeggio.title'),
      description: t('landing.sound_universe.solfeggio.description'),
      icon: <Waves className="h-10 w-10 text-primary" />
    },
    {
      title: t('landing.sound_universe.binaural.title'),
      description: t('landing.sound_universe.binaural.description'),
      icon: <BrainCircuit className="h-10 w-10 text-primary" />
    },
    {
      title: t('landing.sound_universe.synesthesia.title'),
      description: t('landing.sound_universe.synesthesia.description'),
      icon: <Combine className="h-10 w-10 text-primary" />
    },
    {
      title: t('landing.sound_universe.consciousness.title'),
      description: <div dangerouslySetInnerHTML={{ __html: t('landing.sound_universe.consciousness.description') }} />,
      icon: <Layers className="h-10 w-10 text-primary" />
    }
  ];

  const brainwaves = [
      {
        title: t('education.brainwaves.delta.title'),
        description: t('education.brainwaves.delta.description'),
        icon: <GitCommitHorizontal className="h-10 w-10 text-primary" />
      },
      {
        title: t('education.brainwaves.theta.title'),
        description: t('education.brainwaves.theta.description'),
        icon: <Activity className="h-10 w-10 text-primary" />
      },
      {
        title: t('education.brainwaves.alpha.title'),
        description: t('education.brainwaves.alpha.description'),
        icon: <Waves className="h-10 w-10 text-primary" />
      },
      {
        title: t('education.brainwaves.beta.title'),
        description: t('education.brainwaves.beta.description'),
        icon: <BarChart className="h-10 w-10 text-primary" />
      },
      {
        title: t('education.brainwaves.gamma.title'),
        description: t('education.brainwaves.gamma.description'),
        icon: <Zap className="h-10 w-10 text-primary" />
      },
  ];

  const benefits = [
    {
      title: t('education.benefits.healing.title'),
      description: t('education.benefits.healing.description'),
      icon: <HeartHandshake className="h-10 w-10 text-accent" />
    },
    {
      title: t('education.benefits.regulatory.title'),
      description: t('education.benefits.regulatory.description'),
      icon: <Star className="h-10 w-10 text-accent" />
    },
    {
      title: t('education.benefits.inclusive.title'),
      description: t('education.benefits.inclusive.description'),
      icon: <Accessibility className="h-10 w-10 text-accent" />
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
          <div className="flex flex-wrap justify-center gap-12">
            {concepts.map((concept, index) => (
              <Card key={index} className="flex flex-col items-center justify-center text-center p-8 h-96 w-96 rounded-full bg-secondary shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-card hover:shadow-2xl hover:shadow-primary/10">
                <CardHeader className="p-0 mb-4 items-center">
                  <div className="flex-shrink-0 mb-2">{concept.icon}</div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{concept.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-muted-foreground text-sm">
                  {concept.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="brainwaves" className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('education.brainwaves.title')}</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {brainwaves.map((wave, index) => (
              <Card key={index} className="flex flex-col items-center justify-center text-center p-6 h-80 w-80 rounded-full bg-secondary shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-card hover:shadow-2xl hover:shadow-primary/10">
                <CardHeader className="p-0 mb-4 items-center">
                  <div className="flex-shrink-0 mb-2">{wave.icon}</div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{wave.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-muted-foreground text-sm">
                  {wave.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="benefits">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('education.benefits.title')}</h2>
          <div className="flex flex-wrap justify-center gap-12">
             {benefits.map((benefit, index) => (
              <Card key={index} className="flex flex-col items-center justify-center text-center p-6 h-80 w-80 rounded-full bg-secondary shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-card hover:shadow-2xl hover:shadow-primary/10">
                <CardHeader className="p-0 mb-4 items-center">
                   <div className="flex-shrink-0 mb-2">{benefit.icon}</div>
                   <CardTitle className="text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-muted-foreground text-sm">
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
