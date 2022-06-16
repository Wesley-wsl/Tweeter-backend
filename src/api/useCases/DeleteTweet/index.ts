import { PostgresCommentsRepository } from "../../repositories/implementations/PostgresCommentsRepository";
import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { DeleteTweetController } from "./DeleteTweetController";
import { DeleteTweetUseCase } from "./DeleteTweetUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const postgresCommentsRepository = new PostgresCommentsRepository();
const deleteTweetUseCase = new DeleteTweetUseCase(
    postgresTweetsRepository,
    postgresCommentsRepository,
);
const deleteTweetController = new DeleteTweetController(deleteTweetUseCase);

export { deleteTweetController };
