import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI, GenerativeModel, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

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
        const bookSchema = {
            type: SchemaType.OBJECT,
            properties: {
                bookTitle: {
                    type: SchemaType.STRING,
                    description: 'Title of the book',
                    nullable: false,
                },
                bookAuthor: {
                    type: SchemaType.STRING,
                    description: 'Author of the book',
                    nullable: false,
                },
            },
            required: ['bookTitle', 'bookAuthor'],
        };

        const model: GenerativeModel = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-001',
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: bookSchema,
            },
        });

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: mimeType,
                    data: imageData,
                },
            },
            { text: 'Could you extract the name of the book and author' },
        ]);

        const response = await result.response;
        const text = response.text();
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
