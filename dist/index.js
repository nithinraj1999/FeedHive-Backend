"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/user/userRoute"));
const adminRoute_1 = __importDefault(require("./routes/admin/adminRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const mongoose_1 = require("./config/mongoose");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const PORT = process.env.PORT || 3000;
(0, mongoose_1.connectToMongoDB)();
app.use(express_1.default.json({ limit: '2mb' }));
app.use(express_1.default.urlencoded({ limit: '2mb', extended: true }));
app.use('/api', userRoute_1.default);
app.use('/api/admin', adminRoute_1.default);
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
