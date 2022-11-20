import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registering a new User
export const registerUser = async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const hashed_password= await bcrypt.hash(req.body.password, salt);
  req.body.password = hashed_password;

  const newUser = new UserModel(req.body);
  const {username} = req.body;

  try {
    const oldUser = await UserModel.findOne({username:username});
    if(oldUser){
      return res.status(400).json("username is already registered");
    }
    const user = await newUser.save();

    const token = jwt.sign({
      username:user.username,id:user._id
    },process.env.JWT_KEY,{expiresIn:"1h"})

    res.status(200).json({user,token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login a new user
export const loginUser = async (req,res)=>{
  try {
    const {username,password} = req.body;
    const user = await UserModel.findOne({username:username});
    if(user){
      const validity = await bcrypt.compare(password,user.password);
      if(!validity){
        res.status(400).json("Wrong Password");
      }else{
        const token = jwt.sign({
          username:user.username,id:user._id
        },process.env.JWT_KEY,{expiresIn:"1h"})
        res.status(200).json({user,token});
      }
      
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}