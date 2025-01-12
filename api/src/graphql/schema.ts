import { readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers/index.js';

const typeDefs = readFileSync('./schema.graphql', 'utf8');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
