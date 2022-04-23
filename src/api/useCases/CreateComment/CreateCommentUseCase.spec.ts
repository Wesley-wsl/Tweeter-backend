import { InMemoryCommentsRepository } from "../../../tests/repositories/In-memory-comments-repository";
import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { Tweet } from "../../entities/Tweet";
import { CreateCommentUseCase } from "./CreateCommentUseCase";

describe("#CreateComment", () => {
    it("Should create a comment", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();

        const sut = new CreateCommentUseCase(
            inMemoryTweetsRepository,
            inMemoryCommentsRepository,
        );

        const tweet = {
            id: "1",
            author_id: "2",
            comments_id: [],
            comments: [],
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);

        const response = await sut.execute({
            author_id: "2",
            tweet_id: tweet.id,
            comment: "Nice job!",
            image: undefined,
        });

        expect(response.tweet_id).toEqual(tweet.id);
        expect(inMemoryCommentsRepository.items[0].id).toEqual(response.id);
    });

    it("Shouldn't create a comment if tweet is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();

        const sut = new CreateCommentUseCase(
            inMemoryTweetsRepository,
            inMemoryCommentsRepository,
        );

        const response = sut.execute({
            author_id: "2",
            tweet_id: "20",
            comment: "Nice job!",
            image: undefined,
        });

        await expect(response).rejects.toEqual(new Error("Tweet not found"));
    });
});
