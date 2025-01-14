import { ApolloServer } from 'apollo-server';
import { schema } from './graphql/schema.js';



const server = new ApolloServer({
  schema
});


const PORT = process.env.PORT || 4000;
server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
