import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import multer from "multer";

import multerConfig from "../../config/multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { createTweetController } from "../useCases/CreateTweet";
import { likeTweetController } from "../useCases/LikeTweet";
import { saveTweetController } from "../useCases/SaveTweet";
import { showTweetByUserController } from "../useCases/ShowTweetByUser";
import { showTweetsController } from "../useCases/ShowTweets";
import { unlikeTweetController } from "../useCases/UnlikeTweet";
import { unsaveTweetController } from "../useCases/UnsaveTweet";
import { createTweetSchema } from "../validations/TweetSchemas";

const routes = Router();

routes.post(
    "/",
    ensureAuthenticated,
    multer(multerConfig).single("image"),
    celebrate({ [Segments.BODY]: createTweetSchema }, { abortEarly: false }),
    (request, response) => {
        return createTweetController.handle(request, response);
    },
);
routes.get("/", ensureAuthenticated, (request, response) => {
    return showTweetsController.handle(request, response);
});
routes.get("/:authorId", ensureAuthenticated, (request, response) => {
    return showTweetByUserController.handle(request, response);
});
routes.put("/:tweetId", ensureAuthenticated, (request, response) => {
    return saveTweetController.handle(request, response);
});
routes.put("/:tweetId/like", ensureAuthenticated, (request, response) => {
    return likeTweetController.handle(request, response);
});
routes.delete("/:tweetId/like", ensureAuthenticated, (request, response) => {
    return unlikeTweetController.handle(request, response);
});
routes.delete("/:tweetId", ensureAuthenticated, (request, response) => {
    return unsaveTweetController.handle(request, response);
});

export { routes as tweetRouter };
