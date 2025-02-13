import { gql } from "@apollo/client";

export const ASK_AI = gql`
  mutation AskAI($message: String!,$chatId:String!) {
    askAI(message: $message,chatId:$chatId) {
      response
    }
  }
`;


export const AI_RESPONSE_SUBSCRIPTION = gql`
  subscription Subscription($message: String!, $chatId: String!) {
    aiResponse(message: $message, chatId: $chatId)
  }
`;

