import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL, // Your GraphQL API endpoint
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
