import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { ShowWhoFollowController } from "./ShowWhoFollowController";
import { ShowWhoFollowUseCase } from "./ShowWhoFollowUseCase";

const postgresUserRepository = new PostgresUserRepository();
const showWhoFollowUseCase = new ShowWhoFollowUseCase(postgresUserRepository);
const showWhoFollowController = new ShowWhoFollowController(
    showWhoFollowUseCase,
);

export { showWhoFollowController };
