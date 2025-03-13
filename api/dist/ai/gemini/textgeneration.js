import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApolloError } from "apollo-server";
import { messageResolvers } from "../../graphql/resolvers/message.resolver.js";
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
        askAI: async (_, { message, chatId }) => {
            try {
                const chatHistory = await messageResolvers.Query.messages(_, { chatId });
                const history = [];
                for (const msg of chatHistory) {
                    history.push({
                        role: "user", // User message
                        parts: [{ text: msg.content }],
                    });
                    if (msg.childMessages && msg.childMessages.length > 0) {
                        history.push({
                            role: "model", // AI response
                            parts: [{ text: msg.childMessages[0].content }],
                        });
                    }
                }
                const chatSession = model.startChat({ generationConfig, history });
                const result = await chatSession.sendMessage(message);
                return { response: await result.response.text() };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new ApolloError("Error while interacting with AI model", "AI_ERROR", {
                        message: error.message,
                    });
                }
                throw new ApolloError("Unknown error while interacting with AI model", "AI_ERROR");
            }
        },
    },
};
