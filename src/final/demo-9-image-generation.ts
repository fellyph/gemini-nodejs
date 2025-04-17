import { GoogleGenAI } from '@google/genai';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
config();

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
}

// Get the directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateImage() {
    try {
        // Initialize the Google Genai client
        const ai = new GoogleGenAI({ vertexai: false, apiKey: GEMINI_API_KEY });

        console.log('Generating image...');

        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: 'Robot holding a red skateboard in Porto, Portugal',
            config: {
                numberOfImages: 1,
                includeRaiReason: true,
            },
        });

        if (response?.generatedImages?.[0]?.image?.imageBytes) {
            // Create output directory if it doesn't exist
            const outputDir = path.join(__dirname, '../../output');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Save the image to a file
            const outputPath = path.join(outputDir, 'generated-image.png');
            fs.writeFileSync(outputPath, response.generatedImages[0].image.imageBytes, 'base64');
            console.log(`Image generated successfully and saved to: ${outputPath}`);
        } else {
            console.error('No image was generated in the response');
        }
    } catch (error) {
        console.error('Error generating image:', error);
    }
}

// Run the image generation
generateImage();
