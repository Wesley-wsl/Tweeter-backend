import { Tweet } from "../../api/entities/Tweet";
import { IPaginatedFetchResponse } from "../../api/interfaces/Paginated";
import { PostgresTweetsRepository } from "../../api/repositories/implementations/PostgresTweetsRepository";
import { ICreateTweetDTO } from "../../api/useCases/CreateTweet/CreateTweetDTO";

export class InMemoryTweetsRepository implements PostgresTweetsRepository {
    public items: Tweet[] = [];

    public async findAllTweets(): Promise<Tweet[]> {
        return this.items;
    }

    async findById(id: string): Promise<Tweet | null> {
        const tweetFind = this.items.find(tweet => tweet.id === id);
        if (!tweetFind) return null;
        return tweetFind;
    }

    async findByAuthor(author_id: string): Promise<Tweet[] | null> {
        const tweetFind = this.items.filter(
            tweet => tweet.author_id === author_id,
        );
        if (tweetFind.length === 0) return null;
        return tweetFind;
    }

    async createTweet(tweet: ICreateTweetDTO): Promise<Tweet> {
        const tweetCreated = tweet;
        this.items.push(tweet as Tweet);
        return tweetCreated as Tweet;
    }

    async deleteTweetById(tweetId: string): Promise<void> {
        this.items = this.items.filter(tweet => tweet.id !== tweetId);
    }

    async save(tweet: Tweet): Promise<Tweet> {
        this.items.push(tweet);
        return tweet;
    }
}
