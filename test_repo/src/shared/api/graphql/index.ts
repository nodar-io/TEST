import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient(import.meta.env.VITE_BASE_URL, {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN || ''}`
  }
});
