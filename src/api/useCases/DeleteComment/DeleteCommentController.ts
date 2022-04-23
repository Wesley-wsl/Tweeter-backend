import { Request, Response } from "express";

import { DeleteCommentUseCase } from "./DeleteCommentUseCase";

export class DeleteCommentController {
    constructor(private createCommentUseCase: DeleteCommentUseCase) {}

    async handle(request: Request, response: Response) {
        const { commentId } = request.params;

        await this.createCommentUseCase.execute(commentId);

        return response.status(200).json({
            success: true,
        });
    }
}
