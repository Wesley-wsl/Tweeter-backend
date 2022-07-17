import { ITweetsRepository } from "../../repositories/ITweetsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateTweetDTO } from "./CreateTweetDTO";

export class CreateTweetUseCase {
    constructor(
        private tweetsRepository: ITweetsRepository,
        private usersRepository: IUsersRepository,
    ) {}

    async execute(tweet: ICreateTweetDTO) {
        const authorFind = await this.usersRepository.findById(
            tweet.author_id,
            true,
        );
        if (!authorFind) throw new Error("Author not found");
        const createTweet = await this.tweetsRepository.createTweet(tweet);

        const parseBoolean = ["true", "false"].includes(tweet.isPublic)
            ? true
            : null;

        if (parseBoolean === null)
            throw new Error("isPublic should be true or false");

        authorFind.tweets.push(createTweet);
        this.usersRepository.save(authorFind);
        this.tweetsRepository.save(createTweet);
        return createTweet;
    }
}
