import { Router } from "express";
import { createComment,showComment,fetchComments,deleteComment,updateComment } from "../controllers/commentcontroller.js";

const router = Router()

router.post("/",createComment)
router.put("/:id",updateComment)
router.get("/",fetchComments)
router.get("/:id",showComment)
router.delete("/:id",deleteComment)

export default router