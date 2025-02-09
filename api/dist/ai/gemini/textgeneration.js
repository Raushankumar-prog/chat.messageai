import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApolloError, PubSub } from "apollo-server";

// Initialize PubSub for subscriptions
const pubsub = new PubSub();
const AI_RESPONSE_EVENT = "AI_RESPONSE";

// Initialize the GoogleGenerativeAI model
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export const askairesolvers = {
    Query: {
        _empty: () => "Hello, world!",
    },
    Mutation: {
        askAI: async (_, { message }) => {
            try {
                const chatSession = await model.startChat({ generationConfig, history: [] });
                const result = await chatSession.sendMessage(message);
                const stream = await result.response.textStream();

                let fullResponse = "";

                for await (const chunk of stream) {
                    fullResponse += chunk;
                    pubsub.publish(AI_RESPONSE_EVENT, { askAI: { response: chunk } });
                }

                return { response: fullResponse };
            } catch (error) {
                console.error("Error in askAI mutation:", error);
                throw new ApolloError("Error while interacting with AI model", "AI_ERROR", {
                    message: error instanceof Error ? error.message : "Unknown error",
                });
            }
        },
    },
    Subscription: {
        askAI: {
            subscribe: () => pubsub.asyncIterator(AI_RESPONSE_EVENT),
        },
    },
};
