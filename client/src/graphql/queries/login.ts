import { gql } from "@apollo/client";

export const login = gql`
  mutation createUser($email: String!, $password: String, $googleId: String) {
      loginUser(email: $email, password: $password, googleId: $googleId) {
          token
    user {
      avatar
      email
       id
      
    }
  }
  }
`;



