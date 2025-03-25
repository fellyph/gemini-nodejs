import { Router, Request, Response } from 'express';
import { GoogleGenAI, Type, Schema } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || '' });

router.post('/analyze-book', async (req: Request, res: Response) => {
    try {
        const { imageData, mimeType } = req.body;

        if (!imageData || !mimeType) {
            return res.status(400).json({
                success: false,
                error: 'Image data and MIME type are required in the request body',
            });
        }

        // Define the schema for structured output
        const bookSchema: Schema = {
            description: 'Book information',
            type: Type.OBJECT,
            properties: {
                bookTitle: {
                    type: Type.STRING,
                    description: 'Title of the book',
                    nullable: false,
                },
                bookAuthor: {
                    type: Type.STRING,
                    description: 'Author of the book',
                    nullable: false,
                },
            },
            required: ['bookTitle', 'bookAuthor'],
        };

        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: [
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: imageData,
                    },
                },
                { text: 'Could you extract the name of the book and author' },
            ],
            config: {
                responseMimeType: 'application/json',
                responseSchema: bookSchema,
            },
        });

        const text = response.text || '';
        const bookData = JSON.parse(text);

        res.json({
            success: true,
            data: bookData,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to analyze book image',
        });
    }
});

export default router;
