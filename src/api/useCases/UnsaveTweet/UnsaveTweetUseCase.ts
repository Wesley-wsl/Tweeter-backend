import { ITweetsRepository } from "../../repositories/ITweetsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUnsaveTweetDTO } from "./UnsaveTweetDTO";

export class UnsaveTweetUseCase {
    constructor(
        private postgresTweetsRepository: ITweetsRepository,
        private postgresUsersRepository: IUsersRepository,
    ) {}

    async execute({ userId, tweetId }: IUnsaveTweetDTO) {
        const user = await this.postgresUsersRepository.findById(userId, true);
        const tweet = await this.postgresTweetsRepository.findById(tweetId);

        if (!tweet) throw new Error("Tweet not found");
        if (!user) throw new Error("User not found");

        const alreadySaved = tweet.users_saved_id.some(
            userSaved => userSaved === userId,
        );

        if (!alreadySaved) throw new Error("Tweet not saved");

        const bookmarksFiltered = user.bookmarks.filter(
            bookmark => bookmark.id !== tweet.id,
        );
        const bookmarksIdFiltered = user.bookmarks_id.filter(
            bookmark => bookmark !== tweet.id,
        );
        const usersSavedFiltered = tweet.users_saved_id.filter(
            userSavedId => userSavedId !== user.id,
        );

        user.bookmarks_id = bookmarksIdFiltered;
        user.bookmarks = bookmarksFiltered;
        tweet.users_saved_id = usersSavedFiltered;
        this.postgresUsersRepository.save(user);
        this.postgresTweetsRepository.save(tweet);
    }
}
