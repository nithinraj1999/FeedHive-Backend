"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const generateAccessToken = (payload) => {
    if (!accessTokenSecret) {
        return null;
    }
    return jsonwebtoken_1.default.sign(payload, accessTokenSecret, { expiresIn: "10d" });
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (token) => {
    if (!accessTokenSecret) {
        throw new Error("Access token secret is not defined");
    }
    try {
        return jsonwebtoken_1.default.verify(token, accessTokenSecret.toString());
    }
    catch (err) {
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
