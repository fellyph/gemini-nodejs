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
        const result = await chat.sendMessage("What's the weather like in Lagos, Portugal now?");
        const response = await result.response;

        console.log(response.text());
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
