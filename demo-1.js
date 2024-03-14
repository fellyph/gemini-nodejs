import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from 'node-fetch';
import dotenv  from "dotenv";

dotenv.config();
global.fetch = fetch;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


// 2. Generate text
async function generateText() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const prompt = `Create a story about a man that follow his dreams 
        and become a successful shaman in amazon forest.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    } catch(error) {
        console.log(error);
    }   
}

generateText();

/*

Note: For detailed information about the available models, including their capabilities and rate limits, see Gemini models. The rate limit for Gemini Pro models is 60 requests per minute (RPM), and we offer options for requesting rate limit increases.
 
*/