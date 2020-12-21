import { useQuery, gql } from '@apollo/client';
import { initializeApollo } from 'src/apollo';

const MyQuery = gql`
  query MyQuery {
    name
  }
`;

export default function Home() {
  const { data, loading } = useQuery(MyQuery);

  if (loading) return <span>Loading...</span>;
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

// Sätter upp SSR så att vi kan hämta data som ska användas vid SSR.

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  // Populera InMemoryCachen med responsen
  await apolloClient.query({
    query: MyQuery,
  });

  // Returnerar props som innehåller inMemoryCachens värden
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
