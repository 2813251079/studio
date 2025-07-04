import ChromaticTuner from "@/components/chromatic-tuner";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function TunerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('tuner.title')}</h1>
        <p className="text-muted-foreground">{t('tuner.subtitle')}</p>
      </div>
      <ChromaticTuner />
    </div>
  );
}
