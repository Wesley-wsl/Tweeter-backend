import { Joi } from "celebrate";

export const createCommentSchema = Joi.object().keys({
    comment: Joi.string().max(250).required(),
});
