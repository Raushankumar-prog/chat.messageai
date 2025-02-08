// graphql.js
import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      avatar
      id
      name
      email
    }
  }
`;
