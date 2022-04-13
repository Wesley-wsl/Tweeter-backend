import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { ShowFollowingController } from "./ShowFollowingController";
import { ShowFollowingUseCase } from "./ShowFollowingUseCase";

const postgresUsersRepository = new PostgresUserRepository();
const showFollowingUseCase = new ShowFollowingUseCase(postgresUsersRepository);
const showFollowingController = new ShowFollowingController(
    showFollowingUseCase,
);

export { showFollowingController };
