import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages($chatId: ID!) {
  messages(chatId: $chatId) {
    content
    id
    childMessages {
      content
    }
  }
}
`;
