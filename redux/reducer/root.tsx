import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { userReducer } from './userReducer'

const reducer = combineReducers({
  user: userReducer
})

const rootReducer = (state: RootState, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    }
    if (state.user.user) nextState.user.user = state.user.user // preserve count value on client side navigation
    return nextState
  } else {
    return reducer(state, action)
  }
}

export default rootReducer
export type RootState = ReturnType<typeof reducer>
