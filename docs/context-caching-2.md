# Context Caching with Gemini API

This document outlines how to use the context caching feature of the Gemini API to reduce costs and improve efficiency when working with large language models.

## What is Context Caching?

In a typical AI workflow, you might send the same input tokens to a model repeatedly. Context caching allows you to send content to the model once, cache the input tokens, and then reference those cached tokens for subsequent requests. [cite: 5] This can lead to significant cost savings, especially for high-volume applications. [cite: 6]

## When to Use Context Caching

Context caching is particularly well-suited for scenarios where a substantial initial context is referenced repeatedly by shorter requests. [cite: 14] Some examples include:

* Chatbots with extensive system instructions. [cite: 15]
* Repetitive analysis of long video files. [cite: 15]
* Recurrent queries on large document sets. [cite: 15]
* Frequent code repository analysis or bug fixing. [cite: 15]

## How Context Caching Works

1. **Cache Creation:** You send the initial content to the model and create a cache. [cite: 24]
2. **Token Storage:** The input tokens are stored in the cache. [cite: 5]
3. **Cache Reference:** In subsequent requests, you reference the cache instead of resending the entire context. [cite: 5]
4. **Cost Reduction:** You are charged a reduced rate for cached tokens compared to resending the same tokens repeatedly. [cite: 17]

## How to Use Context Caching

**Prerequisites:**

* Install a Gemini SDK (or curl). [cite: 23]
* Set up an API key. [cite: 23]

**Steps:**

1. **Upload Content:** Upload the content you want to cache (e.g., a video file). [cite: 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
2. **Create a Cache:** Use the `GoogleAICacheManager` to create a cache with a specified time-to-live (TTL). [cite: 34, 35, 36]
3. **Generate Content:** Use the `getGenerativeModelFromCachedContent` method to create a model that uses the cache. [cite: 37, 38, 39, 40, 41]
4. **Query the Model:** Send queries to the model, referencing the cached content. [cite: 39, 40, 41]

**Code Example (Node.js):**

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FileState, GoogleAICacheManager, GoogleAIFileManager } from '@google/generative-ai/server';

//... (Code for uploading a video file)

const cacheManager = new GoogleAICacheManager(process.env.API_KEY);

// Create a cache with a 5-minute TTL
const cache = await cacheManager.create({
  //... (Cache parameters)
  ttlSeconds: 300,
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const genModel = genAI.getGenerativeModelFromCachedContent(cache);

// Query the model
const result = await genModel.generateContent({
  //... (Query parameters)
});

console.log(result.response.text());
```

## Managing Caches

* **Listing Caches:** You can list the metadata of all submitted caches using `GoogleAICacheManager.list()`. [cite: 44, 45]
* **Updating a Cache:** You can update the TTL of a cache using `GoogleAICacheManager.update()`. [cite: 46, 47, 48]
* **Deleting a Cache:** You can manually delete a cache using `GoogleAICacheManager.delete()`. [cite: 49, 50]

## Additional Considerations

* The minimum input token count for context caching is 32,768, and the maximum is equal to the model's maximum. [cite: 51]
* The model does not distinguish between cached tokens and normal input tokens. [cite: 53]
* There are no special fees or usage limits for context caching. [cite: 56]
* The number of cached tokens is returned in the `usage_metadata` of cache service operations and in `GenerateContent` when using the cache. [cite: 58]

## Conclusion

Context caching is a powerful feature of the Gemini API that can help you reduce costs and improve the efficiency of your AI workflows. By understanding how to use and manage caches effectively, you can optimize your applications for performance and cost-effectiveness.