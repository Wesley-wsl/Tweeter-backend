import { Comment } from "../entities/Comment";

export interface ICommentRepository {
    findById(commentId: string, relation?: boolean): Promise<Comment | null>;
    createComment(comment: {
        comment: string;
        author_id: string;
        tweet_id: string;
        image?: string;
    }): Promise<Comment>;
    save(comment: Comment): Promise<Comment>;
    delete(id: string): Promise<void>;
}
