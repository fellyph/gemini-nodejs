import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config(); // Import readline for reading terminal input

const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY || '',
});

async function run() {
    // Adding a prompt using the api for streaming a output
}

run();
