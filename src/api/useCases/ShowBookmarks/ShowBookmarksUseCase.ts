/* eslint-disable no-await-in-loop */
import { Tweet } from "../../entities/Tweet";
import { IPaginatedResponse } from "../../interfaces/Paginated";
import { ITweetsRepository } from "../../repositories/ITweetsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IShowBookmarksDTO } from "./ShowBookmarksDTO";

export class ShowBookmarksUseCase {
    constructor(
        private postgresUsersRepository: IUsersRepository,
        private postgresTweetsRepository: ITweetsRepository,
    ) {}

    async execute({ authorId, filter, page }: IShowBookmarksDTO) {
        const user = await this.postgresUsersRepository.findById(
            authorId,
            true,
        );
        if (!user) throw new Error("User not found");
        const userBookmarksId = user.bookmarks_id;
        let userBookmarks: Tweet[] = [];

        for (let i = 0; i < userBookmarksId.length; i++) {
            const tweetBookmarked =
                await this.postgresTweetsRepository.findById(
                    userBookmarksId[i],
                    true,
                );

            if (tweetBookmarked) {
                userBookmarks.push(tweetBookmarked);
            }
        }

        if (filter === "media")
            userBookmarks = userBookmarks.filter(tweet => tweet.image !== null);

        const total = userBookmarks.length;
        let totalPages = Math.ceil(total / 10);

        if (totalPages - 1 < 1) totalPages = 1;
        if (page > totalPages - 1) throw new Error("Page don't exists.");

        if (filter === "likes") {
            userBookmarks = userBookmarks.sort((a, b) => {
                if (a.likes > b.likes) return -1;
                if (a.likes < b.likes) return 1;
                return 0;
            });
        }

        const bookmarksPaginated = userBookmarks.slice(
            page * 10,
            page * 10 + 10,
        );
        const response: IPaginatedResponse<Tweet> = {
            data: bookmarksPaginated,
            totalElements: total,
            page,
            elements: bookmarksPaginated.length,
            elementsPerPage: 10,
            totalPages,
            firstPage: page === 0,
            lastPage: page === totalPages - 1,
        };

        return response;
    }
}
