import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { ShowBookmarksController } from "./ShowBookmarksController";
import { ShowBookmarksUseCase } from "./ShowBookmarksUseCase";

const postgresUsersRepository = new PostgresUserRepository();
const showBookmarksUseCase = new ShowBookmarksUseCase(postgresUsersRepository);
const showBookmarksController = new ShowBookmarksController(
    showBookmarksUseCase,
);

export { showBookmarksController };
