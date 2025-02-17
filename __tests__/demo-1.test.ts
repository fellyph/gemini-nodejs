import { jest } from "@jest/globals";
import { mockGenerativeAI, mockConsole, setupTest } from "./utils/test-utils";

// Mock the entire @google/generative-ai module
jest.mock("@google/generative-ai", () => ({
    GoogleGenerativeAI: jest.fn().mockImplementation(() => mockGenerativeAI),
}));

describe("demo-1", () => {
    beforeEach(() => {
        setupTest();
    });

    it("should generate text about Brazilian rivers", async () => {
        // Import the module after setting up mocks
        await import("../demo-3-route");

        // Verify that the model was called with correct parameters
        expect(mockGenerativeAI.getGenerativeModel).toHaveBeenCalledWith({
            model: "gemini-2.0-flash-001",
        });

        // Get the mock function with proper typing
        const generateContent = mockGenerativeAI.getGenerativeModel({
            model: "gemini-2.0-flash-001",
        }).generateContent;

        // Verify that generateContent was called with the correct prompt
        expect(generateContent).toHaveBeenCalledWith(
            "List 5 main river in Brazil in JSON code"
        );

        // Verify that the response was logged
        expect(mockConsole.log).toHaveBeenCalledWith("Mocked response");
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
        await import("../demo-3-route");

        // Verify that the error was logged
        expect(mockConsole.error).toHaveBeenCalledWith(
            "Error:",
            expect.any(Error)
        );
    });
});
