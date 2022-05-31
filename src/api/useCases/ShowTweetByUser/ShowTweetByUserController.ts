import { Request, Response } from "express";

import { ShowTweetByUserUseCase } from "./ShowTweetByUserUseCase";

export class ShowTweetByUserController {
    constructor(private showTweetByUserUseCase: ShowTweetByUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { authorId } = request.params;
        const { userId } = response.locals;
        const { page, filter } = request.query;

        const tweets = await this.showTweetByUserUseCase.execute({
            userId,
            authorId,
            page: page !== undefined ? Number(page) : 0,
            filter: filter !== undefined ? String(filter) : "",
        });

        return response.status(200).json({
            success: true,
            ...tweets,
        });
    }
}
