import { NextFunction, Request, Response } from "express";

export function errorHandler(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
) {
    if (error instanceof Error) {
        return response.status(400).json({
            success: false,
            error: error.message,
        });
    }

    return response.status(500).json({
        success: false,
        error: "Server internal error",
    });
}
