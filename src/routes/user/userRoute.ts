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
router.get("/get-all-categories", getAllCategories);
router.post('/select-category',selectCategories)
router.post("/create-article", upload.single("image"),creteArticle);
router.post("/view-article",viewAricle)
router.patch("/edit-profile",editProfile);
router.post('/my-articles',getMyArticles)
router.put("/edit-article",upload.single("image"), editArticle);
router.post("/get-all-articles", getAllArticles);
router.delete("/delete-article", deleteArticle);
router.patch("/block-article", blockArticle);
router.patch("/like-article", likeArticle);
router.patch("/dislike-article",dislikeArticle);

export default router; 
  