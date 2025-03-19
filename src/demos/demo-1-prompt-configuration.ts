import { GoogleGenAI, GenerateContentConfig } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// 1. configure the API key
const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY || '',
});

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const result = await genAI.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: 'Talk about the main programing languages and their features.',
                        },
                    ],
                },
            ],
            // adding prompt configuration
            //
            // config: generationConfig,
        });

        console.log('Text: ', result.text);
    } catch (error) {
        console.error('Error:', error);
    }
}

generateText();
