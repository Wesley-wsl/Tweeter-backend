import { ITweetsRepository } from "../../repositories/ITweetsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ILikeTweetDTO } from "./LikeTweetDTO";

export class LikeTweetUseCase {
    constructor(
        private postgresTweetsRepository: ITweetsRepository,
        private postgresUsersRepository: IUsersRepository,
    ) {}

    async execute({ userId, tweetId }: ILikeTweetDTO) {
        const user = await this.postgresUsersRepository.findById(userId, true);
        const tweet = await this.postgresTweetsRepository.findById(tweetId);

        if (!tweet) throw new Error("Tweet not found");
        if (!user) throw new Error("User not found");

        const alreadyLiked = tweet.liked_users_id.some(
            userSaved => userSaved === userId,
        );

        if (alreadyLiked) throw new Error("Tweet already liked");

        user.liked_tweets_id.push(tweet.id);
        tweet.liked_users_id.push(user.id);
        tweet.likes += 1;
        this.postgresUsersRepository.save(user);
        this.postgresTweetsRepository.save(tweet);
    }
}
