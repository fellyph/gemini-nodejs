import { GoogleGenAI } from '@google/genai';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
config();

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

if (!GEMINI_API_KEY) {
    throw new Error('GOOGLE_API_KEY environment variable is not set');
}

// Get the directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to create delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateVideo() {
    try {
        // Initialize the Google Genai client
        const ai = new GoogleGenAI({ vertexai: false, apiKey: GEMINI_API_KEY });

        console.log('Starting video generation...');

        // Initial video generation request
        let operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: 'Man with a dog walking in a park on a sunny day',
            config: {
                numberOfVideos: 1,
            },
        });

        // Poll for completion
        while (!operation.done) {
            console.log('Waiting for video generation to complete...');
            await delay(1000);
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const response = operation.response;

        if (response?.generatedVideos?.[0]?.video?.uri) {
            // Create output directory if it doesn't exist
            const outputDir = path.join(__dirname, '../../output');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const videoUri = response.generatedVideos[0].video.uri;
            console.log('Video generated successfully!');
            console.log('Video URI:', videoUri);

            // Note: Depending on how the API returns the video data,
            // you might need to implement additional logic to download the video
            // from the URI and save it locally

            console.log('Check the video at the provided URI');
        } else {
            console.error('No video was generated in the response');
        }
    } catch (error) {
        console.error('Error generating video:', error);
    }
}

// Run the video generation
generateVideo();
