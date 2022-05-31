import { Request, Response } from "express";

import { ShowTweetsUseCase } from "./ShowTweetsUseCase";

export class ShowTweetsController {
    constructor(private showTweetsUseCase: ShowTweetsUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { userId } = response.locals;
        const { filter, page, search } = request.query;

        const tweets = await this.showTweetsUseCase.execute({
            userId,
            page: page !== undefined ? Number(page) : 0,
            filter: filter !== undefined ? String(filter) : "",
            search: search !== undefined ? String(search) : "",
        });

        return response.status(200).json({
            success: true,
            ...tweets,
        });
    }
}
