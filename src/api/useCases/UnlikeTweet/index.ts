import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { UnlikeTweetController } from "./UnlikeTweetController";
import { UnlikeTweetUseCase } from "./UnlikeTweetUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const postgresUsersRepository = new PostgresUserRepository();
const unlikeTweetUseCase = new UnlikeTweetUseCase(
    postgresTweetsRepository,
    postgresUsersRepository,
);
const unlikeTweetController = new UnlikeTweetController(unlikeTweetUseCase);

export { unlikeTweetController };
