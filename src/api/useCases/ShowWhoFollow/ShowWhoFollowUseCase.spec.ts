import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { IUser } from "../../interfaces/User";
import { ShowWhoFollowUseCase } from "./ShowWhoFollowUseCase";

describe("#ShowWhoFollow", () => {
    it("Shouldn't be able to show who follow if user is not found.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowWhoFollowUseCase(inMemoryUsersRepository);

        const response = sut.execute("10");
        await expect(response).rejects.toEqual(new Error("User not found."));
    });

    it("Should be able to show users that have most followers if user don't follow nobody.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowWhoFollowUseCase(inMemoryUsersRepository);

        const user = {
            id: "10",
            name: "Jorkis",
            following: [] as IUser[],
            following_id: [] as string[],
            followers: [] as IUser[],
            followers_id: [] as string[],
            followersCount: 0,
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push({
            ...user,
            followersCount: 2,
        } as IUser);

        inMemoryUsersRepository.items.push({
            ...user,
            followersCount: 2,
        } as IUser);

        inMemoryUsersRepository.items.push({
            ...user,
            id: "5",
            followersCount: 3,
        } as IUser);

        inMemoryUsersRepository.items.push({
            ...user,
            id: "5",
            followersCount: 1,
        } as IUser);

        inMemoryUsersRepository.items.push({
            ...user,
            id: "50",
            followersCount: 4,
        } as IUser);

        const response = await sut.execute(user.id);
        expect(response[0].id).toEqual("50");
    });

    it("Should be able to show who follow correctly.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowWhoFollowUseCase(inMemoryUsersRepository);

        const followings = [
            {
                id: "1",
                following: [
                    {
                        id: "2",
                    },
                ],
                following_id: ["2"],
            },
            {
                id: "3",
                following: [],
                following_id: [],
            },
        ];

        const user = {
            id: "10",
            name: "Jorkis",
            following: followings as IUser[],
            following_id: ["1", "3"] as string[],
            followers: [] as IUser[],
            followers_id: [] as string[],
        };

        const userOne = {
            id: "1",
            name: "Jorkis",
            following: followings as IUser[],
            following_id: ["2"] as string[],
            followers: [] as IUser[],
            followers_id: [] as string[],
        };

        const userTwo = {
            id: "2",
            name: "Jorkis",
            following: followings as IUser[],
            following_id: ["10", "200"] as string[],
            followers: [] as IUser[],
            followers_id: [] as string[],
        };

        const userThree = {
            id: "3",
            name: "Jorkis",
            following: followings as IUser[],
            following_id: ["200"] as string[],
            followers: [] as IUser[],
            followers_id: [] as string[],
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push(userOne as IUser);
        inMemoryUsersRepository.items.push(userTwo as IUser);
        inMemoryUsersRepository.items.push(userThree as IUser);

        const response = await sut.execute(user.id);

        expect(response[0].id).toEqual("2");
    });
});
