import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";
import { ShowTrendsController } from "./ShowTrendsController";
import { ShowTrendsUseCase } from "./ShowTrendsUseCase";

const postgresTweetsRepository = new PostgresTweetsRepository();
const showTrendsUseCase = new ShowTrendsUseCase(postgresTweetsRepository);
const showTrendsController = new ShowTrendsController(showTrendsUseCase);

export { showTrendsController };
