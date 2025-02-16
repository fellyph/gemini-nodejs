import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from 'node-fetch';
import dotenv  from "dotenv";
import { promises as fs } from 'fs';

dotenv.config();
global.fetch = fetch;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


// 2. Generate text
async function generateText() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision"});

        const docPath = 'docs/fellyph-cv-2022.pdf';
        const docData = await fs.readFile(docPath);
        const docBase64 = docData.toString('base64');

        const parts = [
            {
                text: "Can you find 5 main skills from this curriculum?",
            },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: docBase64,
                }
            }
        ];

        const result = await model.generateContent({ contents: [{role: "user", parts }] });
        const response = await result.response;
        console.log(response.text());
    } catch(error) {
        console.log(error);
    }   
}

generateText();