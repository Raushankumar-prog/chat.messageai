import { ApolloServer } from 'apollo-server';
import { schema } from './graphql/schema.js';
const server = new ApolloServer({
    schema,
    cors: {
        origin: '*', // Allow all origins, or specify your Gitpod URL here
    },
});
const PORT = process.env.PORT || 4000;
server.listen(PORT).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
