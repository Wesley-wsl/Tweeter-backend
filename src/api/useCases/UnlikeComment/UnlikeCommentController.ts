import { Request, Response } from "express";

import { UnlikeCommentUseCase } from "./UnlikeCommentUseCase";

export class UnlikeCommentController {
    constructor(private unlikeCommentUseCase: UnlikeCommentUseCase) {}

    async handle(request: Request, response: Response) {
        const { userId } = response.locals;
        const { commentId } = request.params;

        await this.unlikeCommentUseCase.execute(userId, commentId);

        return response.status(200).json({
            success: true,
        });
    }
}
