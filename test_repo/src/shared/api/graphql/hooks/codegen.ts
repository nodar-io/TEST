import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.github.com/graphql': {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
      }
    }
  },
  documents: ['./src/shared/api/graphql/docs/**/*.gql'],
  ignoreNoDocuments: true,
  generates: {
    './src/shared/api/graphql/hooks/__generated__.ts': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    }
  },
  hooks: { afterAllFileWrite: ['prettier --write'] }
};

export default config;
