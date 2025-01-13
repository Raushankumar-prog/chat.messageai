import { readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers/index.js';
import path from 'path';
const typeDefs = readFileSync(path.join(__dirname, './schema.graphql'), 'utf8');
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
export default schema;
