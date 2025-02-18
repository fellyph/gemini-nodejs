import { GoogleGenerativeAI, GenerativeModel, GenerationConfig } from '@google/generative-ai';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
(global as any).fetch = fetch;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Reference: docs/prompt-config.md
const generationConfig: GenerationConfig = {
    maxOutputTokens: 200, // Maximum number of tokens that can be generated in a single call. 100 tokens is approximately 60-80 words
    temperature: 0.2, // Determines how random the text will be - lower value = more deterministic, higher value = more creative
    stopSequences: ['PHP'],
};
// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const model: GenerativeModel = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-001',
            systemInstruction:
                'You are a helpful coding tutor that can answer questions and help with tasks.',
        });

        const result = await model.generateContent({
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
            generationConfig,
        });

        const response = await result.response;
        const text: string = response.text();
        console.log('Text: ', text);
    } catch (error) {
        console.error('Error:', error);
    }
}

generateText();
