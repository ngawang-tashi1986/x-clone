import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); //creating middleware (ie. to parse request.body - ie the formdata)
app.use(express.urlencoded({ extended: true })); //to parse urlencoded data via form data
app.use(cookieParser()); //to parse cookies from the request

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectMongoDB();
})