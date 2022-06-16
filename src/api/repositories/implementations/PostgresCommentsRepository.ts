import { Comment } from "../../entities/Comment";
import { ICreateCommentDTO } from "../../useCases/CreateComment/CreateCommentDTO";
import { ICommentRepository } from "../ICommentsRepository";

export class PostgresCommentsRepository implements ICommentRepository {
    public async findById(
        id: string,
        relation?: boolean,
    ): Promise<Comment | null> {
        return Comment.findOne({
            where: { id },
            relations: relation ? ["tweet"] : [],
        });
    }

    public async createComment({
        comment,
        author_id,
        tweet_id,
        image,
    }: ICreateCommentDTO): Promise<Comment> {
        const commentCreated = Comment.create({
            comment,
            author_id,
            tweet_id,
            image,
        });
        return commentCreated;
    }

    public async save(comment: Comment): Promise<Comment> {
        return Comment.save(comment);
    }

    public async delete(id: string): Promise<void> {
        await Comment.delete(id);
    }
}
