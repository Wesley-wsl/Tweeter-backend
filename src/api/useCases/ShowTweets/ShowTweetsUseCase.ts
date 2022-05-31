/* eslint-disable no-param-reassign */
import { Tweet } from "../../entities/Tweet";
import { IPaginatedResponse } from "../../interfaces/Paginated";
import { ITweetsRepository } from "../../repositories/ITweetsRepository";
import { sortByLatest, sortByLikes } from "../../utils/tweets-utils";
import { IShowTweetsDTO } from "./ShowTweetsDTO";

export class ShowTweetsUseCase {
    constructor(private tweetsRepository: ITweetsRepository) {}

    async execute({
        filter,
        page,
        userId,
        search,
    }: IShowTweetsDTO): Promise<IPaginatedResponse<Tweet>> {
        let tweets = await this.tweetsRepository.findAllTweets(search);

        if (!tweets) throw new Error("Tweets not fond");
        if (filter === "media")
            tweets = tweets.filter(tweet => tweet.image !== null);

        tweets = tweets.filter(tweet => {
            delete tweet.author.password;
            const isFollowing = tweet.author.followers_id?.some(
                follower => follower === userId,
            );
            return isFollowing || (tweet.author_id === userId && tweet);
        });

        const total = tweets.length;
        let totalPages = Math.ceil(total / 10);

        if (totalPages - 1 < 1) totalPages = 1;
        if (page > totalPages - 1) throw new Error("Page don't exists.");

        if (filter === "top") sortByLikes(tweets);
        if (filter === "latest") sortByLatest(tweets);

        const tweetsPaginated = tweets.slice(page * 10, page * 10 + 10);
        const response: IPaginatedResponse<Tweet> = {
            data: tweetsPaginated,
            totalElements: total,
            page,
            elements: tweetsPaginated.length,
            elementsPerPage: 10,
            totalPages,
            firstPage: page === 0,
            lastPage: page === totalPages - 1,
        };

        return response;
    }
}
