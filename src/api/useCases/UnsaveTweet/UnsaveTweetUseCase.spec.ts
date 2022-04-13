import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { Tweet } from "../../entities/Tweet";
import { IUser } from "../../interfaces/User";
import { UnsaveTweetUseCase } from "./UnsaveTweetUseCase";

describe("#UnsaveTweet", () => {
    it("Should unsave tweet", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnsaveTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const tweet = {
            id: "2",
            users_saved_id: ["3"],
        };

        const user = {
            id: "3",
            bookmarks_id: ["2"],
            bookmarks: [
                {
                    id: "2",
                },
            ],
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);
        inMemoryUsersRepository.items.push(user as unknown as IUser);

        await sut.execute({
            userId: user.id,
            tweetId: tweet.id,
        });

        expect(inMemoryUsersRepository.items[0].bookmarks).toEqual([]);
        expect(inMemoryUsersRepository.items[0].bookmarks_id).toEqual([]);
    });

    it("Shouldn't unsave tweet if tweet is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnsaveTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const user = {
            id: "3",
            bookmarks_id: ["2"],
            bookmarks: [
                {
                    id: "2",
                },
            ],
        };

        inMemoryUsersRepository.items.push(user as unknown as IUser);

        const response = sut.execute({
            userId: user.id,
            tweetId: "20",
        });

        await expect(response).rejects.toEqual(new Error("Tweet not found"));
    });

    it("Shouldn't unsave tweet if user is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnsaveTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const tweet = {
            id: "2",
            users_saved_id: ["3"],
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);

        const response = sut.execute({
            userId: "20",
            tweetId: tweet.id,
        });

        await expect(response).rejects.toEqual(new Error("User not found"));
    });

    it("Shouldn't unsave tweet if tweet is not saved", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnsaveTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const tweet = {
            id: "2",
            users_saved_id: [],
        };

        const user = {
            id: "3",
            bookmarks_id: [],
            bookmarks: [],
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);
        inMemoryUsersRepository.items.push(user as unknown as IUser);

        const response = sut.execute({
            userId: user.id,
            tweetId: tweet.id,
        });

        await expect(response).rejects.toEqual(new Error("Tweet not saved"));
    });
});
