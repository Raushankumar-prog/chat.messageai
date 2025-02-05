import { gql } from "@apollo/client";

export const SAVE_ANS = gql`
  mutation SaveMessage(
    $content: String!,
    $role: UserRole!,
    $chatId: String!,
    $childMessage: ChildMessageInput!
  ) {
    createMessage(
      content: $content,
      role: $role,
      chatId: $chatId,
      childMessage: $childMessage
    ) {
      content
      childMessages {
        content
        role
      }
    }
  }
`;
