import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex flex-col items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('dashboard.home.title')}</h1>
          <p className="mt-2 text-muted-foreground">{t('dashboard.home.subtitle')}</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t('dashboard.home.features_title')}</CardTitle>
            <CardDescription>{t('dashboard.home.features_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index}>
                  <Link 
                    href={feature.href} 
                    className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 bg-secondary rounded-full p-3">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
