import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { IUser } from "../../interfaces/User";
import { ShowFollowingUseCase } from "./ShowFollowingUseCase";

describe("#ShowFollowing", () => {
    it("Should show followings by user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowFollowingUseCase(inMemoryUsersRepository);
        const user = {
            id: "2",
            following: [
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

    it("Shouldn't show followings by user if user is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowFollowingUseCase(inMemoryUsersRepository);
        const response = sut.execute("2");
        await expect(response).rejects.toEqual(new Error("User not found"));
    });
});
