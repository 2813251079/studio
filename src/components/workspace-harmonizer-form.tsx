"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getHarmonizedWorkspace } from "@/app/actions";
import { AlertCircle, Loader2, Wand2, FolderKanban } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/hooks/use-settings";
import { translations } from "@/lib/translations";

const initialState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { language } = useSettings();
  const t = (key: any) => translations[language]?.[key] || translations['en'][key];
  
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('form.submit_button.loading')}
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          {t('form.submit_button')}
        </>
      )}
    </Button>
  );
}

export default function WorkspaceHarmonizerForm() {
  const [state, formAction] = useFormState(getHarmonizedWorkspace, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { language } = useSettings();
  const t = (key: any) => translations[language]?.[key] || translations['en'][key];

  useEffect(() => {
    if (state.error && !state.fieldErrors) {
      toast({
        variant: "destructive",
        title: t('error.toast.title'),
        description: state.error,
      });
    }
  }, [state, toast, t]);
  
  useEffect(() => {
    if (state.data) {
      formRef.current?.reset();
    }
  }, [state.data]);

  return (
    <div className="space-y-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl md:text-3xl flex items-center gap-3">
            <Wand2 className="h-8 w-8 text-primary" />
            <span>{t('form.title')}</span>
          </CardTitle>
          <CardDescription>
            {t('form.description')}
          </CardDescription>
        </CardHeader>
        <form ref={formRef} action={formAction}>
          <input type="hidden" name="lang" value={language} />
          <CardContent>
            <div className="grid w-full gap-2">
              <Textarea
                name="workspaceElements"
                placeholder={t('form.placeholder')}
                className="min-h-[120px] text-base"
                aria-describedby="elements-error"
              />
              {state.fieldErrors?.workspaceElements && (
                <p id="elements-error" className="text-sm font-medium text-destructive">
                  {state.fieldErrors.workspaceElements.join(", ")}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-xs text-muted-foreground">
              {t('form.helper_text')}
            </p>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.data && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-3">
                <FolderKanban className="h-8 w-8 text-accent" />
                <span>{t('results.title')}</span>
            </CardTitle>
            <CardDescription>
                {t('results.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.data.categories.map((category, index) => (
                    <div key={index} className="p-4 bg-background rounded-lg border shadow-sm flex-col">
                        <h3 className="font-semibold text-lg mb-3 text-primary">{category.category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.elements.map((element, i) => (
                                <Badge key={i} variant="secondary" className="text-sm">
                                    {element}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {state.error && !state.fieldErrors && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('error.unexpected')}</AlertTitle>
            <AlertDescription>
                {state.error}
            </AlertDescription>
          </Alert>
      )}
    </div>
  );
}
