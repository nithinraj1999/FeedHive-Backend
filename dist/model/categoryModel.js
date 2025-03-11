"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    categoryName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
}, { timestamps: true });
exports.categoryModel = (0, mongoose_1.model)("Category", CategorySchema);
