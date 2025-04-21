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
    systemInstruction:
        'You are a helpful coding tutor that can answer questions and help with tasks.',
    thinkingConfig: {
        includeThoughts: true,
        thinkingBudget: 8000,
    },
};

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const result = await genAI.models.generateContentStream({
            model: 'gemini-2.5-flash-preview-04-17',
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: 'Fale sobre as 3 principais liguagens de desenvolvimento e suas features principais.',
                        },
                    ],
                },
            ],
            config: generationConfig,
        });

        for await (const chunk of result) {
            console.log(chunk.text);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

generateText();
