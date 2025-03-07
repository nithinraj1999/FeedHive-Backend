import express from "express";
import userRoutes from "./routes/user/userRoute"
import dotenv from 'dotenv'
import ErrorHandler from "./middlewares/errorHandler";
import { connectToMongoDB } from "./config/mongoose";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

connectToMongoDB()
app.use('/api',userRoutes)

app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
