import { ITweetsRepository } from "../../repositories/ITweetsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ISaveTweetDTO } from "./SaveTweetDTO";

export class SaveTweetUseCase {
    constructor(
        private postgresTweetsRepository: ITweetsRepository,
        private postgresUsersRepository: IUsersRepository,
    ) {}

    async execute({ userId, tweetId }: ISaveTweetDTO) {
        const user = await this.postgresUsersRepository.findById(userId, true);
        const tweet = await this.postgresTweetsRepository.findById(tweetId);

        if (!tweet) throw new Error("Tweet not found");
        if (!user) throw new Error("User not found");

        const alreadySaved = tweet.users_saved_id.some(
            userSaved => userSaved === userId,
        );

        if (alreadySaved) throw new Error("Tweet already saved");

        user.bookmarks_id.push(tweet.id);
        user.bookmarks.push(tweet);
        tweet.users_saved_id.push(user.id);
        this.postgresUsersRepository.save(user);
        this.postgresTweetsRepository.save(tweet);

        return tweet;
    }
}
