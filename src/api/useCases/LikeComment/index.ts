import { PostgresCommentsRepository } from "../../repositories/implementations/PostgresCommentsRepository";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { LikeCommentController } from "./LikeCommentController";
import { LikeCommentUseCase } from "./LikeCommentUseCase";

const postgresCommentsRepository = new PostgresCommentsRepository();
const postgresUsersRepository = new PostgresUserRepository();
const likeCommentUseCase = new LikeCommentUseCase(
    postgresCommentsRepository,
    postgresUsersRepository,
);
const likeCommentController = new LikeCommentController(likeCommentUseCase);

export { likeCommentController };
