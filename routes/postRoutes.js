import { Router } from "express";
import { createPost,showPost,fetchPosts,deletePost,updatePost,searchPosts } from "../controllers/postcontroller.js";

const router = Router()

router.post("/",createPost)
router.put("/:id",updatePost)
router.get("/",fetchPosts)
router.get("/search",searchPosts)
router.get("/:id",showPost)
router.delete("/:id",deletePost)

export default router