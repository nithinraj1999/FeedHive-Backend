import express from "express";
import userRoutes from "./routes/user/userRoute"
import adminRoutes from "./routes/admin/adminRoute"
import dotenv from 'dotenv'
import ErrorHandler from "./middlewares/errorHandler";
import { connectToMongoDB } from "./config/mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()

const app = express();
app.use(
  cors({
    origin:process.env.FRONTEND_URL, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,  
  })
);
console.log(process.env.FRONTEND_URL);

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

connectToMongoDB()
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ limit: '2mb', extended: true }))
 
app.use('/api/',userRoutes)
app.use('/api/admin',adminRoutes) 

app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
