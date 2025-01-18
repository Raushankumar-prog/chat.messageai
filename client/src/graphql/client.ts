import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https:/4000-raushankumarp-unitravel-ywkr3le35xw.ws-us117.gitpod.io/", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
