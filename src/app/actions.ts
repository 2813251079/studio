'use server';

import { z } from 'zod';
import { workspaceHarmonizer, WorkspaceHarmonizerOutput } from '@/ai/flows/workspace-harmonizer';
import { translations } from '@/lib/translations';

const t = (key: any) => translations.es[key as any] || key;

const validationSchema = z.object({
  intention: z.string().min(1, 'Por favor, selecciona una intención.'),
  description: z.string().min(10, 'Por favor, describe tu espacio con al menos 10 caracteres.'),
});

type WorkspaceHarmonizerState = {
  data?: WorkspaceHarmonizerOutput;
  error?: string;
  fieldErrors?: {
    intention?: string[];
    description?: string[];
  };
};

export async function getHarmonizedWorkspace(
  prevState: WorkspaceHarmonizerState,
  formData: FormData
): Promise<WorkspaceHarmonizerState> {
  
  const validatedFields = validationSchema.safeParse({
    intention: formData.get('intention'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Error de validación.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await workspaceHarmonizer(validatedFields.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: t('error.ai') };
  }
}
