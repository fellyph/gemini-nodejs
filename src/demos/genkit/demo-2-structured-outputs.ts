import { genkit, z } from 'genkit';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import dotenv from 'dotenv';

dotenv.config();

const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })],
    model: gemini20Flash,
});

const { output } = await ai.generate({
    prompt: 'Create a brief profile for a character in a fantasy video game.',
    // Specify output structure using Zod schema
    output: {
        format: 'json',
        schema: z.object({
            name: z.string(),
            role: z.enum(['knight', 'mage', 'archer']),
            backstory: z.string(),
        }),
    },
});

console.log(output);
