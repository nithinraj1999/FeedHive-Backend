"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../services/jwt");
const authenticateUser = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return;
        }
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.default = authenticateUser;
