// PROMP CONFIGURATION
import { GoogleGenAI, Type, Schema } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// 1. configure the API key
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || '' });

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        // Define the schema for the structured output
        // COMPLETE: Define the schema for the structured output

        // Generate content with structured output
        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: 'List 6 main river in Portugal' }],
                },
            ],
            // COMPLETE: define configuration
        });

        /* 
        format simplyfied using JSON schema instructions on the prompt:
        const prompt = `List 5 main river in Portugal in JSON code using this JSON schema:
                            River = {'riverName': string, 'riverLength': number}
                            Return: Array<River>`; */

        console.log(response.text);
    } catch (error) {
        console.error('Error:', error);
    }
}

generateText();
