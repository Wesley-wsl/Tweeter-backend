import { Router } from "express";
import multer from "multer";

import multerConfig from "../../config/multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authenticateUserController } from "../useCases/AuthenticateUser";
import { createUserController } from "../useCases/CreateUser";
import { editUserController } from "../useCases/EditUser";
import { followerUserController } from "../useCases/FollowerUser";
import { showAllUsersController } from "../useCases/ShowAllUsers";
import { showBookmarksController } from "../useCases/ShowBookmarks";
import { showFollowersController } from "../useCases/ShowFollowers";
import { showFollowingController } from "../useCases/ShowFollowing";
import { showUserController } from "../useCases/ShowUser";
import { unfollowUserController } from "../useCases/UnfollowUser";

const routes = Router();

routes.post("/", (request, response) => {
    return createUserController.handle(request, response);
});
routes.post("/login", (request, response) => {
    return authenticateUserController.handle(request, response);
});
routes.get("/", (request, response) => {
    return showAllUsersController.handle(request, response);
});
routes.get("/:id", (request, response) => {
    return showUserController.handle(request, response);
});
routes.get("/:id/following", (request, response) => {
    return showFollowingController.handle(request, response);
});
routes.get("/:id/followers", (request, response) => {
    return showFollowersController.handle(request, response);
});
routes.get("/:id/bookmarks", (request, response) => {
    return showBookmarksController.handle(request, response);
});
routes.put(
    "/:id",
    ensureAuthenticated,
    multer(multerConfig).fields([
        { name: "avatar", maxCount: 1 },
        { name: "background", maxCount: 1 },
    ]),
    (request, response) => {
        return editUserController.handle(request, response);
    },
);
routes.put("/follower/:id", ensureAuthenticated, (request, response) => {
    return followerUserController.handle(request, response);
});
routes.delete("/unfollow/:id", ensureAuthenticated, (request, response) => {
    return unfollowUserController.handle(request, response);
});

export { routes as userRouter };
