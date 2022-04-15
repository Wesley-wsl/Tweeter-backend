import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { IUser } from "../../interfaces/User";
import { ShowFollowersUseCase } from "./ShowFollowersUseCase";

describe("#ShowFollowers", () => {
    it("Should show followers by user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowFollowersUseCase(inMemoryUsersRepository);
        const user = {
            id: "2",
            followers: [
                {
                    id: "3",
                    name: "Jorkis",
                },
            ],
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const response = await sut.execute("2");
        expect(response[0].id).toEqual("3");
    });

    it("Shouldn't show followers by user if user is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowFollowersUseCase(inMemoryUsersRepository);

        const response = sut.execute("2");

        await expect(response).rejects.toEqual(new Error("User not found"));
    });

    it("Shouldn't show followers by user if user is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowFollowersUseCase(inMemoryUsersRepository);
        const user = {
            id: "2",
        };

        inMemoryUsersRepository.items.push(user as IUser);
        const response = sut.execute(user.id);
        await expect(response).rejects.toEqual(new Error("Follower not found"));
    });
});
