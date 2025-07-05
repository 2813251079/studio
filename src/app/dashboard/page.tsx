
'use client';

import Link from "next/link";
import { Waves, Wind, Video, Puzzle, SlidersHorizontal, Star, Brain, BookOpen, BrainCircuit, Smile } from "lucide-react";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

const features = [
    { href: '/dashboard/frequencies', title: t('dashboard.sidebar.frequencies'), description: t('frequencies.subtitle'), icon: <Waves className="h-10 w-10 text-primary" /> },
    { href: '/dashboard/audio-enhancer', title: t('dashboard.sidebar.workspace_harmonizer'), description: t('workspace_harmonizer.subtitle'), icon: <Wind className="h-10 w-10 text-accent" /> },
    { href: '/dashboard/video-harmonizer', title: t('dashboard.sidebar.video_harmonizer'), description: t('video_harmonizer.subtitle'), icon: <Video className="h-10 w-10 text-primary" /> },
    { href: '/dashboard/inclusive-games', title: t('dashboard.sidebar.inclusive_games'), description: t('inclusive_games.subtitle'), icon: <Puzzle className="h-10 w-10 text-accent" /> },
    { href: '/dashboard/production', title: t('dashboard.sidebar.music_production'), description: t('music_production.subtitle'), icon: <SlidersHorizontal className="h-10 w-10 text-primary" /> },
    { href: '/dashboard/tuner', title: t('dashboard.sidebar.tuner'), description: t('tuner.subtitle'), icon: <Brain className="h-10 w-10 text-accent" />},
    { href: '/dashboard/facial-wellness', title: t('dashboard.sidebar.facial_wellness'), description: t('facial_wellness.subtitle'), icon: <Smile className="h-10 w-10 text-primary" /> },
    { href: '/dashboard/education', title: t('dashboard.sidebar.education_db'), description: t('education_page.description'), icon: <BookOpen className="h-10 w-10 text-accent" /> },
    { href: '/education', title: t('dashboard.sidebar.healing_frequencies'), description: t('healing_frequencies.subtitle'), icon: <BrainCircuit className="h-10 w-10 text-primary" /> },
    { href: '/pricing', title: t('dashboard.sidebar.coming_soon'), description: t('coming_soon.description'), icon: <Star className="h-10 w-10 text-accent" /> },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-start w-full p-4 md:p-8 text-center">
        <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('app.title')}
            </h1>
            <p className="mt-2 text-foreground/80 text-xl md:text-2xl max-w-3xl">
              {t('app.description')}
            </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-12 max-w-5xl mx-auto">
            {features.map((feature) => (
                <Link key={feature.href} href={feature.href} className="group">
                    <div className="flex h-72 w-72 flex-col items-center justify-center rounded-full bg-secondary p-6 text-center transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-card group-hover:shadow-2xl group-hover:shadow-primary/10">
                       <div className="mb-4 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-background p-4 transition-colors group-hover:bg-secondary">
                         {feature.icon}
                       </div>
                       <h3 className="mb-2 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{feature.title}</h3>
                       <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );
}
