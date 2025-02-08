


import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
mutation Mutation($id: ID!, $name: String, $email: String, $avatar: String) {
  updateUser(id:$id, name: $name, email: $email, avatar: $avatar) {
    avatar
    email
    name
  }
}

`;



