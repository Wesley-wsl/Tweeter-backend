import { PostgresCommentsRepository } from "../../repositories/implementations/PostgresCommentsRepository";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { UnlikeCommentController } from "./UnlikeCommentController";
import { UnlikeCommentUseCase } from "./UnlikeCommentUseCase";

const postgresCommentsRepository = new PostgresCommentsRepository();
const postgresUsersRepository = new PostgresUserRepository();
const unlikeCommentUseCase = new UnlikeCommentUseCase(
    postgresCommentsRepository,
    postgresUsersRepository,
);
const unlikeCommentController = new UnlikeCommentController(
    unlikeCommentUseCase,
);

export { unlikeCommentController };
