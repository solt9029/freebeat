import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
  cache,
})

export default apolloClient
