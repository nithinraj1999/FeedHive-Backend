import express from "express";
import { signup, signin } from "../../controller/userController/authController";
import { getprofileInfo } from "../../controller/userController/profileController";
import authenticateUser from "../../middlewares/authenticater";
import { getAllCategories } from "../../controller/userController/profileController";
import { creteArticle } from "../../controller/userController/articleController";
import { upload } from "../../config/multer";
import { editProfile } from "../../controller/userController/profileController";
import { editArticle } from "../../controller/userController/articleController";
import { getAllArticles } from "../../controller/userController/articleController";
import { deleteArticle } from "../../controller/userController/articleController";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/get-profile-info", authenticateUser, getprofileInfo);
router.get("/get-all-categories", getAllCategories);
router.post("/create-article", upload.single("image"), creteArticle);
router.patch("/edit-profile", editProfile);
router.patch("/edit-article", editArticle);
router.get("/get-all-articles", getAllArticles);
router.delete("/delete-article",deleteArticle);

export default router;
