import CircleOfFifths from "@/components/circle-of-fifths";
import PianoKeyboard from "@/components/piano-keyboard";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function MusicProductionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('music_production.title')}</h1>
        <p className="text-muted-foreground">{t('music_production.subtitle')}</p>
      </div>
      <PianoKeyboard />
      <CircleOfFifths />
    </div>
  );
}
