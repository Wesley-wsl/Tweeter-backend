import { Router } from "express";

import { authenticateUserController } from "../useCases/AuthenticateUser";
import { createUserController } from "../useCases/CreateUser";

const routes = Router();

routes.post("/", (request, response) => {
    return createUserController.handle(request, response);
});
routes.post("/login", (request, response) => {
    return authenticateUserController.handle(request, response);
});

export { routes as userRouter };
