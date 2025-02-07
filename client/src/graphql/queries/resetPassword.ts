


import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
mutation ResetPassword($email: String!, $newPassword: String!) {
  resetPassword(email: $email, newPassword: $newPassword)
}


`;
