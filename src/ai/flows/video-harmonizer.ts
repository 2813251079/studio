'use server';

/**
 * @fileOverview An AI-powered tool to generate a cinematic scene with an accompanying soundscape.
 * 
 * - videoHarmonizer - A function that handles the scene generation process.
 * - VideoHarmonizerInput - The input type for the videoHarmonizer function.
 * - VideoHarmonizerOutput - The return type for the videoHarmonizer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';

const VideoHarmonizerInputSchema = z.object({
  description: z.string().describe("A description of the desired scene, feeling, or concept."),
});
export type VideoHarmonizerInput = z.infer<typeof VideoHarmonizerInputSchema>;

const VideoHarmonizerOutputSchema = z.object({
  analysis: z.object({
    sceneDescription: z.string().describe("A cinematic description of the generated visual scene."),
    soundscapeDescription: z.string().describe("A description of the accompanying musical soundscape."),
    soundscapeVocalization: z.string().describe("A short text of non-linguistic vocalizations (e.g., 'Ooommm', 'Aaaahhhh', humming sounds) that the TTS model can generate to create an abstract, continuous, and relaxing soundscape. It should not contain descriptive words."),
  }),
  imageUrl: z.string().describe("A data URI of a generated image representing the scene."),
  soundscapeUrl: z.string().describe("A data URI of a generated soundscape audio file."),
});
export type VideoHarmonizerOutput = z.infer<typeof VideoHarmonizerOutputSchema>;


export async function videoHarmonizer(input: VideoHarmonizerInput): Promise<VideoHarmonizerOutput> {
  return videoHarmonizerFlow(input);
}

const analysisPrompt = ai.definePrompt({
    name: 'videoAnalysisPrompt',
    input: { schema: VideoHarmonizerInputSchema },
    output: { schema: VideoHarmonizerOutputSchema.shape.analysis },
    prompt: `Eres un director de cine y compositor experto en crear ambientes inmersivos. A partir de la siguiente descripción, crea una escena cinematográfica y su banda sonora.

    **Descripción del Usuario:** {{{description}}}

    Basado en esta información, genera lo siguiente:
    1.  **Descripción de la Escena:** Describe la escena visualmente, como si fuera un fotograma de una película. Detalla la iluminación, los colores, la composición y la atmósfera.
    2.  **Descripción del Paisaje Sonoro:** Describe la música o el paisaje sonoro que acompaña a la escena. Menciona instrumentos, tempo, melodía y cómo evoca la emoción deseada.
    3.  **soundscapeVocalization:** Basado en la descripción del paisaje sonoro, crea un texto corto de vocalizaciones no lingüísticas (ej. 'Ooommm', 'Aaaahhhh', sonidos de tarareo) que un modelo de texto-a-voz pueda generar para crear una banda sonora abstracta y evocadora. No debe contener palabras descriptivas, solo sonidos.
    
    Sé evocador y poético. Tu objetivo es que el usuario pueda "ver" la escena y "escuchar" la música con tu descripción.`,
});

const imageGenerationFlow = ai.defineFlow(
  {
    name: 'videoImageGenerationFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Genera una imagen cinematográfica y evocadora que represente visualmente el siguiente concepto: ${prompt}. Estilo fotorrealista, colores vibrantes, composición épica. Sin texto.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
        throw new Error("La IA no pudo generar una imagen para la escena.");
    }
    return media.url;
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const soundscapeGenerationFlow = ai.defineFlow(
  {
    name: 'videoSoundscapeGenerationFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (vocalization) => {
    const ttsPrompt = `Genera un paisaje sonoro abstracto y cinematográfico usando las siguientes vocalizaciones como guía. El resultado debe ser un audio evocador y continuo, no una lectura de los sonidos: ${vocalization}`;
    
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: ttsPrompt,
    });

    if (!media || !media.url) {
        throw new Error("La IA no pudo generar un paisaje sonoro.");
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);
    return 'data:audio/wav;base64,' + wavBase64;
  }
);

const videoHarmonizerFlow = ai.defineFlow(
  {
    name: 'videoHarmonizerFlow',
    inputSchema: VideoHarmonizerInputSchema,
    outputSchema: VideoHarmonizerOutputSchema,
  },
  async (input) => {
    const { output: analysis } = await analysisPrompt(input);
    
    if (!analysis) {
        throw new Error("La IA no pudo generar el análisis. Por favor, intenta de nuevo con una descripción diferente.");
    }

    const imagePrompt = `Una escena cinematográfica: ${analysis.sceneDescription}.`;
    const soundscapePrompt = analysis.soundscapeVocalization;
    
    const [imageUrl, soundscapeUrl] = await Promise.all([
      imageGenerationFlow(imagePrompt),
      soundscapeGenerationFlow(soundscapePrompt)
    ]);

    return {
      analysis: analysis,
      imageUrl,
      soundscapeUrl,
    };
  }
);
