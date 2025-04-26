import { OpenAI } from "openai";
import { messageResolvers } from "../../graphql/resolvers/message.resolver.js";

// Initialize client with proper environment variable
const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY, 
  baseURL: "https://api.x.ai/v1",
});
function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function getGrokai(
  _: unknown, 
  { message, chatId, model }: { message?: string; chatId?: string; model?: string }
) {
  try {
    // Validate required parameters
    if (!chatId || !message || !model) {
      throw new Error("Missing required parameters: chatId, message, or model");
    }

    // Get chat history
    const chatHistory = await messageResolvers.Query.messages(_, { chatId });
    
    // Build conversation history
    const history: OpenAI.ChatCompletionMessageParam[] = chatHistory.flatMap(msg => {
      const messages: OpenAI.ChatCompletionMessageParam[] = [{
        role: 'user',
        content: msg.content,
      }];

      if (msg.childMessages?.length) {
        messages.push({
          role: 'assistant',
          content: msg.childMessages[0].content,
        });
      }

      return messages;
    });

    // Add current message to history
    history.push({
      role: 'user',
      content: message
    });

    // Create completion with proper error handling
    const completion = await client.chat.completions.create({
      model: model, // Use model from arguments
      messages: history,
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Handle empty response
    if (!completion.choices[0]?.message?.content) {
      throw new Error("Received empty response from Grok API");
    }

    return completion.choices[0].message.content;
    
  } catch (error: unknown) {
  console.error("Grok API Error:", error);
  
  const errorMessage = isErrorWithMessage(error) 
    ? error.message
    : 'Unknown error occurred';
    
  throw new Error(`Failed to generate completion: ${errorMessage}`);

}}