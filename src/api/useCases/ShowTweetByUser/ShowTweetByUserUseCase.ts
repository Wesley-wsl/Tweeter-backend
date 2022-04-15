/* eslint-disable no-param-reassign */
import { Tweet } from "../../entities/Tweet";
import { ITweetsRepository } from "../../repositories/ITweetsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class ShowTweetByUserUseCase {
    constructor(
        private tweetsRepository: ITweetsRepository,
        private usersRepository: IUsersRepository,
    ) {}

    async execute(userId: string, authorId: string): Promise<Tweet[]> {
        const tweets = await this.tweetsRepository.findByAuthor(authorId, true);
        if (!tweets) throw new Error("Tweets from this user not found");
        const user = await this.usersRepository.findById(userId, true);
        const isFollowing = user?.following.filter(
            following => following.id === authorId,
        );
        const tweetWithoutPassword: Tweet[] = [];

        if (!isFollowing || isFollowing.length === 0) {
            const tweetsFiltered = tweets.filter(
                tweet => tweet.isPublic === "true",
            );
            tweetsFiltered.forEach(tweet => {
                delete tweet.author.password;
                tweetWithoutPassword.push(tweet);
            });
            return tweetsFiltered;
        }

        tweets.forEach(tweet => {
            delete tweet.author.password;
            tweetWithoutPassword.push(tweet);
        });
        return tweetWithoutPassword;
    }
}
