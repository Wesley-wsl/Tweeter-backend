import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { Tweet } from "../../entities/Tweet";
import { User } from "../../entities/User";
import { IUser } from "../../interfaces/User";
import { ShowTweetByUserUseCase } from "./ShowTweetByUserUseCase";

describe("#ShowTweetByUser", () => {
    it("Should only tweets public if is not follow this user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const user = {
            id: "20",
            following: [] as User[],
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const tweet = {
            id: "123423243423",
            author_id: "1",
            isPublic: "false",
            author: {},
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = await sut.execute({
            userId: user.id,
            authorId: tweet.author_id,
            filter: "",
            page: 0,
        });
        expect(response.data.length).toEqual(0);
    });

    it("Shouldn't show tweets if tweets by author is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const response = sut.execute({
            userId: "2",
            authorId: "20",
            filter: "",
            page: 0,
        });

        await expect(response).rejects.toEqual(new Error("Tweets not fond"));
    });

    it("Should list tweets private by user if is following he", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );
        const user = {
            id: "2",
            following: [
                {
                    id: "1",
                },
            ],
        };
        const userTwo = {
            id: "1",
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push(userTwo as IUser);

        const tweet = {
            id: "123423243423",
            author_id: "1",
            isPublic: "false",
            author: {},
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = await sut.execute({
            userId: user.id,
            authorId: tweet.author_id,
            filter: "",
            page: 0,
        });
        expect(response.data[0].isPublic).toEqual("false");
    });

    it("Should show tweets filtered by media.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const user = {
            id: "1",
            following: [],
            following_id: [],
        };

        inMemoryUsersRepository.items.push(user as unknown as IUser);

        const tweet = {
            id: "123423243423",
            author_id: user.id,
            isPublic: "false",
            author: {},
            image: null,
            likes: 10,
        };

        const tweetTwo = {
            id: "123",
            author_id: user.id,
            isPublic: "false",
            author: {},
            image: "/image.png",
            likes: 100,
        };

        inMemoryTweetsRepository.items.push(tweet as unknown as Tweet);
        inMemoryTweetsRepository.items.push(tweetTwo as Tweet);

        const response = await sut.execute({
            userId: user.id,
            authorId: tweet.author_id,
            filter: "media",
            page: 0,
        });

        expect(response.data[0].image).toBeTruthy();
        expect(response.data[1]).toBeFalsy();
    });

    it("Should be able to show tweets filtered by likes", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const user = {
            id: "1",
            following: [],
            following_id: [],
        };

        inMemoryUsersRepository.items.push(user as unknown as IUser);

        const tweet = {
            id: "123423243423",
            author_id: user.id,
            isPublic: "false",
            author: {},
            likes: 10,
        };

        const tweetTwo = {
            id: "123423243423",
            author_id: user.id,
            isPublic: "false",
            author: {},
            likes: 100,
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);
        inMemoryTweetsRepository.items.push(tweetTwo as Tweet);

        const response = await sut.execute({
            userId: user.id,
            authorId: tweet.author_id,
            filter: "likes",
            page: 0,
        });

        expect(response.data[0].likes >= response.data[1].likes).toEqual(true);
    });

    it("Shoulnd't be able to show tweets if page don't exists.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const user = {
            id: "1",
            following: [],
            following_id: [],
        };

        inMemoryUsersRepository.items.push(user as unknown as IUser);

        const tweet = {
            id: "123423243423",
            author_id: user.id,
            isPublic: "false",
            author: {},
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = sut.execute({
            userId: user.id,
            authorId: tweet.author_id,
            filter: "",
            page: 1,
        });

        await expect(response).rejects.toEqual(new Error("Page don't exists."));
    });

    it("Shouldn't be able to show tweets if user don't exists.", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const tweet = {
            id: "123423243423",
            author_id: "200",
            isPublic: "false",
            author: {},
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = await sut.execute({
            userId: "2",
            authorId: tweet.author_id,
            filter: "",
            page: 0,
        });

        expect(response.data.length === 0).toEqual(true);
    });
});
