import VideoHarmonizerForm from "@/components/video-harmonizer-form";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function VideoHarmonizerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('video_harmonizer.title')}</h1>
        <p className="text-muted-foreground">{t('video_harmonizer.subtitle')}</p>
      </div>
      <VideoHarmonizerForm />
    </div>
  );
}
