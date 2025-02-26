// import the Genkit and Google AI plugin libraries
import { gemini20Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import dotenv from 'dotenv';

dotenv.config();

// configure a Genkit instance
const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })],
    model: gemini20Flash, // set default model
});

async function main() {
    // Streamed generation
    const { stream } = ai.generateStream('Tell me a story');
    for await (const chunk of stream) {
        console.log(chunk.text);
    }
}

main();
