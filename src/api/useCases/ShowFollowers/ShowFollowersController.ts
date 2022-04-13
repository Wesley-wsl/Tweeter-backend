import { Request, Response } from "express";

import { ShowFollowersUseCase } from "./ShowFollowersUseCase";

export class ShowFollowersController {
    constructor(private showFollowersUseCase: ShowFollowersUseCase) {}

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const followers = await this.showFollowersUseCase.execute(id);

        return response.status(200).json({
            success: true,
            data: followers,
        });
    }
}
