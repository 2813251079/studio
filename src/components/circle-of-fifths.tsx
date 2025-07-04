'use client';

import { useState, useRef, useEffect } from 'react';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';
import { speakNoteAction } from '@/app/actions';
import { noteFrequencies } from '@/lib/noteFrequencies';

const t = (key: any, params: any = {}) => {
    let translation = translations.es[key as any] || key;
    if (params) {
        Object.keys(params).forEach(p => {
            const regex = new RegExp(`{${p}}`, 'g');
            translation = translation.replace(regex, params[p]);
        });
    }
    return translation;
};

const keys = [
  { major: { name: 'C', note: 'Do' }, minor: { name: 'Am', note: 'La' } },
  { major: { name: 'G', note: 'Sol' }, minor: { name: 'Em', note: 'Mi' } },
  { major: { name: 'D', note: 'Re' }, minor: { name: 'Bm', note: 'Si' } },
  { major: { name: 'A', note: 'La' }, minor: { name: 'F#m', note: 'Fa#' } },
  { major: { name: 'E', note: 'Mi' }, minor: { name: 'C#m', note: 'Do#' } },
  { major: { name: 'B', note: 'Si' }, minor: { name: 'G#m', note: 'Sol#' } },
  { major: { name: 'F#', note: 'Fa#' }, minor: { name: 'D#m', note: 'Re#' } },
  { major: { name: 'C#', note: 'Do#' }, minor: { name: 'A#m', note: 'La#' } },
  { major: { name: 'G#', note: 'Sol#' }, minor: { name: 'Fm', note: 'Fa' } },
  { major: { name: 'D#', note: 'Re#' }, minor: { name: 'Cm', note: 'Do' } },
  { major: { name: 'A#', note: 'La#' }, minor: { name: 'Gm', note: 'Sol' } },
  { major: { name: 'F', note: 'Fa' }, minor: { name: 'Dm', note: 'Re' } }
];

const KeySegment = ({ i, type, onKeySelect, activeKey }: {i:number, type: 'major'|'minor', onKeySelect: any, activeKey: any}) => {
    const radius = type === 'major' ? 150 : 100;
    const keyData = keys[i][type];
    const angle = (i * 30 - 90) * (Math.PI / 180); // Start at 12 o'clock
    const nextAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);
    const textRadius = type === 'major' ? 125 : 75;
    const textAngle = ((i + 0.5) * 30 - 90) * (Math.PI / 180);

    const x = 160 + textRadius * Math.cos(textAngle);
    const y = 160 + textRadius * Math.sin(textAngle);

    const pathData = [
        `M 160 ${160}`,
        `L ${160 + radius * Math.cos(angle)} ${160 + radius * Math.sin(angle)}`,
        `A ${radius} ${radius} 0 0 1 ${160 + radius * Math.cos(nextAngle)} ${160 + radius * Math.sin(nextAngle)}`,
        'Z'
    ].join(' ');

    const isActive = activeKey && (activeKey.name === keyData.name);
    const isRelative = activeKey && 
        ((activeKey.type === 'major' && keys[i].minor.name === activeKey.relative) || 
         (activeKey.type === 'minor' && keys[i].major.name === activeKey.relative));

    return (
        <g 
            onClick={() => onKeySelect(keyData, type, i)} 
            className="cursor-pointer group"
            role="button"
            aria-label={t(type === 'major' ? 'circle_of_fifths.key.major' : 'circle_of_fifths.key.minor', { key: keyData.name })}
        >
            <path 
                d={pathData} 
                className={cn(
                    "transition-all",
                    isActive ? "fill-primary" : "fill-secondary group-hover:fill-primary/50",
                    isRelative ? "fill-accent" : "",
                )}
            />
            <text x={x} y={y} dy="0.3em" textAnchor="middle" className={cn("text-lg font-semibold pointer-events-none", isActive ? "fill-primary-foreground" : "fill-foreground")}>
                {keyData.name}
            </text>
        </g>
    );
};


export default function CircleOfFifths() {
    const [activeKey, setActiveKey] = useState<{name: string, note: string, type: string, relative: string} | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const speechAudioRef = useRef<HTMLAudioElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== 'undefined') {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return () => {
            oscillatorRef.current?.stop();
            audioContextRef.current?.close();
        };
    }, []);

    const playNote = (noteName: string) => {
        const audioContext = audioContextRef.current;
        const freq = noteFrequencies[noteName];
        if (!audioContext || !freq) return;

        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
        }

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.frequency.value = freq;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.5, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();
        osc.stop(audioContext.currentTime + 1);

        oscillatorRef.current = osc;
    };

    const fetchAndPlaySpeech = async (speechText: string) => {
        try {
            const result = await speakNoteAction(speechText);
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

    const handleKeySelect = (keyData: {name: string, note: string}, type: 'major' | 'minor', index: number) => {
        const relative = type === 'major' ? keys[index].minor.name : keys[index].major.name;
        setActiveKey({ ...keyData, type, relative });
        playNote(keyData.note);
        const speechText = t(type === 'major' ? 'circle_of_fifths.key.major' : 'circle_of_fifths.key.minor', { key: keyData.note });
        fetchAndPlaySpeech(speechText);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
            <audio ref={speechAudioRef} className="hidden" />
            <div className="relative h-[320px] w-[320px]">
                {isMounted && (
                    <svg width="320" height="320" viewBox="0 0 320 320">
                        <circle cx="160" cy="160" r="150" fill="transparent" stroke="hsl(var(--border))" strokeWidth="1" />
                        <circle cx="160" cy="160" r="100" fill="transparent" stroke="hsl(var(--border))" strokeWidth="1" />
                        <g>
                            {keys.map((_, i) => <KeySegment key={`major-${i}`} i={i} type="major" onKeySelect={handleKeySelect} activeKey={activeKey} />)}
                        </g>
                        <g>
                            {keys.map((_, i) => <KeySegment key={`minor-${i}`} i={i} type="minor" onKeySelect={handleKeySelect} activeKey={activeKey} />)}
                        </g>
                    </svg>
                )}
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary w-full max-w-xs">
                <p className="text-xl font-semibold mb-2">
                    {t('circle_of_fifths.current_key')}
                </p>
                {activeKey ? (
                    <div className="space-y-1">
                        <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {activeKey.name} {activeKey.type === 'major' ? 'Mayor' : 'menor'}
                        </p>
                        <p className="text-muted-foreground">
                            Relativo: <span className="font-semibold text-accent">{activeKey.relative} {activeKey.type === 'major' ? 'menor' : 'Mayor'}</span>
                        </p>
                    </div>
                ) : (
                    <p className="text-2xl text-muted-foreground">{t('circle_of_fifths.no_key')}</p>
                )}
            </div>
        </div>
    );
}
