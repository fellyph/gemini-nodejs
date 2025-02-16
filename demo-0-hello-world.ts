// DEMO 0 - Hello World
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
(global as any).fetch = fetch;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        console.log("Hello, world!");
    } catch (error) {
        console.error("Error:", error);
    }
}

generateText();
