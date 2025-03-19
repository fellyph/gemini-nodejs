import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config(); // Import readline for reading terminal input

// 1. configure the API key
const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY || '',
});

//2. Generate text with streaming
async function run() {
    const stream = await genAI.models.generateContentStream({
        model: 'gemini-2.0-flash-001',
        contents: [
            {
                role: 'user',
                parts: [{ text: 'Write a poem about a Javascript Developer that is scared of AI' }],
            },
        ],
    });

    for await (const chunk of stream) {
        console.log(chunk.text);
    }
}

run();
