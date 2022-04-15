import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { ShowTweetsController } from "./ShowTweetsController";
import { ShowTweetsUseCase } from "./ShowTweetsUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const showTweetsUseCase = new ShowTweetsUseCase(postgresTweetsRepository);
const showTweetsController = new ShowTweetsController(showTweetsUseCase);

export { showTweetsController };
