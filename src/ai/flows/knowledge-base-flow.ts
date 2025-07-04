
'use server';
/**
 * @fileOverview An AI-powered research assistant to build a knowledge base.
 *
 * - getKnowledgeBaseInfo - A function that handles the research process.
 * - KnowledgeBaseInput - The input type for the getKnowledgeBaseInfo function.
 * - KnowledgeBaseOutput - The return type for the getKnowledge-base-info function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KnowledgeBaseInputSchema = z.string().describe("The topic to research.");
export type KnowledgeBaseInput = z.infer<typeof KnowledgeBaseInputSchema>;

const KnowledgeBaseOutputSchema = z.object({
  summary: z.string().describe("A detailed academic summary of the topic, written in a journalistic style."),
  keyFindings: z.array(z.string()).describe("A list of key findings or important points about the topic."),
  sources: z.array(z.object({
    title: z.string().describe("The title of a relevant academic paper, study, or article."),
    author: z.string().describe("The author(s) of the source."),
    link: z.string().describe("A plausible, but not necessarily real, URL to the source."),
    year: z.number().describe("The publication year of the source."),
  })).describe("A list of fictitious but plausible academic sources."),
});
export type KnowledgeBaseOutput = z.infer<typeof KnowledgeBaseOutputSchema>;

export async function knowledgeBaseFlow(input: KnowledgeBaseInput): Promise<KnowledgeBaseOutput> {
  return knowledgeBaseAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'knowledgeBasePrompt',
  input: {schema: KnowledgeBaseInputSchema},
  output: {schema: KnowledgeBaseOutputSchema},
  prompt: `Eres un investigador académico y periodista científico experto en música, neurociencia y terapias de sonido. Tu tarea es compilar un resumen de conocimiento sobre un tema específico.

  Tema de Investigación: {{{prompt}}}

  A partir de este tema, debes generar la siguiente información con rigor académico y un estilo periodístico claro y accesible:

  1.  **Resumen:** Escribe un análisis detallado del tema. Explora su importancia, los beneficios, el contexto histórico y la relevancia actual. Cita conceptos clave y sé exhaustivo pero comprensible.
  2.  **Hallazgos Clave:** Extrae una lista de 3 a 5 puntos o hallazgos cruciales sobre el tema. Deben ser concisos y directos.
  3.  **Fuentes:** Genera una lista de 3 fuentes académicas (estudios, tesis, ensayos) que sean verosímiles y relevantes para el tema. **Estas fuentes deben ser ficticias pero sonar realistas.** Para cada fuente, proporciona un título, un autor (o institución, ej. "Universidad de Stanford"), un año de publicación y un enlace (URL) plausible. No uses enlaces reales.

  Adopta un tono de autoridad y confianza, como si estuvieras escribiendo para una publicación académica respetada como 'The Conversation'.
  `,
});

const knowledgeBaseAgentFlow = ai.defineFlow(
  {
    name: 'knowledgeBaseAgentFlow',
    inputSchema: KnowledgeBaseInputSchema,
    outputSchema: KnowledgeBaseOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("La IA no pudo generar la información. Por favor, intenta de nuevo.");
    }
    return output;
  }
);
