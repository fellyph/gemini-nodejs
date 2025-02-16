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

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run the compiled app (Express server)
- `npm run dev` - Run the app directly with ts-node (development mode)
- `npm run watch` - Watch for changes and recompile TypeScript

### Demo Scripts
- `npm run demo1` - Run demo-1.ts (Generates JSON list of Brazilian rivers)
- `npm run demo2` - Run demo-2.ts (Generates a story about a shaman)

### Image and Document Analysis
- `npm run image` - Run app-image.ts (Analyzes an image and provides description)
- `npm run pdf` - Run app-pdf.ts (Extracts skills from a PDF curriculum)
- `npm run board` - Run app-image-board.ts (Parses text from a board image)

## Project Structure

- `app.ts` - Main Express server application
- `demo-1.ts` & `demo-2.ts` - Example scripts demonstrating Gemini Pro usage
- `app-image.ts` - Image analysis example
- `app-pdf.ts` - PDF analysis example
- `app-image-board.ts` - Image text extraction example

## TypeScript Configuration

The project uses TypeScript with the following configuration:
- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Source maps enabled
- Output directory: ./dist

```bash
node app-image.js
```
