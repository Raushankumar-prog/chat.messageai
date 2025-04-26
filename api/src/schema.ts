import { GoogleGenerativeAI } from "@google/generative-ai";
import { messageResolvers } from "./graphql/resolvers/message.resolver.js";

const apiKey: string | undefined = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface ChatMessage {
  role: string;
  parts: { text: string }[];
}

export async function* aiResponseSubscription(
  _: unknown,
  args: { message: string; chatId: string; model: string }
): AsyncGenerator<{ aiResponse: string }> {
  try {
    const { message, chatId, model: modelName } = args;
    const model = genAI.getGenerativeModel({ model: modelName });

    const chatHistory = await messageResolvers.Query.messages(_, { chatId });
    const history: ChatMessage[] = [];

    for (const msg of chatHistory) {
      history.push({
        role: "user",
        parts: [{ text: msg.content }],
      });

      if (msg.childMessages && msg.childMessages.length > 0) {
        history.push({
          role: "model",
          parts: [{ text: msg.childMessages[0].content }],
        });
      }
    }

    const chatSession = model.startChat({ generationConfig, history });
    const result = await chatSession.sendMessage(message);
    const responseText = await result.response.text();

    const words = responseText.split(" ");
    for (const word of words) {
      yield { aiResponse: word };
      await delay(100); // Adjust delay if needed
    }
  } catch (error: unknown) {
    console.error("Error in aiResponseSubscription:", error);
    if (error instanceof Error) {
      throw new Error(`Subscription error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred in aiResponseSubscription.");
    }
  }
}
