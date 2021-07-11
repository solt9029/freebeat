import { Dispatch } from 'react'
import { AppAction } from './actions'
import { AppState } from './state'

export type AppContext = {
  state: AppState
  dispatch: Dispatch<AppAction>
}
