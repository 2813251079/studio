import AcousticGuitar from "@/components/acoustic-guitar";
import CircleOfFifths from "@/components/circle-of-fifths";
import PianoKeyboard from "@/components/piano-keyboard";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const t = (key: any) => translations.es[key as any] || key;

export default function MusicProductionPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('music_production.title')}</h1>
        <p className="mt-4 text-foreground/80 text-xl">{t('music_production.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 items-start">
        <Card>
          <CardHeader>
              <CardTitle>{t('music_production.circle_of_fifths.title')}</CardTitle>
              <CardDescription>{t('music_production.circle_of_fifths.description')}</CardDescription>
          </CardHeader>
          <CardContent>
              <CircleOfFifths />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
              <CardTitle>{t('music_production.guitar.title')}</CardTitle>
              <CardDescription>{t('music_production.guitar.description')}</CardDescription>
          </CardHeader>
          <CardContent>
              <AcousticGuitar />
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{t('music_production.piano.title')}</CardTitle>
                <CardDescription>{t('music_production.piano.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <PianoKeyboard />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
