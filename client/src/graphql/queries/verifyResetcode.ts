



import { gql } from "@apollo/client";

export const VERIFY_RESET_CODE = gql`
mutation VerifyResetCode($email: String!, $code: String!) {
  verifyResetCode(email: $email, code: $code)
}

`;


