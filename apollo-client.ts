import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import {
  PLAYLIST_DEFAULT_BPM_QUERY,
  PLAYLIST_TITLE_QUERY,
  VIDEO_BPM_QUERY,
} from './graphql/documents/queries'

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
    query: VIDEO_BPM_QUERY,
    data: { video: { __typename: 'Video', id: id, bpm: bpm } },
    variables: { id: id },
  })
}

export const writePlaylistDefaultBpmQuery = (
  id: number,
  defaultBpm: number,
) => {
  apolloClient.writeQuery({
    query: PLAYLIST_DEFAULT_BPM_QUERY,
    data: { playlist: { __typename: 'Base', id, defaultBpm } },
    variables: { id: id },
  })
}

export const writePlaylistTitleQuery = (id: number, title: string) => {
  apolloClient.writeQuery({
    query: PLAYLIST_TITLE_QUERY,
    data: { playlist: { __typename: 'Base', id, title } },
    variables: { id: id },
  })
}
