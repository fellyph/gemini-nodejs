import { jest } from "@jest/globals";
import type {
    GenerativeModel,
    GenerateContentResult,
    GoogleGenerativeAI,
} from "@google/generative-ai";

// Define types for our mocks
interface MockResponse {
    text(): string;
}

interface MockGenerateContentResult {
    response: MockResponse;
}

type GenerateContentRequest =
    | string
    | {
          contents: Array<{
              role: string;
              parts: Array<{ text: string }>;
          }>;
          generationConfig?: {
              maxOutputTokens?: number;
              temperature?: number;
          };
      };

interface MockGenerativeModel {
    generateContent(
        request: GenerateContentRequest
    ): Promise<MockGenerateContentResult>;
}

interface MockGoogleGenerativeAI {
    getGenerativeModel(config: { model: string }): MockGenerativeModel;
}

// Create type-safe mock functions
const mockGenerateContent = jest
    .fn()
    .mockImplementation(async (request: GenerateContentRequest) => ({
        response: {
            text: () => "Mocked response",
        },
    }));

const mockGetGenerativeModel = jest
    .fn()
    .mockImplementation((config: { model: string }) => ({
        generateContent: mockGenerateContent,
    }));

// Export the mocked API
export const mockGenerativeAI = {
    getGenerativeModel: mockGetGenerativeModel,
};

export const mockConsole = {
    log: jest.fn(),
    error: jest.fn(),
};

export const setupTest = () => {
    // Mock console methods
    global.console.log = mockConsole.log;
    global.console.error = mockConsole.error;

    // Mock process.env
    process.env.GOOGLE_API_KEY = "mock-api-key";

    // Clear all mocks before each test
    jest.clearAllMocks();
};
