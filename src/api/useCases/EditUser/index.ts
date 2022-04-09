import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { EditUserController } from "./EditUserController";
import { EditUserUseCase } from "./EditUserUseCase";

const postgresUsersRepoository = new PostgresUserRepository();
const editUserUseCase = new EditUserUseCase(postgresUsersRepoository);
const editUserController = new EditUserController(editUserUseCase);

export { editUserController };
