// PROMP CONFIGURATION
import { GoogleGenerativeAI, GenerativeModel, SchemaType } from '@google/generative-ai';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
(global as any).fetch = fetch;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const schema = {
            description: 'List of rivers',
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    riverName: {
                        type: SchemaType.STRING,
                        description: 'Name of the river',
                        nullable: false,
                    },
                    riverLength: {
                        type: SchemaType.NUMBER,
                        description: 'Lenght of the river in KM',
                        nullable: false,
                    },
                },
                required: ['riverName', 'riverLength'],
            },
        };

        const model: GenerativeModel = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-001',
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: schema,
            },
        });

        /* const prompt = `List 5 main river in Portugal in JSON code using this JSON schema:
                            River = {'riverName': string, 'riverLength': number}
                            Return: Array<River>`; */

        const prompt = `List 5 main river in Portugal`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text: string = response.text();
        console.log(text);
    } catch (error) {
        console.error('Error:', error);
    }
}

generateText();
