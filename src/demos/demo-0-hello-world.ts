// DEMO 0 - Hello World
import { GoogleGenAI } from '@google/genai';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
(global as any).fetch = fetch;

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        console.log('Hello, world!');
        //add a prompt using the api
    } catch (error) {
        console.error('Error:', error);
    }
}

generateText();
