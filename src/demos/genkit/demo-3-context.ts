import { genkit } from 'genkit';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Demo: Using Context in Genkit
 *
 * This demo shows how to use context to pass information through different parts
 * of a Genkit application. Context allows you to provide information that is
 * accessible to the model without explicitly passing it as part of the prompt.
 *
 * Context is particularly useful for:
 * 1. Passing user information (like roles, permissions, preferences)
 * 2. Providing system information (like version, environment, features)
 * 3. Sharing execution context between different parts of your application
 *
 * In this demo, we'll show how to use context with the generate function to
 * provide information to the model without explicitly including it in the prompt.
 */

// Initialize Genkit with Google AI plugin
const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })],
    model: gemini20Flash,
});

// Main function to demonstrate context usage
async function main() {
    // Create contexts with different user information
    // These objects will be passed to the generate function as context
    // but won't be directly visible in the prompt text

    // Admin user context
    const adminContext = {
        user: {
            id: '12345',
            name: 'Admin User',
            role: 'admin',
        },
    };

    // Regular user context
    const regularUserContext = {
        user: {
            id: '67890',
            name: 'Regular User',
            role: 'user',
        },
    };

    // Example 1: Using context with admin user
    console.log('--- Admin User Example ---');
    const { text: adminResponse } = await ai.generate({
        // The prompt doesn't explicitly mention the user's role or permissions
        // This information will be provided through the context object
        prompt: `
            You are a helpful assistant for a content management system.
            
            Based on the user context provided (not visible in this prompt), 
            explain what actions this user can perform in the system.
            
            Be specific about the user's role and permissions.
        `,
        // Pass the admin context to the generate function
        // The model can access this information even though it's not in the prompt
        context: adminContext,
    });
    console.log(adminResponse);

    // Example 2: Using context with regular user
    console.log('\n--- Regular User Example ---');
    const { text: userResponse } = await ai.generate({
        // Same prompt as before, but with a different context
        prompt: `
            You are a helpful assistant for a content management system.
            
            Based on the user context provided (not visible in this prompt), 
            explain what actions this user can perform in the system.
            
            Be specific about the user's role and permissions.
        `,
        // Pass the regular user context to the generate function
        context: regularUserContext,
    });
    console.log(userResponse);

    // Example 3: Using context with system information
    console.log('\n--- System Context Example ---');
    // System context with information about the application
    const systemContext = {
        system: {
            version: '2.5.1',
            environment: 'production',
            features: ['content-editing', 'user-management', 'analytics'],
            lastUpdated: '2025-02-15',
        },
    };

    const { text: systemResponse } = await ai.generate({
        prompt: `
            You are a helpful assistant for a content management system.
            
            Based on the system context provided (not visible in this prompt),
            explain the current system status and available features.
            
            Be specific about the system version and environment.
        `,
        // Pass the system context to the generate function
        context: systemContext,
    });
    console.log(systemResponse);

    /**
     * Key takeaways about context in Genkit:
     *
     * 1. Context provides a way to pass information to the model without including it in the prompt
     * 2. Context can be used to provide user information, system information, or any other data
     * 3. Context is automatically propagated to all actions called within the scope of execution
     * 4. Context can be used with tools, flows, and other Genkit components
     * 5. Using context helps keep prompts clean and focused on the task at hand
     */
}

// Run the demo
main().catch(console.error);
