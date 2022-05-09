import "express-async-errors";
import "reflect-metadata";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { resolve } from "path";

import { AppDataSource } from "./api/database";
import { errorHandler } from "./api/middlewares/errorHandler";
import { tweetRouter, userRouter } from "./api/routes";
import { commentRouter } from "./api/routes/comment.routes";

config();
AppDataSource.initialize();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(resolve(__dirname, "..", "uploads")));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tweet", tweetRouter);
app.use("/api/v1/comment", commentRouter);
app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => console.log("Server is running."));
