import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import multer from "multer";

import multerConfig from "../../config/multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { createCommentController } from "../useCases/CreateComment";
import { deleteCommentController } from "../useCases/DeleteComment";
import { likeCommentController } from "../useCases/LikeComment";
import { unlikeCommentController } from "../useCases/UnlikeComment";
import { createCommentSchema } from "../validations/CommentSchemas";

const routes = Router();

routes.post(
    "/:tweetId",
    ensureAuthenticated,
    multer(multerConfig).single("image"),
    celebrate({ [Segments.BODY]: createCommentSchema }),
    (request, response) => {
        return createCommentController.handle(request, response);
    },
);
routes.put("/:commentId/like", ensureAuthenticated, (request, response) => {
    return likeCommentController.handle(request, response);
});
routes.delete("/:commentId/like", ensureAuthenticated, (request, response) => {
    return unlikeCommentController.handle(request, response);
});
routes.delete("/:commentId", ensureAuthenticated, (request, response) => {
    return deleteCommentController.handle(request, response);
});

export { routes as commentRouter };
