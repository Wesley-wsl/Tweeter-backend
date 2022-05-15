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
            page: 0,
        });
        expect(response.data.length).toEqual(0);
    });

    it("Shouldn't show tweets if user is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTweetByUserUseCase(
            inMemoryTweetsRepository,
            inMemoryUsersRepository,
        );

        const tweet = {
            id: "123423243423",
            author_id: "1",
            isPublic: "false",
            author: {},
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);

        const response = await sut.execute({
            userId: "2",
            authorId: tweet.author_id,
            page: 0,
        });
        expect(response.data.length).toEqual(0);
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
            page: 0,
        });
        expect(response.data[0].isPublic).toEqual("false");
    });
});
