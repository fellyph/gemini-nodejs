import { ContentListUnion, createPartFromUri, GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';

dotenv.config();

interface DocumentPart {
    inlineData: {
        mimeType: string;
        data: string;
    };
}

interface TextPart {
    text: string;
}

type Part = TextPart | DocumentPart;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GOOGLE_GENAI_USE_VERTEXAI = process.env.GOOGLE_GENAI_USE_VERTEXAI;

// 1. configure the API key
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/*
 *
 * TODO - finishing this demo
 *
 */

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const docPath: string = './public/docs/fellyph-cv-2022.pdf';
        const docData: Buffer = await fs.readFile(docPath);
        const docBase64: string = docData.toString('base64');

        const parts: Part[] = [
            {
                text: 'Can you find 5 main skills from this curriculum?',
            },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: docBase64,
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
