import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { IUser } from "../../interfaces/User";
import { ShowAllUsersUseCase } from "./ShowAllUsersUseCase";

describe("#ShowAllUsers", () => {
    it("Should show all users by user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowAllUsersUseCase(inMemoryUsersRepository);
        const user = {
            id: "2",
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const response = await sut.execute({
            name: "",
            page: 0,
        });
        expect(response.data[0].id).toEqual("2");
    });

    it("Shouldn't show all users if page don't exist.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowAllUsersUseCase(inMemoryUsersRepository);
        const user = {
            id: "2",
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const response = sut.execute({
            name: "",
            page: 1,
        });
        await expect(response).rejects.toEqual(new Error("Page don't exists."));
    });
});
