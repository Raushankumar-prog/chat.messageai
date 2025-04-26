import { OpenAI } from "openai";
import { messageResolvers } from "../../graphql/resolvers/message.resolver.js";

const openai = new OpenAI({
    // If using a custom baseURL or API key, include them here:
    // baseURL: 'https://api.deepseek.com',
    // apiKey: process.env.OPENAI_API_KEY
});

export default async function getOpenai(_: unknown, args: { message?: string; chatId?: string }) {
    const chatHistory = await messageResolvers.Query.messages(_, { chatId: "cm74fsg4j0001tsmcxlbu6pos" });
    const history: OpenAI.ChatCompletionMessageParam[] = [];

    for (const msg of chatHistory) {
        history.push({
            role: 'user' as const,
            content: msg.content,
        });

        if (msg.childMessages?.length) {
            history.push({
                role: 'assistant' as const,  // Changed from 'system' to 'assistant'
                content: msg.childMessages[0].content,
            });
        }
    }

    history.push({
        role: 'user' as const,
        content: "what we talk yet"
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: history,
        });

        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error in OpenAI completion:", error);
        throw new Error("Failed to generate completion");
    }
}