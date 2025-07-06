'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { getCreativeStudioResult } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Bot, Sparkles, Wand, Music, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';
import Logo from '@/components/logo';

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
          {t('ai_creator.form.submit_button_loading')}
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          {t('ai_creator.form.submit_button')}
        </>
      )}
    </Button>
  );
}

function AICreatorPage() {
  const [state, formAction] = useFormState(getCreativeStudioResult, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state?.error && !state.fieldErrors) {
      toast({
        variant: 'destructive',
        title: t('error.toast.title'),
        description: state.error,
      });
    }
    if (state?.data) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('ai_creator.title')}</h1>
            <p className="text-muted-foreground">{t('ai_creator.subtitle')}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
            <Card>
                <form ref={formRef} action={formAction}>
                <CardHeader>
                    <CardTitle>{t('ai_creator.form.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground -mt-4 mb-4">{t('ai_creator.form.description')}</p>
                    <div className="space-y-2">
                    <Label htmlFor="concept" className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {t('ai_creator.form.concept_label')}
                    </Label>
                    <Textarea
                        id="concept"
                        name="concept"
                        placeholder={t('ai_creator.form.concept_placeholder')}
                        rows={8}
                    />
                    {state?.fieldErrors?.concept && <p className="text-sm font-medium text-destructive">{state.fieldErrors.concept[0]}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
                </form>
            </Card>

            <div className="space-y-4">
                {useFormStatus().pending && (
                <Card className="flex h-full flex-col items-center justify-center p-8 text-center">
                        <div className="animate-pulse mb-4">
                            <Logo className="w-24 h-24" />
                        </div>
                        <p className="text-muted-foreground text-lg">{t('ai_creator.result.loading')}</p>
                </Card>
                )}
                
                {state?.error && !state.fieldErrors && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{t('error.toast.title')}</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
                )}

                {state?.data && (
                <Card className="overflow-hidden">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-6 w-6 text-accent" />
                        {state.data.analysis.title}
                    </CardTitle>
                    <CardDescription>{state.data.analysis.artisticDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {state.data.imageUrl && (
                            <div className="w-full overflow-hidden rounded-lg">
                                <Image src={state.data.imageUrl} alt={state.data.analysis.title} width={600} height={400} className="w-full h-auto object-cover transition-all duration-500 hover:scale-110" data-ai-hint="fantasy landscape" />
                            </div>
                        )}
                        
                        {state.data.soundscapeUrl && (
                        <div className="space-y-2">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Music className="h-4 w-4 text-primary" />
                                {t('ai_creator.result.soundscape_title')}
                            </h3>
                            <audio controls src={state.data.soundscapeUrl} className="w-full">
                                Tu navegador no soporta el elemento de audio.
                            </audio>
                        </div>
                        )}

                        <div className="space-y-4 text-sm p-4 bg-secondary rounded-lg">
                            <div>
                                <h3 className="font-semibold flex items-center gap-2"><Palette className="h-4 w-4 text-primary" />{t('ai_creator.result.visual_prompt_title')}</h3>
                                <p className="text-muted-foreground mt-1 font-mono text-xs">{state.data.analysis.visualPrompt}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold flex items-center gap-2"><Wand className="h-4 w-4 text-primary" />{t('ai_creator.result.composition_title')}</h3>
                                <p className="text-muted-foreground mt-1">{state.data.analysis.soundscapeComposition}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                )}

                {!useFormStatus().pending && !state?.data && !state?.error && (
                    <Card className="flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center border-dashed">
                        <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('ai_creator.result.placeholder_title')}</h3>
                        <p className="text-muted-foreground mt-2 max-w-sm">{t('ai_creator.result.placeholder_subtitle')}</p>
                    </Card>
                )}
            </div>
        </div>
    </div>
  );
}

export default AICreatorPage;
