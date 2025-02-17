import { Router, Request, Response } from "express";
import {
    GoogleGenerativeAI,
    GenerativeModel,
    SchemaType,
} from "@google/generative-ai";
import dotenv from "dotenv";
import { RiverResponse } from "../types/River";

dotenv.config();

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

router.post("/rivers", async (req: Request, res: Response) => {
    try {
        const { country } = req.body;

        if (!country) {
            return res.status(400).json({
                success: false,
                error: "Country is required in the request body",
            });
        }

        // Define the schema for structured output
        const schema = {
            description: "List of rivers with their lengths",
            type: SchemaType.OBJECT,
            properties: {
                rivers: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            riverName: {
                                type: SchemaType.STRING,
                                description: "Name of the river",
                                nullable: false,
                            },
                            riverLength: {
                                type: SchemaType.NUMBER,
                                description:
                                    "Length of the river in kilometers",
                                nullable: false,
                            },
                        },
                        required: ["riverName", "riverLength"],
                    },
                },
            },
            required: ["rivers"],
        };

        const model: GenerativeModel = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-001",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const prompt = `List 5 main rivers in ${country} with their lengths in kilometers. Include only the largest and most significant rivers.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse the JSON response
        const riversData = JSON.parse(text);

        const apiResponse: RiverResponse = {
            success: true,
            data: riversData,
        };

        res.json(apiResponse);
    } catch (error) {
        console.error("Error:", error);
        const apiResponse: RiverResponse = {
            success: false,
            error: "Failed to fetch rivers data",
        };
        res.status(500).json(apiResponse);
    }
});

export default router;
