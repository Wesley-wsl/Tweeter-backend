import { Request, Response } from "express";

import { LikeCommentUseCase } from "./LikeCommentUseCase";

export class LikeCommentController {
    constructor(private likeTweetUseCase: LikeCommentUseCase) {}

    async handle(request: Request, response: Response) {
        const { userId } = response.locals;
        const { commentId } = request.params;

        await this.likeTweetUseCase.execute(userId, commentId);

        return response.status(200).json({
            success: true,
        });
    }
}
