import { gql } from "@apollo/client";

export const ASK_AI = gql`
  mutation AskAI($message: String!) {
    askAI(message: $message) {
      response
    }
  }
`;


