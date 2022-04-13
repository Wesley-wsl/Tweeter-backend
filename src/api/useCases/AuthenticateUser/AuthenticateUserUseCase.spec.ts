import { InMemoryBcryptProvider } from "../../../tests/providers/In-memory-bcrypt-provider";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { IUser } from "../../interfaces/User";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("#AuthenticateUser", () => {
    it("Don't must be able to login user without password.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryBcryptProvider = new InMemoryBcryptProvider();
        const sut = new AuthenticateUserUseCase(
            inMemoryUsersRepository,
            inMemoryBcryptProvider,
        );

        const createUser = {
            email: "jorkis@gmail.com",
            password: "1234",
        };

        inMemoryUsersRepository.items.push(createUser as IUser);

        const user = {
            email: "jorkis@gmail.com",
        };
        const response = sut.execute(user);

        await expect(response).rejects.toEqual(
            new Error("Password is required"),
        );
    });

    it("Don't must be able to login user with email incorrect.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryBcryptProvider = new InMemoryBcryptProvider();
        const sut = new AuthenticateUserUseCase(
            inMemoryUsersRepository,
            inMemoryBcryptProvider,
        );

        const createUser = {
            email: "jorkis@gmail.com",
            password: "1234",
        };

        inMemoryUsersRepository.items.push(createUser as IUser);

        const user = {
            email: "anotheremail@gmail.com",
            password: "1234",
        };
        const response = sut.execute(user);

        await expect(response).rejects.toEqual(
            new Error("Email/password incorrect"),
        );
    });

    it("Don't must be able to login user with password incorrect.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryBcryptProvider = new InMemoryBcryptProvider();
        const sut = new AuthenticateUserUseCase(
            inMemoryUsersRepository,
            inMemoryBcryptProvider,
        );

        const createUser = {
            email: "jorkis@gmail.com",
            password: "1234",
        };

        inMemoryUsersRepository.items.push(createUser as IUser);

        const user = {
            email: "jorkis@gmail.com",
            password: "123456",
        };
        const response = sut.execute(user);

        await expect(response).rejects.toEqual(
            new Error("Email/password incorrect"),
        );
    });

    it("Should be able login user with email and password.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryBcryptProvider = new InMemoryBcryptProvider();
        const sut = new AuthenticateUserUseCase(
            inMemoryUsersRepository,
            inMemoryBcryptProvider,
        );

        const createUser = {
            email: "jorkis@gmail.com",
            password: "1234",
        };

        inMemoryUsersRepository.items.push(createUser as IUser);

        const user = {
            email: "jorkis@gmail.com",
            password: "1234",
        };
        const response = await sut.execute(user);

        expect(response.user.email).toEqual(createUser.email);
        expect(response.user.password).toEqual(createUser.password);
        expect(response.token).toBeTruthy();
        expect(response.user).toBeTruthy();
    });
});
