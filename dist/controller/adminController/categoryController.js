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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.addCategory = void 0;
const categoryModel_1 = require("../../model/categoryModel");
const addCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName, description } = req.body;
        console.log(req.body);
        const newcategory = new categoryModel_1.categoryModel({ categoryName, description });
        yield newcategory.save();
        if (newcategory) {
            res.status(201).json({ message: "category saved..." });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addCategory = addCategory;
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategory = yield categoryModel_1.categoryModel.find({});
        res.status(201).json({ success: true, allCategory: allCategory });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCategories = getAllCategories;
