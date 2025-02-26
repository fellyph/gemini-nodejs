# Genkit Demos

This directory contains demos showcasing various features of Genkit, a framework for building AI-powered applications.

## Available Demos

### 1. Hello World (demo-0-hello-world.ts)

A simple "Hello World" example that demonstrates how to initialize Genkit with the Google AI plugin and generate a basic response.

### 2. Stream Response (demo-1-stream-response.ts)

Shows how to use Genkit to stream responses from the model, which is useful for creating more responsive user interfaces.

### 3. Structured Outputs (demo-2-structured-outputs.ts)

Demonstrates how to generate structured data (JSON) using Genkit's schema validation capabilities.

### 4. Context (demo-3-context.ts)

Illustrates how to use context to pass information through different parts of a Genkit application. Context allows you to provide information that is accessible to the model without explicitly passing it as part of the prompt.

Key takeaways about context in Genkit:

1. Context provides a way to pass information to the model without including it in the prompt
2. Context can be used to provide user information, system information, or any other data
3. Context is automatically propagated to all actions called within the scope of execution
4. Context can be used with tools, flows, and other Genkit components
5. Using context helps keep prompts clean and focused on the task at hand

### 5. Image with Structured Outputs (demo-4-image-structured-outputs.ts)

Shows how to combine multimodal input (image) with structured data output. This demo:

1. Loads an image file from disk
2. Converts it to a data URL format
3. Sends the image along with a text prompt to the Gemini model
4. Specifies a structured schema for the output using Zod
5. Validates and returns structured data about the image content

This demonstrates the multimodal capabilities of Gemini models to analyze images and return data in a structured format that can be easily used in applications.

## Running the Demos

To run any of the demos, use the following command:

```bash
npx tsx src/demos/genkit/[demo-file-name].ts
```

For example, to run the context demo:

```bash
npx tsx src/demos/genkit/demo-3-context.ts
```

Or you can use the npm scripts defined in package.json:

```bash
npm run genkit:image-structured
```

## Prerequisites

Make sure you have set up your environment variables correctly. You'll need a Google API key for the Gemini model:

```
GOOGLE_API_KEY=your_api_key_here
```

You can set this in a `.env` file at the root of the project. 