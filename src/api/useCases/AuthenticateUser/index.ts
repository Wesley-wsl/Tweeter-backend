import { BcryptProvider } from "../../providers/implementations/BcryptProvider";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const postgresUserRepository = new PostgresUserRepository();
const bcryptProvider = new BcryptProvider();
const authenticateUserUseCase = new AuthenticateUserUseCase(
    postgresUserRepository,
    bcryptProvider,
);
const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase,
);

export { authenticateUserController };
