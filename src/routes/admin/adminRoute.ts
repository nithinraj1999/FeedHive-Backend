import express from 'express'
import { adminSignin } from '../../controller/adminController/adminAuth';
import authenticateUser from '../../middlewares/authenticater';
import { addCategory } from '../../controller/adminController/categoryController';
import { getAllCategories } from '../../controller/adminController/categoryController';

const router = express.Router();

router.post('/signin',adminSignin);
router.post('/add-category',addCategory)
router.get('/get-all-categories',getAllCategories)

export default router
 