import { FunctionCallingConfigMode, FunctionDeclaration, GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

/**
 * This demo shows how to use function calling with the Google GenAI SDK.
 * It uses the OpenWeatherMap API to get the weather information.
 * It also uses the Google GenAI SDK to generate a response to the user's message.
 * The Google GenAI SDK is used to call the OpenWeatherMap API and get the weather information.
 * The Google GenAI SDK is also used to generate a response to the user's message.
 */

dotenv.config();

const weatherApiKey = process.env.OPENWEATHER_API_KEY || '';
const genAI = new GoogleGenAI({ vertexai: false, apiKey: process.env.GOOGLE_API_KEY || '' });

interface WeatherResponse {
    main: {
        temp: number;
    };
    weather: Array<{
        description: string;
    }>;
}

/**
 * This function gets the weather information from the OpenWeatherMap API.
 * @param city - The city to get the weather information for.
 * @param country - The country to get the weather information for.
 * @returns A string with the weather information.
 */
async function getWeather(city: string, country: string): Promise<string> {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${weatherApiKey}&units=metric`
        );
        const data = (await response.json()) as WeatherResponse;
        return `The current temperature in ${city} is ${data.main.temp}°C with ${data.weather[0].description}`;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return "Sorry, I couldn't fetch the weather information.";
    }
}

/**
 * This function generates content from the weather API.
 * It uses the Google GenAI SDK to generate a response to the user's message.
 * The Google GenAI SDK is used to call the OpenWeatherMap API and get the weather information.
 * The Google GenAI SDK is also used to generate a response to the user's message.
 */
async function generateContentFromWeatherAPI() {
    const weatherFunctionDeclaration: FunctionDeclaration = {
        name: 'getWeather',
        description: 'Gets the current weather for a requested city',
        parameters: {
            type: Type.OBJECT,
            properties: {
                city: {
                    type: Type.STRING,
                    description: 'The city to get the weather information for',
                },
                country: {
                    type: Type.STRING,
                    description: 'The country of the city in country code',
                },
            },
            required: ['city', 'country'],
        },
    };

    const chat = await genAI.chats.create({
        model: 'gemini-2.0-flash',
        history: [],
        config: {
            tools: [{ functionDeclarations: [weatherFunctionDeclaration] }],
            toolConfig: {
                functionCallingConfig: {
                    mode: FunctionCallingConfigMode.ANY,
                    allowedFunctionNames: ['getWeather'],
                },
            },
        },
    });

    const result = await chat.sendMessage({
        message: 'What is the weather in Lagos, Portugal?',
    });

    if (result.candidates?.[0]?.content?.parts) {
        for (const part of result.candidates[0].content.parts) {
            if (part.functionCall) {
                console.log('Function called:', part.functionCall.name);
                console.log('Arguments:', part.functionCall.args);

                const args = part.functionCall.args as { city: string; country: string };
                const weatherInfo = await getWeather(args.city, args.country);
                console.log('\nWeather information:', weatherInfo);

                const followUp = await chat.sendMessage({ message: weatherInfo });
                console.log(
                    '\nAI Response:',
                    followUp.candidates?.[0]?.content?.parts?.[0]?.text || 'No response'
                );
            }
        }
    }
}

generateContentFromWeatherAPI();
