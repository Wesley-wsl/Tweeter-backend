import { Request, Response } from "express";

import { ShowAllUsersUseCase } from "./ShowAllUsersUseCase";

export class ShowAllUsersController {
    constructor(private showAllUserUseCase: ShowAllUsersUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const user = await this.showAllUserUseCase.execute();

        return response.status(200).json({
            succes: true,
            data: user,
        });
    }
}
