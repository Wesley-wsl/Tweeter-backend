import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { ShowBookmarksController } from "./ShowBookmarksController";
import { ShowBookmarksUseCase } from "./ShowBookmarksUseCase";

const postgresUsersRepository = new PostgresUserRepository();
const postgresTweetsRepository = new PostgresTweetsRepository();
const showBookmarksUseCase = new ShowBookmarksUseCase(
    postgresUsersRepository,
    postgresTweetsRepository,
);
const showBookmarksController = new ShowBookmarksController(
    showBookmarksUseCase,
);

export { showBookmarksController };
