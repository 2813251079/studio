'use client';

import Link from "next/link";
import { useState } from "react";
import { Waves, Wind, Video, Puzzle, SlidersHorizontal, Star, Home, BookOpen, ChevronDown } from "lucide-react";
import { translations } from "@/lib/translations";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const t = (key: any) => translations.es[key as any] || key;

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="flex flex-col items-center justify-start w-full p-4 md:p-8 text-center">
        <div className="mb-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-yellow-400 bg-clip-text text-transparent">
              Open Music Academy
            </h1>
            <p className="mt-2 text-foreground/80 text-xl md:text-2xl max-w-3xl">
              Frecuencias musicales Sanadoras
            </p>
        </div>

        <Collapsible open={isMenuOpen} onOpenChange={setIsMenuOpen} className="w-full max-w-xs mb-12">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="text-lg">
              Menú
              <ChevronDown className={`h-5 w-5 ml-2 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="flex flex-col gap-2 p-4 bg-secondary/50 rounded-lg border">
                <Button variant="ghost" asChild>
                    <Link href="/dashboard" className="flex items-center justify-center gap-2">
                        <Home /> <span>{t('dashboard.sidebar.home')}</span>
                    </Link>
                </Button>
                <Button variant="ghost" asChild>
                    <Link href="/education" className="flex items-center justify-center gap-2">
                        <BookOpen /> <span>{t('dashboard.sidebar.education')}</span>
                    </Link>
                </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.href} className="group h-full">
              <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-card hover:shadow-2xl hover:shadow-primary/20">
                  <CardHeader className="flex flex-row items-center gap-4 p-0 mb-4">
                    {feature.icon}
                    <CardTitle className="text-xl text-left font-semibold bg-gradient-to-r from-primary via-accent to-yellow-400 bg-clip-text text-transparent">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-sm text-left text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
              </Card>
            </Link>
          ))}
        </div>
    </div>
  );
}
