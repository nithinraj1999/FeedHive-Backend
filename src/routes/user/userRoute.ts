import express from 'express'
import {signup,signin} from "../../controller/authController"
import { getprofileInfo } from '../../controller/profileController';

import authenticateUser from '../../middlewares/authenticater';
const router = express.Router();


router.post('/signup',signup);
router.post('/signin',signin);

router.post('/get-profile-info',authenticateUser,getprofileInfo)

export default router
 