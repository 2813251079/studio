"use server";

import { workspaceHarmonizer, WorkspaceHarmonizerInput, WorkspaceHarmonizerOutput } from "@/ai/flows/workspace-harmonizer";
import { translations } from "@/lib/translations";
import { z } from "zod";

const getValidationSchema = () => z.object({
  workspaceElements: z.string().min(3, translations.es['error.validation.min']),
});


type HarmonizerState = {
  data?: WorkspaceHarmonizerOutput;
  error?: string;
  fieldErrors?: {
    workspaceElements?: string[];
  }
}

export async function getHarmonizedWorkspace(prevState: HarmonizerState, formData: FormData): Promise<HarmonizerState> {
  const validatedFields = getValidationSchema().safeParse({
    workspaceElements: formData.get('workspaceElements'),
  });

  if (!validatedFields.success) {
    return {
      error: translations.es['error.validation.generic'],
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await workspaceHarmonizer(validatedFields.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: translations.es['error.ai'] };
  }
}
