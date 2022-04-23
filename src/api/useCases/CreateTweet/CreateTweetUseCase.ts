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

        if (tweet.tweet_id) {
            const tweetToRetweet = await this.tweetsRepository.findById(
                tweet.tweet_id,
                true,
            );
            tweetToRetweet?.retweet.push(createTweet);
            tweetToRetweet?.retweets_id.push(createTweet.id);

            if (!tweetToRetweet)
                throw new Error("Tweet to retweet is not found");

            createTweet.tweet_id = createTweet.id;
            authorFind.retweets_id.push(createTweet.id);
            authorFind.tweets.push(createTweet);
            this.usersRepository.save(authorFind);
            this.tweetsRepository.save(createTweet);
            this.tweetsRepository.save(tweetToRetweet);
            return createTweet;
        }

        authorFind.tweets.push(createTweet);
        this.usersRepository.save(authorFind);
        this.tweetsRepository.save(createTweet);
        return createTweet;
    }
}
