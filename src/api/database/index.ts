import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "tweeter",
    entities: [`${__dirname}/../entities/*.ts`],
    migrations: [`${__dirname}/migrations/*.ts`],
    synchronize: false,
    logging: false,
    migrationsRun: false,
});
