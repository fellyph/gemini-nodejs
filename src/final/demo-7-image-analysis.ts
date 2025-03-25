import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';

dotenv.config();

interface ImagePart {
    inlineData: {
        mimeType: string;
        data: string;
    };
}

interface TextPart {
    text: string;
}

type Part = TextPart | ImagePart;

// 1. configure the API key
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || '' });

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const imagePath: string = './public/imgs/flights-board.jpg';
        const imageData: Buffer = await fs.readFile(imagePath);
        const imageBase64: string = imageData.toString('base64');

        const parts: Part[] = [
            {
                text: 'Can you parse the cities with time from the imagem below?',
            },
            {
                inlineData: {
                    mimeType: 'image/webp',
                    data: imageBase64,
                },
            },
        ];

        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: [{ role: 'user', parts }],
        });
        console.log(response.text);
    } catch (error) {
        console.error('Error:', error);
    }
}

generateText();
