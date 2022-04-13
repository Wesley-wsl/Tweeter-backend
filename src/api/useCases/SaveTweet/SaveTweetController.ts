import { Request, Response } from "express";

import { SaveTweetUseCase } from "./SaveTweetUseCase";

export class SaveTweetController {
    constructor(private saveTweetUseCase: SaveTweetUseCase) {}

    async handle(request: Request, response: Response) {
        const { userId } = response.locals;
        const { tweetId } = request.params;

        const tweetSaved = await this.saveTweetUseCase.execute({
            userId,
            tweetId,
        });

        return response.status(200).json({
            success: true,
            data: tweetSaved,
        });
    }
}
