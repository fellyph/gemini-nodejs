# Google Gen AI SDK for TypeScript and JavaScript

[![NPM Downloads](https://img.shields.io/npm/dw/%40google%2Fgenai)](https://www.npmjs.com/package/@google/genai)
[![Node Current](https://img.shields.io/node/v/%40google%2Fgenai)](https://www.npmjs.com/package/@google/genai)

**Documentation:** https://googleapis.github.io/js-genai/

The Google Gen AI JavaScript SDK is an **experimental SDK** designed for TypeScript and JavaScript developers to build applications powered by Gemini. It supports both the [Gemini Developer API](https://ai.google.dev/gemini-api/docs) and [Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview).

> [!CAUTION]
> **Experimental SDK:** This SDK is under active development and may experience breaking changes.

> [!CAUTION]
> **API Key Security:** Avoid exposing API keys in client-side code. Use server-side implementations in production environments.

## Prerequisites

*   Node.js version 18 or later

## Installation

```shell
npm install @google/genai
```

## Quickstart

Using an API key from [Google AI Studio](https://aistudio.google.com/apikey):

```typescript
import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}

main();
```

## Web Quickstart

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Using My Package</title>
  </head>
  <body>
    <script type="module">
      import {GoogleGenAI} from 'https://cdn.jsdelivr.net/npm/@google/genai@latest/+esm'

          const ai = new GoogleGenAI({apiKey:"GEMINI_API_KEY"});

          async function main() {
            const response = await ai.models.generateContent({
              model: 'gemini-2.0-flash-001',
              contents: 'Why is the sky blue?',
            });
            console.log(response.text);
          }

          main();
    </script>
  </body>
</html>
```

## Initialization

### Gemini Developer API

```typescript
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
```

#### Browser

> [!CAUTION] **API Key Security:** Avoid exposing API keys in client-side code. Use server-side implementations in production environments.

```typescript
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
```

### Vertex AI

```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    vertexai: true,
    project: 'your_project',
    location: 'your_location',
});
```

## GoogleGenAI Overview

API features are accessed through a `GoogleGenAI` instance. Key submodules:

*   [`client.models`](https://googleapis.github.io/js-genai/classes/models.Models.html):  Query models (`generateContent`, `generateImages`), examine metadata.
*   [`client.caches`](https://googleapis.github.io/js-genai/classes/caches.Caches.html): Create and manage caches for repeated prompts.
*   [`client.chats`](https://googleapis.github.io/js-genai/classes/chats.Chats.html):  Create local stateful chat objects.
*   [`client.files`](https://googleapis.github.io/js-genai/classes/files.Files.html): Upload files for prompts (bandwidth reduction, large files).
*   [`client.live`](https://googleapis.github.io/js-genai/classes/live.Live.html):  Real-time interaction (text + audio + video).

## Samples

More samples: [github samples directory](https://github.com/googleapis/js-genai/tree/main/sdk-samples).

### Streaming

```typescript
import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-001',
    contents: 'Write a 100-word poem.',
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
```

### Function Calling

Let Gemini interact with external systems. Requires:

1.  **Declare function name, description, parameters.**
2.  **Call `generateContent` with function calling enabled.**
3.  **Use returned `FunctionCall` parameters to call your function.**
4.  **Send the result back to the model (using `FunctionResponse`).**

```typescript
import {GoogleGenAI, FunctionCallingConfigMode, FunctionDeclaration, Type} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function main() {
  const controlLightDeclaration: FunctionDeclaration = {
    name: 'controlLight',
    parameters: {
      type: Type.OBJECT,
      description: 'Set the brightness and color temperature of a room light.',
      properties: {
        brightness: {
          type: Type.NUMBER,
          description:
              'Light level from 0 to 100. Zero is off and 100 is full brightness.',
        },
        colorTemperature: {
          type: Type.STRING,
          description:
              'Color temperature of the light fixture which can be `daylight`, `cool`, or `warm`.',
        },
      },
      required: ['brightness', 'colorTemperature'],
    },
  };

  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Dim the lights so the room feels cozy and warm.',
    config: {
      toolConfig: {
        functionCallingConfig: {
          // Force it to call any function
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: ['controlLight'],
        }
      },
      tools: [{functionDeclarations: [controlLightDeclaration]}]
    }
  });

  console.log(response.functionCalls);
}

main();
```
****