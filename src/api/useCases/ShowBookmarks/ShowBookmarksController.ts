import { Request, Response } from "express";

import { ShowBookmarksUseCase } from "./ShowBookmarksUseCase";

export class ShowBookmarksController {
    constructor(private showBookmarksUseCase: ShowBookmarksUseCase) {}

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const bookmarks = await this.showBookmarksUseCase.execute(id);

        return response.status(200).json({
            success: true,
            data: bookmarks,
        });
    }
}
