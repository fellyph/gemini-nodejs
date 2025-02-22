# Gemini Node.js TypeScript Project

This project demonstrates the usage of Google's Gemini AI API with Node.js and TypeScript. It includes various examples of text generation and image/document analysis using the Gemini Pro and Gemini Pro Vision models.

This Workshop will start with a few demos executed on the terminal, to demostrate the usage of the Gemini API. The second part of the workshop will be focused on building a complete application using the Gemini API. Using express js to build a web application to demostrate the usage of the Gemini API.

## Demos

- [Hello World](./src/demos/demo-0-hello-world.ts) this is the first demo that will call the Gemini API to generate a text response.
- [Prompt Configuration](./src/demos/demo-1-prompt-configuration.ts) this demo will show how to configure the prompt for the Gemini API.
- [Streaming](./src/demos/demo-2-streaming.ts) this demo will show how to use the streaming feature of the Gemini API.
- [Chat](./src/demos/demo-3-chat.ts) this demo will show how to use the chat feature of the Gemini API.
- [Structured Output](./src/demos/demo-4-structured-output.ts) this demo will show how to use the structured output feature of the Gemini API.
- [Function Calling](./src/demos/demo-5-function-calling.ts) this demo will show how to use the function calling feature of the Gemini API.

## Web Application

- [Rivers](./src/views/rivers.ejs) this view will show how to use the structured output feature of the Gemini API to generate a list of rivers.
- [Image Analysis](./src/views/image-analysis.ejs) this view will show how to use the image analysis feature of the Gemini API to analyze an image.
- [Chat](./src/views/chat.ejs) this view will show how to use the chat feature of the Gemini API to build a chat application.
- [PDF Analysis](./src/views/pdf-analysis.ejs) this view will show how to use the PDF analysis feature of the Gemini API to analyze a PDF file.
## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)
- A Google API key for Gemini AI

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory and add your Google API key:
```bash
GOOGLE_API_KEY=your_api_key_here
```

## Available Scripts

The following npm scripts are available:

### Main Application
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run the compiled app (Express server)
- `npm run dev` - Run the app directly with ts-node (development mode)
- `npm run watch` - Watch for changes and recompile TypeScript

### Demo Scripts (Work in Progress)
- `npm run demo:helloworld` - Basic example of Gemini text generation
- `npm run demo:prompt` - Demonstrates prompt configuration
- `npm run demo:streaming` - Shows streaming responses from Gemini
- `npm run demo:chat` - Demonstrates chat functionality
- `npm run demo:structured` - Shows structured output generation

### Final Demo Versions
- `npm run final:demo0` - Final version of the hello world example
- `npm run final:demo1` - Final version of prompt configuration
- `npm run final:demo2` - Final version of streaming responses
- `npm run final:demo3` - Final version of chat functionality
- `npm run final:demo4` - Final version of structured output

### Media Analysis Examples
- `npm run image` - Analyzes an image and provides description
- `npm run pdf` - Extracts skills from a PDF curriculum
- `npm run board` - Parses text from a board image

### Testing and Formatting
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run format` - Format all TypeScript and EJS files
- `npm run format:check` - Check formatting of all files

## Project Structure

- `app.ts` - Main Express server application
- `src/demos/*.ts` - Work in progress demo scripts
- `src/final/*.ts` - Final versions of the demo scripts
- `app-image.ts` - Image analysis example
- `app-pdf.ts` - PDF analysis example
- `app-image-board.ts` - Image text extraction example

## Demo Descriptions

### Work in Progress Demos
- **demo:helloworld**: Basic introduction to Gemini AI text generation
- **demo:prompt**: Shows how to configure and customize prompts
- **demo:streaming**: Demonstrates streaming responses from the API
- **demo:chat**: Shows interactive chat functionality
- **demo:structured**: Demonstrates generating structured data outputs

### Final Versions
- **final:demo0**: Polished version of the hello world example
- **final:demo1**: Enhanced prompt configuration with best practices
- **final:demo2**: Production-ready streaming implementation
- **final:demo3**: Full-featured chat functionality
- **final:demo4**: Advanced structured output with error handling

```bash
node app-image.js
```
