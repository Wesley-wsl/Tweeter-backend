import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { FollowerUserController } from "./FollowerUserController";
import { FollowerUserUseCase } from "./FollowerUserUseCase";

const postgresUserRepository = new PostgresUserRepository();
const followerUserUseCase = new FollowerUserUseCase(postgresUserRepository);
const followerUserController = new FollowerUserController(followerUserUseCase);

export { followerUserController };
