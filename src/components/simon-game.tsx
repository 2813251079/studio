'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { translations } from '@/lib/translations';

const t = (key: any) => translations.es[key as any] || key;

const colors = [
  { name: 'green', colorClass: 'bg-green-500', activeClass: 'bg-green-400 shadow-[0_0_20px_5px_rgba(74,222,128,0.7)]', freq: 392.00 }, // G4
  { name: 'red', colorClass: 'bg-red-500', activeClass: 'bg-red-400 shadow-[0_0_20px_5px_rgba(248,113,113,0.7)]', freq: 329.63 }, // E4
  { name: 'yellow', colorClass: 'bg-yellow-500', activeClass: 'bg-yellow-400 shadow-[0_0_20px_5px_rgba(250,204,21,0.7)]', freq: 261.63 }, // C4
  { name: 'blue', colorClass: 'bg-blue-500', activeClass: 'bg-blue-400 shadow-[0_0_20px_5px_rgba(96,165,250,0.7)]', freq: 196.00 }, // G3
];

const colorMap = new Map(colors.map(c => [c.name, c]));

export default function SimonGame() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'watching' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const playNote = (colorName: string) => {
    if (!audioContextRef.current) return;
    const colorData = colorMap.get(colorName);
    if (!colorData) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(colorData.freq, audioContextRef.current.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContextRef.current.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.5);
  };
  
  const lightUpPad = (colorName: string) => {
    setActiveColor(colorName);
    playNote(colorName);
    setTimeout(() => {
      setActiveColor(null);
    }, 400);
  };

  const playSequence = (seq: string[]) => {
    setGameState('watching');
    let i = 0;
    const interval = setInterval(() => {
      lightUpPad(seq[i]);
      i++;
      if (i >= seq.length) {
        clearInterval(interval);
        setGameState('playing');
        setUserSequence([]);
      }
    }, 700);
  };

  const startGame = () => {
    setGameState('idle');
    setScore(0);
    const newSequence = [colors[Math.floor(Math.random() * colors.length)].name];
    setSequence(newSequence);
    setTimeout(() => playSequence(newSequence), 500);
  };
  
  const handleUserClick = (colorName: string) => {
    if (gameState !== 'playing') return;

    lightUpPad(colorName);
    
    const newUserSequence = [...userSequence, colorName];
    setUserSequence(newUserSequence);

    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      setGameState('gameOver');
      return;
    }

    if (newUserSequence.length === sequence.length) {
        setScore(prev => prev + 1);
        setTimeout(() => {
            const nextColor = colors[Math.floor(Math.random() * colors.length)].name;
            const newSequence = [...sequence, nextColor];
            setSequence(newSequence);
            playSequence(newSequence);
        }, 1000);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-semibold">{t('inclusive_games.simon.title')}</h2>
            <p className="text-muted-foreground text-center max-w-md">{t('inclusive_games.simon.description')}</p>
          
            <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 rounded-full overflow-hidden">
                    {colors.map((color, index) => (
                        <button
                            key={color.name}
                            disabled={gameState !== 'playing'}
                            onClick={() => handleUserClick(color.name)}
                            aria-label={color.name}
                            className={cn(
                                'w-full h-full transition-all duration-200 ease-in-out',
                                color.colorClass,
                                activeColor === color.name && color.activeClass,
                                gameState !== 'playing' && 'cursor-not-allowed',
                                {
                                    'rounded-tl-full': index === 0,
                                    'rounded-tr-full': index === 1,
                                    'rounded-bl-full': index === 2,
                                    'rounded-br-full': index === 3,
                                }
                            )}
                        />
                    ))}
                </div>
                <div className="absolute inset-1/4 rounded-full bg-background flex flex-col items-center justify-center text-center p-4 shadow-inner">
                    {gameState === 'idle' && (
                        <Button onClick={startGame}>{t('inclusive_games.simon.start_button')}</Button>
                    )}
                    {gameState === 'gameOver' && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-lg font-bold text-destructive">{t('inclusive_games.simon.game_over')}</p>
                            <p className="text-sm">{t('inclusive_games.simon.score')}: {score}</p>
                            <Button onClick={startGame} size="sm">{t('inclusive_games.simon.restart_button')}</Button>
                        </div>
                    )}
                    {(gameState === 'watching' || gameState === 'playing') && (
                        <div>
                            <p className="text-sm text-muted-foreground">{t('inclusive_games.simon.score')}</p>
                            <p className="text-4xl font-bold">{score}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}