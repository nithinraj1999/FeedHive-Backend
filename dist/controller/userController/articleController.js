"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dislikeArticle = exports.likeArticle = exports.blockArticle = exports.viewAricle = exports.getMyArticles = exports.deleteArticle = exports.getAllArticles = exports.editArticle = exports.creteArticle = void 0;
const articleModel_1 = __importDefault(require("../../model/articleModel"));
const cloudinary_1 = require("../../services/cloudinary");
const userModel_1 = require("../../model/userModel");
const mongoose_1 = __importDefault(require("mongoose"));
const creteArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId, articleName, description, tags, category } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
        const tagsArray = tags.split(",");
        let imageUrl;
        if (image) {
            const coudinaryUpload = yield (0, cloudinary_1.uploadArticleImage)(image);
            imageUrl = coudinaryUpload.url;
        }
        const newArticle = new articleModel_1.default({ userId: userId, articleName, description, tags: tagsArray, category: category, image: imageUrl });
        yield newArticle.save();
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.creteArticle = creteArticle;
const editArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { articleId, articleName, description, tags, categoryId } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
        console.log(req.file);
        if (!articleId) {
            res.status(400).json({ message: "Article ID is required" });
            return;
        }
        let imageUrl;
        if (image) {
            const coudinaryUpload = yield (0, cloudinary_1.uploadArticleImage)(image);
            imageUrl = coudinaryUpload.url;
        }
        const updateFields = {};
        if (articleName)
            updateFields.articleName = articleName;
        if (description)
            updateFields.description = description;
        if (tags)
            updateFields.tags = tags.split(',');
        if (categoryId)
            updateFields.categoryId = categoryId;
        if (imageUrl)
            updateFields.image = imageUrl;
        // if(req.file)
        const updatedArticle = yield articleModel_1.default.findByIdAndUpdate(articleId, { $set: updateFields }, { new: true, runValidators: true });
        if (!updatedArticle) {
            res.status(404).json({ message: "Article not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Article updated successfully", article: updatedArticle });
    }
    catch (error) {
        next(error);
    }
});
exports.editArticle = editArticle;
const getAllArticles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield userModel_1.userModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const preference = user.preferences || [];
        const blockedArticles = user.blockedArticles || [];
        const preferenceObjectIds = preference.map(id => new mongoose_1.default.Types.ObjectId(id));
        const allArticles = yield articleModel_1.default.find({
            _id: { $nin: blockedArticles },
            category: { $in: preferenceObjectIds }
        });
        res.json({ success: true, allArticles });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllArticles = getAllArticles;
const deleteArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { articleId } = req.body;
        const deletedArticle = yield articleModel_1.default.deleteOne({ _id: articleId });
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteArticle = deleteArticle;
const getMyArticles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const myArticles = yield articleModel_1.default.find({ userId: userId });
        res.json({ success: true, myArticles: myArticles });
    }
    catch (error) {
        next(error);
    }
});
exports.getMyArticles = getMyArticles;
const viewAricle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { articleId } = req.body;
        const article = yield articleModel_1.default.findOne({ _id: articleId });
        res.json({ success: true, article: article });
    }
    catch (error) {
        next(error);
    }
});
exports.viewAricle = viewAricle;
const blockArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, articleId } = req.body;
        const blockArticle = yield userModel_1.userModel.findByIdAndUpdate(userId, {
            $addToSet: { blockedArticles: articleId }
        });
        const incBlockedCount = yield articleModel_1.default.findByIdAndUpdate(articleId, { $inc: { blockCount: 1 } });
        res.json({ success: true });
    }
    catch (error) {
        next(next);
    }
});
exports.blockArticle = blockArticle;
const likeArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, articleId } = req.body;
        if (!userId || !articleId) {
            res.status(400).json({ success: false, message: "User ID and Article ID are required" });
            return;
        }
        const user = yield userModel_1.userModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let updateUser, updateArticle;
        let likeIncrement = 0, dislikeIncrement = 0;
        if (user.likedArticle.includes(articleId)) {
            yield userModel_1.userModel.updateOne({ _id: userId }, { $pull: { likedArticle: articleId } });
            likeIncrement = -1;
        }
        else {
            if (user.dislikedArticle.includes(articleId)) {
                yield userModel_1.userModel.updateOne({ _id: userId }, { $pull: { dislikedArticle: articleId } });
                dislikeIncrement = -1;
            }
            yield userModel_1.userModel.updateOne({ _id: userId }, { $addToSet: { likedArticle: articleId } });
            likeIncrement = 1;
        }
        updateArticle = yield articleModel_1.default.findByIdAndUpdate(articleId, { $inc: { likes: likeIncrement, dislikes: dislikeIncrement } }, { new: true });
        const userData = yield userModel_1.userModel.findOne({ _id: userId });
        res.json({ success: true, updatedArticle: updateArticle, userData: userData });
    }
    catch (error) {
        next(error);
    }
});
exports.likeArticle = likeArticle;
const dislikeArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, articleId } = req.body;
        if (!userId || !articleId) {
            res.status(400).json({ success: false, message: "User ID and Article ID are required" });
            return;
        }
        const user = yield userModel_1.userModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let updateUser, updateArticle;
        let likeIncrement = 0, dislikeIncrement = 0;
        if (user.dislikedArticle.includes(articleId)) {
            yield userModel_1.userModel.updateOne({ _id: userId }, { $pull: { dislikedArticle: articleId } });
            dislikeIncrement = -1;
        }
        else {
            if (user.likedArticle.includes(articleId)) {
                yield userModel_1.userModel.updateOne({ _id: userId }, { $pull: { likedArticle: articleId } });
                likeIncrement = -1;
            }
            yield userModel_1.userModel.updateOne({ _id: userId }, { $addToSet: { dislikedArticle: articleId } });
            dislikeIncrement = 1;
        }
        updateArticle = yield articleModel_1.default.findByIdAndUpdate(articleId, { $inc: { likes: likeIncrement, dislikes: dislikeIncrement } }, { new: true });
        const userData = yield userModel_1.userModel.findOne({ _id: userId });
        res.json({ success: true, updatedArticle: updateArticle, userData: userData });
    }
    catch (error) {
        next(error);
    }
});
exports.dislikeArticle = dislikeArticle;
