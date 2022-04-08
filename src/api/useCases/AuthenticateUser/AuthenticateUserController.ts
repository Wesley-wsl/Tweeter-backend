import { Request, Response } from "express";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const token = await this.authenticateUserUseCase.execute({
            email,
            password,
        });

        return response.status(200).json({
            success: true,
            data: token,
        });
    }
}
