/* eslint-disable no-param-reassign */
import { Tweet } from "../../entities/Tweet";
import { IPaginatedResponse } from "../../interfaces/Paginated";
import { ITweetsRepository } from "../../repositories/ITweetsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IShowTweetsByUserDTO } from "./ShowTweetsByUserDTO";

export class ShowTweetByUserUseCase {
    constructor(
        private tweetsRepository: ITweetsRepository,
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ authorId, page, userId, filter }: IShowTweetsByUserDTO) {
        let tweets = await this.tweetsRepository.findByAuthor(authorId, true);

        if (!tweets) throw new Error("Tweets not fond");
        if (filter === "media")
            tweets = tweets.filter(tweet => tweet.image !== null);

        const total = tweets.length;
        let totalPages = Math.ceil(total / 10);

        if (totalPages - 1 < 1) totalPages = 1;
        if (page > totalPages - 1) throw new Error("Page don't exists.");

        const user = await this.usersRepository.findById(userId, true);
        const isFollowing = user?.following.filter(
            following => following.id === authorId,
        );

        tweets = tweets.filter(tweet => {
            delete tweet.author.password;
            return tweet;
        });

        if (!isFollowing || isFollowing.length === 0) {
            tweets = tweets.filter(tweet => {
                if (tweet.author_id === userId) return tweet;
                return tweet.isPublic === "true";
            });
        }

        if (filter === "likes") {
            tweets = tweets.sort((a, b) => {
                if (a.likes > b.likes) return -1;
                if (a.likes < b.likes) return 1;
                return 0;
            });
        }

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
