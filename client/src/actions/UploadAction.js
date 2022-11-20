import * as UploadApi from "../Api/UploadRequest.js"

export const UploadImage = (data) => async(dispatch)=>{
    try {
        await UploadApi.UploadImage(data);
    } catch (error) {
        console.log(error)
    }
} 

export const uploadPost = (data) => async(dispatch)=>{
    dispatch({type:"UPLOAD_START"})
    try {
        const newPost = await UploadApi.uploadPost(data);
        dispatch({type:"UPLOAD_SUCCESS",data:newPost.data})
    } catch (error) {
        console.log(error)
        dispatch({type:"UPLOAD_FAIL"})
    }
}