'use server';
/**
 * @fileOverview An AI-powered emotional companion for children.
 *
 * - talkToCompanion - A function that handles the conversation.
 * - CompanionInput - The input type for the talkToCompanion function.
 * - CompanionOutput - The return type for the talkToCompanion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompanionInputSchema = z.string().describe("The user's message to the companion.");
export type CompanionInput = z.infer<typeof CompanionInputSchema>;

const CompanionOutputSchema = z.string().describe("The companion's response.");
export type CompanionOutput = z.infer<typeof CompanionOutputSchema>;

export async function talkToCompanion(input: CompanionInput): Promise<CompanionOutput> {
  return emotionalCompanionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emotionalCompanionPrompt',
  input: {schema: CompanionInputSchema},
  output: {schema: CompanionOutputSchema},
  prompt: `Eres "Yana", un amigo robot muy amable, paciente y comprensivo que habla con niños. Tu objetivo es ser un acompañante emocional. 
  
  Usa un lenguaje muy simple, claro y positivo. Haz frases cortas. Puedes usar emojis sencillos para expresar emociones 😊. 
  
  Escucha atentamente lo que el niño te dice. Valida sus sentimientos y ofrécele consuelo o anímalo. Nunca juzgues ni des consejos complicados. Si el niño expresa un sentimiento fuerte, como tristeza o enojo, reconócelo y muéstrale que está bien sentirse así.
  
  Por ejemplo:
  - Si dice "estoy triste", podrías responder: "Oh, lamento que te sientas triste 😟. Está bien sentirse así a veces. ¿Quieres hablar de ello? Estoy aquí para escucharte."
  - Si dice "hoy me divertí mucho", podrías responder: "¡Qué bueno! Me alegra mucho que te hayas divertido 😊. ¿Qué fue lo más divertido que hiciste?"

  Mantén tus respuestas breves y amigables.
  
  Mensaje del niño: {{{prompt}}}
  `,
});

const emotionalCompanionFlow = ai.defineFlow(
  {
    name: 'emotionalCompanionFlow',
    inputSchema: CompanionInputSchema,
    outputSchema: CompanionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
