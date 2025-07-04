'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Mic, MicOff, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { translations } from '@/lib/translations';
import { noteFrequencies } from '@/lib/noteFrequencies';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from './ui/label';

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

const noteStrings = ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"];

const getNoteFromPitch = (frequency: number, referenceA4: number): { noteIndex: number, cents: number } => {
    const noteNum = 12 * (Math.log(frequency / referenceA4) / Math.log(2));
    const roundedNoteNum = Math.round(noteNum);
    const noteIndex = (roundedNoteNum + 57) % 12; // 57 = A4's index from C0
    const cents = Math.floor(100 * (noteNum - roundedNoteNum));
    return { noteIndex, cents };
};

export default function ChromaticTuner() {
    const [noteName, setNoteName] = useState('--');
    const [frequency, setFrequency] = useState(0);
    const [cents, setCents] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [referenceA4, setReferenceA4] = useState(440);
    
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const animationFrameId = useRef<number | null>(null);

    const updatePitch = useCallback(() => {
        if (!analyserRef.current || !audioContextRef.current) return;

        const bufferLength = analyserRef.current.fftSize;
        const buffer = new Float32Array(bufferLength);
        analyserRef.current.getFloatTimeDomainData(buffer);

        let rms = 0;
        for (let i = 0; i < bufferLength; i++) {
            const val = buffer[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / bufferLength);

        if (rms < 0.01) { // Not enough signal
            animationFrameId.current = requestAnimationFrame(updatePitch);
            return;
        }

        // Autocorrelation to find the fundamental frequency.
        let bestOffset = -1;
        let bestCorrelation = 0;
        const sampleRate = audioContextRef.current.sampleRate;
        const minSamples = Math.floor(sampleRate / 800); // 800Hz max
        const maxSamples = Math.floor(sampleRate / 40);  // 40Hz min

        for (let offset = minSamples; offset < maxSamples; offset++) {
            let correlation = 0;
            for (let i = 0; i < maxSamples; i++) {
                correlation += buffer[i] * buffer[i + offset];
            }
            correlation /= maxSamples;
            if (correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        }
        
        if (bestCorrelation > 0.9) {
            const pitch = sampleRate / bestOffset;
            setFrequency(pitch);
            const { noteIndex, cents } = getNoteFromPitch(pitch, referenceA4);
            setNoteName(noteStrings[noteIndex]);
            setCents(cents);
        }

        animationFrameId.current = requestAnimationFrame(updatePitch);

    }, [referenceA4]);
    
    const startListening = async () => {
        if (isListening || typeof window === 'undefined') return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContextRef.current = context;
            
            const analyser = context.createAnalyser();
            analyser.fftSize = 2048;
            analyserRef.current = analyser;

            const source = context.createMediaStreamSource(stream);
            source.connect(analyser);
            sourceRef.current = source;

            setIsListening(true);
            animationFrameId.current = requestAnimationFrame(updatePitch);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Error al acceder al micrófono. Por favor, asegúrate de haber dado permiso.');
        }
    };

    const stopListening = useCallback(() => {
        if (!isListening) return;

        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }

        sourceRef.current?.disconnect();
        streamRef.current?.getTracks().forEach(track => track.stop());
        audioContextRef.current?.close();

        setIsListening(false);
        setNoteName('--');
        setFrequency(0);
        setCents(0);
    }, [isListening]);

    useEffect(() => {
      return () => {
        stopListening();
      };
    }, [stopListening]);

    const getTuningStatus = () => {
        if (cents > 10) return t('tuner.cents_high');
        if (cents < -10) return t('tuner.cents_low');
        return t('tuner.in_tune');
    }
    const statusColor = cents > 10 || cents < -10 ? 'text-destructive' : 'text-green-500';

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6 flex flex-col items-center gap-6">
                 <div className="w-full flex justify-center items-center gap-4">
                    <Label htmlFor="referenceA" className="text-muted-foreground">{t('tuner.reference_a')}</Label>
                    <Select value={referenceA4.toString()} onValueChange={(val) => setReferenceA4(Number(val))} disabled={isListening}>
                        <SelectTrigger id="referenceA" className="w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="432">432 Hz</SelectItem>
                            <SelectItem value="440">440 Hz</SelectItem>
                            <SelectItem value="442">442 Hz</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                <div className="relative flex items-center justify-center w-64 h-64">
                    <div className="absolute w-full h-full rounded-full bg-secondary" />
                    <div className="absolute w-[90%] h-[90%] rounded-full bg-background" />
                    <div className="z-10 text-center">
                        <div className="text-7xl font-bold flex items-center justify-center">
                            {noteName.includes('#') ? (
                                <>
                                    <span>{noteName.slice(0, -1)}</span>
                                    <span className="text-4xl text-primary -mt-3">#</span>
                                </>
                            ) : (
                                <span>{noteName}</span>
                            )}
                        </div>
                         <div className="text-muted-foreground text-sm">
                            {isListening ? t('tuner.frequency') + `: ${frequency.toFixed(2)} Hz` : t('tuner.listening')}
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-2 text-center">
                    <div className={cn("text-2xl font-semibold", statusColor)}>
                        {isListening ? getTuningStatus() : '--'}
                    </div>
                    <div className="relative w-full h-2 rounded-full bg-secondary overflow-hidden">
                        <div className="absolute w-1 h-full bg-primary left-1/2 -translate-x-1/2" />
                        {isListening && <div 
                            className="absolute h-full w-2 bg-accent rounded-full transition-transform duration-75"
                            style={{ transform: `translateX(calc(-50% + ${cents * 2}px))`}}
                        />}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>-50</span>
                        <span>cents</span>
                        <span>+50</span>
                    </div>
                </div>

                <Button onClick={isListening ? stopListening : startListening} size="lg" className="w-full">
                    {isListening ? (
                        <>
                            <MicOff className="mr-2" /> {t('tuner.stop')}
                        </>
                    ) : (
                        <>
                            <Mic className="mr-2" /> {t('tuner.start')}
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
