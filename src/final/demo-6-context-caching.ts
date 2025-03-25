/* @deprecated */
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FileState, GoogleAICacheManager, GoogleAIFileManager } from '@google/generative-ai/server';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Define interfaces for our data objects
interface FileUploadConfig {
    filePath: string;
    displayName: string;
    mimeType: string;
}

interface FileData {
    mimeType: string;
    fileUri: string;
}

interface CacheConfig {
    model: string;
    displayName: string;
    systemInstruction: string;
    filesData: FileData[];
    ttlSeconds: number;
}

interface QueryConfig {
    role: string;
    text: string;
}

// A helper function to upload the PDF file to be cached
async function uploadPdfFile(config: FileUploadConfig) {
    const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY || '');
    const fileResult = await fileManager.uploadFile(config.filePath, {
        displayName: config.displayName,
        mimeType: config.mimeType,
    });

    const { name, uri } = fileResult.file;

    // Poll getFile() to check file state
    let file = await fileManager.getFile(name);
    while (file.state === FileState.PROCESSING) {
        console.log(`Waiting for ${config.displayName} to be processed.`);
        // Sleep for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2_000));
        file = await fileManager.getFile(name);
    }

    console.log(`File processing complete: ${uri}`);

    return fileResult;
}

// Create a cache with the given configuration
async function createCache(config: CacheConfig) {
    const cacheManager = new GoogleAICacheManager(process.env.GOOGLE_API_KEY || '');

    // Create contents array from the filesData
    const contents = config.filesData.map((fileData) => ({
        role: 'user',
        parts: [
            {
                fileData: {
                    mimeType: fileData.mimeType,
                    fileUri: fileData.fileUri,
                },
            },
        ],
    }));

    const cache = await cacheManager.create({
        model: config.model,
        displayName: config.displayName,
        systemInstruction: config.systemInstruction,
        contents,
        ttlSeconds: config.ttlSeconds,
    });

    return cache;
}

// Generate content with a given query
async function generateContent(model: any, query: QueryConfig) {
    const result = await model.generateContent({
        contents: [
            {
                role: query.role,
                parts: [
                    {
                        text: query.text,
                    },
                ],
            },
        ],
    });

    return result;
}

async function run() {
    try {
        // Define file configurations for multiple PDFs
        const fileConfigs: FileUploadConfig[] = [
            {
                filePath: path.join(process.cwd(), '/public/files/gemini-prompt-101.pdf'),
                displayName: 'Gemini Prompt Engineering PDF',
                mimeType: 'application/pdf',
            },
            {
                filePath: path.join(process.cwd(), '/public/files/gemini-image-prompt-101.pdf'),
                displayName: 'Gemini Prompt Engineering for images PDF',
                mimeType: 'application/pdf',
            },
            {
                filePath: path.join(process.cwd(), '/public/files/gemini-file-prompt-101.pdf'),
                displayName: 'Gemini Prompt Engineering for files PDF',
                mimeType: 'application/pdf',
            },
            {
                filePath: path.join(process.cwd(), '/public/files/gemini-prompt-strategies.pdf'),
                displayName: 'Gemini Prompt Strategies PDF',
                mimeType: 'application/pdf',
            },
            {
                filePath: path.join(process.cwd(), '/public/files/gemini-learn-lm.pdf'),
                displayName: 'Gemini Learn LM PDF',
                mimeType: 'application/pdf',
            },
            {
                filePath: path.join(process.cwd(), '/public/files/gemini-tokens-counting.pdf'),
                displayName: 'Gemini Tokens Counting PDF',
                mimeType: 'application/pdf',
            },
        ];

        // Upload all files and collect their results
        const fileResults = [];
        for (const config of fileConfigs) {
            console.log(`Uploading ${config.displayName}...`);
            const result = await uploadPdfFile(config);
            fileResults.push(result);
        }

        // Create file data objects from results
        const filesData: FileData[] = fileResults.map((result) => ({
            mimeType: result.file.mimeType,
            fileUri: result.file.uri,
        }));

        // Create cache configuration with all file data
        const cacheConfig: CacheConfig = {
            model: 'models/gemini-1.5-flash-001',
            displayName: 'gemini-prompt-guide',
            systemInstruction:
                'You are an expert document analyzer. Your job is to answer ' +
                "the user's query based on the PDF documents you have access to about Gemini Prompt Engineering.",
            filesData,
            ttlSeconds: 2000,
        };

        // Create the cache using the configuration
        const cache = await createCache(cacheConfig);

        // Initialize the Generative AI with the API key
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

        // Construct a GenerativeModel which uses the cache object
        const genModel = genAI.getGenerativeModelFromCachedContent(cache);

        // Create initial query configuration
        const initialQuery: QueryConfig = {
            role: 'user',
            text: 'What are the main topics covered in these PDFs?',
        };

        // Generate content with the initial query
        console.log(`Asking: ${initialQuery.text}`);
        const result = await generateContent(genModel, initialQuery);

        console.log('Initial Response:', result.response.text());
        console.log('Usage Metadata:', result.response.usageMetadata);

        // Define follow-up questions
        const followUpQueries: QueryConfig[] = [
            {
                role: 'user',
                text: 'What are the best practices for prompt engineering mentioned in the documents?',
            },
        ];

        // Ask follow-up questions using the cached context
        for (const query of followUpQueries) {
            console.log(`\nAsking: ${query.text}`);
            const followUp = await generateContent(genModel, query);

            console.log('Response:', followUp.response.text());
            console.log('Usage Metadata:', followUp.response.usageMetadata);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
