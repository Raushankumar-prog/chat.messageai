import { gql } from "@apollo/client";

export const ASK_AI = gql`
  mutation AskAI($message: String!,$chatId:String!) {
    askAI(message: $message,chatId:$chatId) {
      response
    }
  }
`;


export const AI_RESPONSE_SUBSCRIPTION = gql`
  subscription GeminiResponse($message: String!, $chatId: String!, $model: String!) {
    aiResponse(message: $message, chatId: $chatId, model: $model)
  }
`;

export const OPENAI_RESPONSE_SUBSCRIPTION = gql`
  subscription OpenaiResponse($message: String!, $chatId: String!, $model: String!) {
    openairesponse(message: $message, chatId: $chatId, model: $model)
  }
`;

export const CLAUDE_RESPONSE_SUBSCRIPTION = gql`
  subscription ClaudeResponse($message: String!, $chatId: String!, $model: String!) {
    clauderesponse(message: $message, chatId: $chatId, model: $model)
  }
`;

export const GROK_RESPONSE_SUBSCRIPTION = gql`
  subscription GrokResponse($message: String!, $chatId: String!, $model: String!) {
    grokresponse(message: $message, chatId: $chatId, model: $model)
  }
  `;