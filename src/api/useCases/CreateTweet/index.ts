import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateTweetController } from "./CreateTweetController";
import { CreateTweetUseCase } from "./CreateTweetUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const postgresUsersRepository = new PostgresUserRepository();
const createTweetUseCase = new CreateTweetUseCase(
    postgresTweetsRepository,
    postgresUsersRepository,
);
const createTweetController = new CreateTweetController(createTweetUseCase);

export { createTweetController };
