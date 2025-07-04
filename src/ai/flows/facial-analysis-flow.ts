'use server';
/**
 * @fileOverview An AI-powered tool for facial wellness analysis.
 *
 * - facialAnalysisFlow - A function that handles the facial analysis process.
 * - FacialAnalysisInput - The input type for the facialAnalysisFlow function.
 * - FacialAnalysisOutput - The return type for the facialAnalysisFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FacialAnalysisInputSchema = z.string().describe(
  "A photo of a person's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
);
export type FacialAnalysisInput = z.infer<typeof FacialAnalysisInputSchema>;

const FacialAnalysisOutputSchema = z.object({
  emotion: z.string().describe("The likely primary emotion detected in the facial expression (e.g., Alegría, Tristeza, Calma, Sorpresa, Estrés)."),
  observation: z.string().describe("A brief, positive, and empathetic observation about the detected emotion."),
  suggestion: z.string().describe("A specific, actionable suggestion for an activity within the Open Music Academy app that could be beneficial for this emotional state."),
  suggestedActivity: z.enum(['frequency', 'harmonizer', 'companion', 'simon', 'tuner']).describe("A keyword representing the suggested activity type."),
  suggestedActivityTarget: z.string().describe("The specific target for the activity, e.g., a frequency like '528hz' or a page name like 'Armonizador de Espacios'."),
});
export type FacialAnalysisOutput = z.infer<typeof FacialAnalysisOutputSchema>;


export async function facialAnalysis(input: FacialAnalysisInput): Promise<FacialAnalysisOutput> {
  return facialAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'facialAnalysisPrompt',
  input: {schema: z.object({ photoDataUri: FacialAnalysisInputSchema })},
  output: {schema: FacialAnalysisOutputSchema},
  prompt: `Eres un experto en comunicación no verbal y bienestar emocional, con una especialización en micro-expresiones faciales. Tu tono es siempre empático, positivo y alentador.

Analiza la siguiente foto del rostro de una persona. Basándote en su expresión, determina su emoción primaria más probable.

Luego, genera la siguiente información:
1.  **emotion:** Identifica la emoción principal (ej. Alegría, Tristeza, Calma, Sorpresa, Estrés). Sé conciso.
2.  **observation:** Escribe una observación breve (1-2 frases), siempre en un tono positivo y de apoyo. Valida la emoción sin juzgar. Por ejemplo, si detectas tristeza, podrías decir: "Percibo una emoción introspectiva. Recuerda que todos los sentimientos son válidos y pasajeros." Si detectas alegría, di: "Tu expresión irradia una energía muy positiva. ¡Qué maravilla!".
3.  **suggestion:** Ofrece una sugerencia concreta y útil para una actividad dentro de la aplicación "Open Music Academy" que pueda complementar o equilibrar esa emoción. Sé específico y explica brevemente el porqué.
4.  **suggestedActivity:** Asigna una palabra clave para la actividad: 'frequency', 'harmonizer', 'companion', 'simon', 'tuner'.
5.  **suggestedActivityTarget:** Indica el objetivo específico. Por ejemplo, si sugieres una frecuencia, que sea '528hz'. Si sugieres el armonizador, que sea 'Armonizador de Espacios'.

Ejemplos de sugerencias:
- Para estrés: "Te sugiero escuchar la frecuencia de 432 Hz para encontrar un momento de paz y calma interior. Estas vibraciones pueden ayudarte a disolver la tensión." (suggestedActivity: 'frequency', suggestedActivityTarget: 'frequencies')
- Para alegría: "¡Qué buena energía! Podrías canalizarla jugando una partida de Simón Musical. Es una forma divertida de ejercitar la memoria y el ritmo." (suggestedActivity: 'simon', suggestedActivityTarget: 'inclusive-games')
- Para tristeza: "Quizás hablar un poco te siente bien. Te invito a conversar con Yana, tu acompañante emocional. Está aquí para escucharte sin juicios." (suggestedActivity: 'companion', suggestedActivityTarget: 'inclusive-games')

Foto para analizar: {{media url=photoDataUri}}`,
});

const facialAnalysisFlow = ai.defineFlow(
  {
    name: 'facialAnalysisFlow',
    inputSchema: FacialAnalysisInputSchema,
    outputSchema: FacialAnalysisOutputSchema,
  },
  async (photoDataUri) => {
    const {output} = await prompt({ photoDataUri });
    if (!output) {
      throw new Error("La IA no pudo procesar el análisis facial. Por favor, intenta de nuevo.");
    }
    return output;
  }
);
