import { gql } from "@apollo/client";

export const ASK_AI = gql`
  mutation AskAI($message: String!,$chatId:String!) {
    askAI(message: $message,chatId:$chatId) {
      response
    }
  }
`;


