import { Request, Response } from "express";

import { ShowFollowingUseCase } from "./ShowFollowingUseCase";

export class ShowFollowingController {
    constructor(private showFollowingUseCase: ShowFollowingUseCase) {}

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const followings = await this.showFollowingUseCase.execute(id);

        return response.status(200).json({
            success: true,
            data: followings,
        });
    }
}
