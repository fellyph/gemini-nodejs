# Gemini Grounding with Google Search Suggestions

This document outlines how to use Google Search Suggestions to enhance Gemini API responses by providing grounded search results. Grounding helps users find search results relevant to the AI's response.

## Enabling Google Search Suggestions

To leverage grounding with Google Search, you must enable Google Search Suggestions. This functionality ensures that users can easily access search results corresponding to the AI-generated response.

The grounded response's metadata includes the following:

*   **`content`**: The LLM-generated response.
*   **`webSearchQueries`**: The search queries to be used for Google Search Suggestions.

## Example Response

The following code snippet illustrates a Gemini response to a search-grounded prompt asking about a tropical plant:

```json
{
  "predictions": [
    {
      "content": "Monstera is a type of vine that thrives in bright indirect light...",
      "groundingMetadata": {
        "webSearchQueries": [ "What's a monstera?" ]
      }
    }
  ]
}
```

You can utilize this output to display Google Search Suggestions.

## Requirements for Google Search Suggestions

### Do

*   Display the Search Suggestion exactly as provided, without any modifications, adhering to the [Display Requirements](#display-requirements).
*   Direct users to the Google Search results page (SRP) when they interact with the Search Suggestion.

### Don't

*   Include any interstitial screens or additional steps between the user's tap and the display of the SRP.
*   Display any other search results or suggestions alongside the Search Suggestion or associated grounded LLM response.

## Display Requirements

*   Display the Search Suggestion exactly as provided and don't make any modifications to colors, fonts, or appearance. Ensure the Search Suggestion renders as specified in the following mocks, including for light and dark mode.

    *   **Light Mode:** (Reference to Google's documentation for visual example)
    *   **Dark Mode:** (Reference to Google's documentation for visual example)

*   Whenever a grounded response is shown, its corresponding Google Search Suggestion should remain visible.
*   **Branding:** You must strictly follow Google's Guidelines for Third Party Use of Google Brand Features ([https://about.google/brand-resource-center/](https://about.google/brand-resource-center/)).
*   Google Search Suggestions should be at a minimum the full width of the grounded response.

## Behavior on Tap

When a user taps the suggestion, they are taken directly to a Google Search results page (SRP) for the search term displayed. The SRP can open within your in-app browser or in a separate browser app. It is important to not minimize, remove, or obstruct the SRP's display.

## Code to Implement a Google Search Suggestion

When using the API to ground a response to search, the model response provides compliant HTML and CSS styling in the `renderedContent` field. You must implement this to display Search Suggestions in your application. To see an example of the API response, see the response section in [Grounding with Google Search](https://ai.google.dev/gemini-api/docs/grounding).

**Note:** The provided HTML and CSS automatically adapts to the user's device settings, displaying in either light or dark mode based on the user's preference indicated by `@media(prefers-color-scheme)`.

## What's Next

*   Learn how to build an interactive chat: [Gemini API - interactive chat](https://ai.google.dev/gemini-api/docs/text-generation?lang=node#chat)
*   Learn how to use Gemini safely and responsibly: [Gemini API - safety guidance](https://ai.google.dev/gemini-api/docs/safety-guidance)