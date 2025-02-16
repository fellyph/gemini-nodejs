# Gemini Node.js TypeScript Project

This project demonstrates the usage of Google's Gemini AI API with Node.js and TypeScript. It includes various examples of text generation and image/document analysis using the Gemini Pro and Gemini Pro Vision models.

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

### Basic Demos
- `npm run demo0` - Basic example of Gemini text generation
- `npm run demo1` - Generate a list of Brazilian rivers in JSON format
- `npm run demo2` - Generate a story about a shaman with translations

### Feature-Specific Demos
- `npm run demo:city` - City-related text generation example
- `npm run demo:prompt` - Demonstrates prompt configuration and customization
- `npm run demo:structured` - Shows structured output generation

### Final Demo Versions
- `npm run final:demo0` - Final version of the basic text generation
- `npm run final:demo1` - Final version of the Brazilian rivers demo
- `npm run final:demo2` - Final version with structured output

### Media Analysis Examples
- `npm run image` - Analyzes an image and provides description
- `npm run pdf` - Extracts skills from a PDF curriculum
- `npm run board` - Parses text from a board image

### Testing
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

- `app.ts` - Main Express server application
- `demo-*.ts` - Various demo scripts showing different Gemini AI features
- `final-demo-*.ts` - Final versions of the demo scripts
- `app-image.ts` - Image analysis example
- `app-pdf.ts` - PDF analysis example
- `app-image-board.ts` - Image text extraction example
- `__tests__/` - Test files for the application
  - `demo-1.test.ts` - Tests for demo-1
  - `demo-2.test.ts` - Tests for demo-2
  - `utils/test-utils.ts` - Test utilities and mocks

## TypeScript Configuration

The project uses TypeScript with the following configuration:
- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Source maps enabled
- Output directory: ./dist

## Testing

The project uses Jest for testing with the following features:
- TypeScript support via ts-jest
- Mocked Gemini AI responses
- Error handling tests
- Coverage reporting

To run the tests:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Demo Descriptions

### Basic Demos
- **demo0**: Introduction to Gemini AI text generation
- **demo1**: Demonstrates JSON output with Brazilian rivers list
- **demo2**: Shows creative text generation with translation

### Feature-Specific Demos
- **demo:city**: Example of location-based text generation
- **demo:prompt**: Shows how to configure and customize prompts
- **demo:structured**: Demonstrates generating structured data outputs

### Final Versions
- **final:demo0**: Enhanced version of the basic text generation
- **final:demo1**: Improved version of the Brazilian rivers demo
- **final:demo2**: Advanced structured output with error handling

```bash
node app-image.js
```
