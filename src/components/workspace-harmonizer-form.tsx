'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { enhanceAudio } from '@/app/actions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2, AlertCircle, PlayCircle, Bot } from 'lucide-react';
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
          {t('audio_enhancer.form.submit_button.loading')}
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          {t('audio_enhancer.form.submit_button')}
        </>
      )}
    </Button>
  );
}

export default function AudioEnhancerForm() {
  const [state, formAction] = useActionState(enhanceAudio, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState('');

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
      setFileName('');
    }
  }, [state.data]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <form ref={formRef} action={formAction}>
          <CardContent className="pt-6">
            <div className="grid w-full gap-4">
              <div className="space-y-2">
                <Label htmlFor="audioFile">{t('audio_enhancer.form.label')}</Label>
                <Input 
                    id="audioFile" 
                    name="audioFile" 
                    type="file" 
                    accept="audio/*" 
                    required
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetFrequency">{t('audio_enhancer.form.frequency_label')}</Label>
                <Select name="targetFrequency" defaultValue="528hz">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="432hz">432 Hz - Calma y Naturaleza</SelectItem>
                    <SelectItem value="528hz">528 Hz - Amor y Milagros</SelectItem>
                    <SelectItem value="639hz">639 Hz - Conexión y Armonía</SelectItem>
                    <SelectItem value="741hz">741 Hz - Expresión e Intuición</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        {useFormStatus().pending && (
           <Card className="flex flex-col items-center justify-center p-8 text-center animate-pulse">
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">La IA está analizando y armonizando tu audio...</p>
           </Card>
        )}
        
        {state.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('error.toast.title')}</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.data && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-accent" />
                {t('audio_enhancer.result.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground whitespace-pre-wrap">
                {state.data.enhancementDetails}
              </p>
              <Button disabled>
                <PlayCircle className="mr-2 h-4 w-4" />
                {t('audio_enhancer.result.play')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
