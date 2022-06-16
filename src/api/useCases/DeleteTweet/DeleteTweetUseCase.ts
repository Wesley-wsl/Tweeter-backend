import { PostgresCommentsRepository } from "../../repositories/implementations/PostgresCommentsRepository";
import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { IDeleteTweetDTO } from "./DeleteTweetDTO";

export class DeleteTweetUseCase {
    constructor(
        private postgresTweetsRepository: PostgresTweetsRepository,
        private postgresCommentsRepository: PostgresCommentsRepository,
    ) {}

    async execute({ tweetId, userId }: IDeleteTweetDTO) {
        const tweet = await this.postgresTweetsRepository.findById(
            tweetId,
            true,
        );

        if (!tweet) throw new Error("Tweet is not found.");
        if (tweet.author_id !== userId)
            throw new Error("User is not own this tweet.");

        tweet.comments.forEach(async comment => {
            await this.postgresCommentsRepository.delete(comment.id);
        });

        await this.postgresTweetsRepository.deleteTweetById(tweetId);
    }
}
