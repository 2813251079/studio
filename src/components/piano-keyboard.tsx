'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

const t = (key: any) => translations.es[key as any] || key;

type Note = {
  name: string;
  freq: number;
  type: 'white' | 'black';
};

const notes: Note[] = [
  { name: 'C', freq: 261.63, type: 'white' },
  { name: 'C#', freq: 277.18, type: 'black' },
  { name: 'D', freq: 293.66, type: 'white' },
  { name: 'D#', freq: 311.13, type: 'black' },
  { name: 'E', freq: 329.63, type: 'white' },
  { name: 'F', freq: 349.23, type: 'white' },
  { name: 'F#', freq: 369.99, type: 'black' },
  { name: 'G', freq: 392.00, type: 'white' },
  { name: 'G#', freq: 415.30, type: 'black' },
  { name: 'A', freq: 440.00, type: 'white' },
  { name: 'A#', freq: 466.16, type: 'black' },
  { name: 'B', freq: 493.88, type: 'white' },
];

export default function PianoKeyboard() {
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Map<number, { osc: OscillatorNode; gain: GainNode }>>(new Map());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
        audioContextRef.current?.close();
    };
  }, []);

  const playNote = (freq: number) => {
    const audioContext = audioContextRef.current;
    if (!audioContext || oscillatorsRef.current.has(freq)) return;

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.frequency.value = freq;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();

    oscillatorsRef.current.set(freq, { osc, gain });
    setActiveNotes(prev => new Set(prev.add(freq)));
  };

  const stopNote = (freq: number) => {
    const audioContext = audioContextRef.current;
    const node = oscillatorsRef.current.get(freq);

    if (audioContext && node) {
      node.gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
      node.osc.stop(audioContext.currentTime + 0.1);
      oscillatorsRef.current.delete(freq);
      setActiveNotes(prev => {
        const newSet = new Set(prev);
        newSet.delete(freq);
        return newSet;
      });
    }
  };

  const handleInteractionStart = (freq: number) => {
    playNote(freq);
  };

  const handleInteractionEnd = (freq: number) => {
    stopNote(freq);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('music_production.piano.title')}</CardTitle>
        <CardDescription>{t('music_production.piano.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative flex h-48 w-full select-none" role="application" aria-label="Piano Keyboard">
          {notes
            .filter(note => note.type === 'white')
            .map((note) => (
              <div
                key={note.name}
                role="button"
                aria-label={`Piano key ${note.name}`}
                onMouseDown={() => handleInteractionStart(note.freq)}
                onMouseUp={() => handleInteractionEnd(note.freq)}
                onMouseLeave={() => handleInteractionEnd(note.freq)}
                onTouchStart={(e) => { e.preventDefault(); handleInteractionStart(note.freq); }}
                onTouchEnd={() => handleInteractionEnd(note.freq)}
                className={cn(
                  "relative h-full flex-1 cursor-pointer border-x border-t border-neutral-300 bg-white rounded-b-md border-b-4 border-neutral-400",
                  "flex items-end justify-center pb-4 text-accent font-semibold shadow-inner",
                  { "bg-primary/80 text-primary-foreground border-accent": activeNotes.has(note.freq) }
                )}
              >
                {note.name}
              </div>
            ))}
          {notes
            .filter(note => note.type === 'black')
            .map((note, index) => {
              const leftPositionMap: { [key: number]: string } = { 0: "14.28%", 1: "28.57%", 2: "57.14%", 3: "71.42%", 4: "85.71%" };
              return (
                <div
                  key={note.name}
                  role="button"
                  aria-label={`Piano key ${note.name}`}
                  onMouseDown={(e) => { e.stopPropagation(); handleInteractionStart(note.freq); }}
                  onMouseUp={(e) => { e.stopPropagation(); handleInteractionEnd(note.freq); }}
                  onMouseLeave={(e) => { e.stopPropagation(); handleInteractionEnd(note.freq); }}
                  onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); handleInteractionStart(note.freq); }}
                  onTouchEnd={(e) => { e.stopPropagation(); handleInteractionEnd(note.freq); }}
                  style={{ left: `calc(${leftPositionMap[index]} - 4%)` }}
                  className={cn(
                    "absolute top-0 h-2/3 w-[8%] cursor-pointer border border-black bg-gradient-to-b from-neutral-800 to-black rounded-b-md z-10",
                    "flex items-end justify-center pb-2 text-accent text-xs font-semibold transition-colors",
                    { "bg-accent border-primary": activeNotes.has(note.freq) }
                  )}
                >
                  {note.name}
                </div>
              )
            })}
        </div>
      </CardContent>
    </Card>
  );
}
