import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApolloError } from "apollo-server";

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
    askAI: async (_: any, { message }: { message: string }) => {
      try {
        
        const chatSession = model.startChat({ generationConfig, history: [] });

     
        const result = await chatSession.sendMessage(message);


        return { response: await result.response.text() };
      } catch (error: unknown) {

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
