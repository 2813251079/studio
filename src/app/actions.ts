'use server';

import { z } from 'zod';
import { audioEnhancer, AudioEnhancerOutput } from '@/ai/flows/audio-enhancer';
import { translations } from '@/lib/translations';

const t = (key: any) => translations.es[key as any] || key;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'];

const validationSchema = z.object({
  audioFile: z
    .any()
    .refine((file) => file?.size > 0, 'Por favor, selecciona un archivo.')
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `El tamaño máximo del archivo es de 5MB.`
    )
    .refine(
      (file) => ACCEPTED_AUDIO_TYPES.includes(file?.type),
      'Solo se aceptan archivos de audio (mp3, wav).'
    ),
  targetFrequency: z.string(),
});

type AudioEnhancerState = {
  data?: AudioEnhancerOutput;
  error?: string;
  fieldErrors?: {
    audioFile?: string[];
    targetFrequency?: string[];
  };
};

function toDataURI(buffer: ArrayBuffer, type: string): string {
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${type};base64,${base64}`;
}


export async function enhanceAudio(
  prevState: AudioEnhancerState,
  formData: FormData
): Promise<AudioEnhancerState> {
  
  const audioFile = formData.get('audioFile') as File;

  const validatedFields = validationSchema.safeParse({
    audioFile: audioFile,
    targetFrequency: formData.get('targetFrequency'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Error de validación.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioDataUri = toDataURI(arrayBuffer, audioFile.type);

    const result = await audioEnhancer({ 
        audioDataUri, 
        targetFrequency: validatedFields.data.targetFrequency
    });
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: t('error.ai') };
  }
}
