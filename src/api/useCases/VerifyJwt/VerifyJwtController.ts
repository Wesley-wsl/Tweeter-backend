import { Request, Response } from "express";

export class VerifyJwtController {
    async handle(request: Request, response: Response) {
        const { userId } = response.locals;

        return response.status(200).json({
            success: true,
            id: userId,
        });
    }
}
