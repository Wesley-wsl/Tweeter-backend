import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("#CreateUser", () => {
    it("Should be able to create a new user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new CreateUserUseCase(inMemoryUsersRepository);
        const user = {
            name: "Jorkis",
            email: "jorkis@gmail.com",
            password: "12345",
        };
        const response = await sut.execute(user);

        expect(response).toBeTruthy();
        expect(response.email).toEqual(user.email);
    });

    it("Don't must be create new user without a password", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new CreateUserUseCase(inMemoryUsersRepository);
        const user = {
            name: "Jorkis",
            email: "jorkis@gmail.com",
        };
        const response = sut.execute(user);

        await expect(response).rejects.toEqual(
            new Error("Password is required"),
        );
    });

    it("Don't should be able to create a user already exists", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new CreateUserUseCase(inMemoryUsersRepository);
        const user = {
            name: "Jorkis",
            email: "jorkis@gmail.com",
            password: "12345",
        };
        const response = await sut.execute(user);
        const anotherUser = sut.execute(user);

        expect(response).toBeTruthy();
        await expect(anotherUser).rejects.toEqual(
            new Error("User already exists"),
        );
    });
});
