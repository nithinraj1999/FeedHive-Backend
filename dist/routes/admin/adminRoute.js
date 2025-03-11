"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuth_1 = require("../../controller/adminController/adminAuth");
const categoryController_1 = require("../../controller/adminController/categoryController");
const categoryController_2 = require("../../controller/adminController/categoryController");
const router = express_1.default.Router();
router.post('/signin', adminAuth_1.adminSignin);
router.post('/add-category', categoryController_1.addCategory);
router.get('/get-all-categories', categoryController_2.getAllCategories);
exports.default = router;
