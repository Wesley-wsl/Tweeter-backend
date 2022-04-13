import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { SaveTweetController } from "./SaveTweetController";
import { SaveTweetUseCase } from "./SaveTweetUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const postgresUsersRepository = new PostgresUserRepository();
const saveTweetUseCase = new SaveTweetUseCase(
    postgresTweetsRepository,
    postgresUsersRepository,
);
const saveTweetController = new SaveTweetController(saveTweetUseCase);

export { saveTweetController };
