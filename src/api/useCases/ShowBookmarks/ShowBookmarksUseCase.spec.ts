import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { Tweet } from "../../entities/Tweet";
import { IUser } from "../../interfaces/User";
import { ShowBookmarksUseCase } from "./ShowBookmarksUseCase";

describe("#ShowBookmarks", () => {
    it("Should show bookmarks by user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowBookmarksUseCase(
            inMemoryUsersRepository,
            inMemoryTweetsRepository,
        );

        const user = {
            id: "2",
            bookmarks: [
                {
                    id: "3",
                },
            ] as Tweet[],
            bookmarks_id: ["3"],
        };

        const tweetBookmarked = {
            id: "3",
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryTweetsRepository.items.push(tweetBookmarked as Tweet);

        const response = await sut.execute({
            authorId: "2",
            filter: "",
            page: 0,
        });

        expect(response.data[0].id).toEqual("3");
    });

    it("Shouldn't show bookmarks by user if user is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowBookmarksUseCase(
            inMemoryUsersRepository,
            inMemoryTweetsRepository,
        );

        const response = sut.execute({
            authorId: "2",
            filter: "",
            page: 0,
        });

        await expect(response).rejects.toEqual(new Error("User not found"));
    });

    it("Should show bookmarks filtered by media.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowBookmarksUseCase(
            inMemoryUsersRepository,
            inMemoryTweetsRepository,
        );

        const tweetBookmarkedWithoutImage = {
            id: "3",
            likes: 10,
            image: null,
        };

        const tweetBookmarkedWithImage = {
            id: "4",
            likes: 25,
            image: "/image.jpg",
        };

        const user = {
            id: "2",
            bookmarks: [
                tweetBookmarkedWithoutImage,
                tweetBookmarkedWithImage,
            ] as Tweet[],
            bookmarks_id: ["3", "4"],
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryTweetsRepository.items.push(
            tweetBookmarkedWithoutImage as unknown as Tweet,
        );
        inMemoryTweetsRepository.items.push(tweetBookmarkedWithImage as Tweet);

        const response = await sut.execute({
            authorId: "2",
            filter: "media",
            page: 0,
        });

        expect(response.data[0].image).toEqual("/image.jpg");
        expect(response.data[1]).toBeFalsy();
    });

    it("Should show bookmarks filtered by likes.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowBookmarksUseCase(
            inMemoryUsersRepository,
            inMemoryTweetsRepository,
        );

        const tweetBookmarkedOne = {
            id: "3",
            likes: 10,
        };

        const tweetBookmarkedTwo = {
            id: "4",
            likes: 25,
        };

        const user = {
            id: "2",
            bookmarks: [tweetBookmarkedOne, tweetBookmarkedTwo] as Tweet[],
            bookmarks_id: ["3", "4"],
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryTweetsRepository.items.push(tweetBookmarkedOne as Tweet);
        inMemoryTweetsRepository.items.push(tweetBookmarkedTwo as Tweet);

        const response = await sut.execute({
            authorId: "2",
            filter: "likes",
            page: 0,
        });

        expect(response.data[0].likes >= response.data[1].likes).toEqual(true);
    });

    it("Shouldn't show bookmarks if page don't exist.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowBookmarksUseCase(
            inMemoryUsersRepository,
            inMemoryTweetsRepository,
        );

        const tweetBookmarkedOne = {
            id: "3",
        };

        const user = {
            id: "2",
            bookmarks: [tweetBookmarkedOne] as Tweet[],
            bookmarks_id: ["3"],
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryTweetsRepository.items.push(tweetBookmarkedOne as Tweet);

        const response = sut.execute({
            authorId: "2",
            filter: "",
            page: 1,
        });

        await expect(response).rejects.toEqual(new Error("Page don't exists."));
    });
});
