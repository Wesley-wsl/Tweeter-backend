import { Like } from "typeorm";

import { Tweet } from "../../entities/Tweet";
import { ICreateTweetDTO } from "../../useCases/CreateTweet/CreateTweetDTO";
import { ITweetsRepository } from "../ITweetsRepository";

export class PostgresTweetsRepository implements ITweetsRepository {
    public async findAllTweets(search: string): Promise<Tweet[]> {
        return Tweet.find({
            relations: ["author", "comments", "comments.author"],
            where: {
                content: Like(`%${search}%`),
            },
        });
    }

    public async findById(
        id: string,
        relation?: boolean,
    ): Promise<Tweet | null> {
        return Tweet.findOne({
            where: { id },
            relations: relation
                ? ["author", "comments", "comments.author"]
                : [],
        });
    }

    public async findByAuthor(
        author_id: string,
        relation?: boolean,
    ): Promise<Tweet[] | null> {
        return Tweet.find({
            where: { author_id },
            relations: relation
                ? ["author", "comments", "comments.author"]
                : [],
        });
    }

    public async createTweet({
        author_id,
        content,
        isPublic,
        image,
    }: ICreateTweetDTO): Promise<Tweet> {
        const tweet = Tweet.create({
            isPublic,
            content,
            author_id,
            image,
        });
        await Tweet.save(tweet);
        return tweet;
    }

    public async deleteTweetById(tweetId: string): Promise<void> {
        await Tweet.delete(tweetId);
    }

    public async save(tweet: Tweet): Promise<Tweet> {
        return Tweet.save(tweet);
    }
}
