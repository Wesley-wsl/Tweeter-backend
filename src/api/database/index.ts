import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URI,
    entities: [
        `${__dirname}/../entities/*.ts`,
        `${__dirname}/../entities/*.js`,
    ],
    migrations: [
        `${__dirname}/migrations/*.ts`,
        `${__dirname}/migrations/*.js`,
    ],
    synchronize: false,
    logging: false,
    migrationsRun: false,
});
