import { genkit, z } from 'genkit';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';

dotenv.config();

async function main() {
    try {
        // Initialize genkit with the Google AI plugin
        const ai = genkit({
            plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })],
            model: gemini20Flash, // Using gemini15Pro which supports multimodal inputs
        });

        console.log('Reading image file...');

        // Read the image file (using lagos-dona-ana.jpg from the assets directory)
        const imagePath = path.join(process.cwd(), 'assets', 'img', 'lagos-dona-ana.jpg');
        const imageData = await fs.readFile(imagePath);
        const imageBase64 = imageData.toString('base64');
        const dataUrl = `data:image/jpeg;base64,${imageBase64}`;

        console.log('Analyzing image and generating structured output...');

        // Define the schema for structured output
        const locationSchema = z.object({
            location: z.object({
                name: z.string().describe('The name of the location if identifiable'),
                country: z.string().describe('The country where this location is likely to be'),
                coordinates: z
                    .object({
                        latitude: z.string().optional().describe('Approximate latitude if known'),
                        longitude: z.string().optional().describe('Approximate longitude if known'),
                    })
                    .optional(),
            }),
            features: z.object({
                naturalFeatures: z
                    .array(z.string())
                    .describe('List of natural features visible in the image'),
                weather: z
                    .string()
                    .describe('Description of the weather conditions visible in the image'),
                waterColor: z.string().describe('Description of the color of the water'),
            }),
            tourismPotential: z.object({
                activities: z
                    .array(z.string())
                    .describe('List of activities possible at this location'),
                bestTimeToVisit: z.string().describe('Best time to visit this location'),
                impressionScore: z
                    .number()
                    .min(1)
                    .max(10)
                    .describe('Scenic beauty score from 1-10'),
            }),
        });

        // Generate the structured output based on the image
        const { output } = await ai.generate({
            prompt: [
                { media: { url: dataUrl } },
                {
                    text: 'Analyze this image and provide structured information about the location.',
                },
            ],
            output: {
                format: 'json',
                schema: locationSchema,
            },
        });

        console.log('Structured output:');
        console.log(JSON.stringify(output, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
