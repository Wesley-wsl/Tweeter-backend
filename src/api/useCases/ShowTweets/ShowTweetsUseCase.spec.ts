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

        const response = await sut.execute(user.id);
        expect(response[0].isPublic).toEqual("true");
    });

    it("Should list tweets private by user if is following he", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetsUseCase(inMemoryTweetsRepository);
        const user = {
            id: "2",
            following: [
                {
                    id: "1",
                },
            ],
        };
        const userTwo = {
            id: "1",
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push(userTwo as IUser);

        const tweet = {
            id: "123423243423",
            author_id: "1",
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

        const response = await sut.execute(user.id);
        expect(response[0].isPublic).toEqual("false");
    });
});
