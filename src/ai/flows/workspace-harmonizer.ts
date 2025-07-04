'use server';

/**
 * @fileOverview An AI-powered tool to harmonize a user's workspace or mental state by generating a descriptive soundscape and a visual representation.
 * 
 * - workspaceHarmonizer - A function that handles the workspace harmonization process.
 * - WorkspaceHarmonizerInput - The input type for the workspaceHarmonizer function.
 * - WorkspaceHarmonizerOutput - The return type for the workspaceHarmonizer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WorkspaceHarmonizerInputSchema = z.object({
  intention: z.string().describe("The user's desired state or goal (e.g., Focus, Relaxation, Creativity)."),
  description: z.string().describe("A description of the user's current environment or mental state."),
});
export type WorkspaceHarmonizerInput = z.infer<typeof WorkspaceHarmonizerInputSchema>;

const WorkspaceHarmonizerOutputSchema = z.object({
  analysis: z.object({
    keyElements: z.string().describe("Key disharmonious elements identified from the user's description."),
    strategy: z.string().describe("The proposed harmonization strategy, describing the soundscape to be created."),
    resonance: z.string().describe("The expected emotional and mental resonance of the harmonized space."),
  }),
  imageUrl: z.string().describe("A data URI of a generated image representing the harmonized soundscape."),
});
export type WorkspaceHarmonizerOutput = z.infer<typeof WorkspaceHarmonizerOutputSchema>;


export async function workspaceHarmonizer(input: WorkspaceHarmonizerInput): Promise<WorkspaceHarmonizerOutput> {
  return workspaceHarmonizerFlow(input);
}

const analysisPrompt = ai.definePrompt({
    name: 'workspaceAnalysisPrompt',
    input: { schema: WorkspaceHarmonizerInputSchema },
    output: { schema: WorkspaceHarmonizerOutputSchema.shape.analysis },
    prompt: `Eres un experto en sonoterapia y diseño de ambientes acústicos para el bienestar. Analiza el estado actual del usuario y su intención para proponer un paisaje sonoro armonizador.

    **Intención del Usuario:** {{{intention}}}
    **Descripción del Estado Actual:** {{{description}}}

    Basado en esta información, genera el siguiente análisis:
    1.  **Elementos Clave de Disonancia:** Identifica los principales puntos de estrés, distracción o desequilibrio en la descripción del usuario.
    2.  **Estrategia de Armonización Propuesta:** Describe de forma evocadora el paisaje sonoro que crearías. Menciona tipos de sonidos (ej. tonos binaurales, sonidos de la naturaleza, frecuencias Solfeggio específicas), su tempo, y cómo contrarrestarán la disonancia.
    3.  **Resonancia Emocional Esperada:** Explica el estado mental y emocional que el usuario puede esperar alcanzar con este paisaje sonoro (ej. calma profunda, concentración láser, flujo creativo).
    
    Sé técnico pero también poético en tus descripciones. El objetivo es que el usuario sienta el cambio antes de escucharlo.`,
});

const imageGenerationFlow = ai.defineFlow(
  {
    name: 'workspaceImageGenerationFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Genera una imagen abstracta y serena que represente visualmente el siguiente concepto: ${prompt}. Utiliza colores suaves, formas fluidas y una atmósfera etérea. Evita texto o figuras humanas.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
        throw new Error("La IA no pudo generar una imagen para la armonización.");
    }
    return media.url;
  }
);

const workspaceHarmonizerFlow = ai.defineFlow(
  {
    name: 'workspaceHarmonizerFlow',
    inputSchema: WorkspaceHarmonizerInputSchema,
    outputSchema: WorkspaceHarmonizerOutputSchema,
  },
  async (input) => {
    const { output: analysis } = await analysisPrompt(input);
    
    if (!analysis) {
        throw new Error("La IA no pudo generar el análisis. Por favor, intenta de nuevo con una descripción diferente.");
    }

    const imagePrompt = `Un paisaje sonoro para ${input.intention} que transforma un estado de '${input.description}' en un ambiente de '${analysis.resonance}' usando ${analysis.strategy}.`;

    const imageUrl = await imageGenerationFlow(imagePrompt);

    return {
      analysis: analysis,
      imageUrl,
    };
  }
);
