import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { UnfollowUserController } from "./UnfollowUserController";
import { UnfollowUserUseCase } from "./UnfollowUserUseCase";

const postgresUserRepository = new PostgresUserRepository();
const unfollowUserUseCase = new UnfollowUserUseCase(postgresUserRepository);
const unfollowUserController = new UnfollowUserController(unfollowUserUseCase);

export { unfollowUserController };
