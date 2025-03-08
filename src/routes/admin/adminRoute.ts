import express from 'express'
import { adminSignin } from '../../controller/adminController/adminAuth';
import authenticateUser from '../../middlewares/authenticater';


const router = express.Router();

router.post('/signin',adminSignin);


export default router
 