import { Request, Response } from "express";

import { CreateTweetUseCase } from "./CreateTweetUseCase";

export class CreateTweetController {
    constructor(private createTweetUseCase: CreateTweetUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { userId } = response.locals;
        const { content, isPublic = "true", tweet_id } = request.body;
        const tweet = await this.createTweetUseCase.execute({
            author_id: userId,
            image: request.file?.filename ? request.file?.filename : undefined,
            content,
            isPublic,
            tweet_id,
        });

        return response.status(200).json({
            success: true,
            data: tweet,
        });
    }
}
