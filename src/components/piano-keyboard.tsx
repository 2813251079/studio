'use client';

import { useState, useRef, useEffect } from 'react';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';
import { speakNoteAction } from '@/app/actions';
import { noteFrequencies } from '@/lib/noteFrequencies';

const t = (key: any) => translations.es[key as any] || key;

type Note = {
  name: string; // Spanish name
  nameEn: string; // English name
  freq: number;
  type: 'white' | 'black';
};

const notes: Note[] = [
  { name: 'Do', nameEn: 'C', freq: noteFrequencies['Do'], type: 'white' },
  { name: 'Do#', nameEn: 'C#', freq: noteFrequencies['Do#'], type: 'black' },
  { name: 'Re', nameEn: 'D', freq: noteFrequencies['Re'], type: 'white' },
  { name: 'Re#', nameEn: 'D#', freq: noteFrequencies['Re#'], type: 'black' },
  { name: 'Mi', nameEn: 'E', freq: noteFrequencies['Mi'], type: 'white' },
  { name: 'Fa', nameEn: 'F', freq: noteFrequencies['Fa'], type: 'white' },
  { name: 'Fa#', nameEn: 'F#', freq: noteFrequencies['Fa#'], type: 'black' },
  { name: 'Sol', nameEn: 'G', freq: noteFrequencies['Sol'], type: 'white' },
  { name: 'Sol#', nameEn: 'G#', freq: noteFrequencies['Sol#'], type: 'black' },
  { name: 'La', nameEn: 'A', freq: noteFrequencies['La'], type: 'white' },
  { name: 'La#', nameEn: 'A#', freq: noteFrequencies['La#'], type: 'black' },
  { name: 'Si', nameEn: 'B', freq: noteFrequencies['Si'], type: 'white' },
];

export default function PianoKeyboard() {
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Map<number, { osc: OscillatorNode; gain: GainNode }>>(new Map());
  const speechAudioRef = useRef<HTMLAudioElement | null>(null);

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

  const fetchAndPlaySpeech = async (noteName: string) => {
    try {
      if (!noteName) return;
      // The note names on piano don't have spaces, but this makes it consistent with the guitar component
      const simpleName = noteName.split(' ')[0];
      const result = await speakNoteAction(simpleName);
      if (result.data && speechAudioRef.current) {
        speechAudioRef.current.src = result.data;
        speechAudioRef.current.play().catch(e => console.error("Error playing speech audio:", e));
      } else if (result.error) {
        console.error("TTS Action Error:", result.error);
      }
    } catch (e) {
      console.error("Failed to fetch speech:", e);
    }
  };

  const handleInteractionStart = (note: Note) => {
    playNote(note.freq);
    fetchAndPlaySpeech(note.name);
  };

  const handleInteractionEnd = (freq: number) => {
    stopNote(freq);
  };

  return (
    <div>
      <audio ref={speechAudioRef} className="hidden" />
      <div className="relative flex h-56 w-full select-none" role="application" aria-label="Piano Keyboard">
        {notes
          .filter(note => note.type === 'white')
          .map((note) => (
            <div
              key={note.name}
              role="button"
              aria-label={`Tecla de piano ${note.name}`}
              onMouseDown={() => handleInteractionStart(note)}
              onMouseUp={() => handleInteractionEnd(note.freq)}
              onMouseLeave={() => handleInteractionEnd(note.freq)}
              onTouchStart={(e) => { e.preventDefault(); handleInteractionStart(note); }}
              onTouchEnd={() => handleInteractionEnd(note.freq)}
              className={cn(
                "relative h-full flex-1 cursor-pointer rounded-b-md bg-white shadow-sm",
                "flex items-end justify-center pb-4 text-accent font-semibold text-2xl",
                { "bg-primary text-primary-foreground": activeNotes.has(note.freq) }
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
                aria-label={`Tecla de piano ${note.name}`}
                onMouseDown={(e) => { e.stopPropagation(); handleInteractionStart(note); }}
                onMouseUp={(e) => { e.stopPropagation(); handleInteractionEnd(note.freq); }}
                onMouseLeave={(e) => { e.stopPropagation(); handleInteractionEnd(note.freq); }}
                onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); handleInteractionStart(note); }}
                onTouchEnd={(e) => { e.stopPropagation(); handleInteractionEnd(note.freq); }}
                style={{ left: `calc(${leftPositionMap[index]} - 4%)` }}
                className={cn(
                  "absolute top-0 h-2/3 w-[8%] cursor-pointer bg-neutral-900 rounded-b-md z-10 shadow-md",
                  "flex items-end justify-center pb-2 text-primary-foreground text-xl font-semibold transition-colors",
                  { "bg-primary text-primary-foreground": activeNotes.has(note.freq) }
                )}
              >
                {note.name.replace('#','')}
              </div>
            )
          })}
      </div>
    </div>
  );
}
