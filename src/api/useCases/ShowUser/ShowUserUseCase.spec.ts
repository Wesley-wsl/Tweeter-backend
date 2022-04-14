import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { IUser } from "../../interfaces/User";
import { ShowUserUseCase } from "./ShowUserUseCase";

describe("#ShowUser", () => {
    it("Should show user by id", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowUserUseCase(inMemoryUsersRepository);
        const user = {
            id: "123",
            name: "Jorkis",
            email: "jorkis@gmail.com",
        };
        inMemoryUsersRepository.items.push(user as IUser);
        const response = await sut.execute("123");

        expect(response.id).toEqual(user.id);
        expect(response.password).toBeUndefined();
    });

    it("Don't must show user if is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowUserUseCase(inMemoryUsersRepository);
        const user = {
            id: "123",
            name: "Jorkis",
            email: "jorkis@gmail.com",
        };
        inMemoryUsersRepository.items.push(user as IUser);
        const response = sut.execute("12345");

        await expect(response).rejects.toEqual(new Error("User not found"));
    });
});
