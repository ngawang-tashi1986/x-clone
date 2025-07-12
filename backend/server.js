import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectMongoDB from "./db/connectMongoDB.js"
import cookieParser from "cookie-parser";
import { v2 as Cloudinary} from "cloudinary";
import postRoutes from "./routes/post.routes.js";

dotenv.config();
// Configure Cloudinary
Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Importing routes
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); //creating middleware (ie. to parse request.body - ie the formdata)
app.use(express.urlencoded({ extended: true })); //to parse urlencoded data via form data
app.use(cookieParser()); //to parse cookies from the request

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes); // Uncomment this line if you have post routes

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectMongoDB();
})