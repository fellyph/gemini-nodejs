# GenerateContentConfig

It is the interface responsible to setup our chat and prompt configuration, the interface contains several properties that can change teh behavior of the prompt, for example: 

```
const generationConfig: GenerateContentConfig = {
    maxOutputTokens: 200, // Maximum number of tokens that can be generated in a single call. 100 tokens is approximately 60-80 words
    temperature: 0.2, // Determines how random the text will be - lower value = more deterministic, higher value = more creative
    stopSequences: ['PHP'],
    systemInstruction:
        'You are a helpful coding tutor that can answer questions and help with tasks.',
};

```

Prompt calling:

```
 const result = await genAI.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: 'Talk about the main programing languages and their features.',
                        },
                    ],
                },
            ],
            config: generationConfig,
        });
```

Here are the list of all properties expected on the prompt configuration. 

*Optional*

**audioTimestamp**
`audioTimestamp?: boolean`
If enabled, audio timestamp will be included in the request to the model.

*Optional*

**cachedContent**
`cachedContent?: string`
Resource name of a context cache that can be used in subsequent requests.

*Optional*

**candidateCount**
`candidateCount?: number`
Number of response variations to return.

*Optional*

**frequencyPenalty**
`frequencyPenalty?: number`
Positive values penalize tokens that repeatedly appear in the generated text, increasing the probability of generating more diverse content.

*Optional*

**httpOptions**
`httpOptions?: HttpOptions`
Used to override HTTP request options.

*Optional*

**labels**
`labels?: Record<string, string>`
Labels with user-defined metadata to break down billed charges.

*Optional*

**logprobs**
`logprobs?: number`
Number of top candidate tokens to return the log probabilities for at each generation step.

*Optional*

**maxOutputTokens**
`maxOutputTokens?: number`
Maximum number of tokens that can be generated in the response.

*Optional*

**mediaResolution**
`mediaResolution?: MediaResolution`
If specified, the media resolution specified will be used.

*Optional*

**presencePenalty**
`presencePenalty?: number`
Positive values penalize tokens that already appear in the generated text, increasing the probability of generating more diverse content.

*Optional*

**responseLogprobs**
`responseLogprobs?: boolean`
Whether to return the log probabilities of the tokens that were chosen by the model at each step.

*Optional*

**responseMimeType**
`responseMimeType?: string`
Output response media type of the generated candidate text.

*Optional*

**responseModalities**
`responseModalities?: string[]`
The requested modalities of the response. Represents the set of modalities that the model can return.

*Optional*

**responseSchema**
`responseSchema?: Schema`
Schema that the generated candidate text must adhere to.

*Optional*

**routingConfig**
`routingConfig?: GenerationConfigRoutingConfig`
Configuration for model router requests.

*Optional*

**safetySettings**
`safetySettings?: SafetySetting[]`
Safety settings in the request to block unsafe content in the response.

*Optional*

**seed**
`seed?: number`
When seed is fixed to a specific number, the model makes a best effort to provide the same response for repeated requests. By default, a random number is used.

*Optional*

**speechConfig**
`speechConfig?: SpeechConfigUnion`
The speech generation configuration.

*Optional*

**stopSequences**
`stopSequences?: string[]`
List of strings that tells the model to stop generating text if one of the strings is encountered in the response.

*Optional*

**systemInstruction**
`systemInstruction?: ContentUnion`
Instructions for the model to steer it toward better performance. For example, "Answer as concisely as possible" or "Don't use technical terms in your response".

*Optional*

**temperature**
`temperature?: number`
Value that controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a less open-ended or creative response, while higher temperatures can lead to more diverse or creative results.

*Optional*

**thinkingConfig**
`thinkingConfig?: ThinkingConfig`
The thinking features configuration.

*Optional*

**toolConfig**
`toolConfig?: ToolConfig`
Associates model output to a specific function call.

*Optional*

**tools**
`tools?: ToolListUnion`
Code that enables the system to interact with external systems to perform an action outside of the knowledge and scope of the model.

*Optional*

**topK**
`topK?: number`
For each token selection step, the top_k tokens with the highest probabilities are sampled. Then tokens are further filtered based on top_p with the final token selected using temperature sampling. Use a lower number for less random responses and a higher number for more random responses.

*Optional*

**topP**
`topP?: number`
Tokens are selected from the most to least probable until the sum of their probabilities equals this value. Use a lower value for less random responses and a higher value for more random responses.
