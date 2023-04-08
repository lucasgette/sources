import express from 'express';
import { addFriend, followers, following, getAvatar, getMyProfile, getUserProfile } from '../controllers/user.js';
import verifyToken from '../middleware/auth.js';


const router = express.Router();

router.get('/myprofile', verifyToken, getMyProfile);
router.get('/:username', verifyToken, getUserProfile);
router.patch('/addfriend/:id', verifyToken, addFriend);
router.get('/:username/followers', verifyToken, followers);
router.get('/:username/following', verifyToken, following);
router.get('/:username/avatar', getAvatar);


export default router;