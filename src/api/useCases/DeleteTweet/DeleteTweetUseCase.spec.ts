import { InMemoryCommentsRepository } from "../../../tests/repositories/In-memory-comments-repository";
import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { Comment } from "../../entities/Comment";
import { Tweet } from "../../entities/Tweet";
import { DeleteTweetUseCase } from "./DeleteTweetUseCase";

describe("#DeleteTweet", () => {
    it("Should be able to delete a tweet", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();
        const sut = new DeleteTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryCommentsRepository,
        );
        const comment = {
            id: "1",
            tweet_id: "2",
        };

        const user = {
            id: "10",
        };

        const tweet = {
            id: "20",
            author_id: user.id,
            comments_id: [comment.id],
            comments: [{ id: comment.id }],
        };

        inMemoryCommentsRepository.items.push(comment as Comment);
        inMemoryTweetsRepository.items.push(tweet as Tweet);

        await sut.execute({
            tweetId: tweet.id,
            userId: user.id,
        });
        expect(inMemoryTweetsRepository.items).toEqual([]);
    });

    it("Shouldn't be able to delete a tweet if is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();
        const sut = new DeleteTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryCommentsRepository,
        );

        const response = sut.execute({
            tweetId: "20",
            userId: "10",
        });

        await expect(response).rejects.toEqual(
            new Error("Tweet is not found."),
        );
    });

    it("Shouldn't be able to delete a tweet if user authenticated is not own of this tweet.", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();
        const sut = new DeleteTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryCommentsRepository,
        );

        const tweet = {
            id: "20",
            author_id: "10",
            comments_id: [] as string[],
            comments: [] as Comment[],
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = sut.execute({
            tweetId: "20",
            userId: "40",
        });

        await expect(response).rejects.toEqual(
            new Error("User is not own this tweet."),
        );
    });
});
