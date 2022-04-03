import "express-async-errors";
import "reflect-metadata";
import cors from "cors";
import { config } from "dotenv";
import express from "express";

import { AppDataSource } from "./api/database";
import { errorHandler } from "./api/middlewares/errorHandler";
import { userRouter } from "./api/routes";

config();
AppDataSource.initialize();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);

app.use(errorHandler);

app.listen(3333, () => console.log("Server is running."));
