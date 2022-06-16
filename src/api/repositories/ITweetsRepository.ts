import { Tweet } from "../entities/Tweet";
import { IPaginatedFetchResponse } from "../interfaces/Paginated";
import { ICreateTweetDTO } from "../useCases/CreateTweet/CreateTweetDTO";

export interface ITweetsRepository {
    findAllTweets(search: string): Promise<Tweet[]>;
    findById(id: string, relation?: boolean): Promise<Tweet | null>;
    findByAuthorPaginated(
        author_id: string,
        page: number,
        relation?: boolean,
    ): Promise<IPaginatedFetchResponse<Tweet>>;
    findByAuthor(
        author_id: string,
        relation?: boolean,
    ): Promise<Tweet[] | null>;
    createTweet(tweet: ICreateTweetDTO): Promise<Tweet>;
    deleteTweetById(tweetId: string): Promise<void>;
    save(tweet: Tweet): Promise<Tweet>;
}
