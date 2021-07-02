import axios from 'axios'

const googleApiClient = axios.create({
  baseURL: 'https://www.googleapis.com',
})

export const fetchYouTubePlaylistItemList = async (playlistId: string) => {
  const response = await googleApiClient.get('/youtube/v3/playlistItems', {
    params: {
      part: 'id,contentDetails',
      playlistId,
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      maxResults: 50,
    },
  })
  return response.data.items.map((item) => item.contentDetails.videoId)
}
