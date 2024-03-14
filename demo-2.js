import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from 'node-fetch';
import dotenv  from "dotenv";

dotenv.config();
global.fetch = fetch;

// 1. configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const generationConfig = {
    maxOutputTokens: 200, // Número máximo de tokens que podem ser gerados numa única chamada. 100 tokes é aproximadamente 60-80 palavras
    temperature: 0.2, // Determina quão aleatório o texto será menor valor = mais deterministico, maior valor = mais criativo
};

// 2. Generate text
async function generateText() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        // exemplo de prompt com saída em português
        const parts = [
            {text: "Create a story about a man that follow his dreams and become a successful shaman in amazon forest and translate it to portuguese."},
          ];
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
        });
        const response = await result.response;
        const text = response.text();
        console.log('Text: ',text);
    } catch(error) {
        console.log(error);
    }   
}

generateText();