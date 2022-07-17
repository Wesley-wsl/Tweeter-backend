import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { User } from "../../entities/User";
import { IUser } from "../../interfaces/User";
import { FollowerUserUseCase } from "./FollowerUserUseCase";

describe("#FollowerUser", () => {
    it("Shouldn't follow a user if is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new FollowerUserUseCase(inMemoryUsersRepository);

        const userToFollow = {
            id: "2",
            name: "Jorkis",
            followers: [] as User[],
            followers_id: [] as string[],
            following: [] as User[],
            following_id: [] as string[],
            followingCount: 0,
            followersCount: 0,
        };

        const user = {
            id: "1",
            name: "Jorkis",
            following: [] as User[],
            followers: [] as User[],
            following_id: [] as string[],
            followers_id: [] as string[],
            followingCount: 0,
            followersCount: 0,
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push(userToFollow as IUser);

        await sut.execute({
            userId: user.id,
            id: userToFollow.id,
        });

        expect(inMemoryUsersRepository.items[0].followingCount).toEqual(1);
        expect(inMemoryUsersRepository.items[1].followersCount).toEqual(1);
    });

    it("Shouldn't follow a user if is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new FollowerUserUseCase(inMemoryUsersRepository);

        const userToFollow = {
            id: "1",
            name: "Jorkis",
            followers: [] as User[],
        };

        inMemoryUsersRepository.items.push(userToFollow as IUser);

        const response = sut.execute({ userId: "20", id: userToFollow.id });

        await expect(response).rejects.toEqual(new Error("User not found"));
    });

    it("Shouldn't follow a user if user to follow is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new FollowerUserUseCase(inMemoryUsersRepository);

        const user = {
            id: "1",
            name: "Jorkis",
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const response = sut.execute({ userId: user.id, id: "20" });

        await expect(response).rejects.toEqual(
            new Error("User to follow not found"),
        );
    });

    it("Shouldn't follow themselves", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new FollowerUserUseCase(inMemoryUsersRepository);

        const user = {
            id: "1",
            name: "Jorkis",
        };

        const userToFollow = {
            id: "1",
            name: "Jorkis",
            followers: [] as User[],
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const response = sut.execute({ userId: user.id, id: userToFollow.id });

        await expect(response).rejects.toEqual(
            new Error("User can't follow themselves"),
        );
    });

    it("Shouldn't follow if followers is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new FollowerUserUseCase(inMemoryUsersRepository);

        const user = {
            id: "1",
            name: "Jorkis",
        };

        const userToFollow = {
            id: "2",
            name: "Jorkis",
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push(userToFollow as IUser);

        const response = sut.execute({ userId: user.id, id: userToFollow.id });

        await expect(response).rejects.toEqual(new Error("Follower not found"));
    });

    it("Shouldn't follow if already is follow", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new FollowerUserUseCase(inMemoryUsersRepository);

        const user = {
            id: "1",
            name: "Jorkis",
        };

        const userToFollow = {
            id: "2",
            name: "Jorkis",
            followers_id: [user.id],
            followers: [] as User[],
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push(userToFollow as IUser);

        const response = sut.execute({ userId: user.id, id: userToFollow.id });

        await expect(response).rejects.toEqual(
            new Error("You already follow this user."),
        );
    });
});
