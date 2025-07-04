'use server';

/**
 * @fileOverview An AI-powered tool that categorizes all elements of the user's workspaces to help establish a harmonious workflow.
 *
 * - workspaceHarmonizer - A function that handles the workspace categorization process.
 * - WorkspaceHarmonizerInput - The input type for the workspaceHarmonizer function.
 * - WorkspaceHarmonizerOutput - The return type for the workspaceHarmonizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WorkspaceHarmonizerInputSchema = z.object({
  workspaceElements: z
    .string()
    .describe("A comma separated list of workspace elements that the user wants to categorize. For example: 'notebook, pens, monitor, keyboard, mouse, documents'."),
});
export type WorkspaceHarmonizerInput = z.infer<typeof WorkspaceHarmonizerInputSchema>;

const WorkspaceHarmonizerOutputSchema = z.object({
  categories: z.array(
    z.object({
      category: z.string().describe('The category of workspace elements.'),
      elements: z.array(z.string()).describe('The list of workspace elements in this category.'),
    })
  ).describe('The categories and workspace elements in each category.'),
});
export type WorkspaceHarmonizerOutput = z.infer<typeof WorkspaceHarmonizerOutputSchema>;

export async function workspaceHarmonizer(input: WorkspaceHarmonizerInput): Promise<WorkspaceHarmonizerOutput> {
  return workspaceHarmonizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'workspaceHarmonizerPrompt',
  input: {schema: WorkspaceHarmonizerInputSchema},
  output: {schema: WorkspaceHarmonizerOutputSchema},
  prompt: `You are an AI assistant that categorizes workspace elements to help users establish a harmonious workflow.

  Given a list of workspace elements, you will categorize them into logical groups.

  Workspace elements: {{{workspaceElements}}}

  Return a JSON object with the categories and the workspace elements in each category.
  `,
});

const workspaceHarmonizerFlow = ai.defineFlow(
  {
    name: 'workspaceHarmonizerFlow',
    inputSchema: WorkspaceHarmonizerInputSchema,
    outputSchema: WorkspaceHarmonizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
