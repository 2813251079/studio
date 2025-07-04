'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';
import { noteFrequencies } from '@/lib/noteFrequencies';

const t = (key: string) => (translations.es as any)[key] || key;

const circleKeys = [
    { major: 'Do', minor: 'Lam', triad: ['Do', 'Mi', 'Sol'], signature: '0' },
    { major: 'Sol', minor: 'Mim', triad: ['Sol', 'Si', 'Re'], signature: '1#' },
    { major: 'Re', minor: 'Sim', triad: ['Re', 'Fa#', 'La'], signature: '2#' },
    { major: 'La', minor: 'Fa#m', triad: ['La', 'Do#', 'Mi'], signature: '3#' },
    { major: 'Mi', minor: 'Do#m', triad: ['Mi', 'Sol#', 'Si'], signature: '4#' },
    { major: 'Si', minor: 'Sol#m', triad: ['Si', 'Re#', 'Fa#'], signature: '5#' },
    { major: 'Fa#', minor: 'Re#m', triad: ['Fa#', 'La#', 'Do#'], signature: '6#' },
    { major: 'Reb', minor: 'Sibm', triad: ['Reb', 'Fa', 'Lab'], signature: '5b' },
    { major: 'Lab', minor: 'Fam', triad: ['Lab', 'Do', 'Mib'], signature: '4b' },
    { major: 'Mib', minor: 'Dom', triad: ['Mib', 'Sol', 'Sib'], signature: '3b' },
    { major: 'Sib', minor: 'Solm', triad: ['Sib', 'Re', 'Fa'], signature: '2b' },
    { major: 'Fa', minor: 'Rem', triad: ['Fa', 'La', 'Do'], signature: '1b' },
];

const playChord = (audioContext: AudioContext, notes: string[]) => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    const now = audioContext.currentTime;
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    gainNode.connect(audioContext.destination);

    notes.forEach(note => {
        const freq = noteFrequencies[note];
        if (!freq) return;
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        oscillator.connect(gainNode);
        oscillator.start(now);
        oscillator.stop(now + 0.5);
    });
};

const Segment = ({ i, center, outerRadius, innerRadius, keyInfo, selected, onSelect }: any) => {
    const startAngle = (i / 12) * 360 - 90 - 15;
    const endAngle = ((i + 1) / 12) * 360 - 90 - 15;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    
    const x1_outer = center + outerRadius * Math.cos(toRad(startAngle));
    const y1_outer = center + outerRadius * Math.sin(toRad(startAngle));
    const x2_outer = center + outerRadius * Math.cos(toRad(endAngle));
    const y2_outer = center + outerRadius * Math.sin(toRad(endAngle));
    
    const x1_inner = center + innerRadius * Math.cos(toRad(startAngle));
    const y1_inner = center + innerRadius * Math.sin(toRad(startAngle));
    const x2_inner = center + innerRadius * Math.cos(toRad(endAngle));
    const y2_inner = center + innerRadius * Math.sin(toRad(endAngle));

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const pathData = [
        `M ${x1_inner} ${y1_inner}`,
        `L ${x1_outer} ${y1_outer}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2_outer} ${y2_outer}`,
        `L ${x2_inner} ${y2_inner}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1_inner} ${y1_inner}`,
        "Z"
    ].join(" ");
    
    return (
        <g 
            onClick={() => onSelect(keyInfo)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(keyInfo); }}
            role="button"
            tabIndex={0}
            aria-label={`Tonalidad de ${keyInfo.major} mayor o ${keyInfo.minor} menor. Armadura: ${keyInfo.signature}`}
            className="cursor-pointer group focus:outline-none focus:ring-2 focus:ring-ring rounded-lg"
        >
            <path
                d={pathData}
                fill={selected ? 'hsl(var(--primary))' : (i % 2 === 0 ? 'hsl(var(--secondary))' : 'hsl(var(--muted))')}
                stroke="transparent"
                strokeWidth="2"
                className="transition-all group-hover:opacity-80"
            />
        </g>
    );
};

