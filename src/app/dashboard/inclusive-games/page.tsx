'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Volume2, XCircle, Hand, GlassWater, Smile, Frown, ToyBrick, Music, BookOpen, Utensils, Bed } from 'lucide-react';
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

type Pictogram = {
  id: string;
  labelKey: string;
  icon: ReactNode;
};

const availablePictograms: Pictogram[] = [
  { id: 'want', labelKey: 'pictos.want', icon: <Hand className="h-12 w-12" /> },
  { id: 'happy', labelKey: 'pictos.happy', icon: <Smile className="h-12 w-12" /> },
  { id: 'sad', labelKey: 'pictos.sad', icon: <Frown className="h-12 w-12" /> },
  { id: 'water', labelKey: 'pictos.water', icon: <GlassWater className="h-12 w-12" /> },
  { id: 'eat', labelKey: 'pictos.eat', icon: <Utensils className="h-12 w-12" /> },
  { id: 'sleep', labelKey: 'pictos.sleep', icon: <Bed className="h-12 w-12" /> },
  { id: 'play', labelKey: 'pictos.play', icon: <ToyBrick className="h-12 w-12" /> },
  { id: 'music', labelKey: 'pictos.music', icon: <Music className="h-12 w-12" /> },
  { id: 'read', labelKey: 'pictos.read', icon: <BookOpen className="h-12 w-12" /> },
];

export default function InclusiveGamesPage() {
  const [sentence, setSentence] = useState<Pictogram[]>([]);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const handlePictoClick = (picto: Pictogram) => {
    setSentence(prev => [...prev, picto]);
  };

  const handleSpeak = () => {
    if (speechSynthesis && sentence.length > 0) {
      const textToSpeak = sentence.map(p => t(p.labelKey)).join(' ');
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'es-ES';
      speechSynthesis.speak(utterance);
    }
  };

  const handleClear = () => {
    setSentence([]);
  };
  
  const handleRemoveItem = (indexToRemove: number) => {
    setSentence(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  
  const handlePictoKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, picto: Pictogram) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePictoClick(picto);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('inclusive_games.title')}</h1>
        <p className="text-muted-foreground">{t('inclusive_games.communicator.subtitle')}</p>
      </div>
      
      <Card className="min-h-[160px]">
        <CardHeader>
          <CardTitle className="text-lg">{t('inclusive_games.communicator.sentence_strip_title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            {sentence.map((picto, index) => (
              <button 
                key={`${picto.id}-${index}`} 
                onClick={() => handleRemoveItem(index)}
                aria-label={`${t('inclusive_games.communicator.remove_pictogram')}: ${t(picto.labelKey)}`}
                className="relative flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary text-secondary-foreground transition-transform hover:scale-105 group">
                {picto.icon}
                <span className="text-sm">{t(picto.labelKey)}</span>
                <div className="absolute -top-2 -right-2 bg-background rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <XCircle className="h-6 w-6 text-destructive" />
                </div>
              </button>
            ))}
            {sentence.length === 0 && (
                <p className="text-muted-foreground">{t('inclusive_games.communicator.sentence_strip_placeholder')}</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex gap-4">
        <Button onClick={handleSpeak} disabled={sentence.length === 0}>
          <Volume2 className="mr-2 h-4 w-4" />
          {t('inclusive_games.communicator.speak_button')}
        </Button>
        <Button onClick={handleClear} variant="outline" disabled={sentence.length === 0}>
          <XCircle className="mr-2 h-4 w-4" />
          {t('inclusive_games.communicator.clear_button')}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {availablePictograms.map((picto) => (
          <Card 
            key={picto.id} 
            role="button"
            tabIndex={0}
            onClick={() => handlePictoClick(picto)}
            onKeyDown={(e) => handlePictoKeyDown(e, picto)}
            aria-label={`${t('inclusive_games.communicator.add_pictogram')}: ${t(picto.labelKey)}`}
            className="flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all hover:ring-2 hover:ring-primary hover:shadow-lg active:scale-95"
          >
            {picto.icon}
            <p className="mt-2 font-medium">{t(picto.labelKey)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
