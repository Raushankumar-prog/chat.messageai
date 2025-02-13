import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// HTTP link for Queries & Mutations
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL, // GraphQL API (HTTP)
  headers: {
    "Content-Type": "application/json",
    charset: "utf-8",
  },
});

// WebSocket link for Subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000/graphql", // WebSocket API
    connectionParams: {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, // Optional: Auth header
      },
    },
  })
);

// Split between HTTP and WebSocket based on the operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,  // Use WebSocket for Subscriptions
  httpLink // Use HTTP for Queries/Mutations
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
