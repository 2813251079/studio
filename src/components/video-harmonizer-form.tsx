'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { getHarmonizedVideo } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Film, AlertCircle, Bot, Clapperboard, Music, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';

const t = (key: any) => translations.es[key as any] || key;

const initialState = {
  data: undefined,
  error: undefined,
  fieldErrors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('video_harmonizer.form.submit_button.loading')}
        </>
      ) : (
        <>
          <Film className="mr-2 h-4 w-4" />
          {t('video_harmonizer.form.submit_button')}
        </>
      )}
    </Button>
  );
}

export default function VideoHarmonizerForm() {
  const [state, formAction] = useActionState(getHarmonizedVideo, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state.error && !state.fieldErrors) {
      toast({
        variant: 'destructive',
        title: t('error.toast.title'),
        description: state.error,
      });
    }
  }, [state, toast]);

  useEffect(() => {
    if (state.data) {
      formRef.current?.reset();
    }
  }, [state.data]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <form ref={formRef} action={formAction}>
          <CardHeader>
              <CardTitle>{t('video_harmonizer.form.title')}</CardTitle>
              <CardDescription>{t('video_harmonizer.form.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">{t('video_harmonizer.form.scene_label')}</Label>
              <Textarea
                id="description"
                name="description"
                placeholder={t('video_harmonizer.form.scene_placeholder')}
                rows={8}
              />
              {state.fieldErrors?.description && <p className="text-sm font-medium text-destructive">{state.fieldErrors.description[0]}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        {useFormStatus().pending && (
           <Card className="flex h-full flex-col items-center justify-center p-8 text-center animate-pulse">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground text-lg">{t('video_harmonizer.result.loading')}</p>
           </Card>
        )}
        
        {state.error && !state.fieldErrors && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('error.toast.title')}</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.data && (
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-accent" />
                {t('video_harmonizer.result.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {state.data.imageUrl && (
                    <div className="aspect-video relative w-full overflow-hidden rounded-lg border">
                        <Image src={state.data.imageUrl} alt={t('video_harmonizer.result.image_alt')} fill={true} className="object-cover" data-ai-hint="cinematic landscape" />
                    </div>
                )}
                
                {state.data.soundscapeUrl && (
                  <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                          <Music className="h-4 w-4 text-primary" />
                          {t('video_harmonizer.result.soundscape_title')}
                      </h3>
                      <audio controls src={state.data.soundscapeUrl} className="w-full">
                          Tu navegador no soporta el elemento de audio.
                      </audio>
                  </div>
                )}

                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold flex items-center gap-2"><Clapperboard className="h-4 w-4 text-primary" />{t('video_harmonizer.result.scene_title')}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{state.data.analysis.sceneDescription}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />{t('video_harmonizer.result.soundscape_desc_title')}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{state.data.analysis.soundscapeDescription}</p>
                    </div>
                </div>
            </CardContent>
          </Card>
        )}

        {!useFormStatus().pending && !state.data && !state.error && (
            <Card className="flex h-full flex-col items-center justify-center p-8 text-center border-dashed">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">{t('video_harmonizer.result.placeholder_title')}</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">{t('video_harmonizer.result.placeholder_subtitle')}</p>
            </Card>
        )}
      </div>
    </div>
  );
}
