import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useMemo } from 'react';

//SKapar en ApolloKlient med en generisk datatyp
let apolloClient: ApolloClient<NormalizedCacheObject>;

function createIsomorphicLink() {
  // Vi är på servern
  if (typeof window === 'undefined') {
    // Här använder vi istället Schemat som vi deklarerade med hälp av Nexus
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { schema } = require('./schema');
    return new SchemaLink({ schema });
  }

  // På Klienten
  else {
    // Måste ha en require här pga detta kommer inkluderas i Webpack builden
    // Som skickas till Klienten
    const { HttpLink } = require('@apollo/client/link/http');
    return new HttpLink({ uri: '/api/graphql' });
  }
}

// Skapar en ny Apollo Klient
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphicLink(),
    cache: new InMemoryCache(),
  });
}

// Initializerar Apolloklienten baserat på om vi är på servern eller ej
export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // På servern returnerar vi alltid en ny version av apolloKlienten
  if (typeof window === 'undefined') return _apolloClient;

  // Vet att vi är på klienten,
  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
