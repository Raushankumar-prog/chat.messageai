import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { messageResolvers } from './graphql/resolvers/message.resolver.js';

const apiKey: string | undefined = process.env.GEMINI_API_KEY;

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

async function* generateGreetings(): AsyncGenerator<{ greetings: string }> {
  for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
    yield { greetings: hi };
  }
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function for generating text responses based on the Gemini model
export async function* aiResponseSubscription(
  _: unknown,
  args: { message: string; chatId: string }
): AsyncGenerator<{ aiResponse: string }> {
  try {
    const { message, chatId } = args;
    const chatHistory = await messageResolvers.Query.messages(_, { chatId });
    const history: { role: string; parts: { text: string }[] }[] = [];

    for (const msg of chatHistory) {
      history.push({
        role: 'user',
        parts: [{ text: msg.content }],
      });

      if (msg.childMessages && msg.childMessages.length > 0) {
        history.push({
          role: 'model',
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
      await delay(1);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Subscription error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred in aiResponseSubscription.");
    }
  }
}

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
    },
  }),
  subscription: new GraphQLObjectType({
    name: 'Subscription',
    fields: {
      greetings: {
        type: GraphQLString,
        subscribe: async function* (): AsyncGenerator<{ greetings: string }> {
          yield* generateGreetings();
        },
      },
      aiResponse: {
        type: GraphQLString,
        args: {
          message: { type: GraphQLString },
          chatId: { type: GraphQLString },
        },
        subscribe: aiResponseSubscription,
      },
    },
  }),
});