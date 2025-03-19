## Models Class

Model class is responsable for the main functionalities on the SDK, with the following methods: 

- computeTokens
- countTokens
- embedContent
- generateContent
- generateContentStream
- generateImages

## computeTokens

```typescript
computeTokens(params: ComputeTokensParameters): Promise<ComputeTokensResponse>
```

Given a list of contents, returns a corresponding TokensInfo containing the list of tokens and list of token ids.

**This method is not supported by the Gemini Developer API.**

### Parameters

`params`: `ComputeTokensParameters`
The parameters for computing tokens.

### Returns

`Promise<ComputeTokensResponse>`
The response from the API.

### Example

```typescript
const response = await ai.models.computeTokens({
 model: 'gemini-2.0-flash',
 contents: 'What is your name?'
});
console.log(response);
```

## countTokens

```typescript
countTokens(params: CountTokensParameters): Promise<CountTokensResponse>
```

Counts the number of tokens in the given contents. Multimodal input is supported for Gemini models.

### Parameters

`params`: `CountTokensParameters`
The parameters for counting tokens.

### Returns

`Promise<CountTokensResponse>`
The response from the API.

### Example

```typescript
const response = await ai.models.countTokens({
 model: 'gemini-2.0-flash',
 contents: 'The quick brown fox jumps over the lazy dog.'
});
console.log(response);
```

## embedContent

```typescript
embedContent(params: EmbedContentParameters): Promise<EmbedContentResponse>
```

Calculates embeddings for the given contents. Only text is supported.

### Parameters

`params`: `EmbedContentParameters`
The parameters for embedding contents.

### Returns

`Promise<EmbedContentResponse>`
The response from the API.

### Example

```typescript
const response = await ai.models.embedContent({
 model: 'text-embedding-004',
 contents: [
   'What is your name?',
   'What is your favorite color?',
 ],
 config: {
   outputDimensionality: 64,
 },
});
console.log(response);
```

## generateContent

```typescript
generateContent(
    params: GenerateContentParameters,
): Promise<GenerateContentResponse>
```

Makes an API request to generate content with a given model.

For the `model` parameter, supported formats for Vertex AI API include:

*   The Gemini model ID, for example: `'gemini-2.0-flash'`
*   The full resource name starts with `'projects/'`, for example: `'projects/my-project-id/locations/us-central1/publishers/google/models/gemini-2.0-flash'`
*   The partial resource name with `'publishers/'`, for example: `'publishers/google/models/gemini-2.0-flash'` or `'publishers/meta/models/llama-3.1-405b-instruct-maas'`
*   `/` separated publisher and model name, for example: `'google/gemini-2.0-flash'` or `'meta/llama-3.1-405b-instruct-maas'`

For the `model` parameter, supported formats for Gemini API include:

*   The Gemini model ID, for example: `'gemini-2.0-flash'`
*   The model name starts with `'models/'`, for example: `'models/gemini-2.0-flash'`
*   For tuned models, the model name starts with `'tunedModels/'`, for example: `'tunedModels/1234567890123456789'`

Some models support multimodal input and output.

### Parameters

`params`: `GenerateContentParameters`
The parameters for generating content.

### Returns

`Promise<GenerateContentResponse>`
The response from generating content.

### Example

```typescript
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'why is the sky blue?',
  config: {
    candidateCount: 2,
  }
});
console.log(response);
```

## generateContentStream

```typescript
generateContentStream(
    params: GenerateContentParameters,
): Promise<AsyncGenerator<GenerateContentResponse, any, unknown>>
```

Makes an API request to generate content with a given model and yields the response in chunks.

For the `model` parameter, supported formats for Vertex AI API include:

*   The Gemini model ID, for example: `'gemini-2.0-flash'`
*   The full resource name starts with `'projects/'`, for example: `'projects/my-project-id/locations/us-central1/publishers/google/models/gemini-2.0-flash'`
*   The partial resource name with `'publishers/'`, for example: `'publishers/google/models/gemini-2.0-flash'` or `'publishers/meta/models/llama-3.1-405b-instruct-maas'`
*   `/` separated publisher and model name, for example: `'google/gemini-2.0-flash'` or `'meta/llama-3.1-405b-instruct-maas'`

For the `model` parameter, supported formats for Gemini API include:

*   The Gemini model ID, for example: `'gemini-2.0-flash'`
*   The model name starts with `'models/'`, for example: `'models/gemini-2.0-flash'`
*   For tuned models, the model name starts with `'tunedModels/'`, for example: `'tunedModels/1234567890123456789'`

Some models support multimodal input and output.

### Parameters

`params`: `GenerateContentParameters`
The parameters for generating content with streaming response.

### Returns

`Promise<AsyncGenerator<GenerateContentResponse, any, unknown>>`
The response from generating content.

### Example

```typescript
const response = await ai.models.generateContentStream({
  model: 'gemini-2.0-flash',
  contents: 'why is the sky blue?',
  config: {
    maxOutputTokens: 200,
  }
});
for await (const chunk of response) {
  console.log(chunk);
}
```

## generateImages

```typescript
generateImages(
    params: GenerateImagesParameters,
): Promise<GenerateImagesResponse>
```

Generates an image based on a text description and configuration.

### Parameters

`params`: `GenerateImagesParameters`
The parameters for generating images.

### Returns

`Promise<GenerateImagesResponse>`
The response from the API.

### Example

```typescript
const response = await ai.models.generateImages({
 model: 'imagen-3.0-generate-002',
 prompt: 'Robot holding a red skateboard',
 config: {
   numberOfImages: 1,
   includeRaiReason: true,
 },
});
console.log(response?.generatedImages?.[0]?.image?.imageBytes);
```
