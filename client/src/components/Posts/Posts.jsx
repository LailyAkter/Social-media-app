import React from 'react'
import './Posts.css';
import {useDispatch, useSelector} from "react-redux" ;
import Post from '../Post/Post.jsx'
import { useEffect } from 'react';
import { getTimelinePosts } from '../../actions/PostAction.js';
const Posts = () => {

  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.AuthReducer.authData);
  const {posts,loading} = useSelector((state)=>state.postReducer);
  console.log(user._id)
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))
  },[]);
 

  return (
    <div className="Posts">
      {posts ? loading ? "Fetching.....": posts.map((post, id)=>{
          return <Post data={post} id={id}/>
      }) : ""}
    </div>
  )
}

export default Posts