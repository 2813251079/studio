import AudioEnhancerForm from "@/components/audio-enhancer-form";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function AudioEnhancerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('audio_enhancer.title')}</h1>
        <p className="text-muted-foreground">{t('audio_enhancer.subtitle')}</p>
      </div>
      <AudioEnhancerForm />
    </div>
  );
}
