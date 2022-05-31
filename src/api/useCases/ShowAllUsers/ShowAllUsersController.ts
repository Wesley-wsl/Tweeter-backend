import { Request, Response } from "express";

import { ShowAllUsersUseCase } from "./ShowAllUsersUseCase";

export class ShowAllUsersController {
    constructor(private showAllUserUseCase: ShowAllUsersUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, page } = request.query;

        const user = await this.showAllUserUseCase.execute({
            page: page !== undefined ? Number(page) : 0,
            name: name !== undefined ? String(name) : "",
        });

        return response.status(200).json({
            succes: true,
            ...user,
        });
    }
}
