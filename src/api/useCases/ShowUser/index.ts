import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { ShowUserController } from "./ShowUserController";
import { ShowUserUseCase } from "./ShowUserUseCase";

const postgresUserRepository = new PostgresUserRepository();
const showUserUseCase = new ShowUserUseCase(postgresUserRepository);
const showUserController = new ShowUserController(showUserUseCase);

export { showUserController };
