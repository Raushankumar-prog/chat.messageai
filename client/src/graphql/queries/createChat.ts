


import { gql } from "@apollo/client";


export const CREATETITLE = gql`
  mutation CreateChat($userId: String!, $title: String) {
    createChat(userId: $userId, title: $title) {
      id
      title
    }
  }
`;
