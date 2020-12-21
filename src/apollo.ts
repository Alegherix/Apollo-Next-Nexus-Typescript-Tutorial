import {
  ApolloClient,
  fromPromise,
  InMemoryCache,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useMemo } from 'react';

//SKapar en ApolloKlient med en generisk datatyp
let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: null,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
