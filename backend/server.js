import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import BooksRouter from "./router/booksRoutes.js";
import UserRouter from "./router/userRoutes.js";
dotenv.config();
ConnectDB();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use("/books", BooksRouter);
app.use("/auth", UserRouter);
app.use("*", (req, res) => res.status(404).json({ error: "not found. Please contact adminstrator" }))

app.listen(process.env.PORT, console.log(`Server is running on ${process.env.PORT}`));