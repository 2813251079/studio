'use client';

import { useState, useRef, useEffect } from 'react';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';
import { speakNoteAction } from '@/app/actions';

const t = (key: any) => translations.es[key as any] || key;

// Note names in Spanish for display and TTS
const noteNamesEs = ["Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si", "Do", "Do#", "Re", "Re#"];
const openStringNamesEs = ['Mi (grave)', 'La', 'Re', 'Sol', 'Si', 'Mi (aguda)'];

// Frequencies for standard tuning EADGBe, for 12 frets + open string
const frequencies: number[][] = [
  // String 1 (High E) - E4 to E5
  [329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25],
  // String 2 (B) - B3 to B4
  [246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88],
  // String 3 (G) - G3 to G4
  [196.00, 207.65, 220.00, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00],
  // String 4 (D) - D3 to D4
  [146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00, 233.08, 246.94, 261.63, 277.18, 293.66],
  // String 5 (A) - A2 to A3
  [110.00, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00],
  // String 6 (Low E) - E2 to E3
  [82.41, 87.31, 92.50, 98.00, 103.83, 110.00, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81],
];

// Open strings start note indices in noteNamesEs (E, A, D, G, B, E)
const openStringNoteIndices = [0, 5, 10, 3, 7, 0]; 

// Fret marker positions: { fret: [strings] }
const fretMarkers: { [key: number]: number[] } = {
  3: [3],
  5: [3],
  7: [3],
  9: [3],
  12: [2, 4],
};

const Fret = ({ stringIndex, fretIndex, onPlay, isActive }: {stringIndex: number, fretIndex: number, onPlay: (freq: number, name: string) => void, isActive: boolean}) => {
    const noteName = noteNamesEs[(openStringNoteIndices[stringIndex] + fretIndex) % 12];
    const freq = frequencies[stringIndex][fretIndex];
    
    return (
        <div 
            className="relative flex-1 flex items-center justify-center h-full"
            onMouseDown={() => onPlay(freq, noteName)}
            onTouchStart={(e) => { e.preventDefault(); onPlay(freq, noteName); }}
            role="button"
            tabIndex={0}
            aria-label={`Cuerda ${6-stringIndex}, Traste ${fretIndex}: Nota ${noteName}`}
        >
            <div className={cn(
                "w-8 h-8 rounded-full transition-all flex items-center justify-center cursor-pointer",
                "hover:bg-primary/80 hover:scale-110",
                 isActive ? "bg-primary scale-110 shadow-lg" : "bg-transparent",
            )}>
                {isActive && <span className="text-primary-foreground font-bold">{noteName}</span>}
            </div>
        </div>
    );
};


export default function AcousticGuitar() {
  const [activeNote, setActiveNote] = useState<{ freq: number; name: string } | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const speechAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
        oscillatorRef.current?.stop();
        audioContextRef.current?.close();
    };
  }, []);

  const playNote = (freq: number, name: string) => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (oscillatorRef.current) {
        oscillatorRef.current.stop();
    }

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.frequency.value = freq;
    osc.type = 'triangle';
    
    gain.gain.setValueAtTime(0.4, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();

    oscillatorRef.current = osc;
    setActiveNote({ freq, name });
    fetchAndPlaySpeech(name);

    const timer = setTimeout(() => {
        setActiveNote(null);
    }, 1500);

    return () => clearTimeout(timer);
  };
  
  const fetchAndPlaySpeech = async (noteName: string) => {
    try {
      // Use a simpler name for TTS
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

  return (
    <div className="flex flex-col items-center gap-6 w-full">
        <audio ref={speechAudioRef} className="hidden" />
        <div 
            className="w-full max-w-5xl bg-gradient-to-br from-yellow-900 via-amber-800 to-yellow-900 p-4 rounded-lg shadow-2xl overflow-x-auto"
            style={{fontFamily: 'sans-serif'}}
        >
            {/* Fretboard */}
            <div className="flex relative min-w-[700px]">
                {/* Nut */}
                <div className="w-[4%] bg-slate-200 rounded-l-md border-r-2 border-slate-400 h-auto flex flex-col-reverse justify-around items-center py-2">
                    {Array.from({ length: 6 }).map((_, stringIndex) => (
                        <div 
                            key={`open-string-${stringIndex}`}
                            className="flex items-center justify-center h-12 w-full"
                            onMouseDown={() => playNote(frequencies[stringIndex][0], openStringNamesEs[stringIndex])}
                            onTouchStart={(e) => { e.preventDefault(); playNote(frequencies[stringIndex][0], openStringNamesEs[stringIndex]); }}
                            role="button" tabIndex={0}
                            aria-label={`Cuerda ${6-stringIndex}, al aire`}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full transition-all flex items-center justify-center cursor-pointer",
                                "hover:bg-primary/80 hover:scale-110",
                                activeNote?.freq === frequencies[stringIndex][0] ? "bg-primary scale-110 shadow-lg" : "bg-transparent",
                            )}>
                                 {activeNote?.freq === frequencies[stringIndex][0] && <span className="text-primary-foreground font-bold text-xs">{noteNamesEs[openStringNoteIndices[stringIndex]]}</span>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-[96%] flex flex-col-reverse gap-1 relative">
                    {/* Frets Lines*/}
                    {Array.from({ length: 12 }).map((_, fretIndex) => (
                        <div 
                            key={`fret-${fretIndex}`}
                            className="absolute h-full bg-slate-400/50 z-0"
                            style={{ left: `calc(${(fretIndex + 1) / 12 * 100}% - 1.5px)`, width: fretIndex < 5 ? '3px' : '4px' }}
                        />
                    ))}

                    {/* Fret markers */}
                    {Object.entries(fretMarkers).map(([fret, strings]) => (
                        strings.map(s_idx => (
                            <div key={`marker-${fret}-${s_idx}`}
                                className="absolute w-4 h-4 bg-slate-200/40 rounded-full pointer-events-none"
                                style={{
                                    left: `calc(${((parseInt(fret) - 0.5) / 12) * 100}%)`,
                                    top: `calc(${((s_idx - 0.5) / 6) * 100}%)`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                        ))
                    ))}

                    {/* Strings */}
                    {Array.from({ length: 6 }).map((_, stringIndex) => (
                        <div key={stringIndex} className="flex items-center h-12 z-10">
                            {/* String line */}
                            <div 
                                className="absolute w-full bg-gradient-to-r from-slate-300 via-white to-slate-400 pointer-events-none"
                                style={{ height: `${stringIndex + 1}px`, top: `calc(${(stringIndex / 5) * 80 + 10}%)` }}
                            />
                            
                            {/* Frets on string */}
                            <div className="flex w-full h-full">
                                {Array.from({ length: 12 }).map((_, fretIndex) => (
                                    <Fret
                                        key={`fret-${stringIndex}-${fretIndex + 1}`}
                                        stringIndex={stringIndex}
                                        fretIndex={fretIndex + 1}
                                        onPlay={playNote}
                                        isActive={activeNote?.freq === frequencies[stringIndex][fretIndex + 1]}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {activeNote && (
            <div className="text-center p-4 rounded-lg bg-secondary w-full max-w-sm mt-4">
                <p className="text-2xl font-semibold">
                    {t('music_production.guitar.current_note')}: <span className="text-primary">{activeNote.name}</span>
                </p>
                <p className="text-muted-foreground text-xl">
                    Frecuencia: {activeNote.freq.toFixed(2)} Hz
                </p>
            </div>
        )}
    </div>
  );
}
