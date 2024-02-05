import { Router } from "express";
import userController from "../controllers/userController.js";
import { comparePassword, hashPassword, isGranted } from "../../middlewares/auth.js";

const router = Router()

router.post('/signup', hashPassword, userController.register)
router.post('/login', comparePassword, userController.login)

router.get('/profile', isGranted, userController.getProfile)

export default router;