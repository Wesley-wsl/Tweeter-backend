import { Joi } from "celebrate";

export const createTweetSchema = Joi.object().keys({
    content: Joi.string().max(800).min(20).required(),
    isPublic: Joi.string().valid("true", "false").optional(),
    tweet_id: Joi.string().optional(),
});
