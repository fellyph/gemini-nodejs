/* @deprecated */
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FileState, GoogleAICacheManager, GoogleAIFileManager } from '@google/generative-ai/server';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// A helper function to upload the PDF file to be cached
async function uploadPdfFile(filePath: string, displayName: string) {
    const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY || '');
    const fileResult = await fileManager.uploadFile(filePath, {
        displayName,
        mimeType: 'application/pdf',
    });

    const { name, uri } = fileResult.file;

    // Poll getFile() to check file state
    let file = await fileManager.getFile(name);
    while (file.state === FileState.PROCESSING) {
        console.log('Waiting for PDF to be processed.');
        // Sleep for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2_000));
        file = await fileManager.getFile(name);
    }

    console.log(`PDF processing complete: ${uri}`);

    return fileResult;
}

async function run() {
    try {
        // Path to the PDF file
        const pdfPath = path.join(process.cwd(), '/public/files/gemini-prompt-101.pdf');

        // Upload the PDF file
        const fileResult = await uploadPdfFile(pdfPath, 'Gemini Prompt Engineering PDF');

        // Construct a GoogleAICacheManager
        const cacheManager = new GoogleAICacheManager(process.env.GOOGLE_API_KEY || '');

        // Create a cache with a 5 minute TTL
        const displayName = 'gemini-prompt-guide';
        const model = 'models/gemini-1.5-flash-001';
        const systemInstruction =
            'You are an expert document analyzer. Your job is to answer ' +
            "the user's query based on the PDF document you have access to about Gemini Prompt Engineering.";
        const ttlSeconds = 2000;

        const cache = await cacheManager.create({
            model,
            displayName,
            systemInstruction,
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            fileData: {
                                mimeType: fileResult.file.mimeType,
                                fileUri: fileResult.file.uri,
                            },
                        },
                    ],
                },
            ],
            ttlSeconds,
        });

        // Initialize the Generative AI with the API key
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

        // Construct a GenerativeModel which uses the cache object
        const genModel = genAI.getGenerativeModelFromCachedContent(cache);

        // Ask initial question
        console.log('Asking: What are the main topics covered in this PDF?');
        const result = await genModel.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: 'What are the main topics covered in this PDF?',
                        },
                    ],
                },
            ],
        });

        console.log('Initial Response:', result.response.text());
        console.log('Usage Metadata:', result.response.usageMetadata);

        // Ask follow-up questions using the cached context
        const followUpQuestions = [
            'What are the best practices for prompt engineering mentioned in the document?',
            'Can you summarize the key points about prompt formatting?',
        ];

        for (const question of followUpQuestions) {
            console.log(`\nAsking: ${question}`);
            const followUp = await genModel.generateContent({
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: question,
                            },
                        ],
                    },
                ],
            });

            console.log('Response:', followUp.response.text());
            console.log('Usage Metadata:', followUp.response.usageMetadata);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
