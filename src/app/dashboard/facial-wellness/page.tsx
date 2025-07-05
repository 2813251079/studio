'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { getFacialAnalysis } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Camera, AlertTriangle, Wand2, Bot, Smile, BarChart, ArrowRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const t = (key: any) => translations.es[key as any] || key;

const initialState = {
  data: undefined,
  error: undefined,
};

export default function FacialWellnessPage() {
  const [state, formAction] = useFormState(getFacialAnalysis, initialState);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: t('facial_wellness.camera_access_required'),
          description: t('facial_wellness.camera_access_description'),
        });
      }
    };
    getCameraPermission();
     return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const handleAnalyzeClick = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsAnalyzing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    const imageData = canvas.toDataURL('image/jpeg');
    const formData = new FormData();
    formData.append('imageData', imageData);

    // use a timeout to show loading state before submitting the form
    setTimeout(() => {
        formAction(formData);
    }, 500)
  };
  
  useEffect(() => {
    if (state.data || state.error) {
        setIsAnalyzing(false);
    }
  }, [state]);

  const getActivityLink = (activity: string, target: string) => {
    const pages: { [key: string]: string } = {
        'frequency': '/dashboard/frequencies',
        'harmonizer': '/dashboard/audio-enhancer',
        'companion': '/dashboard/inclusive-games',
        'simon': '/dashboard/inclusive-games',
        'tuner': '/dashboard/tuner',
    };
    const url = pages[activity] || '/dashboard';
    if(activity === 'companion' || activity === 'simon'){
        return `${url}?tab=${activity}`;
    }
    return url;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('facial_wellness.title')}</h1>
        <p className="text-muted-foreground">{t('facial_wellness.subtitle')}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>{t('facial_wellness.camera_title')}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="relative w-full aspect-[3/2] rounded-md overflow-hidden bg-secondary">
                    <video ref={videoRef} className={cn("w-full h-full object-cover transform -scale-x-100", isAnalyzing ? 'animate-pulse' : '')} autoPlay muted playsInline />
                    <canvas ref={canvasRef} className="hidden" />
                    {hasCameraPermission === false && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                            <h3 className="font-bold">{t('facial_wellness.camera_access_required')}</h3>
                            <p className="text-sm text-muted-foreground">{t('facial_wellness.camera_access_description')}</p>
                         </div>
                    )}
                </div>
            </CardContent>
             <CardContent className="flex justify-center">
                 <Button onClick={handleAnalyzeClick} disabled={!hasCameraPermission || isAnalyzing} size="lg">
                    {isAnalyzing ? (
                         <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            {t('facial_wellness.analyzing')}
                         </>
                    ) : (
                         <>
                            <Wand2 className="mr-2 h-5 w-5" />
                            {t('facial_wellness.analyze_button')}
                         </>
                    )}
                 </Button>
            </CardContent>
        </Card>
        
        <div className="space-y-4">
            {isAnalyzing && !state.data && !state.error && (
                <Card className="flex h-full flex-col items-center justify-center p-8 text-center">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground text-lg">{t('facial_wellness.analyzing')}</p>
                </Card>
            )}

            {state.error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>{t('error.toast.title')}</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}

            {state.data && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Bot className="h-6 w-6 text-accent" />
                            {t('facial_wellness.result.title')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                             <h3 className="font-semibold flex items-center gap-2"><Smile className="h-5 w-5 text-primary" />{t('facial_wellness.result.emotion')}</h3>
                             <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{state.data.emotion}</p>
                        </div>
                        <div className="space-y-2">
                             <h3 className="font-semibold flex items-center gap-2"><Heart className="h-5 w-5 text-primary" />{t('facial_wellness.result.observation')}</h3>
                             <p className="text-muted-foreground">{state.data.observation}</p>
                        </div>
                         <div className="space-y-3 p-4 bg-secondary rounded-lg">
                             <h3 className="font-semibold flex items-center gap-2"><BarChart className="h-5 w-5 text-primary" />{t('facial_wellness.result.suggestion')}</h3>
                             <p className="text-muted-foreground">{state.data.suggestion}</p>
                             <Button asChild>
                                <Link href={getActivityLink(state.data.suggestedActivity, state.data.suggestedActivityTarget)}>
                                    {t('facial_wellness.result.suggestion_cta')}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                             </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
            
            {!isAnalyzing && !state.data && !state.error && (
                <Card className="flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center border-dashed">
                    <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('facial_wellness.placeholder_title')}</h3>
                    <p className="text-muted-foreground mt-2 max-w-sm">{t('facial_wellness.placeholder_subtitle')}</p>
                </Card>
            )}

        </div>
      </div>
    </div>
  );
}
