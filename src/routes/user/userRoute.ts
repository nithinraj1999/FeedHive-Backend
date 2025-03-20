import express from "express";
import { signup, signin } from "../../controller/userController/authController";
import { getprofileInfo } from "../../controller/userController/profileController";
import { getAllCategories } from "../../controller/userController/profileController";
import { creteArticle } from "../../controller/userController/articleController";
import { upload } from "../../config/multer";
import { editProfile } from "../../controller/userController/profileController";
import { editArticle } from "../../controller/userController/articleController";
import { getAllArticles } from "../../controller/userController/articleController";
import { deleteArticle } from "../../controller/userController/articleController";
import { blockArticle } from "../../controller/userController/articleController";
import { likeArticle } from "../../controller/userController/articleController";
import { dislikeArticle } from "../../controller/userController/articleController";
import { viewAricle } from "../../controller/userController/articleController";
import authenticateUser from "../../middlewares/authenticater";
import { getMyArticles } from "../../controller/userController/articleController";
import { selectCategories } from "../../controller/userController/profileController";

const router = express.Router();
  
router.post("/signup", signup);
router.post("/signin", signin);

router.post("/get-profile-info", authenticateUser, getprofileInfo);
router.get("/get-all-categories",authenticateUser, getAllCategories);
router.post('/select-category',authenticateUser,selectCategories)
router.post("/create-article",authenticateUser, upload.single("image"),creteArticle);
router.post("/view-article",authenticateUser,viewAricle)
router.patch("/edit-profile",authenticateUser,editProfile);
router.post('/my-articles',authenticateUser,getMyArticles)
router.put("/edit-article",upload.single("image"), editArticle);
router.post("/get-all-articles",authenticateUser, getAllArticles);
router.delete("/delete-article",authenticateUser, deleteArticle);
router.patch("/block-article",authenticateUser, blockArticle);

router.patch("/like-article",authenticateUser, likeArticle);
router.patch("/dislike-article",authenticateUser,dislikeArticle);

export default router; 
  