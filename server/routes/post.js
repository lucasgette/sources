import { Router } from "express";
import { createPost, deletePost, getPosts, getUserPosts, timeline } from "../controllers/posts.js";
import verifyToken from "../middleware/auth.js";


const router = Router()

router.get('/getPosts', verifyToken, getPosts)
router.get('/getUserPosts/:username', verifyToken, getUserPosts)
router.get('/timeline', verifyToken, timeline)
router.post('/createPost', verifyToken, createPost)
router.patch('/delete/:postAuthor/:postId', verifyToken, deletePost)

export default router;