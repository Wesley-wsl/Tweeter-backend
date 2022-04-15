import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { ShowTweetByUserController } from "./ShowTweetByUserController";
import { ShowTweetByUserUseCase } from "./ShowTweetByUserUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const postgresUsersRepository = new PostgresUserRepository();
const showTweetByUserUseCase = new ShowTweetByUserUseCase(
    postgresTweetsRepository,
    postgresUsersRepository,
);
const showTweetByUserController = new ShowTweetByUserController(
    showTweetByUserUseCase,
);

export { showTweetByUserController };
