import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
(global as any).fetch = fetch;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const country: string = "Brazil";

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const model: GenerativeModel = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-001",
        });

        const prompt: string = `List 5 main river in ${country} in JSON code`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text: string = response.text();
        console.log(text);
    } catch (error) {
        console.error("Error:", error);
    }
}

generateText();

/*
Note: For detailed information about the available models, including their capabilities and rate limits, 
see Gemini models. The rate limit for Gemini Pro models is 60 requests per minute (RPM), 
and we offer options for requesting rate limit increases.
*/
