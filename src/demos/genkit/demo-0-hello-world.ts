// import the Genkit and Google AI plugin libraries
import { gemini20Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import dotenv from 'dotenv';

// genkit - provides genkit core capabilities
// genkit-ai/googleai - provides google ai models
// gemini20Flash - provides the gemini 2.0 flash model

dotenv.config();

// configure a Genkit instance
const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })],
    model: gemini20Flash, // set default model
});

async function main() {
    // make a generation request
    const { text } = await ai.generate('Hello, Gemini!');
    console.log(text);
}

main();
