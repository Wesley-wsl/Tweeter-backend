import { Request, Response } from "express";

import { LikeTweetUseCase } from "./LikeTweetUseCase";

export class LikeTweetController {
    constructor(private likeTweetUseCase: LikeTweetUseCase) {}

    async handle(request: Request, response: Response) {
        const { userId } = response.locals;
        const { tweetId } = request.params;

        await this.likeTweetUseCase.execute({
            userId,
            tweetId,
        });

        return response.status(200).json({
            success: true,
        });
    }
}
