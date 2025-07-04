'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Square, Circle, Triangle, Star, RotateCw, CheckCircle, XCircle } from 'lucide-react';
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

const allShapes = [
  { id: 'square', Icon: Square, color: 'text-red-500' },
  { id: 'circle', Icon: Circle, color: 'text-blue-500' },
  { id: 'triangle', Icon: Triangle, color: 'text-green-500' },
  { id: 'star', Icon: Star, color: 'text-yellow-500' },
];

const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export default function ShapePuzzle() {
  const [target, setTarget] = useState(allShapes[0]);
  const [options, setOptions] = useState(shuffle(allShapes));
  const [level, setLevel] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'gameover'>('playing');

  const setupLevel = useCallback(() => {
    const currentTarget = allShapes[level % allShapes.length];
    setTarget(currentTarget);
    setOptions(shuffle(allShapes));
    setGameState('playing');
  }, [level]);

  useEffect(() => {
    setupLevel();
  }, [level, setupLevel]);

  const playSound = (correct: boolean) => {
    if (typeof window === 'undefined') return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioContext.state === 'suspended') audioContext.resume();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (correct) {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    } else {
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };
  
  const handleOptionClick = (optionId: string) => {
    if (gameState !== 'playing') return;

    if (optionId === target.id) {
      playSound(true);
      setGameState('correct');
      setTimeout(() => {
        if(level + 1 === allShapes.length) {
            setGameState('gameover');
        } else {
            setLevel(prev => prev + 1);
        }
      }, 1500);
    } else {
      playSound(false);
    }
  };
  
  const resetGame = () => {
      setLevel(0);
      setGameState('playing');
  }

  if (gameState === 'gameover') {
    return (
        <div className="text-center space-y-4 p-8">
          <p className="text-2xl font-bold text-primary">{t('inclusive_games.puzzle.congratulations')}</p>
          <Button onClick={resetGame}>
            <RotateCw className="mr-2 h-5 w-5" />
            {t('inclusive_games.puzzle.play_again')}
          </Button>
        </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <h3 className="text-xl font-semibold">{t('inclusive_games.puzzle.instruction')}</h3>
      <Card className="h-40 w-40 flex items-center justify-center bg-secondary border-2 border-dashed">
        <target.Icon className={`h-28 w-28 ${target.color} transition-all`} />
      </Card>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            disabled={gameState !== 'playing'}
            className={cn(
              'h-32 w-32 rounded-lg bg-card flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70'
            )}
          >
            <option.Icon className={`h-20 w-20 ${option.color}`} />
          </button>
        ))}
      </div>

      {gameState === 'correct' && (
        <div className="flex items-center gap-2 text-green-500 font-bold text-xl">
          <CheckCircle className="h-6 w-6" />
          <span>{t('inclusive_games.puzzle.correct')}</span>
        </div>
      )}
    </div>
  );
}
