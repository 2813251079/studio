
'use server';

import { z } from 'zod';
import { workspaceHarmonizer, WorkspaceHarmonizerOutput } from '@/ai/flows/workspace-harmonizer';
import { videoHarmonizer, VideoHarmonizerOutput } from '@/ai/flows/video-harmonizer';
import { generateSpeech } from '@/ai/flows/tts-flow';
import { talkToCompanion } from '@/ai/flows/emotional-companion-flow';
import { translations } from '@/lib/translations';
import { knowledgeBaseFlow, KnowledgeBaseOutput } from '@/ai/flows/knowledge-base-flow';
import { facialAnalysis, FacialAnalysisOutput } from '@/ai/flows/facial-analysis-flow';
import { creativeStudio, CreativeStudioOutput } from '@/ai/flows/creative-studio-flow';

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

const knowledgeBaseValidationSchema = z.string().min(3, 'Por favor, introduce un tema con al menos 3 caracteres.');

type KnowledgeBaseState = {
  data?: KnowledgeBaseOutput;
  error?: string;
  fieldError?: string;
};

export async function getKnowledgeInfo(
  prevState: KnowledgeBaseState,
  formData: FormData
): Promise<KnowledgeBaseState> {
  const query = formData.get('query') as string;

  const validatedField = knowledgeBaseValidationSchema.safeParse(query);

  if (!validatedField.success) {
    return {
      error: 'Error de validación.',
      fieldError: validatedField.error.flatten().formErrors[0],
    };
  }

  try {
    const result = await knowledgeBaseFlow(validatedField.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: t('error.ai') };
  }
}

const facialAnalysisValidationSchema = z.string().min(1, 'La imagen no puede estar vacía.');

type FacialAnalysisState = {
  data?: FacialAnalysisOutput;
  error?: string;
};

export async function getFacialAnalysis(
  prevState: FacialAnalysisState,
  formData: FormData
): Promise<FacialAnalysisState> {
  const imageData = formData.get('imageData') as string;

  const validatedField = facialAnalysisValidationSchema.safeParse(imageData);

  if (!validatedField.success) {
    return {
      error: 'Error: No se ha proporcionado ninguna imagen.',
    };
  }

  try {
    const result = await facialAnalysis(validatedField.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: t('error.ai') };
  }
}

const creativeStudioValidationSchema = z.object({
  concept: z.string().min(5, 'Por favor, describe tu concepto con al menos 5 caracteres.'),
});

type CreativeStudioState = {
  data?: CreativeStudioOutput;
  error?: string;
  fieldErrors?: {
    concept?: string[];
  };
};

export async function getCreativeStudioResult(
  prevState: CreativeStudioState,
  formData: FormData
): Promise<CreativeStudioState> {
  
  const validatedFields = creativeStudioValidationSchema.safeParse({
    concept: formData.get('concept'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Error de validación.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await creativeStudio(validatedFields.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: t('error.ai') };
  }
}
