import { fromPromise } from '@apollo/client';
import { ApolloServer } from 'apollo-server-micro';
import { schema } from 'src/schema';

const server = new ApolloServer({ schema });

// Vi tar hand om inkommande requests till /api/graphql
const handler = server.createHandler({ path: '/api/graphql' });

// Vi säger att vi själva tar hand om att parsea request bodyn med request.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
