import express from 'express'
import authController from "../../controller/authController"



const router = express.Router();


router.get('/signup',authController.signup);

export default router
 