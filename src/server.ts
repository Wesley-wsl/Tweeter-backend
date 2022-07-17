import "express-async-errors";
import "reflect-metadata";
import { errors } from "celebrate";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { resolve } from "path";
import swaggerUi from "swagger-ui-express";

import { AppDataSource } from "./api/database";
import { errorHandler } from "./api/middlewares/errorHandler";
import { tweetRouter, userRouter } from "./api/routes";
import { commentRouter } from "./api/routes/comment.routes";
import swaggerJSON from "./config/swagger/index.json";

config();
AppDataSource.initialize();

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    }),
);
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON));
app.use("/files", express.static(resolve(__dirname, "..", "uploads")));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tweet", tweetRouter);
app.use("/api/v1/comment", commentRouter);
app.use(errors());
app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => console.log("Server is running."));
