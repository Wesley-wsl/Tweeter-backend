import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { ShowFollowersController } from "./ShowFollowersController";
import { ShowFollowersUseCase } from "./ShowFollowersUseCase";

const postgresUsersRepository = new PostgresUserRepository();
const showFollowersUseCase = new ShowFollowersUseCase(postgresUsersRepository);
const showFollowersController = new ShowFollowersController(
    showFollowersUseCase,
);

export { showFollowersController };
