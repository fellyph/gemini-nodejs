import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const weatherApiKey = process.env.OPENWEATHER_API_KEY || '';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

interface WeatherResponse {
    main: {
        temp: number;
    };
    weather: Array<{
        description: string;
    }>;
}

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

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    tools: [
        {
            functionDeclarations: [
                {
                    name: 'getWeather',
                    description: 'Gets the current weather for a requested city',
                    parameters: {
                        type: 'object',
                        properties: {
                            city: {
                                type: 'string',
                            },
                            country: {
                                type: 'string',
                                description: 'The country of the city in country code',
                            },
                        },
                    },
                },
            ],
        },
    ],
    toolConfig: { functionCallingConfig: { mode: 'ANY' } },
});

const generationConfig = {
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
};

async function run() {
    // Start a chat session
    const chat = model.startChat({
        generationConfig,
        history: [],
    });

    try {
        console.log('Sending message to get weather...');
        const result = await chat.sendMessage(
            "What's the weather like in Lagos, Portugal? And suggest me a outfit for the weather"
        );
        const response = await result.response;

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.functionCall) {
                    console.log('Function called:', part.functionCall.name);
                    console.log('Arguments:', part.functionCall.args);

                    // Actually call the weather API
                    const args = part.functionCall.args as { city: string; country: string };
                    const weatherInfo = await getWeather(args.city, args.country);
                    console.log('\nWeather information:', weatherInfo);

                    // Send the weather information back to continue the conversation
                    const followUp = await chat.sendMessage(weatherInfo);
                    console.log('\nAI Response:', followUp.response.text());
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
