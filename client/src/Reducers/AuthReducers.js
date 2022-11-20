
import {AUTH_FAIL,AUTH_START,AUTH_SUCCESS} from "../Constants/AuthConstants.js"

const initialState = {
    authData:null,
    loading:false,
    error:false
}

const AuthReducer = (state=initialState,action) =>{
    switch (action.type) {
        case AUTH_START:
            return{
                ...state,
                loading:true,
                error:false
            };

        case AUTH_SUCCESS:
        localStorage.setItem("profile",JSON.stringify({...action?.data}));
        return{
            ...state,
            loading:false,
            authData:action.data,
            error:false
        };

        case AUTH_FAIL:
        return{
            ...state,
            loading:false,
            error:true
        };



        case "UPDATING_START":
            return{
                ...state,
                updateLoading:true,
                error:false
            };

        case "UPDATING_SUCCESS":
        localStorage.setItem("profile",JSON.stringify({...action?.data}));
        return{
            ...state,
            updateLoading:false,
            authData:action.data,
            error:false
        };

        case "UPDATING_FAIL":
        return{
            ...state,
            UpdateLoading:false,
            error:true
        };




        case "LOG_OUT":
            localStorage.clear();
        return{
            ...state,
            loading:false,
            error:false,
            authData:null
        };
    
        default:
           return state;
    }
}

export default AuthReducer;