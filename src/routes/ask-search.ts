import { GoogleGenAI } from '@google/genai';
import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || '' });

router.post('/ask-search', async (req: Request, res: Response) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({
            success: false,
            error: 'Question is required in the request body',
        });
    }

    const result = await genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: question,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    if (!result?.candidates?.[0]?.groundingMetadata?.groundingSupports) {
        return res.status(500).json({
            success: false,
            error: 'No response generated',
        });
    }

    // Extract the text segments from groundingSupports
    const segments = result.candidates[0].groundingMetadata.groundingSupports
        .filter(
            (support): support is { segment: { text: string } } =>
                support?.segment?.text !== undefined
        )
        .map((support) => support.segment.text);

    // Join the segments to form the complete response
    const response = segments.join('\n');

    res.json({ success: true, response });
});

export default router;
