
'use client';

import { useState, useEffect, type ReactNode, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Volume2, XCircle, Hand, GlassWater, Smile, Frown, ToyBrick, Music, BookOpen, Utensils, Bed, Angry, Home, School, Bath, HelpCircle, Ban, Shirt, Sparkles, CheckSquare, Square, Undo2 } from 'lucide-react';
import { translations } from "@/lib/translations";
import VisualRoutinePlanner from '@/components/visual-routine-planner';
import SimonGame from '@/components/simon-game';
import EmotionalCompanion from '@/components/emotional-companion';
import ShapePuzzle from '@/components/shape-puzzle';

const t = (key: any) => translations.es[key as any] || key;

export type Pictogram = {
  id: string;
  labelKey: string;
  icon: ReactNode;
};

const availablePictograms: Pictogram[] = [
  { id: 'want', labelKey: 'pictos.want', icon: <Hand className="h-12 w-12" /> },
  { id: 'no', labelKey: 'pictos.no', icon: <Ban className="h-12 w-12" /> },
  { id: 'help', labelKey: 'pictos.help', icon: <HelpCircle className="h-12 w-12" /> },
  { id: 'happy', labelKey: 'pictos.happy', icon: <Smile className="h-12 w-12" /> },
  { id: 'sad', labelKey: 'pictos.sad', icon: <Frown className="h-12 w-12" /> },
  { id: 'angry', labelKey: 'pictos.angry', icon: <Angry className="h-12 w-12" /> },
  { id: 'home', labelKey: 'pictos.home', icon: <Home className="h-12 w-12" /> },
  { id: 'school', labelKey: 'pictos.school', icon: <School className="h-12 w-12" /> },
  { id: 'bath', labelKey: 'pictos.bath', icon: <Bath className="h-12 w-12" /> },
  { id: 'water', labelKey: 'pictos.water', icon: <GlassWater className="h-12 w-12" /> },
  { id: 'eat', labelKey: 'pictos.eat', icon: <Utensils className="h-12 w-12" /> },
  { id: 'sleep', labelKey: 'pictos.sleep', icon: <Bed className="h-12 w-12" /> },
  { id: 'play', labelKey: 'pictos.play', icon: <ToyBrick className="h-12 w-12" /> },
  { id: 'music', labelKey: 'pictos.music', icon: <Music className="h-12 w-12" /> },
  { id: 'read', labelKey: 'pictos.read', icon: <BookOpen className="h-12 w-12" /> },
  { id: 'dress', labelKey: 'pictos.dress', icon: <Shirt className="h-12 w-12" /> },
  { id: 'wash_hands', labelKey: 'pictos.wash_hands', icon: <Sparkles className="h-12 w-12" /> },
];

function VisualCommunicator() {
  const [sentence, setSentence] = useState<Pictogram[]>([]);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
    }
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const getAudioContext = () => {
    if (typeof window === 'undefined') return null;
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playClickSound = () => {
    const audioContext = getAudioContext();
    if (!audioContext) return;

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = 600;
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    oscillator.start(audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handlePictoClick = (picto: Pictogram) => {
    playClickSound();
    triggerHapticFeedback();
    setSentence(prev => [...prev, picto]);
  };

  const handleSpeak = () => {
    const speechSynthesis = speechSynthesisRef.current;
    if (speechSynthesis && sentence.length > 0) {
      const textToSpeak = sentence.map(p => t(p.labelKey)).join(' ');
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'es-ES';
      speechSynthesis.cancel(); // Cancel any previous speech
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
    <div className="space-y-6">
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


export default function InclusiveGamesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('inclusive_games.title')}</h1>
        <p className="text-muted-foreground">{t('inclusive_games.subtitle')}</p>
      </div>
      
      <div className="space-y-12">
        <Card>
          <CardHeader>
            <CardTitle>{t('inclusive_games.communicator.title')}</CardTitle>
            <CardDescription>{t('inclusive_games.communicator.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <VisualCommunicator />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('inclusive_games.planner.title')}</CardTitle>
            <CardDescription>{t('inclusive_games.planner.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <VisualRoutinePlanner pictograms={availablePictograms} t={t} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('simon_game.title')}</CardTitle>
            <CardDescription>{t('simon_game.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <SimonGame />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('inclusive_games.puzzle.title')}</CardTitle>
            <CardDescription>{t('inclusive_games.puzzle.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ShapePuzzle />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('inclusive_games.companion.page_title')}</CardTitle>
            <CardDescription>{t('inclusive_games.companion.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <EmotionalCompanion />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
