import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// get a user
export const GetUser = async(req,res) =>{
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if(user){
            const {password,...otherDetails} = user._doc;
            res.status(200).json(otherDetails)
        }else{
            res.status(404).json("no such user exists");
        }
    } catch (error) {
        res.status(500).json(error);
    }
   
}

// update a user
export const UpdateUser = async (req,res) =>{
    const id = req.params.id;
    const {_id,currentUserAdminStatus,password} = req.body;
    if(id === _id){
        try {
            if(password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password,salt);
            }
            const user = await UserModel.findByIdAndUpdate(id,req.body,{new:true});
            const token =  jwt.sign(
                {username:user.username,id:user._id},
                process.env.JWT_KEY,
                {expiresIn:"1hr"})
            res.status(200).json({user,token});
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("access denied")
    }
    
}

// delete a user
export const DeleteUser = async (req,res) =>{
    const id = req.params.id;
    const {currentUserId,currentUserAdminStatus} = req.body;
    if(id===currentUserId || currentUserAdminStatus){
        try {
            const user = await UserModel.findByIdAndDelete(id);
            res.status(200).json("User Deleted Succesfully!");
         } catch (error) {
             res.status(500).json(error);
         }
    }else{
        res.status(403).json("access denied")
    }
}

// follow a user
export const FollowUser = async(req,res) =>{
    const id = req.params.id;
    const {currentUserId } = req.body;
    if(currentUserId === id){
        res.status(403).json("Action Forbidden!");
    }else{
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId);
            if(!followUser.followers.includes(currentUserId)){
               await followUser.updateOne({$push:{followers:currentUserId}});
               await followingUser.updateOne({$push:{following:id}});
               res.status(200).json("User Followed!");
            }else{
                res.status(403).json("User is already followed by you! ")
            }

        } catch (error) {
            res.status(403).json(error)
        }
    }
}

// unfollow a user
export const UnFollowUser = async(req,res) =>{
    const id = req.params.id;
    const {currentUserId } = req.body;
    if(currentUserId === id){
        res.status(403).json("Action Forbidden!");
    }else{
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId);
            if(followUser.followers.includes(currentUserId)){
               await followUser.updateOne({$pull:{followers:currentUserId}});
               await followingUser.updateOne({$pull:{following:id}});
               res.status(200).json("User unFollowed!");
            }else{
                res.status(403).json("User is already unfollowed by you! ")
            }

        } catch (error) {
            res.status(403).json(error)
        }
    }
}