import { Request, Response } from "express";

import { EditUserUseCase } from "./EditUserUseCase";

export class EditUserController {
    constructor(private editUserUseCase: EditUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { avatar, background }: any = request.files;
        const { about_me, email, name } = request.body;

        const user = await this.editUserUseCase.execute({
            about_me,
            avatar: avatar ? avatar[0]?.filename : undefined,
            background: background ? background[0]?.filename : undefined,
            email,
            name,
            id,
        });

        return response.status(200).json({
            success: true,
            user,
        });
    }
}
