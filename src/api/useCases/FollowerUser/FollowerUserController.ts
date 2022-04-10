import { Request, Response } from "express";

import { FollowerUserUseCase } from "./FollowerUserUseCase";

export class FollowerUserController {
    constructor(private followerUserUseCase: FollowerUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { userId } = response.locals;

        await this.followerUserUseCase.execute({ id, userId });

        return response.status(200).json({
            success: true,
        });
    }
}
