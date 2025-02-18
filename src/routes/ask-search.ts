import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

interface GeminiSearchResponse {
    response: {
        candidates: Array<{
            content: {
                parts: Array<unknown>; // Pode ser mais específico se souber a estrutura do Object
                role: 'model';
            };
            finishReason: 'STOP';
            groundingMetadata: {
                searchEntryPoint: {
                    renderedContent: string;
                };
                groundingChunks: Array<unknown>;
                groundingSupports: Array<unknown>;
                retrievalMetadata: Record<string, unknown>;
                webSearchQueries: string[];
            };
        }>;
        usageMetadata: {
            promptTokenCount: number;
            candidatesTokenCount: number;
            totalTokenCount: number;
            promptTokensDetails: Array<unknown>;
            candidatesTokensDetails: Array<unknown>;
        };
        modelVersion: string;
        text: () => unknown;
        functionCall: () => unknown;
        functionCalls: () => unknown;
    };
}

router.post('/ask-search', async (req: Request, res: Response) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({
            success: false,
            error: 'Question is required in the request body',
        });
    }

    const model = genAI.getGenerativeModel(
        {
            model: 'models/gemini-2.0-flash',
            tools: [
                {
                    googleSearch: {},
                },
            ],
        },
        { apiVersion: 'v1beta' }
    );

    const result = await model.generateContent(question);
    const response = result.response.candidates?.[0]?.groundingMetadata;
    console.log(response);

    if (!response) {
        return res.status(500).json({
            success: false,
            error: 'No response generated',
        });
    }

    res.json({ response });
});

export default router;
