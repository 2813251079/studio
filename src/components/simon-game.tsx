'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Play, RotateCw, Music } from 'lucide-react';
import { translations } from '@/lib/translations';
import { noteFrequencies } from '@/lib/noteFrequencies';

const t = (key: any) => translations.es[key as any] || key;

const musicalButtons = [
    { name: 'Do', freq: noteFrequencies['Do'], color: 'bg-red-500' },
    { name: 'Re', freq: noteFrequencies['Re'], color: 'bg-orange-500' },
    { name: 'Mi', freq: noteFrequencies['Mi'], color: 'bg-yellow-400' },
    { name: 'Fa', freq: noteFrequencies['Fa'], color: 'bg-green-500' },
    { name: 'Sol', freq: noteFrequencies['Sol'], color: 'bg-blue-500' },
    { name: 'La', freq: noteFrequencies['La'], color: 'bg-indigo-500' },
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function SimonGame() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);

  const playSound = useCallback((freq: number) => {
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
    oscillator.frequency.value = freq;
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
      playSound(musicalButtons[index].freq);
      await sleep(600);
      setActiveButton(null);
      await sleep(200);
    }
    setGameState('playing');
  }, [sequence, playSound]);

  const nextLevel = useCallback(() => {
    const nextIndex = Math.floor(Math.random() * musicalButtons.length);
    setPlayerSequence([]);
    setSequence(prev => [...prev, nextIndex]);
  }, []);

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameState('showing');
    const firstIndex = Math.floor(Math.random() * musicalButtons.length);
    setSequence([firstIndex]);
  };
  
  const handlePlayerClick = (index: number) => {
    if (gameState !== 'playing') return;

    playSound(musicalButtons[index].freq);
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
          <div className="grid grid-cols-3 gap-4 aspect-square">
            {musicalButtons.map((button, index) => (
              <button
                key={button.name}
                onClick={() => handlePlayerClick(index)}
                disabled={gameState !== 'playing'}
                aria-label={button.name}
                className={cn(
                  'rounded-lg flex flex-col items-center justify-center text-white text-2xl font-bold transition-all duration-200 transform disabled:cursor-not-allowed disabled:opacity-60',
                  button.color,
                  activeButton === index ? 'scale-110 brightness-125' : 'scale-100',
                  'hover:scale-105 active:scale-95'
                )}
              >
                <Music className="h-8 w-8 mb-2" />
                {button.name}
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
