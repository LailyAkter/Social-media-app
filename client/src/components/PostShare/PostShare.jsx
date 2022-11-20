import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { UploadImage, uploadPost } from "../../actions/UploadAction";


const PostShare = () => {
  const loading = useSelector((state)=>state.postReducer.uploading)
  const {user} = useSelector((state)=>state.AuthReducer.authData)
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
 
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
 
  const reset =() => {
    setImage(null);
    desc.current.value = ""
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const newPost = {
      userId:user._id,
      desc:desc.current.value
    }

    if(image){
      const data = new FormData();
      const filename =Date.now() + image.name;
      data.append("name",filename);
      data.append("file",image)
      newPost.image = filename;
      console.log(newPost)
      try {
        dispatch(UploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }

    dispatch(uploadPost(newPost))
    reset();
    
    
  }
  return (
    <div className="PostShare">
      <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "default-profile.png"} alt="" />
      <div>
        <input ref={desc} required type="text" placeholder="What's happening" />
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button disabled={loading} className="button ps-button" onClick={handleSubmit}>
            {loading ? "uploading...." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
      {image && (

        <div className="previewImage">
          <UilTimes onClick={()=>setImage(null)}/>
          <img src={URL.createObjectURL(image)} alt="preview" />
        </div>

      )}


      </div>
    </div>
  );
};

export default PostShare;
