import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URI,
});
