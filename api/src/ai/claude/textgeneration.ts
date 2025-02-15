import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Ensure this is set in your environment
});

export default async function getMessage() {
  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hello, Claude" }],
    });

    console.log(msg);
    return msg;
  } catch (error) {
    console.error("Error in getMessage:", error);
  }
}
