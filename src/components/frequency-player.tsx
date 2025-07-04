'use client';

import { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, PauseCircle } from "lucide-react";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

interface FrequencyPlayerProps {
  frequency: number;
  title: string;
  description: string;
  isPlaying: boolean;
  onPlayToggle: () => void;
}

export default function FrequencyPlayer({ frequency, title, description, isPlaying, onPlayToggle }: FrequencyPlayerProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Effect for handling audio playback logic
  useEffect(() => {
    // Initialize audio context on first user interaction if not already present
    if (isPlaying && !audioContextRef.current && typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    if (isPlaying) {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Stop any previous sound
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1); 

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();

      oscillatorRef.current = oscillator;
      gainRef.current = gainNode;

    } else {
      if (oscillatorRef.current && gainRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2); 
        oscillatorRef.current.stop(audioContext.currentTime + 0.2);
        oscillatorRef.current = null;
        gainRef.current = null;
      }
    }
  }, [isPlaying, frequency]);

  // Effect for cleaning up resources on unmount
  useEffect(() => {
    return () => {
      // Stop the oscillator if it's playing
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      // Close the audio context
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(console.error);
        audioContextRef.current = null;
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="pt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onPlayToggle}>
          {isPlaying ? <PauseCircle className="mr-2 h-4 w-4" /> : <PlayCircle className="mr-2 h-4 w-4" />}
          {isPlaying ? t('frequencies.pause') : t('frequencies.play')}
        </Button>
      </CardContent>
    </Card>
  );
}
