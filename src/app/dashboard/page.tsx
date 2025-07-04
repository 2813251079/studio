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
      icon: <Waves className="h-10 w-10 text-primary" />,
    },
    {
      href: '/dashboard/audio-enhancer',
      title: t('dashboard.sidebar.workspace_harmonizer'),
      description: t('workspace_harmonizer.subtitle'),
      icon: <Wind className="h-10 w-10 text-accent" />,
    },
    {
      href: '/dashboard/video-harmonizer',
      title: t('dashboard.sidebar.video_harmonizer'),
      description: t('video_harmonizer.subtitle'),
      icon: <Video className="h-10 w-10 text-primary" />,
    },
    {
      href: '/dashboard/inclusive-games',
      title: t('dashboard.sidebar.inclusive_games'),
      description: t('inclusive_games.subtitle'),
      icon: <Puzzle className="h-10 w-10 text-accent" />,
    },
    {
      href: '/dashboard/production',
      title: t('dashboard.sidebar.music_production'),
      description: t('music_production.subtitle'),
      icon: <SlidersHorizontal className="h-10 w-10 text-primary" />,
    },
    {
      href: '/pricing',
      title: t('dashboard.sidebar.coming_soon'),
      description: t('coming_soon.description'),
      icon: <Star className="h-10 w-10 text-accent" />,
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full p-4 md:p-8">
        <div className="text-left mb-16">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('dashboard.home.title')}
            </h1>
            <p className="mt-4 text-foreground/80 text-xl max-w-3xl">
              {t('dashboard.home.subtitle')}
            </p>
        </div>
        <div className="flex flex-wrap justify-start items-center gap-10 md:gap-16 w-full">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.href} className="group">
              <div className="flex h-72 w-72 flex-col items-center justify-center rounded-full bg-secondary p-6 text-center transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-card group-hover:shadow-2xl group-hover:shadow-primary/10">
                  <div className="mb-4 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-background p-4 transition-colors group-hover:bg-secondary">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl md:text-2xl font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}
