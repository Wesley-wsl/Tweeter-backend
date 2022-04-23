import { PostgresCommentsRepository } from "../../repositories/implementations/PostgresCommentsRepository";
import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { DeleteCommentController } from "./DeleteCommentController";
import { DeleteCommentUseCase } from "./DeleteCommentUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const postgresCommentsRepository = new PostgresCommentsRepository();
const deleteCommentUseCase = new DeleteCommentUseCase(
    postgresTweetsRepository,
    postgresCommentsRepository,
);
const deleteCommentController = new DeleteCommentController(
    deleteCommentUseCase,
);

export { deleteCommentController };
