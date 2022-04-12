/* eslint-disable @typescript-eslint/no-explicit-any */
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { User } from "../../entities/User";
import { UnfollowUserUseCase } from "./UnfollowUserUseCase";

describe("#FollowerUser", () => {
    it("Shouldn't unfollow a user if is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnfollowUserUseCase(inMemoryUsersRepository);
        const userToUnfollow = {
            id: "1",
            name: "Jorkis",
        };

        inMemoryUsersRepository.items.push(userToUnfollow as User);
        const response = sut.execute({ userId: "20", id: userToUnfollow.id });
        await expect(response).rejects.toEqual(new Error("User not found"));
    });

    it("Shouldn't unfollow a user if user to follow is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnfollowUserUseCase(inMemoryUsersRepository);
        const user = {
            id: "1",
            name: "Jorkis",
        };

        inMemoryUsersRepository.items.push(user as User);
        const response = sut.execute({ userId: user.id, id: "20" });

        await expect(response).rejects.toEqual(
            new Error("User to unfollow not found"),
        );
    });

    it("Should unfollow a user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnfollowUserUseCase(inMemoryUsersRepository);
        const user = {
            id: "1",
            name: "Jorkis",
            followers: [],
            following: [
                {
                    id: "2",
                    name: "Jorkis",
                    followers: [],
                    following: [],
                },
            ],
        };
        const userToUnfollow = {
            id: "2",
            name: "Jorkis",
            followers: [
                {
                    id: "1",
                    name: "Jorkis",
                },
            ],
            following: [],
        };

        inMemoryUsersRepository.items.push(user as any);
        inMemoryUsersRepository.items.push(userToUnfollow as any);

        const response = await sut.execute({
            userId: user.id,
            id: userToUnfollow.id,
        });

        expect(response).toBeUndefined();
        expect(inMemoryUsersRepository.items[0].following.length).toEqual(0);
        expect(inMemoryUsersRepository.items[1].followers.length).toEqual(0);
    });
});
