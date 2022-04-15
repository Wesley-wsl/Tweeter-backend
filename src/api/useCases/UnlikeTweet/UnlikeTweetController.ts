import { Request, Response } from "express";

import { UnlikeTweetUseCase } from "./UnlikeTweetUseCase";

export class UnlikeTweetController {
    constructor(private unlikeTweetUseCase: UnlikeTweetUseCase) {}

    async handle(request: Request, response: Response) {
        const { userId } = response.locals;
        const { tweetId } = request.params;

        const unlikeTweet = await this.unlikeTweetUseCase.execute({
            userId,
            tweetId,
        });

        return response.status(200).json({
            success: true,
            data: unlikeTweet,
        });
    }
}
