import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { Tweet } from "../../entities/Tweet";
import { IUser } from "../../interfaces/User";
import { LikeTweetUseCase } from "./LikeTweetUseCase";

describe("#LikeTweet", () => {
    it("Should like tweet", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new LikeTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const tweet = {
            id: "2",
            users_saved_id: [],
            liked_users_id: [],
        };

        const user = {
            id: "3",
            bookmarks_id: [],
            bookmarks: [],
            liked_tweets: [],
            liked_tweets_id: [],
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);
        inMemoryUsersRepository.items.push(user as unknown as IUser);

        await sut.execute({
            userId: user.id,
            tweetId: tweet.id,
        });

        expect(inMemoryTweetsRepository.items[0].liked_users_id).toEqual(["3"]);
        expect(inMemoryUsersRepository.items[0].liked_tweets_id).toEqual(["2"]);
    });

    it("Shouldn't like tweet if tweet is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new LikeTweetUseCase(
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

    it("Shouldn't like tweet if user is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new LikeTweetUseCase(
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

    it("Shouldn't like tweet if tweet already liked", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new LikeTweetUseCase(
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
            liked_tweets_id: [],
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);
        inMemoryUsersRepository.items.push(user as unknown as IUser);

        const response = sut.execute({
            userId: user.id,
            tweetId: tweet.id,
        });

        await expect(response).rejects.toEqual(
            new Error("Tweet already liked"),
        );
    });
});
