import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { Tweet } from "../../entities/Tweet";
import { IUser } from "../../interfaces/User";
import { SaveTweetUseCase } from "./SaveTweetUseCase";

describe("#SaveTweet", () => {
    it("Should save tweet by user", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new SaveTweetUseCase(
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

        const response = await sut.execute({
            userId: user.id,
            tweetId: tweet.id,
        });

        const saved = response.users_saved_id.some(
            userSaved => userSaved === user.id,
        );
        expect(saved).toBeTruthy();
        expect(inMemoryUsersRepository.items[0].bookmarks).toEqual([tweet]);
        expect(inMemoryUsersRepository.items[0].bookmarks_id).toEqual([
            tweet.id,
        ]);
    });

    it("Shouldn't save tweet if tweet is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new SaveTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const user = {
            id: "2",
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const response = sut.execute({ userId: user.id, tweetId: "3" });
        await expect(response).rejects.toEqual(new Error("Tweet not found"));
    });

    it("Shouldn't save tweet if user is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new SaveTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const tweet = {
            id: "2",
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = sut.execute({ userId: "3", tweetId: tweet.id });
        await expect(response).rejects.toEqual(new Error("User not found"));
    });

    it("Shouldn't save tweet if tweet already saved", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new SaveTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const tweet = {
            id: "2",
            users_saved_id: ["3"],
        };

        const user = {
            id: "3",
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);
        inMemoryUsersRepository.items.push(user as IUser);

        const response = sut.execute({ userId: user.id, tweetId: tweet.id });
        await expect(response).rejects.toEqual(
            new Error("Tweet already saved"),
        );
    });
});
