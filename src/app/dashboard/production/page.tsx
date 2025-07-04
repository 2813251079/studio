import CircleOfFifths from "@/components/circle-of-fifths";
import PianoKeyboard from "@/components/piano-keyboard";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function MusicProductionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('music_production.title')}</h1>
        <p className="mt-4 text-foreground/80 text-lg">{t('music_production.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <PianoKeyboard />
        </div>
        <div className="space-y-8">
          <CircleOfFifths />
        </div>
      </div>
    </div>
  );
}
