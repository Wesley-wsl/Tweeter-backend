import { InMemoryTweetsRepository } from "../../../tests/repositories/In-memory-tweets-repository";
import { Tweet } from "../../entities/Tweet";
import { ShowTrendsUseCase } from "./ShowTrendsUseCase";

describe("#ShowTrends", () => {
    it("Should be able to show best trends.", async () => {
        const inMemoryTweetsRepository = new InMemoryTweetsRepository();
        const sut = new ShowTrendsUseCase(inMemoryTweetsRepository);

        const tweet = {
            id: "10",
            content: "#backend",
        };

        const tweetTwo = {
            id: "10",
            content: "random",
        };

        const tweetThree = {
            id: "10",
            content: "#frontend",
        };

        const tweetFour = {
            id: "10",
            content: "#devOps",
        };

        inMemoryTweetsRepository.items.push(tweet as Tweet);
        inMemoryTweetsRepository.items.push(tweetTwo as Tweet);
        inMemoryTweetsRepository.items.push(tweetFour as Tweet);
        inMemoryTweetsRepository.items.push(tweetFour as Tweet);
        inMemoryTweetsRepository.items.push(tweetFour as Tweet);
        inMemoryTweetsRepository.items.push(tweetThree as Tweet);
        inMemoryTweetsRepository.items.push(tweetThree as Tweet);

        const response = await sut.execute();

        expect(response).toEqual([
            {
                trend: "#devOps",
                tweetsQuantity: 3,
            },
            {
                trend: "#frontend",
                tweetsQuantity: 2,
            },
            {
                trend: "#backend",
                tweetsQuantity: 1,
            },
        ]);
    });
});
