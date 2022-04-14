import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { ShowAllUsersController } from "./ShowAllUsersController";
import { ShowAllUsersUseCase } from "./ShowAllUsersUseCase";

const postgresUserRepository = new PostgresUserRepository();
const showAllUserUseCase = new ShowAllUsersUseCase(postgresUserRepository);
const showAllUsersController = new ShowAllUsersController(showAllUserUseCase);

export { showAllUsersController };