export default function CircleOfFifths() {
    const [selectedKey, setSelectedKey] = useState<(typeof circleKeys[0]) | null>(circleKeys[0]);
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
            playChord(audioContextRef.current, keyInfo.triad);
        }
    };
    
    const size = 400;
    const center = size / 2;
    const keySignatureRadius = useMemo(() => center * 0.95, [center]);
    const majorRadius = useMemo(() => center * 0.8, [center]);
    const minorRadius = useMemo(() => center * 0.5, [center]);

    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const getTextCoords = (radius: number, index: number) => {
        const angle = (index / 12) * 360 - 90;
        const x = center + radius * Math.cos(toRad(angle));
        const y = center + radius * Math.sin(toRad(angle));
        return { x, y };
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative" style={{ width: size, height: size }}>
                <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
                    {/* Segments */}
                    {circleKeys.map((keyInfo, i) => (
                        <Segment 
                            key={keyInfo.major}
                            i={i}
                            center={center}
                            outerRadius={keySignatureRadius}
                            innerRadius={center * 0.3}
                            keyInfo={keyInfo}
                            selected={selectedKey?.major === keyInfo.major}
                            onSelect={handleKeyClick}
                        />
                    ))}

                     {/* Background for text */}
                    <circle cx={center} cy={center} r={keySignatureRadius} fill="none" />
                    <circle cx={center} cy={center} r={center * 0.65} fill="hsl(var(--secondary))" stroke="transparent" />
                    <circle cx={center} cy={center} r={center * 0.3} fill="hsl(var(--card))" />

                    {/* Text Labels */}
                    {circleKeys.map((keyInfo, i) => {
                        const majorCoords = getTextCoords(majorRadius, i);
                        const minorCoords = getTextCoords(minorRadius, i);
                        const signatureCoords = getTextCoords(keySignatureRadius, i);
                         const isSelected = selectedKey?.major === keyInfo.major;

                        return (
                            <g key={`text-${keyInfo.major}`} className="pointer-events-none">
                                <text x={signatureCoords.x} y={signatureCoords.y} textAnchor="middle" dominantBaseline="middle" className="text-sm font-bold fill-foreground/70">{keyInfo.signature}</text>
                                <text x={majorCoords.x} y={majorCoords.y} textAnchor="middle" dominantBaseline="middle" className={cn("text-xl font-bold", isSelected ? 'fill-primary' : 'fill-foreground' )}>{keyInfo.major}</text>
                                <text x={minorCoords.x} y={minorCoords.y} textAnchor="middle" dominantBaseline="middle" className={cn("text-lg", isSelected ? 'fill-primary' : 'fill-foreground/80')}>{keyInfo.minor}</text>
                            </g>
                        )
                    })}

                    {/* Center Treble Clef */}
                    <g transform={`translate(${center - 25}, ${center - 40}) scale(0.15)`}>
                        <path d="M162.82,236.43c2.42-32.42-10.7-53.76-32.66-64.6-19.46-9.61-39.4-7.39-53.51,6.58-13.1,12.95-17.65,32.33-12.29,50.1,13.75,45.47,56,66.5,91,66.5,23.36,0,44.3-8.82,60-24.81,21.57-21.94,32.34-53.25,32.34-92.4,0-36.88-11.83-66.4-35.48-88.58-25.2-23.74-59.44-35.61-102.72-35.61-46.12,0-85.5,13.46-118.12,40.37-2.6,2.14-2.86,4.72-2.86,6.84,0,2.38,1.4,5.2,4.19,5.2,2.38,0,4.52-1.66,6.3-3.57,29.74-24.58,65.3-37.19,109.11-37.19,39.73,0,70.54,10.7,92.4,32.09,20.25,19.86,30.37,47.11,30.37,81.75,0,36.62-10.44,65.3-31.33,86.06-15.53,15.53-35.21,23.36-58.88,23.36-32.09,0-70.28-20.25-82.58-60.75-3.57-11.57.26-24.32,8.32-33.58,11.3-13.23,28.8-15.53,44.56-6.57,17.4,9.87,27.09,29.74,25.46,55.31-.53,8.58-1.93,16.4-4.19,23.36-3.84,11.83-9.87,20.78-18.15,26.75-8.28,5.97-18.15,9.08-29.74,9.08-16.13,0-29.21-6.57-39.2-19.59-9.99-13.01-14.8-29.48-14.27-49.57.53-20.09,7.13-37.44,20-52.12,12.87-14.67,28.54-21.49,47.11-20.51,19.32.79,34.95,9.35,46.85,25.45l.26.26s-10.44-2.26-16.92-2.26c-20.25,0-36.1,6.84-47.64,20.51-11.54,13.68-17.4,31.55-17.4,53.76,0,23.88,6.84,43.43,20.51,58.62,13.68,15.2,31.28,22.83,52.91,22.83,23.88,0,43.17-8.56,58.09-25.71,15.78-18.15,23.67-42.38,23.67-72.71,0-28.28-7.39-51.05-22.09-68.36-15.2-17.9-35.74-26.85-61.55-26.85-27.49,0-50.27,8.56-68.36,25.71-17.07,16.39-25.71,37.19-25.71,62.34,0,29.07,10.18,52.65,30.5,70.74,21.62,19.06,49.31,28.59,83.11,28.59,37.19,0,67.83-11.83,92.14-35.48,25.19-24.64,37.78-58.09,37.78-100.34,0-43.17-12.87-77.41-38.67-102.72-26.85-26.32-61.81-39.48-104.89-39.48-52.12,0-94.78,16.92-128.06,50.8-2.63,2.63-3.03,5.33-3.03,7.65,0,2.38,1.26,5.33,3.82,5.33,2.56,0,4.99-1.52,7.1-3.56C93.26,38.16,134.4,21.5,185.12,21.5c46.85,0,84.49,14.79,112.81,44.38,29.34,30.62,44.02,69.87,44.02,117.86,0,46.06-14.53,83.37-43.5,111.95-29.21,28.84-67.57,43.26-115.19,43.26-50.8,0-91.1-17.65-120.48-52.91-2.9-3.44-4.36-5.87-4.36-7.39,0-1.26,1.4-3.19,4.19-3.19,2.26,0,4.52,1.66,6.57,4.45,26.85,32.34,63.3,48.56,109.11,48.56,44.56,0,80.19-14.27,106.9-42.84,26.72-28.56,40.08-65.04,40.08-109.37,0-47.9-15.2-85.34-45.58-112.28C211.75,4.72,171.35-1,123.69-1,72.48-1,31.2,14.53-2.17,45.34c-2.9,2.63-3.82,5.33-3.82,7.91,0,2.56,1.4,5.46,4.19,5.46s4.96-1.78,7.39-4.19C40.21,19.26,79.07,3.5,123.69,3.5c45.47,0,82.84,13.68,112.28,41.1,28.3,26.58,42.38,61.81,42.38,105.68s-13.46,80.19-40.37,108.84c-27.21,28.9-63.04,43.43-107.43,43.43-41.04,0-75.54-12.74-103.51-38.13-2.9-2.63-5.2-3.44-6.57-3.44-2.14,0-3.82,2.14-3.82,6.04,0,3.84,1.4,7.39,4.19,10.7,30.37,34.87,68.89,52.38,115.45,52.38,49.83,0,89.79-15.51,120.22-46.59,29.87-30.75,44.81-70.54,44.81-119.38Z" fill="hsl(var(--foreground))"/>
                    </g>
                </svg>
            </div>

            {selectedKey && (
                <div className="text-center p-4 rounded-lg bg-secondary w-full max-w-sm">
                    <p className="text-2xl font-semibold">{t('music_production.circle_of_fifths.selected_key')}: <span className="text-primary">{selectedKey.major} / {selectedKey.minor}</span></p>
                    <p className="text-muted-foreground text-xl">{t('music_production.circle_of_fifths.triad_notes')}: {selectedKey.triad.join(', ')}</p>
                </div>
            )}
        </div>
    );
}
