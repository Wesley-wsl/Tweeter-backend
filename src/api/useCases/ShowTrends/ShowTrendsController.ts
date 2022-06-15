import { Request, Response } from "express";

import { ShowTrendsUseCase } from "./ShowTrendsUseCase";

export class ShowTrendsController {
    constructor(private showTrendsUseCase: ShowTrendsUseCase) {}

    async handle(request: Request, response: Response) {
        const trends = await this.showTrendsUseCase.execute();

        return response.status(200).json({
            success: true,
            data: trends,
        });
    }
}
