import Link from "next/link";
import { Waves, Wind, Video, Puzzle, SlidersHorizontal, Star } from "lucide-react";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function DashboardPage() {
  const features = [
    {
      href: '/dashboard/frequencies',
      title: t('dashboard.sidebar.frequencies'),
      description: t('frequencies.subtitle'),
      icon: <Waves className="h-8 w-8 text-primary" />,
    },
    {
      href: '/dashboard/audio-enhancer',
      title: t('dashboard.sidebar.workspace_harmonizer'),
      description: t('workspace_harmonizer.subtitle'),
      icon: <Wind className="h-8 w-8 text-accent" />,
    },
    {
      href: '/dashboard/video-harmonizer',
      title: t('dashboard.sidebar.video_harmonizer'),
      description: t('video_harmonizer.subtitle'),
      icon: <Video className="h-8 w-8 text-primary" />,
    },
    {
      href: '/dashboard/inclusive-games',
      title: t('dashboard.sidebar.inclusive_games'),
      description: t('inclusive_games.subtitle'),
      icon: <Puzzle className="h-8 w-8 text-accent" />,
    },
    {
      href: '/dashboard/production',
      title: t('dashboard.sidebar.music_production'),
      description: t('music_production.subtitle'),
      icon: <SlidersHorizontal className="h-8 w-8 text-primary" />,
    },
    {
      href: '/pricing',
      title: t('dashboard.sidebar.coming_soon'),
      description: t('coming_soon.description'),
      icon: <Star className="h-8 w-8 text-accent" />,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-16 p-4 md:p-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          {t('dashboard.home.title')}
        </h1>
        <p className="mt-4 text-foreground/80 text-xl">
          {t('dashboard.home.subtitle')}
        </p>
      </div>

      <div className="w-full space-y-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">{t('dashboard.home.features_title')}</h2>
          <p className="mt-3 text-foreground/80 text-lg">
            {t('dashboard.home.features_subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.href} className="group block">
              <div className="h-full p-8 rounded-3xl bg-secondary transition-all duration-300 hover:bg-card hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                  <div className="flex-shrink-0 bg-background rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 transition-colors group-hover:bg-secondary">
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-foreground/80 text-lg">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
