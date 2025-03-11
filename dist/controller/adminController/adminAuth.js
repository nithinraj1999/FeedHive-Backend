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
exports.adminSignin = void 0;
const userModel_1 = require("../../model/userModel");
const jwt_1 = require("../../services/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.userModel.findOne({ email: email });
        if (!user) {
            res.status(400).json({ success: false, message: "Invalid email or password" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password.toString(), user.password);
        if (!isMatch) {
            res.status(400).json({ success: false, message: "Invalid email or password" });
            return;
        }
        const payload = { email: user.email, userId: user._id, role: user.role };
        const accessToken = (0, jwt_1.generateAccessToken)(payload);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 10 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ success: true, message: "Login successful!", userData: user });
    }
    catch (error) {
        next(error);
    }
});
exports.adminSignin = adminSignin;
