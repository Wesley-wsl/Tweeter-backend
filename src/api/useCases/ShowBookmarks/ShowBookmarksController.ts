import { Request, Response } from "express";

import { ShowBookmarksUseCase } from "./ShowBookmarksUseCase";

export class ShowBookmarksController {
    constructor(private showBookmarksUseCase: ShowBookmarksUseCase) {}

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { page, filter } = request.query;

        const bookmarks = await this.showBookmarksUseCase.execute({
            authorId: id,
            page: page !== undefined ? Number(page) : 0,
            filter: filter !== undefined ? String(filter) : "",
        });

        return response.status(200).json({
            success: true,
            ...bookmarks,
        });
    }
}
