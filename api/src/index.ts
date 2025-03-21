import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { schema } from './graphql/schema.js';
import { useServer } from 'graphql-ws/use/ws';
import { WebSocketServer } from 'ws';
import cors from 'cors';

// Initialize Express
const app = express();
const corsOptions = {
  origin: [
    'https://chat.allmodelhub.me',

    'https://chat-messageai-client.vercel.app',
    
    
  ],
  credentials: true,
  exposedHeaders: ['Authorization'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));

// Create HTTP Server
const httpServer = http.createServer(app);

// Create WebSocket Server for Subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Use GraphQL WebSockets
useServer({ schema }, wsServer);

// Create Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [{
    async serverWillStart() {
      return {
        async drainServer() {
          wsServer.close();
        },
      };
    },
  }],
});

// Start Apollo Server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`📡 Subscriptions ready at ws://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
