import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client with environment validation
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Type definition for the response
type ClaudeResponse = {
  content: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
};

export async function getClaudeResponse(prompt: string): Promise<ClaudeResponse> {
  // Validate environment configuration
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY environment variable not set');
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      temperature: 0.7,
      system: "You are a helpful AI assistant",
      messages: [
        { 
          role: "user", 
          content: prompt 
        }
      ],
    });

    // Type-safe content extraction
    const textBlocks = response.content.filter(
      (block): block is Anthropic.Messages.TextBlock => block.type === 'text'
    );

    if (textBlocks.length === 0) {
      throw new Error('No text response received from Claude');
    }

    // Combine all text blocks
    const combinedContent = textBlocks.map(block => block.text).join('\n');

    return {
      content: combinedContent,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      }
    };
    
  } catch (error: unknown) {
    let errorMessage = 'Failed to get Claude response';
    
    if (error instanceof Anthropic.APIError) {
      errorMessage = `API Error [${error.status}]: ${error.message}`;
      if (error.status === 429) {
        errorMessage += ' - Rate limit exceeded';
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('Claude API Error:', error);
    throw new Error(errorMessage);
  }
}

