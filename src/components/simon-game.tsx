'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Play, RotateCw } from 'lucide-react';

export type Pictogram = {
  id: string;
  labelKey: string;
  icon: ReactNode;
};

interface SimonGameProps {
  pictograms: Pictogram[];
  t: (key: string) => string;
}

const GAME_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function SimonGame({ pictograms, t }: SimonGameProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'gameover'>('idle');
  const [score, setScore] =useState(0);
  const gamePictograms = pictograms.slice(0, 8);

  const playSound = useCallback((index: number) => {
    if (typeof window === 'undefined') return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'sine';
    const frequencies = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
    oscillator.frequency.value = frequencies[index % frequencies.length];
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
    oscillator.start(audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
    oscillator.stop(audioContext.currentTime + 0.3);
  }, []);

  const showSequence = useCallback(async () => {
    setGameState('showing');
    await sleep(700);
    for (const index of sequence) {
      setActiveButton(index);
      playSound(index);
      await sleep(500);
      setActiveButton(null);
      await sleep(200);
    }
    setGameState('playing');
  }, [sequence, playSound]);

  const nextLevel = useCallback(() => {
    const nextIndex = Math.floor(Math.random() * gamePictograms.length);
    setPlayerSequence([]);
    setSequence(prev => [...prev, nextIndex]);
  }, [gamePictograms.length]);

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameState('showing');
    const firstIndex = Math.floor(Math.random() * gamePictograms.length);
    setSequence([firstIndex]);
  };
  
  const handlePlayerClick = (index: number) => {
    if (gameState !== 'playing') return;

    playSound(index);
    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameState('gameover');
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(prev => prev + 1);
      setTimeout(() => {
        nextLevel();
      }, 1000);
    }
  };

  useEffect(() => {
    if (gameState === 'showing' && sequence.length > 0) {
      showSequence();
    }
  }, [sequence, gameState, showSequence]);

  return (
    <div className="space-y-6 flex flex-col items-center">
      <Card className="w-full max-w-2xl text-center">
        <CardContent className="p-6">
          <div className="flex justify-around items-center mb-6">
            <div className="text-xl font-bold">{t('simon_game.level')}: {sequence.length}</div>
            <div className="text-xl font-bold">{t('simon_game.score')}: {score}</div>
          </div>
          <div className="grid grid-cols-4 gap-4 aspect-square">
            {gamePictograms.map((picto, index) => (
              <button
                key={picto.id}
                onClick={() => handlePlayerClick(index)}
                disabled={gameState !== 'playing'}
                aria-label={t(picto.labelKey)}
                className={cn(
                  'rounded-lg flex items-center justify-center text-white transition-all duration-200 transform disabled:cursor-not-allowed disabled:opacity-60',
                  GAME_COLORS[index % GAME_COLORS.length],
                  activeButton === index ? 'scale-110 brightness-125' : 'scale-100',
                  'hover:scale-105 active:scale-95'
                )}
              >
                <div className="transform scale-75 md:scale-100">{picto.icon}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {gameState === 'idle' && (
        <Button onClick={startGame} size="lg">
          <Play className="mr-2 h-5 w-5" />
          {t('simon_game.start_button')}
        </Button>
      )}

      {gameState === 'gameover' && (
        <div className="text-center space-y-4">
            <p className="text-2xl font-bold text-destructive">{t('simon_game.game_over')}</p>
            <Button onClick={startGame} size="lg">
              <RotateCw className="mr-2 h-5 w-5" />
              {t('simon_game.play_again')}
            </Button>
        </div>
      )}
    </div>
  );
}
