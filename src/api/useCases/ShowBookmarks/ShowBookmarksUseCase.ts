import { Tweet } from "../../entities/Tweet";
import { IPaginatedResponse } from "../../interfaces/Paginated";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { sortByLikes } from "../../utils/tweets-utils";
import { IShowBookmarksDTO } from "./ShowBookmarksDTO";

export class ShowBookmarksUseCase {
    constructor(private postgresUsersRepository: IUsersRepository) {}

    async execute({ authorId, filter, page }: IShowBookmarksDTO) {
        const user = await this.postgresUsersRepository.findById(
            authorId,
            true,
        );
        if (!user) throw new Error("User not found");
        let userBookmarks = user.bookmarks;

        if (filter === "media")
            userBookmarks = userBookmarks.filter(tweet => tweet.image !== null);

        const total = userBookmarks.length;
        let totalPages = Math.ceil(total / 10);

        if (totalPages - 1 < 1) totalPages = 1;
        if (page > totalPages - 1) throw new Error("Page don't exists.");

        if (filter === "likes") sortByLikes(userBookmarks);

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
