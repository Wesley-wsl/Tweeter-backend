import { ICommentRepository } from "../../repositories/ICommentsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class LikeCommentUseCase {
    constructor(
        private postgresCommentsRepository: ICommentRepository,
        private postgresUsersRepository: IUsersRepository,
    ) {}

    async execute(userId: string, commentId: string) {
        const user = await this.postgresUsersRepository.findById(userId, true);
        const comment = await this.postgresCommentsRepository.findById(
            commentId,
        );
        if (!comment) throw new Error("Comment not found");
        if (!user) throw new Error("User not found");

        const alreadyLiked = comment.liked_users_id.some(
            userLiked => userLiked === userId,
        );

        if (alreadyLiked) throw new Error("Comment already liked");

        user.liked_comments_id.push(comment.id);
        comment.liked_users_id.push(user.id);
        comment.likes += 1;
        this.postgresUsersRepository.save(user);
        this.postgresCommentsRepository.save(comment);
    }
}
