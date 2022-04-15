import { ITweetsRepository } from "../../repositories/ITweetsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUnlikeTweetDTO } from "./UnlikeTweetDTO";

export class UnlikeTweetUseCase {
    constructor(
        private postgresTweetsRepository: ITweetsRepository,
        private postgresUsersRepository: IUsersRepository,
    ) {}

    async execute({ userId, tweetId }: IUnlikeTweetDTO) {
        const user = await this.postgresUsersRepository.findById(userId, true);
        const tweet = await this.postgresTweetsRepository.findById(tweetId);

        if (!tweet) throw new Error("Tweet not found");
        if (!user) throw new Error("User not found");

        const alreadyLiked = tweet.liked_users_id.some(
            userSaved => userSaved === userId,
        );

        if (!alreadyLiked) throw new Error("Tweet don't has liked");

        const likedTweetsIdFiltered = user.liked_tweets_id.filter(
            tweetLikedId => tweetLikedId !== tweetId,
        );
        const LikedUsersIdFiltered = tweet.liked_users_id.filter(
            likeUserId => likeUserId !== userId,
        );

        user.liked_tweets_id = likedTweetsIdFiltered;
        tweet.liked_users_id = LikedUsersIdFiltered;
        tweet.likes -= 1;
        this.postgresUsersRepository.save(user);
        this.postgresTweetsRepository.save(tweet);
    }
}
