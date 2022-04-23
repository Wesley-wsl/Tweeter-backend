import { InMemoryCommentsRepository } from "../../../tests/repositories/In-memory-comments-repository";
import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { Comment } from "../../entities/Comment";
import { Tweet } from "../../entities/Tweet";
import { DeleteCommentUseCase } from "./DeleteCommentUseCase";

describe("#DeleteComment", () => {
    it("Should delete a comment", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();
        const sut = new DeleteCommentUseCase(
            inMemoryTweetsRepository,
            inMemoryCommentsRepository,
        );
        const comment = {
            id: "1",
            tweet_id: "2",
        };

        const tweet = {
            id: "2",
            comments_id: [comment.id],
            comments: [{ id: comment.id }],
        };

        inMemoryCommentsRepository.items.push(comment as Comment);
        inMemoryTweetsRepository.items.push(tweet as Tweet);

        await sut.execute(comment.id);
        expect(inMemoryCommentsRepository.items).toEqual([]);
    });

    it("Shouldn't delete a comment if is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();
        const sut = new DeleteCommentUseCase(
            inMemoryTweetsRepository,
            inMemoryCommentsRepository,
        );
        const response = sut.execute("2");

        await expect(response).rejects.toEqual(new Error("Comment not found"));
    });

    it("Shouldn't delete a commit if tweet is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();
        const sut = new DeleteCommentUseCase(
            inMemoryTweetsRepository,
            inMemoryCommentsRepository,
        );
        const comment = {
            id: "1",
            tweet_id: "2",
        };

        inMemoryCommentsRepository.items.push(comment as Comment);

        const response = sut.execute(comment.id);
        await expect(response).rejects.toEqual(new Error("Tweet not found"));
    });
});
