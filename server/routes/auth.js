import { Router } from "express";
import { loginController, registerController } from "../controllers/auth.js";


const router = Router();




// POST ROUTES

// REGISTER

router.post('/register', registerController);

// LOGIN

router.post('/login', loginController);

export default router;