'use server';

/**
 * @fileOverview An AI-powered creative studio to generate advanced audiovisual concepts.
 * 
 * - creativeStudio - A function that handles the creative generation process.
 * - CreativeStudioInput - The input type for the creativeStudio function.
 * - CreativeStudioOutput - The return type for the creativeStudio function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';

const CreativeStudioInputSchema = z.object({
  concept: z.string().describe("A user's core idea, concept, or feeling."),
});
export type CreativeStudioInput = z.infer<typeof CreativeStudioInputSchema>;

const CreativeStudioOutputSchema = z.object({
  analysis: z.object({
    title: z.string().describe("A creative and evocative title for the generated piece."),
    artisticDescription: z.string().describe("A detailed and poetic description of the entire audiovisual concept."),
    visualPrompt: z.string().describe("A highly detailed and artistic prompt, ready to be sent to a 'Triple-A' quality image generation model. It should include details about style, lighting, composition, and mood."),
    soundscapeComposition: z.string().describe("A description of the musical composition, including mood, instruments, tempo, and emotional arc."),
    soundscapeVocalization: z.string().describe("A short text of non-linguistic vocalizations (e.g., 'Ooommm', 'Aaaahhhh', humming sounds) that the TTS model can generate to create an abstract, continuous, and relaxing soundscape. It should not contain descriptive words."),
  }),
  imageUrl: z.string().describe("A data URI of a generated image representing the scene."),
  soundscapeUrl: z.string().describe("A data URI of a generated soundscape audio file."),
});
export type CreativeStudioOutput = z.infer<typeof CreativeStudioOutputSchema>;


export async function creativeStudio(input: CreativeStudioInput): Promise<CreativeStudioOutput> {
  return creativeStudioFlow(input);
}

const analysisPrompt = ai.definePrompt({
    name: 'creativeStudioAnalysisPrompt',
    input: { schema: CreativeStudioInputSchema },
    output: { schema: CreativeStudioOutputSchema.shape.analysis },
    prompt: `Eres un director creativo multimedia de un estudio de arte "Triple-A". Tu especialidad es transformar conceptos simples en experiencias audiovisuales profundas y de alta calidad.

    **Concepto del Usuario:** {{{concept}}}

    A partir de este concepto, genera un análisis creativo completo con los siguientes componentes:
    1.  **title:** Crea un título poético y memorable para la obra.
    2.  **artisticDescription:** Escribe una descripción artística global que capture la esencia de la pieza, uniendo lo visual y lo sonoro en una narrativa coherente.
    3.  **visualPrompt:** Diseña un prompt de texto EXTREMADAMENTE detallado para un modelo de generación de imágenes de última generación. Especifica el estilo artístico (ej: fotorrealista, fantasía épica, cyberpunk, acuarela), la paleta de colores, la iluminación (ej: luz dorada del atardecer, neones melancólicos), la composición (ej: plano general, primer plano), la atmósfera y la emoción que debe evocar. ¡Sé muy específico y creativo!
    4.  **soundscapeComposition:** Describe la composición musical que acompañará la imagen. Piensa en términos de un compositor: ¿qué instrumentos imaginarios o reales usarías? ¿Cuál es el tempo, la dinámica y el arco emocional de la pieza? ¿Es minimalista, orquestal, electrónico?
    5.  **soundscapeVocalization:** Traduce la descripción de la composición a un texto corto de vocalizaciones no lingüísticas (ej. 'Mmmmm-oooo-aaaaaahhh-eeeeeh') que un modelo de texto-a-voz pueda usar para generar una banda sonora abstracta y evocadora. Debe ser un sonido continuo y relajante.`,
});

const imageGenerationFlow = ai.defineFlow(
  {
    name: 'creativeStudioImageGenerationFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (visualPrompt) => {
    const finalPrompt = `Una obra de arte digital de calidad "Triple-A", cinematográfica, increíblemente detallada y evocadora. Estilo fotorrealista con toques de fantasía épica, iluminación dramática. Sin texto. La escena es: ${visualPrompt}`;
    
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: finalPrompt,
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
    name: 'creativeStudioSoundscapeGenerationFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
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
      prompt,
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

const creativeStudioFlow = ai.defineFlow(
  {
    name: 'creativeStudioFlow',
    inputSchema: CreativeStudioInputSchema,
    outputSchema: CreativeStudioOutputSchema,
  },
  async (input) => {
    const { output: analysis } = await analysisPrompt(input);
    
    if (!analysis) {
        throw new Error("La IA no pudo generar el análisis creativo. Por favor, intenta de nuevo con un concepto diferente.");
    }
    
    const [imageUrl, soundscapeUrl] = await Promise.all([
      imageGenerationFlow(analysis.visualPrompt),
      soundscapeGenerationFlow(analysis.soundscapeVocalization)
    ]);

    return {
      analysis: analysis,
      imageUrl,
      soundscapeUrl,
    };
  }
);
