import { Request, Response } from "express";

import { ShowUserUseCase } from "./ShowUserUseCase";

export class ShowUserController {
    constructor(private showUserUseCase: ShowUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const user = await this.showUserUseCase.execute(id);

        return response.status(200).json({
            succes: true,
            data: user,
        });
    }
}
