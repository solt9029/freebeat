import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import gql from 'graphql-tag'

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
})

// refer https://caddi.tech/archives/2195
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

export const writePlaylistDefaultBpmQuery = (
  id: number,
  defaultBpm: number,
) => {
  apolloClient.writeQuery({
    query: gql`
      query playlist($id: Int!) {
        playlist(id: $id) {
          id
          defaultBpm
        }
      }
    `,
    data: {
      playlist: {
        __typename: 'Base',
        id: id,
        defaultBpm: defaultBpm,
      },
    },
    variables: {
      id: id,
    },
  })
}
