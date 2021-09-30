import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import gql from 'graphql-tag'

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export default apolloClient

// utils
export const writeVideoBpmQuery = (id: number, bpm: number) => {
  apolloClient.writeQuery({
    query: gql`
      query video($id: Int!) {
        video(id: $id) {
          id
          bpm
        }
      }
    `,
    data: {
      video: {
        __typename: 'Video',
        id: id,
        bpm: bpm,
      },
    },
    variables: {
      id: id,
    },
  })
}
