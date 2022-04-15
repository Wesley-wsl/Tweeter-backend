import { Comment } from "../../api/entities/Comment";
import { PostgresCommentsRepository } from "../../api/repositories/implementations/PostgresCommentsRepository";
import { ICreateCommentDTO } from "../../api/useCases/CreateComment/CreateCommentDTO";

export class InMemoryCommentsRepository implements PostgresCommentsRepository {
    public items: Comment[] = [];

    async findById(id: string, relation?: boolean): Promise<Comment | null> {
        const commentFind = this.items.find(tweet => tweet.id === id);
        if (!commentFind) return null;
        return commentFind;
    }

    async createComment(comment: ICreateCommentDTO): Promise<Comment> {
        const commentCreated = comment;
        this.items.push(comment as Comment);
        return commentCreated as Comment;
    }

    async delete(commentId: string): Promise<void> {
        const deleted = this.items.filter(comment => comment.id !== commentId);
        this.items = deleted;
    }

    async save(comment: Comment): Promise<Comment> {
        this.items.push(comment);
        return comment;
    }
}
