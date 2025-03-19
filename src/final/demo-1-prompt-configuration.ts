import { GoogleGenAI, GenerateContentConfig } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// 1. configure the API key
const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY || '',
});

// Reference: docs/prompt-config.md
// docs: https://googleapis.github.io/js-genai/interfaces/types.GenerateContentConfig.html
const generationConfig: GenerateContentConfig = {
    maxOutputTokens: 200, // Maximum number of tokens that can be generated in a single call. 100 tokens is approximately 60-80 words
    temperature: 0.2, // Determines how random the text will be - lower value = more deterministic, higher value = more creative
    stopSequences: ['PHP'],
    systemInstruction:
        'You are a helpful coding tutor that can answer questions and help with tasks.',
};

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
            config: generationConfig,
        });

        console.log('Text: ', result.text);
    } catch (error) {
        console.error('Error:', error);
    }
}

generateText();
