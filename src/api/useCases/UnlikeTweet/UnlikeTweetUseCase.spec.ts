import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { Tweet } from "../../entities/Tweet";
import { IUser } from "../../interfaces/User";
import { UnlikeTweetUseCase } from "./UnlikeTweetUseCase";

describe("#LikeTweet", () => {
    it("Should unlike tweet", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnlikeTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const tweet = {
            id: "2",
            users_saved_id: [],
            liked_users_id: ["3"],
        };

        const user = {
            id: "3",
            bookmarks_id: [],
            bookmarks: [],
            liked_tweets: [],
            liked_tweets_id: ["2"],
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);
        inMemoryUsersRepository.items.push(user as unknown as IUser);

        await sut.execute({
            userId: user.id,
            tweetId: tweet.id,
        });

        expect(inMemoryTweetsRepository.items[0].liked_users_id).toEqual([]);
        expect(inMemoryUsersRepository.items[0].liked_tweets_id).toEqual([]);
    });

    it("Shouldn't unlike tweet if tweet is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnlikeTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const user = {
            id: "3",
            bookmarks_id: [],
            bookmarks: [],
            liked_tweets: [],
            liked_tweets_id: [],
        };

        inMemoryUsersRepository.items.push(user as unknown as IUser);

        const response = sut.execute({
            userId: user.id,
            tweetId: "10",
        });

        await expect(response).rejects.toEqual(new Error("Tweet not found"));
    });

    it("Shouldn't unlike tweet if user is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnlikeTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const tweet = {
            id: "2",
            users_saved_id: [],
            liked_users_id: [],
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);

        const response = sut.execute({
            userId: "10",
            tweetId: tweet.id,
        });

        await expect(response).rejects.toEqual(new Error("User not found"));
    });

    it("Shouldn't unlike tweet if tweet don't has liked", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnlikeTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const user = {
            id: "3",
            bookmarks_id: [],
            bookmarks: [],
            liked_tweets: [],
            liked_tweets_id: [],
        };

        inMemoryUsersRepository.items.push(user as unknown as IUser);

        const tweet = {
            id: "2",
            users_saved_id: [],
            liked_users_id: [],
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);

        const response = sut.execute({
            userId: user.id,
            tweetId: tweet.id,
        });

        await expect(response).rejects.toEqual(
            new Error("Tweet don't has liked"),
        );
    });
});
