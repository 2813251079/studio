import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Waves, Wind, Video, Puzzle } from "lucide-react";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('dashboard.home.title')}</h1>
        <p className="text-muted-foreground">{t('dashboard.home.subtitle')}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="h-6 w-6 text-primary" />
              {t('dashboard.sidebar.frequencies')}
            </CardTitle>
            <CardDescription>{t('frequencies.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/frequencies">
                Explorar Biblioteca <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-6 w-6 text-accent" />
              {t('dashboard.sidebar.workspace_harmonizer')}
            </CardTitle>
            <CardDescription>{t('workspace_harmonizer.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/audio-enhancer">
                Probar Herramienta <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-6 w-6 text-primary" />
              {t('dashboard.sidebar.video_harmonizer')}
            </CardTitle>
            <CardDescription>{t('video_harmonizer.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/video-harmonizer">
                Ir a la Herramienta <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Puzzle className="h-6 w-6 text-accent" />
              {t('dashboard.sidebar.inclusive_games')}
            </CardTitle>
            <CardDescription>{t('inclusive_games.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/inclusive-games">
                Explorar Juegos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
