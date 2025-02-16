import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { promises as fs } from "fs";

dotenv.config();
(global as any).fetch = fetch;

interface ImagePart {
    inlineData: {
        mimeType: string;
        data: string;
    };
}

interface TextPart {
    text: string;
}

type Part = TextPart | ImagePart;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// 2. Generate text
async function generateText(): Promise<void> {
    try {
        const model: GenerativeModel = genAI.getGenerativeModel({
            model: "gemini-pro-vision",
        });

        const imagePath: string = "img/lagos-dona-ana.jpg";
        const imageData: Buffer = await fs.readFile(imagePath);
        const imageBase64: string = imageData.toString("base64");

        const parts: Part[] = [
            {
                text: "Describe the image below in a few sentences and could you guess where this image was taken? and translate it to portuguese.",
            },
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: imageBase64,
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
