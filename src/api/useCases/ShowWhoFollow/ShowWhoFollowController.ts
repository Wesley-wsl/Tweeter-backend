import { Request, Response } from "express";

import { ShowWhoFollowUseCase } from "./ShowWhoFollowUseCase";

export class ShowWhoFollowController {
    constructor(private showWhoFollowUseCase: ShowWhoFollowUseCase) {}

    async handle(request: Request, response: Response) {
        const { userId } = response.locals;

        const whoFollow = await this.showWhoFollowUseCase.execute(userId);

        return response.status(200).json({
            success: true,
            data: whoFollow,
        });
    }
}
