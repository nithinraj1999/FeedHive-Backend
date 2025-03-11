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
exports.editProfile = exports.selectCategories = exports.getAllCategories = exports.getprofileInfo = void 0;
const userModel_1 = require("../../model/userModel");
const categoryModel_1 = require("../../model/categoryModel");
const getprofileInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const profileInfo = yield userModel_1.userModel.findOne({ _id: userId });
        if (profileInfo) {
            res.json({ success: true, data: profileInfo });
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getprofileInfo = getprofileInfo;
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield categoryModel_1.categoryModel.find({});
        res.json({ success: true, allCategories: allCategories });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCategories = getAllCategories;
const selectCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, categoryId } = req.body;
        const updatedCategory = yield userModel_1.userModel.updateOne({ _id: userId }, { $addToSet: { preferences: categoryId } });
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.selectCategories = selectCategories;
const editProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, firstName, lastName, email, phone, password, confirmPassword, dob, preferences } = req.body;
        const dataToUpdate = {};
        if (firstName)
            dataToUpdate.firstName = firstName;
        if (lastName)
            dataToUpdate.lastName = lastName;
        if (email)
            dataToUpdate.email = email;
        if (phone)
            dataToUpdate.phone = phone;
        if (dob)
            dataToUpdate.dob = new Date(dob);
        if (password) {
            if (password !== confirmPassword) {
                res.status(400).json({ success: false, message: "Passwords do not match" });
                return;
            }
            dataToUpdate.password = password;
        }
        if (preferences && Array.isArray(preferences)) {
            dataToUpdate.preferences = preferences;
        }
        const updatedUser = yield userModel_1.userModel.findByIdAndUpdate(userId, { $set: dataToUpdate }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
    }
    catch (error) {
        next(error);
    }
});
exports.editProfile = editProfile;
