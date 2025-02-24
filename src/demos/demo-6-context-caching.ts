import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

async function loadPdfAsBase64(filePath: string): Promise<string> {
    const pdfBuffer = await fs.promises.readFile(filePath);
    return pdfBuffer.toString('base64');
}

async function run() {
    try {
        // Load the PDF file
        const pdfPath = path.join(process.cwd(), 'gemini-prompt-101.pdf');
        const pdfBase64 = await loadPdfAsBase64(pdfPath);

        // Initialize the model with the PDF content
        const model = genAI.getGenerativeModel({
            model: 'gemini-pro-vision',
            generationConfig: {
                temperature: 0.4,
                topK: 32,
                topP: 1,
                maxOutputTokens: 4096,
            },
        });

        // Create chat session with the PDF context
        const chat = model.startChat({
            history: [],
            context: `I have loaded a PDF document about Gemini Prompt Engineering. Please help me understand its contents.`,
        });

        // Send initial message with the PDF content
        const result = await chat.sendMessage({
            contents: [
                {
                    parts: [
                        {
                            text: 'What are the main topics covered in this PDF?',
                            inlineData: {
                                mimeType: 'application/pdf',
                                data: pdfBase64,
                            },
                        },
                    ],
                },
            ],
        });

        console.log('Initial Response:', await result.response.text());

        // Ask follow-up questions using the cached context
        const followUpQuestions = [
            'What are the best practices for prompt engineering mentioned in the document?',
            'Can you summarize the key points about prompt formatting?',
        ];

        for (const question of followUpQuestions) {
            const followUp = await chat.sendMessage(question);
            console.log(`\nQuestion: ${question}`);
            console.log('Response:', await followUp.response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
