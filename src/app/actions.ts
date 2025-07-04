"use server";

import { workspaceHarmonizer, WorkspaceHarmonizerInput, WorkspaceHarmonizerOutput } from "@/ai/flows/workspace-harmonizer";
import { z } from "zod";

const inputSchema = z.object({
  workspaceElements: z.string().min(3, "Por favor, introduce al menos un elemento."),
});

type HarmonizerState = {
  data?: WorkspaceHarmonizerOutput;
  error?: string;
  fieldErrors?: {
    workspaceElements?: string[];
  }
}

export async function getHarmonizedWorkspace(prevState: HarmonizerState, formData: FormData): Promise<HarmonizerState> {
  const validatedFields = inputSchema.safeParse({
    workspaceElements: formData.get('workspaceElements'),
  });

  if (!validatedFields.success) {
    return {
      error: "Error de validación.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await workspaceHarmonizer(validatedFields.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: "Ha ocurrido un error al contactar con la IA. Por favor, inténtalo de nuevo más tarde." };
  }
}
