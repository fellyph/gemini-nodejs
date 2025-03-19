// DEMO 0 - Hello World
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// 1. configure the API key
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || '' });

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: `Say hello to the Workshop's audience`,
        });
        console.log(response.text);
    } catch (error) {
        console.error('Error:', error);
    }
}

generateText();
