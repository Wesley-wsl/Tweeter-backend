import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { UnsaveTweetController } from "./UnsaveTweetController";
import { UnsaveTweetUseCase } from "./UnsaveTweetUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const postgresUsersRepository = new PostgresUserRepository();
const unsaveTweetUseCase = new UnsaveTweetUseCase(
    postgresTweetsRepository,
    postgresUsersRepository,
);
const unsaveTweetController = new UnsaveTweetController(unsaveTweetUseCase);

export { unsaveTweetController };
