import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { Tweet } from "../../entities/Tweet";
import { User } from "../../entities/User";
import { IUser } from "../../interfaces/User";
import { ShowTweetByUserUseCase } from "./ShowTweetByUserUseCase";

describe("#ShowTweetByUser", () => {
    it("Shouldn't list tweet by user if tweet from this user is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const response = sut.execute("1", "2");

        await expect(response).rejects.toEqual(
            new Error("Tweets from this user not found"),
        );
    });

    it("Should only tweets public if is not follow this user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const user = {
            id: "20",
            following: [] as User[],
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const tweet = {
            id: "123423243423",
            author_id: "1",
            isPublic: "false",
            author: {},
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = await sut.execute(user.id, tweet.author_id);
        expect(response[0]).toBeFalsy();
    });

    it("Should show tweets if user is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const tweet = {
            id: "123423243423",
            author_id: "1",
            isPublic: "false",
            author: {},
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = await sut.execute("2", tweet.author_id);
        expect(response[0]).toBeFalsy();
    });

    it("Should list tweets private by user if is following he", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
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
            author: {},
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = await sut.execute(user.id, tweet.author_id);
        expect(response[0].isPublic).toEqual("false");
    });
});
