import dotenv from 'dotenv';
dotenv.config();
import readline from 'readline';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function run() {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });

    /*
     * COMPLETE: Start the chat
     */

    async function askAndRespond() {
        rl.question('You: ', async (msg) => {
            if (msg.toLowerCase() === 'exit') {
                rl.close();
            } else {
                /*
                 * COMPLETE: Submit the message to the model
                 */

                console.log('AI: ', 'RESPONSE HERE');
                askAndRespond();
            }
        });
    }

    askAndRespond(); // Start the conversation loop
}

run();
