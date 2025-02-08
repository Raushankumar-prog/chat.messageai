


import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
mutation Mutation($updateUserId: ID!, $name: String, $email: String, $avatar: String) {
  updateUser(id: $updateUserId, name: $name, email: $email, avatar: $avatar) {
    avatar
    email
    name
  }
}

`;


