'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

const t = (key: any) => translations.es[key as any] || key;

const noteFrequencies: { [note: string]: number } = {
    'C': 261.63, 'C#': 277.18, 'Db': 277.18,
    'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
    'E': 329.63,
    'F': 349.23, 'F#': 369.99, 'Gb': 369.99,
    'G': 392.00, 'G#': 415.30, 'Ab': 415.30,
    'A': 440.00, 'A#': 466.16, 'Bb': 466.16,
    'B': 493.88,
};

const circleKeys = [
    { major: 'C', minor: 'Am', triad: ['C', 'E', 'G'] },
    { major: 'G', minor: 'Em', triad: ['G', 'B', 'D'] },
    { major: 'D', minor: 'Bm', triad: ['D', 'F#', 'A'] },
    { major: 'A', minor: 'F#m', triad: ['A', 'C#', 'E'] },
    { major: 'E', minor: 'C#m', triad: ['E', 'G#', 'B'] },
    { major: 'B', minor: 'G#m', triad: ['B', 'D#', 'F#'] },
    { major: 'F#', minor: 'D#m', triad: ['F#', 'A#', 'C#'] },
    { major: 'Db', minor: 'Bbm', triad: ['Db', 'F', 'Ab'] },
    { major: 'Ab', minor: 'Fm', triad: ['Ab', 'C', 'Eb'] },
    { major: 'Eb', minor: 'Cm', triad: ['Eb', 'G', 'Bb'] },
    { major: 'Bb', minor: 'Gm', triad: ['Bb', 'D', 'F'] },
    { major: 'F', minor: 'Dm', triad: ['F', 'A', 'C'] },
];

const playChord = (audioContext: AudioContext, frequencies: number[]) => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    const now = audioContext.currentTime;
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    gainNode.connect(audioContext.destination);

    frequencies.forEach(freq => {
        if (!freq) return;
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        oscillator.connect(gainNode);
        oscillator.start(now);
        oscillator.stop(now + 0.5);
    });
};

export default function CircleOfFifths() {
    const [selectedKey, setSelectedKey] = useState<typeof circleKeys[0] | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return () => {
            audioContextRef.current?.close();
        };
    }, []);

    const handleKeyClick = (keyInfo: typeof circleKeys[0]) => {
        setSelectedKey(keyInfo);
        if (audioContextRef.current) {
            const frequencies = keyInfo.triad.map(note => noteFrequencies[note]);
            if (frequencies.every(f => f)) {
                playChord(audioContextRef.current, frequencies as number[]);
            }
        }
    };

    const radius = 150;
    const center = 160;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('music_production.circle_of_fifths.title')}</CardTitle>
                <CardDescription>{t('music_production.circle_of_fifths.description')}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                <div className="relative w-[320px] h-[320px]">
                    <svg viewBox="0 0 320 320" className="w-full h-full">
                        <circle cx={center} cy={center} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="0" />
                        <circle cx={center} cy={center} r={radius * 0.6} fill="none" stroke="hsl(var(--border))" strokeWidth="0" />
                        {circleKeys.map((keyInfo, i) => {
                            const angle = (i / 12) * 2 * Math.PI - Math.PI / 2 - Math.PI / 12;
                            const nextAngle = ((i + 1) / 12) * 2 * Math.PI - Math.PI / 2 - Math.PI / 12;
                            
                            const x1 = center + radius * Math.cos(angle);
                            const y1 = center + radius * Math.sin(angle);
                            const x2 = center + radius * Math.cos(nextAngle);
                            const y2 = center + radius * Math.sin(nextAngle);
                            
                            const pathData = `M ${center},${center} L ${x1},${y1} A ${radius},${radius} 0 0,1 ${x2},${y2} Z`;

                            const textAngle = angle + (Math.PI / 12);
                            const majorX = center + (radius * 0.8) * Math.cos(textAngle);
                            const majorY = center + (radius * 0.8) * Math.sin(textAngle);
                            const minorX = center + (radius * 0.45) * Math.cos(textAngle);
                            const minorY = center + (radius * 0.45) * Math.sin(textAngle);

                            const isSelected = selectedKey?.major === keyInfo.major;
                            const fillColor = i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))';

                            return (
                                <g key={keyInfo.major} onClick={() => handleKeyClick(keyInfo)} className="cursor-pointer group">
                                    <path
                                        d={pathData}
                                        fill={fillColor}
                                        stroke={isSelected ? 'hsl(var(--ring))' : 'transparent'}
                                        strokeWidth={isSelected ? 3 : 0}
                                        className="transition-all group-hover:opacity-80"
                                    />
                                    <text
                                        x={majorX}
                                        y={majorY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className={cn(
                                            "text-lg font-bold fill-primary-foreground pointer-events-none",
                                            isSelected && "font-extrabold"
                                        )}
                                    >
                                        {keyInfo.major}
                                    </text>
                                     <text
                                        x={minorX}
                                        y={minorY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className={cn("text-base pointer-events-none", isSelected ? "fill-primary-foreground" : "fill-primary-foreground/80")}
                                    >
                                        {keyInfo.minor}
                                    </text>
                                </g>
                            );
                        })}
                         <circle cx={center} cy={center} r={radius * 0.3} fill="hsl(var(--background))" />
                         <image href="https://placehold.co/128x128.png" data-ai-hint="logo soundwave" x={center - 30} y={center - 30} height="60" width="60" />
                    </svg>
                </div>
                {selectedKey && (
                    <div className="text-center p-4 rounded-lg bg-secondary w-full max-w-sm">
                        <p className="text-lg font-semibold">{t('music_production.circle_of_fifths.selected_key')}: <span className="text-primary">{selectedKey.major} / {selectedKey.minor}</span></p>
                        <p className="text-muted-foreground">{t('music_production.circle_of_fifths.triad_notes')}: {selectedKey.triad.join(', ')}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
