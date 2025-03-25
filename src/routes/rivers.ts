import { GoogleGenAI, Type, Schema } from '@google/genai';
import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import { RiverResponse } from '../types/River';

dotenv.config();

const router = Router();

// 1. configure the API key
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || '' });

router.post('/rivers', async (req: Request, res: Response) => {
    try {
        const { country } = req.body;

        if (!country) {
            return res.status(400).json({
                success: false,
                error: 'Country is required in the request body',
            });
        }

        // Define the schema for structured output
        const schema: Schema = {
            description: 'List of rivers with their lengths',
            type: Type.OBJECT,
            properties: {
                rivers: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            riverName: {
                                type: Type.STRING,
                                description: 'Name of the river',
                                nullable: false,
                            },
                            riverLength: {
                                type: Type.NUMBER,
                                description: 'Length of the river in kilometers',
                                nullable: false,
                            },
                        },
                        required: ['riverName', 'riverLength'],
                    },
                },
            },
            required: ['rivers'],
        };

        const prompt = `List 5 main rivers in ${country} with their lengths in kilometers. Include only the largest and most significant rivers.`;

        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }],
                },
            ],
            config: {
                responseMimeType: 'application/json',
                responseSchema: schema,
            },
        });

        const text = response.text || '';

        // Parse the JSON response
        const riversData = JSON.parse(text);

        const apiResponse: RiverResponse = {
            success: true,
            data: riversData,
        };

        res.json(apiResponse);
    } catch (error) {
        console.error('Error:', error);
        const apiResponse: RiverResponse = {
            success: false,
            error: 'Failed to fetch rivers data',
        };
        res.status(500).json(apiResponse);
    }
});

export default router;
