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

        const imagePath = 'img/board.webp';
        const imageData = await fs.readFile(imagePath);
        const imageBase64 = imageData.toString('base64');

        const parts = [
            {
                //text: "Describe the image? and translate it to portuguese ",
                text: "Can you parse the cities with time from the imagem below?",
            },
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: imageBase64,        
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