import { Tweet } from "../entities/Tweet";
import { ICreateTweetDTO } from "../useCases/CreateTweet/CreateTweetDTO";

export interface ITweetsRepository {
    findAllTweets(): Promise<Tweet[]>;
    findById(id: string, relation?: boolean): Promise<Tweet | null>;
    findByAuthor(
        author_id: string,
        relation?: boolean,
    ): Promise<Tweet[] | null>;
    createTweet(tweet: ICreateTweetDTO): Promise<Tweet>;
    save(tweet: Tweet): Promise<Tweet>;
}
