import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { User } from "../../entities/User";
import { IUser } from "../../interfaces/User";
import { UnfollowUserUseCase } from "./UnfollowUserUseCase";

describe("#UnfollowUser", () => {
    it("Shouldn't unfollow a user if is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnfollowUserUseCase(inMemoryUsersRepository);
        const userToUnfollow = {
            id: "1",
            name: "Jorkis",
        };

        inMemoryUsersRepository.items.push(userToUnfollow as IUser);
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

        inMemoryUsersRepository.items.push(user as IUser);
        const response = sut.execute({ userId: user.id, id: "20" });

        await expect(response).rejects.toEqual(
            new Error("User to unfollow not found"),
        );
    });

    it("Shouldn't unfollow a user if followers is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnfollowUserUseCase(inMemoryUsersRepository);
        const user = {
            id: "2",
            name: "Jorkis",
        };

        const userOne = {
            id: "1",
            name: "Jorkis",
            following: [
                {
                    id: "2",
                    name: "Jorkis",
                    following: [] as User[],
                },
            ],
        };
        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push(userOne as IUser);
        const response = sut.execute({ userId: userOne.id, id: user.id });

        await expect(response).rejects.toEqual(
            new Error("Followers not found"),
        );
    });

    it("Should unfollow a user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnfollowUserUseCase(inMemoryUsersRepository);
        const user = {
            id: "1",
            name: "Jorkis",
            followers: [] as User[],
            followers_id: [] as string[],
            following_id: ["2"] as string[],
            following: [
                {
                    id: "2",
                    name: "Jorkis",
                    followers: [] as User[],
                    following: [] as User[],
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
                    followers: [] as User[],
                    following: [] as User[],
                },
            ] as User[],
            following: [] as User[],
            following_id: [] as string[],
            followers_id: ["1"] as string[],
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push(userToUnfollow as IUser);

        const response = await sut.execute({
            userId: user.id,
            id: userToUnfollow.id,
        });

        expect(response).toBeUndefined();
        expect(inMemoryUsersRepository.items[0].following.length).toEqual(0);
        expect(inMemoryUsersRepository.items[1].followers.length).toEqual(0);
    });

    it("Shouldn't be able to unfollow a user if already don't following it.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnfollowUserUseCase(inMemoryUsersRepository);
        const user = {
            id: "1",
            name: "Jorkis",
            followers: [] as User[],
            followers_id: [] as string[],
            following_id: [] as string[],
            following: [] as IUser[],
        };
        const userToUnfollow = {
            id: "2",
            name: "Jorkis",
            followers: [] as User[],
            following: [] as User[],
            following_id: [] as string[],
            followers_id: [] as string[],
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push(userToUnfollow as IUser);

        const response = sut.execute({
            userId: user.id,
            id: userToUnfollow.id,
        });

        await expect(response).rejects.toEqual(
            new Error("You already don't follow this user."),
        );
    });
});
