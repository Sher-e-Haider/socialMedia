import { USER_SIGNIN_REQUEST ,USER_SIGNIN_SUCCESS,USER_SIGNIN_FAIL, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL} from "../actions/constant"

export const userSigninReducer = (state={loading:true},action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true}
        
        case USER_SIGNIN_SUCCESS:
            return {loading:true,userInfo:action.payload}

        case USER_SIGNIN_FAIL:
            return {loading:false,error:action.payload}
        case USER_SIGNOUT:
            return {...state,loading:true}

        default:
            return state

    }
}

export const userRegisterReducer = (state={lodi:false,load:false},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {load:false}
        
        case USER_REGISTER_SUCCESS:
            return {lodi:true,userInfo:action.payload}

        case USER_REGISTER_FAIL:
            return {load:false,error:action.payload}
        case USER_SIGNOUT:
            return {}

        default:
            return state

    }
}