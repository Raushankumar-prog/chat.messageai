import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password:String
    name: String
    avatar: String
    createdAt: String!
    updatedAt: String!
    googleId: String
    facebookId: String
    chats: [Chat!]!
    payments: [Payment!]!
  }

  type Chat {
    id: ID!
    title: String
    createdAt: String!
    updatedAt: String!
    user: User!
    messages: [Message!]!
  }

  type Message {
    id: ID!
    content: String!
    role: UserRole!
    createdAt: String!
    updatedAt: String!
    chat: Chat!
    mediaLinks: [MediaLink!]!
    parentMessage: Message
    childMessages: [Message!]!
  }

  type MediaLink {
    id: ID!
    url: String!
    createdAt: String!
    updatedAt: String!
  }

  type Payment {
    id: ID!
    userId: String!
    user: User!
    amount: Float!
    paymentDate: String!
    status: PaymentStatus!
  }

  enum PaymentStatus {
    PENDING
    SUCCESS
    FAILED
  }

  enum MediaType {
    IMAGE
    VIDEO
  }

  enum UserRole {
    USER
    SYSTEM
  }

  type AIResponse {
    response: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    chats(userId: ID!): [Chat!]!
    chatone(id: ID!): Chat
    messages(chatId: ID!): [Message!]!
    message(id: ID!): Message
    payments(userId: ID!): [Payment!]!
    payment(id: ID!): Payment
  }
type AuthPayload {
  token: String!
  user: User!
} 
  type Mutation {
    createUser(email: String!, name: String, avatar: String,password:String,googleId:String): User!
    loginUser(email: String!, password: String, googleId: String): AuthPayload!
    createChat(title: String, userId: String!): Chat!
    updateChat(id: ID!, title: String): Chat!
    deleteChat(id: ID!): Chat!
    createMessage(
      content: String!
      role: UserRole!
      chatId: String!
      parentMessageId: ID
      mediaLinks: [MediaLinkInput!]
    ): Message!
    updateMessage(
      id: ID!
      content: String
      role: UserRole
    ): Message!
    deleteMessage(id: ID!): Message!
    createPayment(
      userId: String!
      amount: Float!
      paymentDate: String
      status: PaymentStatus
    ): Payment!
    updatePayment(id: ID!, status: PaymentStatus!): Payment!
    deletePayment(id: ID!): Payment!
    askAI(message: String!): AIResponse!
  }

  input MediaLinkInput {
    url: String!
    type: MediaType!
  }
`;
