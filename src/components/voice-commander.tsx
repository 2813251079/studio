'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

const t = (key: any) => translations.es[key as any] || key;

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}
declare var SpeechRecognition: { new(): SpeechRecognition };
declare var webkitSpeechRecognition: { new(): SpeechRecognition };

const commandToRouteMap: { [key: string]: string } = {
  'inicio': '/dashboard',
  'frecuencias': '/dashboard/frequencies',
  'armonizar espacio': '/dashboard/audio-enhancer',
  'armonizar video': '/dashboard/video-harmonizer',
  'herramientas inclusivas': '/dashboard/inclusive-games',
  'producción musical': '/dashboard/production',
  'afinador': '/dashboard/tuner',
  'bienestar facial': '/dashboard/facial-wellness',
  'conocimiento': '/dashboard/education',
  'educación': '/education',
  'precios': '/pricing',
};

export default function VoiceCommander() {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.warn('Speech Recognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase().trim();
      handleCommand(command);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
       toast({
        variant: 'destructive',
        title: t('voice_commander.error'),
        description: event.error,
      });
      setIsListening(false);
    };
    
    recognition.onend = () => {
        setIsListening(false);
    };

  }, [router, toast]);

  const handleCommand = (command: string) => {
     let fullCommand = command;
     if (command.startsWith('ir a')) {
        fullCommand = command.substring(5).trim();
     } else if (command.startsWith('abrir')) {
        fullCommand = command.substring(6).trim();
     }

     const targetRoute = commandToRouteMap[fullCommand];

    if (targetRoute) {
       toast({
        title: t('voice_commander.command_recognized'),
        description: `Navegando a ${fullCommand}...`,
      });
      router.push(targetRoute);
    } else {
      toast({
        variant: 'destructive',
        title: t('voice_commander.command_not_recognized'),
        description: `Comando recibido: "${command}"`,
      });
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
          title: t('voice_commander.listening')
      })
    }
  };

  if (!recognitionRef.current) {
    return null; // Don't render if API is not supported
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={toggleListening} variant="ghost" size="icon" className={cn(isListening && 'text-destructive animate-pulse')}>
            {isListening ? <MicOff /> : <Mic />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('voice_commander.tooltip')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
