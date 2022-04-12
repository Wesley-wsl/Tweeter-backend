import { Request, Response } from "express";

import { UnfollowUserUseCase } from "./UnfollowUserUseCase";

export class UnfollowUserController {
    constructor(private unfollowUserUseCase: UnfollowUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { userId } = response.locals;

        await this.unfollowUserUseCase.execute({ id, userId });

        return response.status(200).json({
            success: true,
        });
    }
}
