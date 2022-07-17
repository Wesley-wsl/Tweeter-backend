import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { IUser } from "../../interfaces/User";
import { CreateTweetUseCase } from "./CreateTweetUseCase";

describe("#CreateTweet", () => {
    it("Shouldn't create tweet if author is not found", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new CreateTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const tweetInformations = {
            content: "A Content random.",
            image: "Image.",
            isPublic: "true",
            author_id: "1",
        };
        const response = sut.execute(tweetInformations);

        await expect(response).rejects.toEqual(new Error("Author not found"));
    });

    it("Property isPublic should be true or false", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new CreateTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const author = {
            id: "1",
            name: "Jorkis",
        };

        inMemoryUsersRepository.items.push(author as IUser);

        const tweetInformations = {
            content: "A Content random.",
            image: "Image.",
            isPublic: "kkkkkkk",
            author_id: "1",
        };
        const response = sut.execute(tweetInformations);

        await expect(response).rejects.toEqual(
            new Error("isPublic should be true or false"),
        );
    });

    it("Should create a new tweet", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new CreateTweetUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const author = {
            id: "1",
            name: "Jorkis",
            tweets: [],
        };

        inMemoryUsersRepository.items.push(author as unknown as IUser);

        const tweetInformations = {
            content: "A Content random.",
            image: "Image.",
            isPublic: "true",
            author_id: "1",
        };
        const response = await sut.execute(tweetInformations);

        expect(response).toBeTruthy();
        expect(inMemoryUsersRepository.items[0].tweets).toEqual([
            tweetInformations,
        ]);
        expect(inMemoryTweetsRepository.items[0]).toEqual(tweetInformations);
    });
});
