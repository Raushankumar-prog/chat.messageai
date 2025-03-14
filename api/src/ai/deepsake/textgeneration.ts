import { OpenAI } from "openai";
import { messageResolvers } from "../../graphql/resolvers/message.resolver.js";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSAKE_API_KEY
});

export default async function getdeepsakeai(_: unknown, args: { message?: string; chatId?: string }) {
    const chatHistory = await messageResolvers.Query.messages(_, { chatId: "cm74fsg4j0001tsmcxlbu6pos" });
    const history: OpenAI.ChatCompletionMessageParam[] = [];

    for (const msg of chatHistory) {
        history.push({
            role: 'user' as const,
            content: msg.content,
        });

        if (msg.childMessages && msg.childMessages.length > 0) {
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

    const completion = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: history,
    });

    console.log(completion.choices[0].message.content);
}