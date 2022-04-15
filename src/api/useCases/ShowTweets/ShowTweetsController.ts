import { Request, Response } from "express";

import { ShowTweetsUseCase } from "./ShowTweetsUseCase";

export class ShowTweetsController {
    constructor(private showTweetsUseCase: ShowTweetsUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { userId } = response.locals;

        const tweets = await this.showTweetsUseCase.execute(userId);

        return response.status(200).json({
            success: true,
            data: tweets,
        });
    }
}
