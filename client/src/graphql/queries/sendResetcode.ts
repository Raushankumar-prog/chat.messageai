

import { gql } from "@apollo/client";

export const SEND_RESET_CODE = gql`
  mutation SendResetCode($email: String!) {
  sendResetCode(email: $email)
}

`;


