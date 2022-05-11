import { combineReducers } from 'redux'
import { fetchData } from './reducer'
import { userRegisterReducer, userSigninReducer } from './authReducers'
// import { posts,createPost } from './noteReducers'
//import auth from './auth'

export const reducer= combineReducers({
    alldata:fetchData,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    
})