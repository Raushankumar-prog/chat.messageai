import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($email: String!, $name: String, $avatar: String, $password: String, $googleId: String) {
    createUser(email: $email, name: $name, avatar: $avatar, password: $password, googleId: $googleId) {
       email
       id
       name
       avatar
       password
       googleId
  }
  }
`;



