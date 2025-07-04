
import Header from "@/components/header";
import Footer from "@/components/footer";
import { translations } from "@/lib/translations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HeartHandshake, 
  Guitar,
  Mic,
  Speaker,
  Radio,
  Drumstick,
  Zap,
  Music,
  Headphones,
  AudioWaveform,
  VolumeX,
  KeyboardMusic
} from "lucide-react";
import { Card } from "@/components/ui/card";

const t = (key: any) => translations.es[key as any] || key;

export default function EducationPage() {
  const concepts = [
    {
      title: t('landing.sound_universe.solfeggio.title'),
      description: t('landing.sound_universe.solfeggio.description'),
      icon: <Music className="h-8 w-8 text-primary" />
    },
    {
      title: t('landing.sound_universe.binaural.title'),
      description: t('landing.sound_universe.binaural.description'),
      icon: <Headphones className="h-8 w-8 text-primary" />
    },
    {
      title: t('landing.sound_universe.synesthesia.title'),
      description: t('landing.sound_universe.synesthesia.description'),
      icon: <AudioWaveform className="h-8 w-8 text-primary" />
    },
    {
      title: t('landing.sound_universe.consciousness.title'),
      description: <div dangerouslySetInnerHTML={{ __html: t('landing.sound_universe.consciousness.description') }} />,
      icon: <Speaker className="h-8 w-8 text-primary" />
    }
  ];

  const brainwaves = [
      {
        title: t('education.brainwaves.delta.title'),
        description: t('education.brainwaves.delta.description'),
        icon: <VolumeX className="h-8 w-8 text-primary" />
      },
      {
        title: t('education.brainwaves.theta.title'),
        description: t('education.brainwaves.theta.description'),
        icon: <KeyboardMusic className="h-8 w-8 text-primary" />
      },
      {
        title: t('education.brainwaves.alpha.title'),
        description: t('education.brainwaves.alpha.description'),
        icon: <Guitar className="h-8 w-8 text-primary" />
      },
      {
        title: t('education.brainwaves.beta.title'),
        description: t('education.brainwaves.beta.description'),
        icon: <Radio className="h-8 w-8 text-primary" />
      },
      {
        title: t('education.brainwaves.gamma.title'),
        description: t('education.brainwaves.gamma.description'),
        icon: <Zap className="h-8 w-8 text-primary" />
      },
  ];

  const benefits = [
    {
      title: t('education.benefits.healing.title'),
      description: t('education.benefits.healing.description'),
      icon: <HeartHandshake className="h-8 w-8 text-accent" />
    },
    {
      title: t('education.benefits.regulatory.title'),
      description: t('education.benefits.regulatory.description'),
      icon: <Drumstick className="h-8 w-8 text-accent" />
    },
    {
      title: t('education.benefits.inclusive.title'),
      description: t('education.benefits.inclusive.description'),
      icon: <Mic className="h-8 w-8 text-accent" />
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
        
        <Card className="p-4 md:p-8">
            <Accordion type="multiple" className="w-full" defaultValue={['concepts']}>
                <AccordionItem value="concepts">
                    <AccordionTrigger className="text-2xl md:text-3xl font-bold hover:no-underline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-left">
                        {t('education.concepts.title')}
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="space-y-8 pt-6">
                            {concepts.map((item, index) => (
                                <li key={index} className="flex gap-x-6 items-start">
                                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-xl text-foreground mb-1">{item.title}</h3>
                                        <div className="text-muted-foreground prose prose-invert max-w-none text-left">{item.description}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="brainwaves">
                    <AccordionTrigger className="text-2xl md:text-3xl font-bold hover:no-underline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-left">
                        {t('education.brainwaves.title')}
                    </AccordionTrigger>
                    <AccordionContent>
                         <ul className="space-y-8 pt-6">
                            {brainwaves.map((item, index) => (
                                <li key={index} className="flex gap-x-6 items-start">
                                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-xl text-foreground mb-1">{item.title}</h3>
                                        <p className="text-muted-foreground text-left">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="benefits">
                    <AccordionTrigger className="text-2xl md:text-3xl font-bold hover:no-underline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-left">
                        {t('education.benefits.title')}
                    </AccordionTrigger>
                    <AccordionContent>
                         <ul className="space-y-8 pt-6">
                            {benefits.map((item, index) => (
                                <li key={index} className="flex gap-x-6 items-start">
                                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-xl text-foreground mb-1">{item.title}</h3>
                                        <p className="text-muted-foreground text-left">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>

      </main>
      <Footer />
    </div>
  );
}
