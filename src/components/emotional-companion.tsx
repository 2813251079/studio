'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { getCompanionResponse } from '@/app/actions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

const initialState = {
  data: { history: [] },
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Enviar</span>
    </Button>
  );
}

export default function EmotionalCompanion() {
  const [state, formAction] = useFormState(getCompanionResponse, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { pending } = useFormStatus();


  useEffect(() => {
    if (!pending) {
      formRef.current?.reset();
    }
  }, [pending, state]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [state.data?.history]);

  const conversation = state.data?.history ?? [];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="text-primary" />
          <span>{t('inclusive_games.companion.title')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-lg bg-secondary">
                <p className="font-bold">Yana</p>
                <p>{t('inclusive_games.companion.welcome_message')}</p>
              </div>
            </div>
            {conversation.map((entry, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-start gap-3 justify-end">
                  <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                    <p className="font-bold">{t('inclusive_games.companion.user_name')}</p>
                    <p>{entry.user}</p>
                  </div>
                   <Avatar>
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                </div>
                 <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="font-bold">Yana</p>
                    <p>{entry.model}</p>
                  </div>
                </div>
              </div>
            ))}
             {pending && (
                <div className="flex items-start gap-3">
                    <Avatar>
                        <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <div className="p-3 rounded-lg bg-secondary flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>...</span>
                    </div>
                </div>
             )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form ref={formRef} action={formAction} className="flex w-full items-center gap-2">
          <Input name="message" placeholder={t('inclusive_games.companion.input_placeholder')} autoComplete="off" />
          <SubmitButton />
        </form>
      </CardFooter>
    </Card>
  );
}
