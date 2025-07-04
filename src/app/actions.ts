"use server";

import { workspaceHarmonizer, WorkspaceHarmonizerInput, WorkspaceHarmonizerOutput } from "@/ai/flows/workspace-harmonizer";
import { Language, translations } from "@/lib/translations";
import { z } from "zod";

const getValidationSchema = (lang: Language) => z.object({
  workspaceElements: z.string().min(3, translations[lang]['error.validation.min']),
});


type HarmonizerState = {
  data?: WorkspaceHarmonizerOutput;
  error?: string;
  fieldErrors?: {
    workspaceElements?: string[];
  }
}

export async function getHarmonizedWorkspace(prevState: HarmonizerState, formData: FormData): Promise<HarmonizerState> {
  const lang = (formData.get('lang') as Language) || 'es';
  
  const validatedFields = getValidationSchema(lang).safeParse({
    workspaceElements: formData.get('workspaceElements'),
  });

  if (!validatedFields.success) {
    return {
      error: translations[lang]['error.validation.generic'],
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await workspaceHarmonizer(validatedFields.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: translations[lang]['error.ai'] };
  }
}
