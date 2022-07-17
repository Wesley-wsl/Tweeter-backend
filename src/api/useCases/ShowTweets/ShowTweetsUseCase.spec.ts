import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { Tweet } from "../../entities/Tweet";
import { User } from "../../entities/User";
import { IUser } from "../../interfaces/User";
import { ShowTweetsUseCase } from "./ShowTweetsUseCase";

describe("#ShowTweets", () => {
    it("Should only tweets public if is not follow this user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetsUseCase(inMemoryTweetsRepository);
        const user = {
            id: "2",
            following: [] as User[],
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const tweet = {
            id: "123423243423",
            author_id: "1",
            isPublic: "false",
            author: {
                followers: [
                    {
                        id: "6",
                    },
                ],
            },
        };

        const tweetTwo = {
            id: "123423243423",
            author_id: "1",
            isPublic: "true",
            author: {
                followers: [
                    {
                        id: "6",
                    },
                ],
            },
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);
        inMemoryTweetsRepository.items.push(tweetTwo as Tweet);

        const response = await sut.execute({
            filter: "",
            page: 0,
            search: "",
            userId: user.id,
        });

        expect(response.data[0].isPublic).toEqual("true");
    });

    it("Should list tweets private by user if is following he", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetsUseCase(inMemoryTweetsRepository);

        const tweet = {
            id: "123423243423",
            author_id: "2",
            isPublic: "false",
            author: {
                followers: [
                    {
                        id: "2",
                    },
                ],
            },
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = await sut.execute({
            filter: "",
            page: 0,
            search: "",
            userId: "2",
        });
        expect(response.data[0].isPublic).toEqual("false");
    });

    it("Should be able to show tweets filtered by media.", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetsUseCase(inMemoryTweetsRepository);

        const tweet = {
            id: "123423243423",
            author_id: "2",
            isPublic: "false",
            image: null,
            author: {
                followers: [
                    {
                        id: "2",
                    },
                ],
                followers_id: ["2"],
            },
        };

        const tweetTwo = {
            id: "123423243423",
            author_id: "2",
            isPublic: "false",
            author: {
                followers: [
                    {
                        id: "2",
                    },
                ],
                followers_id: ["2"],
            },
            image: "image.png",
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);
        inMemoryTweetsRepository.items.push(tweetTwo as Tweet);

        const response = await sut.execute({
            filter: "media",
            page: 0,
            search: "",
            userId: "2",
        });
        expect(response.data[0].image).toBeTruthy();
        expect(response.data[1]).toBeFalsy();
    });

    it("Shouldn't be able to show tweets if page don't exists.", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetsUseCase(inMemoryTweetsRepository);

        const response = sut.execute({
            filter: "",
            page: 2,
            search: "",
            userId: "3",
        });

        await expect(response).rejects.toEqual(new Error("Page don't exists."));
    });

    it("Should be able to show tweets filtered by top.", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetsUseCase(inMemoryTweetsRepository);

        const tweet = {
            id: "123423243423",
            author_id: "2",
            isPublic: "false",
            image: null,
            author: {
                followers: [
                    {
                        id: "2",
                    },
                ],
            },
            likes: 5,
        };

        const tweetTwo = {
            id: "123423243423",
            author_id: "2",
            isPublic: "false",
            author: {
                followers: [
                    {
                        id: "2",
                    },
                ],
            },
            image: "image.png",
            likes: 100,
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);
        inMemoryTweetsRepository.items.push(tweetTwo as Tweet);

        const response = await sut.execute({
            filter: "top",
            page: 0,
            search: "",
            userId: "2",
        });
        expect(response.data[0].likes >= response.data[1].likes).toEqual(true);
    });

    it("Should be able to show tweets filtered by latest.", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetsUseCase(inMemoryTweetsRepository);

        const tweet = {
            id: "123423243423",
            author_id: "2",
            isPublic: "false",
            image: null,
            author: {
                followers: [
                    {
                        id: "2",
                    },
                ],
            },
            likes: 5,
            created_at: new Date(),
        };

        const date = new Date();
        date.setDate(date.getDate() + 5);

        const tweetTwo = {
            id: "123423243423",
            author_id: "2",
            isPublic: "false",
            author: {
                followers: [
                    {
                        id: "2",
                    },
                ],
            },
            image: "image.png",
            likes: 100,
            created_at: date,
        };

        const tweetThree = {
            id: "123423243423",
            author_id: "2",
            isPublic: "false",
            author: {
                followers: [
                    {
                        id: "2",
                    },
                ],
            },
            image: "image.png",
            likes: 50,
            created_at: date,
        };

        inMemoryTweetsRepository.items.push(tweetThree as Tweet);
        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);
        inMemoryTweetsRepository.items.push(tweetTwo as Tweet);

        const response = await sut.execute({
            filter: "latest",
            page: 0,
            search: "",
            userId: "2",
        });

        expect(
            response.data[0].created_at >= response.data[1].created_at,
        ).toEqual(true);
    });
});
