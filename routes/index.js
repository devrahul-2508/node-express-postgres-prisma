import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import PostRoutes from "./postRoutes.js";
import CommentRoutes from "./commentRoutes.js"

const router = Router();

// User routes
router.use("/api/user", UserRoutes);
//Post routes
router.use("/api/post",PostRoutes);
//Comment routes
router.use("/api/comment",CommentRoutes);



export default router