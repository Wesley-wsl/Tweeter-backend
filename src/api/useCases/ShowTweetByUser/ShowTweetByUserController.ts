import { Request, Response } from "express";

import { ShowTweetByUserUseCase } from "./ShowTweetByUserUseCase";

export class ShowTweetByUserController {
    constructor(private showTweetByUserUseCase: ShowTweetByUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { authorId } = request.params;
        const { userId } = response.locals;

        const tweets = await this.showTweetByUserUseCase.execute(
            userId,
            authorId,
        );

        return response.status(200).json({
            success: true,
            data: tweets,
        });
    }
}
