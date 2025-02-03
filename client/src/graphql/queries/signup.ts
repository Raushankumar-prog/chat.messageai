import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  query CreateUser(
    $email: String!
    $googleId: String
    $password: String
    $avatar: String
  ) {
    createUser(
      email: $email
      name: $name
      googleId: $googleId
      password: $password
      avatar: $avatar
    ) {
      email
      name
    }
  }
`;
