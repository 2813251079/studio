'use server';

import { z } from 'zod';
import { workspaceHarmonizer, WorkspaceHarmonizerOutput } from '@/ai/flows/workspace-harmonizer';
import { videoHarmonizer, VideoHarmonizerOutput } from '@/ai/flows/video-harmonizer';
import { generateSpeech } from '@/ai/flows/tts-flow';
import { talkToCompanion } from '@/ai/flows/emotional-companion-flow';
import { translations } from '@/lib/translations';

const t = (key: any) => translations.es[key as any] || key;

const workspaceValidationSchema = z.object({
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
  
  const validatedFields = workspaceValidationSchema.safeParse({
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

const videoValidationSchema = z.object({
  description: z.string().min(10, 'Por favor, describe tu escena con al menos 10 caracteres.'),
});

type VideoHarmonizerState = {
  data?: VideoHarmonizerOutput;
  error?: string;
  fieldErrors?: {
    description?: string[];
  };
};

export async function getHarmonizedVideo(
  prevState: VideoHarmonizerState,
  formData: FormData
): Promise<VideoHarmonizerState> {
  
  const validatedFields = videoValidationSchema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Error de validación.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await videoHarmonizer(validatedFields.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: t('error.ai') };
  }
}

export async function speakNoteAction(noteName: string) {
    const speechValidationSchema = z.string().min(1, 'Note name cannot be empty.');
    const validatedField = speechValidationSchema.safeParse(noteName);

    if (!validatedField.success) {
        return { error: 'Validation Error: Invalid note name.' };
    }
  
    try {
        const result = await generateSpeech(validatedField.data);
        return { data: result };
    } catch (e) {
        console.error(e);
        return { error: t('error.ai') };
    }
}

type CompanionState = {
  data?: { history: { user: string; model: string }[] };
  error?: string;
};

export async function getCompanionResponse(
  prevState: CompanionState,
  formData: FormData
): Promise<CompanionState> {
  const userInput = formData.get('message') as string;

  if (!userInput || userInput.trim().length < 1) {
    return {
        ...prevState,
        error: "Por favor, escribe algo."
    };
  }

  try {
    const response = await talkToCompanion(userInput);
    const newHistory = [...(prevState.data?.history || []), { user: userInput, model: response }];
    return { data: { history: newHistory } };
  } catch (e) {
    console.error(e);
    return { 
        ...prevState,
        error: t('error.ai') 
    };
  }
}
