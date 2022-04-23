import { ICommentRepository } from "../../repositories/ICommentsRepository";
import { ITweetsRepository } from "../../repositories/ITweetsRepository";

export class DeleteCommentUseCase {
    constructor(
        private postgresTweetsRepository: ITweetsRepository,
        private postgresCommentsRepository: ICommentRepository,
    ) {}

    async execute(commentId: string) {
        const comment = await this.postgresCommentsRepository.findById(
            commentId,
            true,
        );

        if (!comment) throw new Error("Comment not found");

        const tweet = await this.postgresTweetsRepository.findById(
            comment.tweet_id,
            true,
        );

        if (!tweet) throw new Error("Tweet not found");

        const tweetCommentIdFiltered = tweet.comments_id.filter(
            id => id !== comment.id,
        );
        const tweetComments = tweet.comments.filter(
            tweetComment => tweetComment.id !== comment.id,
        );

        await this.postgresCommentsRepository.delete(comment.id);

        tweet.comments_id = tweetCommentIdFiltered;
        tweet.comments = tweetComments;
        this.postgresTweetsRepository.save(tweet);
    }
}
