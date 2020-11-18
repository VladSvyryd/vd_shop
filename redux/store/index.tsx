import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from '../reducer/root'

let store: any

const initialState = {
  user: null
}

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['user'] // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer as any)

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function initStore(preloadedState: any = initialState) {
  return createStore(
    persistedReducer,
    preloadedState,
    bindMiddleware([thunkMiddleware])
  )
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [
    initialState
  ])
  return store
}

export const wrapper = createWrapper(initStore)
