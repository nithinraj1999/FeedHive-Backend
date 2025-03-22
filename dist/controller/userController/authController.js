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
exports.signin = exports.signup = void 0;
const userModel_1 = require("../../model/userModel");
const jwt_1 = require("../../services/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone, dateOfBirth, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        const isAlreadyExist = yield userModel_1.userModel.findOne({ $or: [{ email: email }, { phone: phone }] });
        if (isAlreadyExist) {
            res.status(400).json({ success: false, message: "Email or phone number already registered." });
            return;
        }
        const newUser = new userModel_1.userModel({ firstName, lastName, email, phone, password, dob: dateOfBirth });
        yield newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully", newUserId: newUser._id });
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.userModel.findOne({ email: email }).populate("preferences");
        if (!user) {
            res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        else {
            const isMatch = yield bcrypt_1.default.compare(password.toString(), user.password);
            if (!isMatch) {
                res.status(400).json({ success: false, message: "Invalid email or password" });
                return;
            }
            const payload = { email: user.email, userId: user._id, role: user.role };
            const accessToken = (0, jwt_1.generateAccessToken)(payload);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 10 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ success: true, message: "Login successful!", userData: user });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
