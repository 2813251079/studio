'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { getHarmonizedWorkspace } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2, AlertCircle, Bot, Sparkles, Wind, Headphones } from 'lucide-react';
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
          {t('workspace_harmonizer.form.submit_button.loading')}
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          {t('workspace_harmonizer.form.submit_button')}
        </>
      )}
    </Button>
  );
}

export default function WorkspaceHarmonizerForm() {
  const [state, formAction] = useActionState(getHarmonizedWorkspace, initialState);
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
              <CardTitle>{t('workspace_harmonizer.form.title')}</CardTitle>
              <CardDescription>{t('workspace_harmonizer.form.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="intention">{t('workspace_harmonizer.form.intention_label')}</Label>
              <Select name="intention" defaultValue="Enfoque">
                <SelectTrigger id="intention">
                  <SelectValue placeholder="Selecciona una intención" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Enfoque">Enfoque y Concentración</SelectItem>
                  <SelectItem value="Relajación">Relajación y Calma</SelectItem>
                  <SelectItem value="Creatividad">Creatividad y Flujo</SelectItem>
                  <SelectItem value="Energía">Energía y Motivación</SelectItem>
                </SelectContent>
              </Select>
              {state.fieldErrors?.intention && <p className="text-sm font-medium text-destructive">{state.fieldErrors.intention[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('workspace_harmonizer.form.state_label')}</Label>
              <Textarea
                id="description"
                name="description"
                placeholder={t('workspace_harmonizer.form.state_placeholder')}
                rows={5}
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
                <p className="text-muted-foreground text-lg">{t('workspace_harmonizer.result.loading')}</p>
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
                {t('workspace_harmonizer.result.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {state.data.imageUrl && (
                    <div className="aspect-video relative w-full overflow-hidden rounded-lg border">
                        <Image src={state.data.imageUrl} alt={t('workspace_harmonizer.result.image_alt')} fill={true} className="object-cover" data-ai-hint="abstract spiritual" />
                    </div>
                )}
                
                {state.data.soundscapeUrl && (
                  <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                          <Headphones className="h-4 w-4 text-primary" />
                          {t('workspace_harmonizer.result.soundscape_title')}
                      </h3>
                      <audio controls src={state.data.soundscapeUrl} className="w-full">
                          Tu navegador no soporta el elemento de audio.
                      </audio>
                  </div>
                )}

                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />{t('workspace_harmonizer.result.strategy_title')}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{state.data.analysis.strategy}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold flex items-center gap-2"><Wind className="h-4 w-4 text-primary" />{t('workspace_harmonizer.result.resonance_title')}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{state.data.analysis.resonance}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold flex items-center gap-2"><AlertCircle className="h-4 w-4 text-primary" />{t('workspace_harmonizer.result.elements_title')}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{state.data.analysis.keyElements}</p>
                    </div>
                </div>
            </CardContent>
          </Card>
        )}

        {!useFormStatus().pending && !state.data && !state.error && (
            <Card className="flex h-full flex-col items-center justify-center p-8 text-center border-dashed">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">{t('workspace_harmonizer.result.placeholder_title')}</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">{t('workspace_harmonizer.result.placeholder_subtitle')}</p>
            </Card>
        )}
      </div>
    </div>
  );
}
