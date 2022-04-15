/* eslint-disable no-param-reassign */
import { Tweet } from "../../entities/Tweet";
import { ITweetsRepository } from "../../repositories/ITweetsRepository";

export class ShowTweetsUseCase {
    constructor(private tweetsRepository: ITweetsRepository) {}

    async execute(userId: string): Promise<Tweet[]> {
        const tweets = await this.tweetsRepository.findAllTweets();
        const tweetFiltered: Tweet[] = [];

        tweets.forEach(tweet => {
            if (tweet.isPublic === "false") {
                if (!tweet.author.followers)
                    throw new Error("Follower not found");
                const isFollowing = tweet.author.followers.some(
                    follower => follower.id === userId,
                );
                delete tweet.author.followers;
                delete tweet.author.password;
                if (isFollowing) tweetFiltered.push(tweet);
            }
            delete tweet.author.followers;
            delete tweet.author.password;
            if (tweet.isPublic === "true") tweetFiltered.push(tweet);
        });

        return tweetFiltered;
    }
}
