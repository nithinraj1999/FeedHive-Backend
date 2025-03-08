import express from "express";
import userRoutes from "./routes/user/userRoute"
import dotenv from 'dotenv'
import ErrorHandler from "./middlewares/errorHandler";
import { connectToMongoDB } from "./config/mongoose";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

connectToMongoDB()
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ limit: '2mb', extended: true }))
 
app.use('/api',userRoutes)

app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
