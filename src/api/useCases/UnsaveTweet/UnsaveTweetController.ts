import { Request, Response } from "express";

import { UnsaveTweetUseCase } from "./UnsaveTweetUseCase";

export class UnsaveTweetController {
    constructor(private unsaveTweetUseCase: UnsaveTweetUseCase) {}

    async handle(request: Request, response: Response) {
        const { userId } = response.locals;
        const { tweetId } = request.params;

        await this.unsaveTweetUseCase.execute({
            userId,
            tweetId,
        });

        return response.status(200).json({
            success: true,
        });
    }
}
