'use client';

import { useState } from 'react';
import { translations } from "@/lib/translations";
import FrequencyPlayer from '@/components/frequency-player';

const t = (key: any) => translations.es[key as any] || key;

export default function FrequenciesPage() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const frequencies = [
    {
      title: t('frequencies.261hz.title'),
      description: t('frequencies.261hz.description'),
      freqValue: 261
    },
    {
      title: t('frequencies.293hz.title'),
      description: t('frequencies.293hz.description'),
      freqValue: 293
    },
    {
      title: t('frequencies.396hz.title'),
      description: t('frequencies.396hz.description'),
      freqValue: 396
    },
    {
      title: t('frequencies.417hz.title'),
      description: t('frequencies.417hz.description'),
      freqValue: 417
    },
    {
      title: t('frequencies.432hz.title'),
      description: t('frequencies.432hz.description'),
      freqValue: 432
    },
    {
      title: t('frequencies.528hz.title'),
      description: t('frequencies.528hz.description'),
      freqValue: 528
    },
    {
      title: t('frequencies.639hz.title'),
      description: t('frequencies.639hz.description'),
      freqValue: 639
    },
    {
      title: t('frequencies.741hz.title'),
      description: t('frequencies.741hz.description'),
      freqValue: 741
    },
    {
      title: t('frequencies.852hz.title'),
      description: t('frequencies.852hz.description'),
      freqValue: 852
    },
    {
      title: t('frequencies.963hz.title'),
      description: t('frequencies.963hz.description'),
      freqValue: 963
    },
  ].sort((a, b) => a.freqValue - b.freqValue);

  const handlePlayToggle = (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null); // Stop playing if it's the current one
    } else {
      setPlayingIndex(index); // Play the new one
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('frequencies.title')}</h1>
        <p className="text-muted-foreground">{t('frequencies.subtitle')}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {frequencies.map((freq, index) => (
          <FrequencyPlayer
            key={index}
            title={freq.title}
            description={freq.description}
            frequency={freq.freqValue}
            isPlaying={playingIndex === index}
            onPlayToggle={() => handlePlayToggle(index)}
          />
        ))}
      </div>
    </div>
  );
}
