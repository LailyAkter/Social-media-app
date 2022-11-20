import * as UserApi from "../Api/UserRequest.js"

export const updateUser = (id,FormData) => async(dispatch) =>{
    dispatch({type:"UPDATING_START"})
    try {
        const {data} = await UserApi.updateUser(id,FormData);
        console.log("data: ",data)
        dispatch({type:"UPDATING_SUCCESS",data:data})
    } catch (error) {
        dispatch({type:"UPDATING_FAIL"})
    }
}