import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import readline from 'readline';

/**
 * This demo shows how to use the GoogleGenAI chat API to create a chat with the AI.
 * It uses the readline module to read the user's input from the console.
 * It uses the GoogleGenAI chat API to send the user's input to the AI and receive the response.
 * It then prints the response to the console.
 * It then calls the askAndRespond function recursively to allow the user to continue the conversation.
 */

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || '' });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function runChat() {
    // create a chat

    async function askAndRespond() {
        rl.question('You: ', async (msg) => {
            if (msg.toLowerCase() === 'exit') {
                rl.close();
            } else {
                // send the message to the AI
                console.log('AI: ', 'response');
                askAndRespond();
            }
        });
    }

    askAndRespond(); // Start the conversation loop
}

runChat();
