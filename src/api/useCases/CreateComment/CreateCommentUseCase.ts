import { ICommentRepository } from "../../repositories/ICommentsRepository";
import { ITweetsRepository } from "../../repositories/ITweetsRepository";
import { ICreateCommentDTO } from "./CreateCommentDTO";

export class CreateCommentUseCase {
    constructor(
        private postgresTweetsRepository: ITweetsRepository,
        private postgresCommentsRepository: ICommentRepository,
    ) {}

    async execute({ author_id, tweet_id, comment, image }: ICreateCommentDTO) {
        const tweet = await this.postgresTweetsRepository.findById(
            tweet_id,
            true,
        );

        if (!tweet) throw new Error("Tweet not found");

        const createdComment =
            await this.postgresCommentsRepository.createComment({
                comment,
                author_id,
                tweet_id,
                image,
            });

        tweet.comments_id.push(createdComment.id);
        tweet.comments.push(createdComment);
        await this.postgresTweetsRepository.save(tweet);
        await this.postgresCommentsRepository.save(createdComment);
        return createdComment;
    }
}
