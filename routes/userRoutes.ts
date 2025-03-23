import { Router } from "express";
import UserController from "../controller/userController";


const router =Router()

router.post('/update-user-data',UserController.updateUserData)
router.get('/fetch-user-data', UserController.fetchUser)

export default router