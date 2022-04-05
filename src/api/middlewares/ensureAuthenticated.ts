import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new Error("Don't authenticated");
    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, `${process.env.JWT_SECRET}`);
        response.locals.userId = decoded.sub;
        next();
    } catch {
        throw new Error("JWT Token is invalid!");
    }
}
