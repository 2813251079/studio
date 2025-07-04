import Link from "next/link";
import { Waves, Wind, Video, Puzzle, SlidersHorizontal } from "lucide-react";
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
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-16 p-4 md:p-8">
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
        <ul className="space-y-12">
          {features.map((feature) => (
            <li key={feature.href}>
              <Link href={feature.href} className="group flex items-start gap-6 p-2 -m-2 rounded-lg transition-colors hover:bg-secondary/10">
                <div className="flex-shrink-0 bg-secondary rounded-full p-4 flex items-center justify-center transition-colors group-hover:bg-secondary/80">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-foreground/80 text-lg mt-2">{feature.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
