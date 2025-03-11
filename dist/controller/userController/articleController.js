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
exports.getMyArticles = exports.deleteArticle = exports.getAllArticles = exports.editArticle = exports.creteArticle = void 0;
const articleModel_1 = __importDefault(require("../../model/articleModel"));
const cloudinary_1 = require("../../services/cloudinary");
const creteArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId, articleName, description, tags, categoryId } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
        let imageUrl;
        if (image) {
            const coudinaryUpload = yield (0, cloudinary_1.uploadArticleImage)(image);
            imageUrl = coudinaryUpload.url;
        }
        const newArticle = new articleModel_1.default({ userId: userId, articleName, description, tags, category: categoryId, image: imageUrl });
        yield newArticle.save();
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.creteArticle = creteArticle;
const editArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { articleId, articleName, description, tags, categoryId } = req.body;
        if (!articleId) {
            res.status(400).json({ message: "Article ID is required" });
            return;
        }
        const updateFields = {};
        if (articleName)
            updateFields.articleName = articleName;
        if (description)
            updateFields.description = description;
        if (tags)
            updateFields.tags = tags;
        if (categoryId)
            updateFields.categoryId = categoryId;
        const updatedArticle = yield articleModel_1.default.findByIdAndUpdate(articleId, { $set: updateFields }, { new: true, runValidators: true });
        if (!updatedArticle) {
            res.status(404).json({ message: "Article not found" });
            return;
        }
        res.status(200).json({ message: "Article updated successfully", article: updatedArticle });
    }
    catch (error) {
        next(error);
    }
});
exports.editArticle = editArticle;
const getAllArticles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allArticles = yield articleModel_1.default.find({});
        res.json({ success: true, allArticles: allArticles });
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
