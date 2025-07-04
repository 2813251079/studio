
'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { getKnowledgeInfo } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, AlertCircle, BookOpen, BrainCircuit, Waves, Star, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';
import * as React from 'react';

const t = (key: any) => translations.es[key as any] || key;

const initialState = {
  data: undefined,
  error: undefined,
  fieldError: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
      <span className="sr-only">{t('education_page.search_button')}</span>
    </Button>
  );
}

export default function EducationPage() {
  const [state, formAction] = useActionState(getKnowledgeInfo, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();


  useEffect(() => {
    if (state.error && !state.fieldError) {
      toast({
        variant: 'destructive',
        title: t('error.toast.title'),
        description: state.error,
      });
    }
    if (state.data || state.error) {
        if(isPending) startTransition(() => {});
    }
  }, [state, toast]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
        formAction(formData);
    });
  }

  const handleTopicClick = (topic: string) => {
    if (formRef.current) {
        const input = formRef.current.querySelector('input[name="query"]') as HTMLInputElement;
        if (input) {
            input.value = topic;
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formRef.current.dispatchEvent(submitEvent);
        }
    }
  }
  
  const predefinedTopics = [
      { topic: t('education_page.topic1'), icon: <Waves className="h-4 w-4 mr-2" /> },
      { topic: t('education_page.topic2'), icon: <BrainCircuit className="h-4 w-4 mr-2" /> },
      { topic: t('education_page.topic3'), icon: <Star className="h-4 w-4 mr-2" /> },
      { topic: t('education_page.topic4'), icon: <FileText className="h-4 w-4 mr-2" /> },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('education_page.title')}</h1>
        <p className="text-muted-foreground">{t('education_page.subtitle')}</p>
      </div>
      
      <Card>
          <CardHeader>
              <CardTitle>{t('education_page.search_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={handleFormSubmit} className="flex w-full items-center gap-2 mb-4">
              <Input name="query" placeholder={t('education_page.search_placeholder')} autoComplete="off" disabled={isPending} />
              <SubmitButton />
            </form>
            {state.fieldError && <p className="text-sm font-medium text-destructive mt-1">{state.fieldError}</p>}
            <div className="flex flex-wrap gap-2 mt-4">
                {predefinedTopics.map(item => (
                    <Button key={item.topic} variant="outline" size="sm" onClick={() => handleTopicClick(item.topic)} disabled={isPending}>
                        {item.icon} {item.topic}
                    </Button>
                ))}
            </div>
          </CardContent>
      </Card>
      
      <div className="space-y-4">
        {isPending && (
           <Card className="flex h-full flex-col items-center justify-center p-8 text-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground text-lg">{t('education_page.loading')}</p>
           </Card>
        )}
        
        {state.error && !state.fieldError && !isPending && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('error.toast.title')}</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.data && !isPending && (
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                           <BookOpen className="h-6 w-6 text-accent" /> {t('education_page.summary_title')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none text-muted-foreground">
                        <p>{state.data.summary}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <Star className="h-6 w-6 text-accent" /> {t('education_page.findings_title')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                            {state.data.keyFindings.map((finding, index) => (
                                <li key={index}>{finding}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                           <FileText className="h-6 w-6 text-accent" /> {t('education_page.sources_title')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {state.data.sources.map((source, index) => (
                                <li key={index} className="p-3 bg-secondary rounded-md">
                                    <a href={source.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">{source.title}</a>
                                    <p className="text-sm text-muted-foreground">{source.author} ({source.year})</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        )}

        {!isPending && !state.data && !state.error && (
            <Card className="flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center border-dashed">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('education_page.placeholder_title')}</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">{t('education_page.placeholder_subtitle')}</p>
            </Card>
        )}
      </div>

    </div>
  );
}
