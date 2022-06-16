import { Like } from "typeorm";

import { Tweet } from "../../entities/Tweet";
import { IPaginatedFetchResponse } from "../../interfaces/Paginated";
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

    public async findByAuthorPaginated(
        author_id: string,
        page: number,
        relation?: boolean,
    ): Promise<IPaginatedFetchResponse<Tweet>> {
        const [data, total] = await Tweet.findAndCount({
            skip: page * 10,
            take: 10,
            where: { author_id },
            relations: relation ? ["author", "comments"] : [],
        });

        return { data, total };
    }

    public async findById(
        id: string,
        relation?: boolean,
    ): Promise<Tweet | null> {
        return Tweet.findOne({
            where: { id },
            relations: relation ? ["author", "comments", "retweet"] : [],
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
