import { InMemoryCommentsRepository } from "../../../tests/repositories/In-memory-comments-repository";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { Comment } from "../../entities/Comment";
import { IUser } from "../../interfaces/User";
import { UnlikeCommentUseCase } from "./UnlikeCommentUseCase";

describe("#UnlikeComment", () => {
    it("Should unlike comment", async () => {
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnlikeCommentUseCase(
            inMemoryCommentsRepository,
            inMemoryUsersRepository,
        );

        const user = {
            id: "3",
            bookmarks_id: [],
            bookmarks: [],
            liked_comments_id: [],
            liked_comments: [],
        };

        const comment = {
            id: "20",
            liked_users_id: ["3"],
            likes: 1,
        };

        inMemoryCommentsRepository.items.push(comment as unknown as Comment);
        inMemoryUsersRepository.items.push(user as unknown as IUser);

        await sut.execute(user.id, comment.id);

        expect(inMemoryCommentsRepository.items[0].likes).toEqual(0);
    });

    it("Shouldn't unlike comment if comment is not found", async () => {
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnlikeCommentUseCase(
            inMemoryCommentsRepository,
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

        const response = sut.execute(user.id, "20");

        await expect(response).rejects.toEqual(new Error("Comment not found"));
    });

    it("Shouldn't unlike comment if user is not found", async () => {
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnlikeCommentUseCase(
            inMemoryCommentsRepository,
            inMemoryUsersRepository,
        );

        const comment = {
            id: "3",
        };

        inMemoryCommentsRepository.items.push(comment as Comment);

        const response = sut.execute("20", comment.id);

        await expect(response).rejects.toEqual(new Error("User not found"));
    });

    it("Shouldn't unlike comment if Comment already unliked", async () => {
        const inMemoryCommentsRepository = new InMemoryCommentsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new UnlikeCommentUseCase(
            inMemoryCommentsRepository,
            inMemoryUsersRepository,
        );

        const user = {
            id: "3",
            bookmarks_id: [],
            bookmarks: [],
            liked_tweets: [],
            liked_tweets_id: [],
        };

        const comment = {
            id: "20",
            liked_users_id: [],
        };

        inMemoryCommentsRepository.items.push(comment as unknown as Comment);
        inMemoryUsersRepository.items.push(user as unknown as IUser);

        const response = sut.execute(user.id, comment.id);
        await expect(response).rejects.toEqual(
            new Error("Comment already unliked"),
        );
    });
});
