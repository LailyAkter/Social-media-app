import express from "express";
import { DeleteUser, FollowUser, GetUser, UnFollowUser, UpdateUser } from "../Controllers/UserController.js";


const router = express.Router()

router.get("/:id",GetUser);
router.put("/:id",UpdateUser);
router.delete("/:id",DeleteUser)
router.put("/:id/follow",FollowUser)
router.put("/:id/unfollow",UnFollowUser)

export default router;