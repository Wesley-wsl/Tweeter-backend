import { Request, Response } from "express";

import { CreateCommentUseCase } from "./CreateCommentUseCase";

export class CreateCommentController {
    constructor(private createCommentUseCase: CreateCommentUseCase) {}

    async handle(request: Request, response: Response) {
        const { userId } = response.locals;
        const { tweetId } = request.params;
        const { comment } = request.body;

        const commentCreated = await this.createCommentUseCase.execute({
            author_id: userId,
            tweet_id: tweetId,
            image: request.file?.filename ? request.file?.filename : undefined,
            comment,
        });

        return response.status(200).json({
            success: true,
            data: commentCreated,
        });
    }
}
