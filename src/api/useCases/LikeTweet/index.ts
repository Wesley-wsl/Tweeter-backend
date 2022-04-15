import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { LikeTweetController } from "./LikeTweetController";
import { LikeTweetUseCase } from "./LikeTweetUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const postgresUsersRepository = new PostgresUserRepository();
const likeTweetUseCase = new LikeTweetUseCase(
    postgresTweetsRepository,
    postgresUsersRepository,
);
const likeTweetController = new LikeTweetController(likeTweetUseCase);

export { likeTweetController };
