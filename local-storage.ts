import Lockr from 'lockr'

// constants
export const KEYS = 'keys'

// types
export type Keys = {
  [playlistId: number]: string
}

// utils
export const addPlaylistKey = (playlistId: string, key: string) => {
  const keys = Lockr.get(KEYS, {}) as Keys
  Lockr.set(KEYS, {
    ...keys,
    [playlistId]: key,
  })
}
