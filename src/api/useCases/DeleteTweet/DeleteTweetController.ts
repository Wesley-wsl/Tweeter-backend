import { Request, Response } from "express";

import { DeleteTweetUseCase } from "./DeleteTweetUseCase";

export class DeleteTweetController {
    constructor(private deleteTweetUseCase: DeleteTweetUseCase) {}

    async handle(request: Request, response: Response) {
        const { tweetId } = request.params;
        const { userId } = response.locals;

        await this.deleteTweetUseCase.execute({
            tweetId,
            userId,
        });

        return response.status(204).end();
    }
}
