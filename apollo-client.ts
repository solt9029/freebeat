import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
// import { Query } from './graphql/generated/graphql-client'

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        playlists: relayStylePagination(),
      },
    },
  },
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export default apolloClient
