import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { promises as fs } from "fs";

dotenv.config();
(global as any).fetch = fetch;

interface DocumentPart {
    inlineData: {
        mimeType: string;
        data: string;
    };
}

interface TextPart {
    text: string;
}

type Part = TextPart | DocumentPart;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const model: GenerativeModel = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-001-vision",
        });

        const docPath: string = "docs/fellyph-cv-2022.pdf";
        const docData: Buffer = await fs.readFile(docPath);
        const docBase64: string = docData.toString("base64");

        const parts: Part[] = [
            {
                text: "Can you find 5 main skills from this curriculum?",
            },
            {
                inlineData: {
                    mimeType: "application/pdf",
                    data: docBase64,
                },
            },
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
        });
        const response = await result.response;
        console.log(response.text());
    } catch (error) {
        console.error("Error:", error);
    }
}

generateText();
