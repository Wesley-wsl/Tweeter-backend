/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
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

    async execute({
        authorId,
        page,
        userId,
    }: IShowTweetsByUserDTO): Promise<IPaginatedResponse<Tweet>> {
        let { data: tweets, total } =
            await this.tweetsRepository.findByAuthorPaginated(
                authorId,
                page,
                true,
            );

        const totalPages = Math.ceil(total / 10);
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

        const response: IPaginatedResponse<Tweet> = {
            data: tweets,
            totalElements: total,
            page,
            elements: tweets.length,
            elementsPerPage: 10,
            totalPages,
            firstPage: page === 0,
            lastPage: page === totalPages - 1,
        };

        return response;
    }
}
