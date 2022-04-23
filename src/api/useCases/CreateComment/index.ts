import { PostgresCommentsRepository } from "../../repositories/implementations/PostgresCommentsRepository";
import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { CreateCommentController } from "./CreateCommentController";
import { CreateCommentUseCase } from "./CreateCommentUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const postgresCommentsRepository = new PostgresCommentsRepository();
const createCommentUseCase = new CreateCommentUseCase(
    postgresTweetsRepository,
    postgresCommentsRepository,
);
const createCommentController = new CreateCommentController(
    createCommentUseCase,
);

export { createCommentController };
