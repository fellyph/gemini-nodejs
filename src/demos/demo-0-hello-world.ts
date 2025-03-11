// DEMO 0 - Hello World
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
(global as any).fetch = fetch;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-pro-exp-02-05',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
};

async function run() {
    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: 'user',
                parts: [{ text: 'when is the next befica match' }],
            },
        ],
    });

    const result = await chatSession.sendMessage('INSERT_INPUT_HERE');
    console.log(result.response.text());
}

run();
