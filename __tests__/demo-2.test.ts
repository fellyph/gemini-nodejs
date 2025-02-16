import { jest } from "@jest/globals";
import { mockGenerativeAI, mockConsole, setupTest } from "./utils/test-utils";

// Mock the entire @google/generative-ai module
jest.mock("@google/generative-ai", () => ({
    GoogleGenerativeAI: jest.fn().mockImplementation(() => mockGenerativeAI),
}));

describe("demo-2", () => {
    beforeEach(() => {
        setupTest();
    });

    it("should generate a story about a shaman", async () => {
        // Import the module after setting up mocks
        await import("../demo-2");

        // Verify that the model was called with correct parameters
        expect(mockGenerativeAI.getGenerativeModel).toHaveBeenCalledWith({
            model: "gemini-2.0-flash-001",
        });

        // Get the mock function with proper typing
        const generateContent = mockGenerativeAI.getGenerativeModel({
            model: "gemini-2.0-flash-001",
        }).generateContent;

        // Verify that generateContent was called with the correct parameters
        expect(generateContent).toHaveBeenCalledWith({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: "Create a story about a man that follow his dreams and become a successful shaman in amazon forest and translate it to portuguese.",
                        },
                    ],
                },
            ],
            generationConfig: {
                maxOutputTokens: 200,
                temperature: 0.2,
            },
        });

        // Verify that the response was logged
        expect(mockConsole.log).toHaveBeenCalledWith(
            "Text: ",
            "Mocked response"
        );
    });

    it("should handle errors gracefully", async () => {
        // Mock an error scenario with proper typing
        const errorMock = mockGenerativeAI.getGenerativeModel({
            model: "gemini-2.0-flash-001",
        });

        // Override the implementation for this test
        (errorMock.generateContent as jest.Mock).mockRejectedValueOnce(
            new Error("API Error")
        );

        // Import the module after setting up mocks
        await import("../demo-2");

        // Verify that the error was logged
        expect(mockConsole.error).toHaveBeenCalledWith(
            "Error:",
            expect.any(Error)
        );
    });
});
