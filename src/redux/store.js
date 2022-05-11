import { applyMiddleware,createStore,compose } from 'redux'
import thunk from 'redux-thunk'
import {reducer} from './reducers/index'

const code = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const initialState={}
const store =createStore(reducer,initialState,code(applyMiddleware(thunk)))

export default store