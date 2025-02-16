import {
    GoogleGenerativeAI,
    GenerativeModel,
    GenerationConfig,
} from "@google/generative-ai";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
(global as any).fetch = fetch;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const generationConfig: GenerationConfig = {
    maxOutputTokens: 200, // Maximum number of tokens that can be generated in a single call. 100 tokens is approximately 60-80 words
    temperature: 0.2, // Determines how random the text will be - lower value = more deterministic, higher value = more creative
};

interface Part {
    text: string;
}

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const model: GenerativeModel = genAI.getGenerativeModel({
            model: "gemini-pro",
        });

        const parts: Part[] = [
            {
                text: "Create a story about a man that follow his dreams and become a successful shaman in amazon forest and translate it to portuguese.",
            },
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
        });

        const response = await result.response;
        const text: string = response.text();
        console.log("Text: ", text);
    } catch (error) {
        console.error("Error:", error);
    }
}

generateText();
