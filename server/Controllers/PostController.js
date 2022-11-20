import mongoose from "mongoose";
import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";

//create a post
export const CreatePost = async(req,res) =>{
    try {
        const post = new PostModel(req.body);
        const newPost = await post.save();
        res.status(200).json(newPost)
    } catch (error) {
        res.status(403).json(error)
    }
}

//get a post
export const GetPost = async(req,res) =>{
    const id  = req.params.id;
    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(403).json(error)
    }
}


// update a user
export const UpdatePost = async(req,res) =>{
    const id = req.params.id;
    const {userid} = req.body;
    try {
        const post = await PostModel.findById(id);
        if(post.userid === userid){
            await PostModel.updateOne({$set:req.body});
            res.status(200).json("Post Updated Successfully!")
        }else{
            res.status(403).json("Action forbidden!")
        }
    
    } catch (error) {
        res.status(403).json(error)
    }
} 

// delete a post
export const DeletePost = async(req,res)=>{
    const id = req.params.id;
    const {userid} = req.body;
    try {
        const post = await PostModel.findById(id);
        if(post.userid === userid){
            await PostModel.deleteOne();
            res.status(200).json("Post Deleted Successfully!")
        }else{
            res.status(403).json("Action forbidden!")
        }

    } catch (error) {
        res.status(403).json(error)
    }
}

// like/dislike post
export const LikePost = async(req,res)=>{
    const id = req.params.id;
    const userId = req.body;
    try {
        const post = await PostModel.findById(id);
        if(!post.likes.includes(userId)){
            await post.updateOne({$push:{likes:userId}});
            res.status(200).json("Post Like");
        }else{
            await post.updateOne({$pull:{likes:userId}});
            res.status(200).json("Post unlike");
        }
    } catch (error) {
        res.status(403).json(error)
    }
}

// get timeline posts
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id
    try {
      const currentUserPosts = await PostModel.find({ userId: userId });
  
      const followingPosts = await UserModel.aggregate([
        { 
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  
      res.status(200).json(
        currentUserPosts
          .concat(...followingPosts[0].followingPosts)
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };