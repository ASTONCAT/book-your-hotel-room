import { createStore, applyMiddleware } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/reducers'

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
      // this is required only in dev environment
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
  }

  const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload // apply data from hydration
      }
      return nextState
    } else {
      return reducers(state, action)
    }
  }
  
  const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]))
  }
  
  export const wrapper = createWrapper(initStore)