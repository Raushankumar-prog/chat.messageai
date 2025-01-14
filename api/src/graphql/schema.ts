import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './typed.js';
import { resolvers } from './resolvers/index.js';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});