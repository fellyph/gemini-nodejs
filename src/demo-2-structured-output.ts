// PROMP CONFIGURATION
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
(global as any).fetch = fetch;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const model: GenerativeModel = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-001',
        });

        const prompt: string = `List 5 main river in Portugal in JSON code`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text: string = response.text();
        console.log(text);
    } catch (error) {
        console.error('Error:', error);
    }
}

generateText();
